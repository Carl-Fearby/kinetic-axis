import { PageView } from '../../../../src/components/PageView';
import { metadataFor } from '../../../../src/content/page-meta';

export const metadata = metadataFor('news/category/company');
export default function Page(){ return <PageView pageKey="news/category/company" />; }