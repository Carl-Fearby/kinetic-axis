import Link from 'next/link';

type ProjectKey = 'pace' | 'opus' | 'ebuygum' | 'vx27' | 'veyra' | 'emberlyn';

type ProjectDepth = {
  eyebrow:string;
  title:string;
  intro:string;
  cards:{label:string; title:string; text:string}[];
  takeaway:string;
  evidence:{title:string; text:string}[];
  journey?:{label:string; title:string; text:string}[];
  capabilities?:string[];
};

type AuthorityNarrative = {
  narrative:{label:string; title:string; text:string}[];
  related:{href:string; label:string}[];
};

const PROJECTS:Record<ProjectKey,ProjectDepth> = {
  pace:{
    eyebrow:'PRODUCT ARCHITECTURE',
    title:'A connected hospitality platform, not four isolated features.',
    intro:'The strongest part of Pace is the relationship between the guest experience and the operational product behind it. Bookings, menus, rewards and venue information only stay useful when the management layer can keep the underlying data current.',
    cards:[
      {label:'01 / GUEST',title:'One coherent customer journey',text:'Bookings, menus, venue information and rewards live within the same guest-facing product rather than becoming separate digital touchpoints.'},
      {label:'02 / OPERATIONS',title:'A back office behind the experience',text:'Venue teams need practical control over bookings, hours, menu content and the information that powers the customer-facing product.'},
      {label:'03 / PLATFORM',title:'A shared foundation for multiple venues',text:'Tenant-specific data and configuration can remain distinct while the underlying product stays maintainable and reusable.'},
      {label:'04 / CONNECTIONS',title:'Services join the two sides together',text:'Authentication, APIs, notifications and reward mechanics form the connective layer between guest journeys and operational tooling.'},
    ],
    evidence:[
      {title:'Guest-facing mobile product',text:'Bookings, menus, venue information and rewards are presented as one connected customer experience.'},
      {title:'Operational back office',text:'Venue teams have a separate management layer for the information and workflows behind the guest product.'},
      {title:'Shared platform foundation',text:'The product is structured so multiple venue experiences can sit on a maintainable common foundation.'},
    ],
    takeaway:'Pace demonstrates the kind of product thinking Kinetic Axis brings to hospitality work: design the guest journey and the operational workflow as one system.',
    journey:[
      {label:'DISCOVER',title:'Map both sides of the service',text:'Treat the guest journey and venue operations as one connected problem so customer-facing promises can be supported operationally.'},
      {label:'DEFINE',title:'Separate roles without separating the product',text:'Shape distinct guest and staff experiences around the same underlying information, rules and service model.'},
      {label:'DESIGN',title:'Keep everyday actions obvious',text:'Bookings, menus, rewards and venue information need clear routes for guests while operational tools stay practical for venue teams.'},
      {label:'BUILD',title:'Create a reusable platform foundation',text:'Multi-tenant configuration, APIs, authentication, notifications and reward mechanics provide the shared layer behind branded venue experiences.'},
    ],
    capabilities:['Mobile product','Back-office systems','Multi-tenant architecture','APIs & integration','Loyalty & rewards','White-label delivery']
  },
  opus:{
    eyebrow:'DESIGN-SYSTEM ENGINEERING',
    title:'A reusable interface system instead of a collection of one-off screens.',
    intro:'OPUS React treats interface consistency as an engineering problem as well as a visual one. Reusable components, states, themes and documentation create a shared language that can support different application screens without rebuilding common behaviour every time.',
    cards:[
      {label:'01 / FOUNDATIONS',title:'A consistent visual language',text:'Light, dark and accent-colour foundations give different products a controlled base without forcing every screen into the same composition.'},
      {label:'02 / FORMS',title:'Repeated interaction patterns',text:'Inputs, labels, validation and form behaviour are handled as reusable patterns rather than redesigned for each workflow.'},
      {label:'03 / PRODUCT UI',title:'Components for information-rich software',text:'Content components, overlays and data visualisation support the denser interface needs of business applications.'},
      {label:'04 / ADOPTION',title:'A catalogue people can actually inspect',text:'The live component catalogue makes the system visible as a working product rather than leaving the design language trapped in static mock-ups.'},
    ],
    evidence:[
      {title:'Working component catalogue',text:'The case study links to a live catalogue showing the reusable interface system in use.'},
      {title:'Reusable interaction patterns',text:'Forms, content, overlays and data visualisation are treated as repeatable product patterns.'},
      {title:'Theme-aware foundations',text:'Light, dark and accent treatments are built into the system rather than added screen by screen.'},
    ],
    takeaway:'OPUS shows how product design, React implementation and maintainability meet when a design system is treated as infrastructure rather than decoration.',
    journey:[
      {label:'DISCOVER',title:'Identify the repeated product patterns',text:'Start with the controls, layouts, feedback states and information patterns that appear repeatedly across business software.'},
      {label:'DEFINE',title:'Turn visual decisions into reusable rules',text:'Typography, spacing, themes, component states and behaviour become shared foundations instead of screen-by-screen choices.'},
      {label:'DESIGN',title:'Design for real interaction states',text:'Forms, validation, overlays, navigation and data display need to work across light, dark and information-dense product contexts.'},
      {label:'BUILD',title:'Make the system inspectable and adoptable',text:'A live React component catalogue makes the design language practical to review, implement and extend.'},
    ],
    capabilities:['React','Component library','Design systems','Form systems','Theming','Data display']
  },
  ebuygum:{
    eyebrow:'MARKETPLACE EXPERIENCE',
    title:'Discovery, category structure and identity working as one product experience.',
    intro:'eBuyGum is shaped around browsing and discovery. The work combines a recognisable visual identity with category-led exploration and responsive presentation so the marketplace feels like a product rather than a generic catalogue.',
    cards:[
      {label:'01 / DISCOVERY',title:'Browsing is part of the proposition',text:'The experience gives finding interesting products a clear role rather than reducing the journey to search and checkout alone.'},
      {label:'02 / CATEGORIES',title:'Structure helps products breathe',text:'Category-led navigation gives very different product types a clear route into the marketplace experience.'},
      {label:'03 / BRAND',title:'A marketplace with its own character',text:'The eBuyGum identity carries through banners, category artwork and interface presentation instead of sitting separately from the product.'},
      {label:'04 / RESPONSIVE',title:'The same browsing idea across screens',text:'Desktop and mobile compositions keep the discovery-led direction coherent as the available space changes.'},
    ],
    evidence:[
      {title:'Responsive marketplace experience',text:'The project combines category-led discovery, browsing and product presentation across screen sizes.'},
      {title:'Brand-led category system',text:'Marketplace structure and bespoke category artwork use the same visual identity rather than feeling bolted together.'},
      {title:'Discovery-first navigation',text:'The experience gives browsing and finding products a deliberate role in the product journey.'},
    ],
    takeaway:'eBuyGum demonstrates how marketplace UX and brand design can reinforce each other when discovery is treated as a product problem.',
    journey:[
      {label:'DISCOVER',title:'Make browsing part of the value',text:'Treat discovery as a primary marketplace behaviour rather than forcing every journey through search and checkout.'},
      {label:'DEFINE',title:'Create a category structure that scales',text:'Give different product families clear entry points while maintaining a recognisable marketplace hierarchy.'},
      {label:'DESIGN',title:'Let the brand carry through the product',text:'Category artwork, banners and interface presentation use the same identity so the marketplace feels coherent rather than templated.'},
      {label:'BUILD',title:'Keep discovery consistent across screens',text:'Responsive compositions preserve hierarchy, browsing and visual character as the available space changes.'},
    ],
    capabilities:['Marketplace UX','Ecommerce experience','Brand system','Responsive web','Category architecture','Product discovery']
  },
  vx27:{
    eyebrow:'INTERACTIVE WORLD BUILDING',
    title:'One visual language across world, interface and web presence.',
    intro:'VX-27 explores a near-future shooter as a connected experience. Environment direction, tactical assets, HUD concepts, interactive systems and the companion website all draw from the same clinical sci-fi identity.',
    cards:[
      {label:'01 / WORLD',title:'A recognisable environment language',text:'Clinical architecture, tactical equipment and near-future materials establish the visual rules of the exclusion zone.'},
      {label:'02 / INTERFACE',title:'HUD elements belong to the world',text:'Game-interface concepts are designed to support the first-person experience without feeling disconnected from the wider visual direction.'},
      {label:'03 / INTERACTION',title:'Systems support the fiction',text:'Hacking and other in-world interaction ideas extend the identity beyond static scenery and weapons.'},
      {label:'04 / WEB',title:'The atmosphere continues outside the game',text:'The companion website carries the same world and tone into a separate digital touchpoint.'},
    ],
    evidence:[
      {title:'World and environment direction',text:'The project establishes a consistent near-future visual language across environments and tactical assets.'},
      {title:'HUD and interface concepts',text:'Interface elements are designed as part of the first-person experience rather than as a separate visual layer.'},
      {title:'Interactive systems',text:'Hacking and in-world interaction concepts extend the design language beyond static assets.'},
    ],
    takeaway:'VX-27 is a useful example of consistency across different interaction contexts: game, interface, asset design and web experience.',
    journey:[
      {label:'DISCOVER',title:'Establish the rules of the world',text:'Define a clinical near-future visual language that can guide environments, tactical assets, interfaces and supporting digital material.'},
      {label:'DEFINE',title:'Connect visual identity to interaction',text:'HUD concepts, tactical equipment and in-world systems need to feel like parts of the same fictional technology rather than separate assets.'},
      {label:'DESIGN',title:'Carry the language into gameplay',text:'First-person interface and hacking concepts extend the world through interaction as well as scenery.'},
      {label:'BUILD',title:'Extend the atmosphere beyond the game',text:'The companion web experience uses the same visual direction so the project remains recognisable across different touchpoints.'},
    ],
    capabilities:['Environment direction','HUD / interface','Interactive systems','3D asset direction','Companion web','Visual language']
  },
  veyra:{
    eyebrow:'CREATIVE PRODUCT EXPERIENCE',
    title:'Sophisticated creative tools presented through a focused journey.',
    intro:'Veyra Studio is positioned around planning cinematic work before the shoot. The product story brings timeline thinking, audio, lyrics and visual references together without making the interface feel like a catalogue of unrelated features.',
    cards:[
      {label:'01 / PLANNING',title:'Start from the creative sequence',text:'The experience frames the product around moving an idea towards a coherent visual sequence.'},
      {label:'02 / AUDIO',title:'Keep sound connected to visual direction',text:'Audio and lyric-led thinking remain part of the planning story rather than becoming a separate utility.'},
      {label:'03 / STYLE',title:'References support continuity',text:'Visual references help communicate a consistent look across an evolving creative plan.'},
      {label:'04 / JOURNEY',title:'Atmosphere without losing clarity',text:'The cinematic identity is balanced with clear routes into what the product does and why the workflow matters.'},
    ],
    evidence:[
      {title:'Creative planning workspace',text:'The product brings timeline thinking, visual references and planning decisions into one interface direction.'},
      {title:'Audio-aware workflow',text:'Audio and lyric-led planning remain connected to the wider visual and product journey.'},
      {title:'Consistent creative direction',text:'References and interface choices support continuity across an evolving production plan.'},
    ],
    takeaway:'Veyra demonstrates how an expressive brand can support a complex product when the user journey stays focused on the outcome.',
    journey:[
      {label:'DISCOVER',title:'Start with the creative outcome',text:'Frame the product around helping a creator move from an idea towards a coherent visual sequence rather than around disconnected tools.'},
      {label:'DEFINE',title:'Keep sound and visuals in one planning model',text:'Audio, lyrics, timeline thinking and visual references stay connected because they influence the same creative decisions.'},
      {label:'DESIGN',title:'Balance atmosphere with clarity',text:'The cinematic identity supports the product without obscuring what the user can do next or how the workflow fits together.'},
      {label:'BUILD',title:'Create a focused creative workspace',text:'The interface brings planning decisions into one product story so references, sequence and audio context remain visible together.'},
    ],
    capabilities:['Creative product UX','Timeline planning','Audio-aware workflow','Visual references','Product interface','Creative direction']
  },
  emberlyn:{
    eyebrow:'BRAND-LED WEB EXPERIENCE',
    title:'A digital destination that extends the identity of the music.',
    intro:'Emberlyn brings music, video, releases and updates into one dark, fire-lit experience. The work uses the artist identity as the organising idea rather than treating branding as a layer added after the site structure.',
    cards:[
      {label:'01 / MUSIC',title:'Keep the core content central',text:'Listening and releases remain prominent so the visual experience never obscures what the audience came for.'},
      {label:'02 / VIDEO',title:'Give visual storytelling room',text:'Video and imagery carry the same atmosphere as the wider brand and help the site feel like part of the artist world.'},
      {label:'03 / IDENTITY',title:'A consistent visual character',text:'The logo, fiery artwork and dark presentation establish continuity across different content types.'},
      {label:'04 / NAVIGATION',title:'Atmosphere still needs clear routes',text:'The experience connects releases, media and updates without making visitors decode the interface.'},
    ],
    evidence:[
      {title:'Music-led website',text:'Releases, listening and artist content remain central to the experience.'},
      {title:'Video and visual storytelling',text:'Media presentation carries the same identity as the wider website rather than feeling like a separate gallery.'},
      {title:'Consistent artist identity',text:'Logo, artwork and navigation work together across the different content areas.'},
    ],
    takeaway:'Emberlyn shows how a brand-led website can feel immersive while still doing the practical job of helping an audience explore content.'
  }
};


