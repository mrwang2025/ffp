import { FacetsList } from "../modules";
import { mockProducts } from "../data/mockList";
export default function SimpleExample() {
    return <FacetsList title={"Dashboard"} data={mockProducts} />
}