import { PageView } from "../../src/components/PageView";
import { metadataFor } from "../../src/content/page-meta";

export const metadata = metadataFor("sitemap");
export default function Page() {return <PageView pageKey="sitemap" />;}
