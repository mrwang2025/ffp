import { FacetsList } from "@mrwang2025/react-ui";
import { mockProducts } from "../data/mockList";
import SyntaxHighlighter from 'react-syntax-highlighter';
import { github } from 'react-syntax-highlighter/dist/esm/styles/hljs';

function Block({ children }) {
    return <div style={{ padding: 10 }}>{children}</div>
}

export default function DashboardExample() {
    return <div style={{ display: 'flex', height: '100%', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ width: 200, verticalAlign: 'top' }}>
            <Block>
                <FacetsList
                    name={"facets-list-origin"}
                    title={"Origin"}
                    showOccurrences={true}
                    data={mockProducts}
                    field={'origin'}
                />
            </Block>
            <Block>
                <FacetsList
                    name={"facets-list-brand"}
                    title={"Brand"}
                    showOccurrences={true}
                    data={mockProducts}
                    field={'brand'}
                />
            </Block>
            <Block>
                <FacetsList
                    name={"facets-list-type"}
                    title={"Product Type"}
                    showOccurrences={true}
                    data={mockProducts}
                    field={'type'}
                />
            </Block>
        </div>
        <div style={{ flex: 1, height: '100%', backgroundColor: 'red', overflow: 'auto' }}>
            <SyntaxHighlighter
                language="json"
                style={github}
            >
                {JSON.stringify(mockProducts, true, 4)}
            </SyntaxHighlighter>
        </div>
    </div>
}