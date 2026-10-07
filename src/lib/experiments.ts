export type ExperimentDefinition={id:string;variants:readonly string[]};

export const EXPERIMENTS={
  home_planner_cta:{id:'home_planner_cta',variants:['plan','scope'] as const},
} as const;

const key=(id:string)=>`kineticaxis.experiment.${id}.v1`;

export function assignExperiment(definition:ExperimentDefinition){
  const fallback=definition.variants[0] || 'control';
  if(typeof window==='undefined')return fallback;
  try{
    const stored=sessionStorage.getItem(key(definition.id));
    if(stored && definition.variants.includes(stored))return stored;
    const bytes=new Uint32Array(1);
    crypto.getRandomValues(bytes);
    const variant=definition.variants[bytes[0]%definition.variants.length] || fallback;
    sessionStorage.setItem(key(definition.id),variant);
    return variant;
  }catch{return fallback;}
}

export function getExperimentContext(){
  if(typeof window==='undefined')return '';
  const pairs:string[]=[];
  for(const rawDefinition of Object.values(EXPERIMENTS)){
    const definition:ExperimentDefinition=rawDefinition;
    try{
      const variant=sessionStorage.getItem(key(definition.id));
      if(variant && definition.variants.includes(variant))pairs.push(`${definition.id}=${variant}`);
    }catch{}
  }
  return pairs.join(';');
}