const AUTHORITY:Partial<Record<ProjectKey,AuthorityNarrative>> = {
  pace:{
    narrative:[
      {label:'01 / CHALLENGE',title:'Join the guest journey to venue operations',text:'Bookings, menus, rewards and venue information only work as a coherent customer experience when venue teams can keep the operational data behind them current.'},
      {label:'02 / APPROACH',title:'Design both sides as one product',text:'The guest experience and staff-facing back office were treated as connected parts of the same service rather than separate projects.'},
      {label:'03 / ARCHITECTURE',title:'A shared platform beneath branded venue experiences',text:'Mobile experiences, a product API, tenant-specific venue data and back-office tooling sit on a reusable foundation with authentication, notifications and reward mechanics.'},
      {label:'04 / KEY DECISIONS',title:'Separate roles, share the underlying model',text:'Guests and venue teams need different interfaces, but bookings, menu information, availability and rewards depend on the same product rules and data.'},
      {label:'05 / RESULTING PRODUCT',title:'A connected hospitality platform',text:'The result is a guest-facing application for bookings, menus, rewards and venue information, supported by operational tools for venue teams.'},
    ],
    related:[
      {href:'/hospitality-software-development',label:'Hospitality software'},
      {href:'/mobile-app-development',label:'Mobile app development'},
      {href:'/platforms-back-office-systems',label:'Back-office systems'},
      {href:'/api-systems-integration',label:'API & systems integration'},
      {href:'/white-label-app-development',label:'White-label apps'},
      {href:'/loyalty-app-development',label:'Loyalty apps'},
    ]
  },
  opus:{
    narrative:[
      {label:'01 / CHALLENGE',title:'Make complex product UI consistent',text:'Business applications repeatedly need forms, validation, navigation, overlays, content patterns and data display without every screen becoming a new design exercise.'},
      {label:'02 / APPROACH',title:'Treat the design system as product infrastructure',text:'Visual rules and interaction behaviour are captured as reusable components so design intent and implementation stay close together.'},
      {label:'03 / ARCHITECTURE',title:'React components on shared foundations',text:'Themes, form controls, overlays, content components and data visualisation sit on a common React foundation with reusable states and behaviours.'},
      {label:'04 / KEY DECISIONS',title:'Design for states, not just screenshots',text:'Light and dark themes, validation, interaction states and information density are handled in the system itself rather than patched into individual application screens.'},
      {label:'05 / RESULTING PRODUCT',title:'A live, inspectable component catalogue',text:'The result is a working React UI system that can be reviewed, reused and extended across different product interfaces.'},
    ],
    related:[
      {href:'/react-component-library-development',label:'React component libraries'},
      {href:'/design-system-development',label:'Design system development'},
      {href:'/ui-ux-design-systems',label:'UI/UX & design systems'},
      {href:'/enterprise-ui-development',label:'Enterprise UI'},
    ]
  },
  ebuygum:{
    narrative:[
      {label:'01 / CHALLENGE',title:'Make a broad marketplace feel discoverable',text:'A marketplace with varied categories needs to help people browse and find interesting products without becoming a generic catalogue of disconnected listings.'},
      {label:'02 / APPROACH',title:'Put discovery and category structure first',text:'Browsing, category entry points and visual identity were treated as core product behaviours rather than decoration around search and checkout.'},
      {label:'03 / ARCHITECTURE',title:'Responsive category-led web experience',text:'Navigation, category presentation, branded artwork and responsive layouts work together as a repeatable marketplace structure across screen sizes.'},
      {label:'04 / KEY DECISIONS',title:'Carry the identity through the shopping journey',text:'The brand is expressed through banners, category artwork and interface presentation so the marketplace feels recognisable wherever the customer enters.'},
      {label:'05 / RESULTING PRODUCT',title:'A branded marketplace built around browsing',text:'The result is a responsive ecommerce experience where discovery, categories and identity reinforce one another instead of competing for attention.'},
    ],
    related:[
      {href:'/ecommerce-marketplace-development',label:'Ecommerce & marketplaces'},
      {href:'/marketplace-development',label:'Marketplace development'},
      {href:'/web-design',label:'Web design'},
      {href:'/ui-ux-design-systems',label:'UI/UX design'},
    ]
  },
  veyra:{
    narrative:[
      {label:'01 / CHALLENGE',title:'Explain sophisticated creative tooling clearly',text:'Timeline planning, audio, lyrics and visual references can quickly feel like unrelated utilities unless the product is organised around a clear creative outcome.'},
      {label:'02 / APPROACH',title:'Frame the experience around the creative sequence',text:'The product story starts with moving an idea towards a coherent visual plan, keeping each tool connected to that outcome.'},
      {label:'03 / ARCHITECTURE',title:'One workspace for connected planning inputs',text:'Timeline thinking, audio context, lyrics and visual references are presented as parts of the same planning workspace rather than isolated modules.'},
      {label:'04 / KEY DECISIONS',title:'Keep atmosphere without sacrificing clarity',text:'The cinematic identity supports the experience while navigation and product explanation remain explicit enough to make the workflow understandable.'},
      {label:'05 / RESULTING PRODUCT',title:'A focused cinematic planning experience',text:'The result is a creative product direction that brings sequence, sound and visual reference material together in one coherent workspace.'},
    ],
    related:[
      {href:'/digital-product-development',label:'Digital product development'},
      {href:'/web-app-development',label:'Web application development'},
      {href:'/ui-ux-design-systems',label:'UI/UX design'},
      {href:'/saas-product-development',label:'SaaS product development'},
    ]
  },
  vx27:{
    narrative:[
      {label:'01 / CHALLENGE',title:'Keep one identity across very different touchpoints',text:'Environment art, tactical assets, HUD concepts, interactive systems and a companion website all need to feel as though they belong to the same near-future world.'},
      {label:'02 / APPROACH',title:'Establish the rules of the world first',text:'A clinical sci-fi visual language provides a common reference for environment, equipment, interface and supporting digital material.'},
      {label:'03 / ARCHITECTURE',title:'World, interface, interaction and web as layers',text:'The experience is organised across environmental assets, first-person UI, in-world systems and the companion web presence while keeping the same visual logic.'},
      {label:'04 / KEY DECISIONS',title:'Make the interface feel native to the fiction',text:'HUD and interaction concepts are designed as part of the world rather than as an unrelated visual overlay, and the web experience extends the same atmosphere.'},
      {label:'05 / RESULTING PRODUCT',title:'A connected interactive universe',text:'The result is a consistent design language spanning game-world concepts, interface elements, interaction ideas and an atmospheric project website.'},
    ],
    related:[
      {href:'/web-design',label:'Web design'},
      {href:'/ui-ux-design-systems',label:'UI/UX design'},
      {href:'/digital-product-development',label:'Digital product development'},
      {href:'/experiments',label:'Experiments & interactive work'},
    ]
  }
};

