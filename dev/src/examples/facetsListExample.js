import { mockProducts } from "../data/mockList";
import { FacetsList } from "../modules";

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
        <div style={{ flex: 1, height: '100%', backgroundColor: "lightgreen", overflow: 'auto' }}>
            Filtered data
            <pre>
                {JSON.stringify(mockProducts, true, 4)}
            </pre>
        </div>
    </div>
}