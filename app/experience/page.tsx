import { PageView } from '../../src/components/PageView';
import { metadataFor } from '../../src/content/page-meta';

export const metadata = metadataFor('experience');
export default function Page(){ return <PageView pageKey="experience" />; }
