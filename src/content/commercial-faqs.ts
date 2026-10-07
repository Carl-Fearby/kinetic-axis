export type CommercialFAQ = {q:string; a:string};

export const COMMON_COMMERCIAL_FAQS: CommercialFAQ[] = [
  {
    q:'Who will I work with?',
    a:'Kinetic Axis projects are senior-led. Discovery, product decisions and engineering direction stay close to the people doing the work, with direct communication throughout the project.',
  },
  {
    q:'What happens after launch?',
    a:'The post-launch model is agreed around the product. Handover, hosting responsibilities, documentation, monitoring, support and further development can be planned before release so there is a clear next step.',
  },
];

export function mergeCommercialFaqs(faqs: CommercialFAQ[]): CommercialFAQ[] {
  const questions = new Set(faqs.map(item => item.q.toLowerCase()));
  return [...faqs, ...COMMON_COMMERCIAL_FAQS.filter(item => !questions.has(item.q.toLowerCase()))];
}
