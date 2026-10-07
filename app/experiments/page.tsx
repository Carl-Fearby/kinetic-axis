import { PageView } from "../../src/components/PageView";
import { metadataFor } from "../../src/content/page-meta";

export const metadata = metadataFor("experiments");
export default function Page() {return <PageView pageKey="experiments" />;}
