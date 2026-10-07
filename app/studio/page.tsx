import { PageView } from "../../src/components/PageView";
import { metadataFor } from "../../src/content/page-meta";

export const metadata = metadataFor("studio");
export default function Page() {return <PageView pageKey="studio" />;}
