import { PageView } from "../../src/components/PageView";
import { metadataFor } from "../../src/content/page-meta";

export const metadata = metadataFor("insights");
export default function Page() {return <PageView pageKey="insights" />;}