export function CaseStudyDepth({project}:{project:ProjectKey}){
  const data=PROJECTS[project];
  const authority=AUTHORITY[project];
  return <section className="ka-case-depth" aria-labelledby={`ka-case-depth-${project}`}>
    <div className="ka-case-depth__inner">
      <div className="ka-case-depth__head"><div><span>{data.eyebrow}</span><h2 id={`ka-case-depth-${project}`}>{data.title}</h2></div><p>{data.intro}</p></div>
      {authority ? <div className="ka-case-narrative" aria-label="Case study summary">
        <div className="ka-case-narrative__head"><span>CASE STUDY / FROM BRIEF TO OUTCOME</span><h3>The challenge, product thinking and decisions behind the work.</h3><p>A concise view of how the finished product is shaped. The result statements describe the product shown here, not unsupported commercial metrics.</p></div>
        <ol className="ka-case-narrative__grid">{authority.narrative.map((item,index)=><li key={item.label}><b>{String(index+1).padStart(2,'0')}</b><small>{item.label.replace(/^\d+ \/ /,'')}</small><strong>{item.title}</strong><p>{item.text}</p></li>)}</ol>
      </div>:null}
      <div className="ka-case-depth__grid">{data.cards.map(card=><article key={card.label}><small>{card.label}</small><h3>{card.title}</h3><p>{card.text}</p></article>)}</div>
      {data.journey?.length ? <div className="ka-case-journey">
        <div className="ka-case-journey__intro"><span>HOW THE WORK CAME TOGETHER</span><h3>From problem framing to a coherent product direction.</h3><p>A practical view of the decisions behind the finished work, based on what is shown in this case study.</p></div>
        <ol className="ka-case-journey__steps">{data.journey.map((item,index)=><li key={item.label}><b>{String(index+1).padStart(2,'0')}</b><div><small>{item.label}</small><strong>{item.title}</strong><p>{item.text}</p></div></li>)}</ol>
      </div>:null}
      {data.capabilities?.length ? <div className="ka-case-capabilities" aria-label="Capabilities demonstrated in this project"><span>Capabilities in the work</span><div>{data.capabilities.map(item=><b key={item}>{item}</b>)}</div></div>:null}
      <div className="ka-case-evidence">
        <div className="ka-case-evidence__intro"><span>EVIDENCE IN THE WORK</span><h3>What is actually visible in this project.</h3><p>Concrete product, interface or system decisions shown in the case study — without invented performance claims.</p></div>
        <div className="ka-case-evidence__grid">{data.evidence.map(item=><article key={item.title}><strong>{item.title}</strong><p>{item.text}</p></article>)}</div>
      </div>
      {authority ? <nav className="ka-case-related" aria-label="Related Kinetic Axis services"><span>Related capabilities</span><div>{authority.related.map(item=><Link key={item.href} href={item.href}>{item.label}<svg aria-hidden="true" className="ka-heavy-arrow ka-heavy-arrow--right" fill="none" height={18} stroke="currentColor" strokeLinecap="square" strokeLinejoin="miter" strokeWidth={3} viewBox="0 0 24 24" width={18}><path d="M4 12h16m-7-7 7 7-7 7"/></svg></Link>)}</div></nav>:null}
      <p className="ka-case-depth__takeaway"><strong>What this demonstrates:</strong> {data.takeaway}</p>
    </div>
  </section>;
}

