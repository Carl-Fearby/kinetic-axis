import type { Metadata, Viewport } from 'next';
import type { ReactNode } from 'react';
import { RouteTransitions } from '../src/components/RouteTransitions';
import { ConsentBanner } from '../src/components/ConsentBanner';
import './globals.css';

const googleSiteVerification=process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION?.trim();
const bingSiteVerification=process.env.NEXT_PUBLIC_BING_SITE_VERIFICATION?.trim();


export const metadata: Metadata = {
  metadataBase:new URL('https://kineticaxisdigital.com'),
  applicationName:'Kinetic Axis',
  icons:{
    icon:[
      {url:'/favicon.ico',type:'image/x-icon',sizes:'16x16 32x32 48x48'},
      {url:'/assets/favicon-16x16.png',type:'image/png',sizes:'16x16'},
      {url:'/assets/favicon-32x32.png',type:'image/png',sizes:'32x32'},
      {url:'/assets/favicon-48x48.png',type:'image/png',sizes:'48x48'},
      {url:'/assets/favicon.svg',type:'image/svg+xml',sizes:'any'},
    ],
    apple:[{url:'/apple-touch-icon.png',sizes:'180x180'}],
  },
  manifest:'/site.webmanifest',
  verification:{
    ...(googleSiteVerification?{google:googleSiteVerification}:{}),
    ...(bingSiteVerification?{other:{'msvalidate.01':bingSiteVerification}}:{}),
  },
};
export const viewport:Viewport={width:'device-width',initialScale:1,themeColor:'#101827'};

export default function RootLayout({children}:{children:ReactNode}) {
  return <html lang="en-GB" className="kad-motion-prep" data-scroll-behavior="smooth">
    <head>
      {/* Consent Mode must be on the dataLayer before gtm.js evaluates any tag. */}
      <script src="/consent-mode.js" />
      <script dangerouslySetInnerHTML={{__html:`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-MS7QWSC5');`}}/>
    </head>
    <body>
      <noscript><iframe src="https://www.googletagmanager.com/ns.html?id=GTM-MS7QWSC5" height="0" width="0" style={{display:'none',visibility:'hidden'}}/></noscript>
      <RouteTransitions/><div id="ka-route-shell" data-ka-transition-surface>{children}</div>
      <ConsentBanner/>
    </body>
  </html>;
}
