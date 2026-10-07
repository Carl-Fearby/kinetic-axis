import type {Metadata} from 'next';
import {LeadDashboard} from '../../../src/components/LeadDashboard';
export const metadata:Metadata={title:'Lead Management | Kinetic Axis',robots:'noindex,nofollow'};
export default function Page(){return <LeadDashboard/>;}
