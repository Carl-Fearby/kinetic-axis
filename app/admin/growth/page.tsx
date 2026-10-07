import type {Metadata} from 'next';
import {GrowthDashboard} from '../../../src/components/GrowthDashboard';
export const metadata:Metadata={title:'Growth Dashboard | Kinetic Axis',robots:'noindex,nofollow'};
export default function Page(){return <GrowthDashboard/>;}
