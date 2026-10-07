export type CommercialLink = {href:string; title:string};

const SERVICE_LINKS: Record<string, CommercialLink> = {
  'Web design': {href:'/web-design', title:'Web design'},
  'Web application development': {href:'/web-app-development', title:'Web app development'},
  'Bespoke software development': {href:'/bespoke-software-development', title:'Bespoke software development'},
  'Mobile application': {href:'/mobile-app-development', title:'Mobile app development'},
  'UI / UX / branding': {href:'/ui-ux-design-systems', title:'UI/UX & design systems'},
  'Digital product development': {href:'/digital-product-development', title:'Digital product development'},
  'Platforms and back-office systems': {href:'/platforms-back-office-systems', title:'Platforms & back-office systems'},
  'API and systems integration': {href:'/api-systems-integration', title:'API & systems integration'},
  'Booking system development': {href:'/booking-system-development', title:'Booking system development'},
  'White-label app development': {href:'/white-label-app-development', title:'White-label app development'},
  'Legacy system modernisation': {href:'/legacy-system-modernisation', title:'Legacy system modernisation'},
  'Workflow automation software': {href:'/workflow-automation-software', title:'Workflow automation software'},
  'SaaS product development': {href:'/saas-product-development', title:'SaaS product development'},
  'Hospitality software development': {href:'/hospitality-software-development', title:'Hospitality software development'},
  'Restaurant app development': {href:'/restaurant-app-development', title:'Restaurant app development'},
  'Customer portal development': {href:'/customer-portal-development', title:'Customer portal development'},
};

export function commercialLinkFor(service?: string): CommercialLink | null {
  if (!service) return null;
  return SERVICE_LINKS[service] || null;
}
