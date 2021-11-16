import { useState } from "react";
import { mockProducts } from "../data/mockList";
import { EFieldType, FieldFilterControlGroup } from "../modules";
const descriptors = [
    {
        title: 'Date Published',
        name: 'field-filter-publish',
        type: EFieldType.DATE_RANGE,
        impactedByOtherFilters: true,
        config: {
            field: 'datePublished',
        }
    },
    {
        title: 'Price',
        name: 'field-filter-price',
        type: EFieldType.RANGE_CONTINUOUS,
        impactedByOtherFilters: true,
        config: {
            field: 'price',
            unit: '$'
        }
    },
    {
        title: 'Delivery Dates',
        name: 'field-filter-delivery',
        type: EFieldType.RANGE_DISCRETE,
        impactedByOtherFilters: true,
        config: {
            field: 'deliveryDates',
            unit: 'd'
        }
    },
    {
        title: 'Origin',
        name: 'field-filter-origin',
        type: EFieldType.CATEGORY_MULTIPLE,
        impactedByOtherFilters: true,
        config: {
            field: 'origin',
            showOccurrencesColumn: true,
            sortByOccurrences: true,
            sortAscent: false,
            searchBarDisplayThreshold: 2,
            sortBarDisplayThreshold: 2,
            collapseThreshold: 5,
        }
    },
    {
        title: 'Brand',
        name: 'field-filter-brand',
        type: EFieldType.CATEGORY_SINGLE,
        impactedByOtherFilters: true,
        config: {
            field: 'brand',
            showOccurrencesColumn: true,
            sortByOccurrences: true,
            sortAscent: false,
            searchBarDisplayThreshold: 3,
            sortBarDisplayThreshold: 3,
            collapseThreshold: 2,
        }
    },
    {
        title: 'Product Type',
        name: 'field-filter-type',
        type: EFieldType.CATEGORY_MULTIPLE,
        impactedByOtherFilters: true,
        config: {
            field: 'type',
            showOccurrencesColumn: false,
            sortByOccurrences: false,
            sortAscent: true,
            searchBarDisplayThreshold: 10,
            sortBarDisplayThreshold: 10,
            collapseThreshold: 5,
        }
    },
    {
        title: 'Color',
        name: 'field-filter-colors',
        type: EFieldType.CATEGORY_MULTIPLE,
        impactedByOtherFilters: true,
        config: {
            field: 'colors',
            showOccurrencesColumn: true,
            sortByOccurrences: true,
            sortAscent: false,
            searchBarDisplayThreshold: 2,
            sortBarDisplayThreshold: 2,
            collapseThreshold: 5,
        }
    },
    {
        title: 'Conditions',
        name: 'field-filter-conditions',
        type: EFieldType.CATEGORY_SINGLE,
        impactedByOtherFilters: true,
        config: {
            field: 'conditions',
            showOccurrencesColumn: true,
            sortByOccurrences: true,
            sortAscent: false,
            searchBarDisplayThreshold: 2,
            sortBarDisplayThreshold: 2,
            collapseThreshold: 5,
        }
    },

]

export default function DashboardExample() {
    const [filteredData, setFilteredData] = useState(mockProducts)

    return <div style={{ display: 'flex', width: '100%', height: '100%', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ width: 300, position: 'relative', height: '100%', padding: 10, verticalAlign: 'top' }}>
            <FieldFilterControlGroup
                data={mockProducts}
                filterDescriptors={descriptors}
                onFiltered={data => setFilteredData(data)}
            />
        </div>
        <div style={{ flex: 1, height: '100%', backgroundColor: "lightgreen", overflow: 'auto' }}>
            Filtered data
            <pre>
                {JSON.stringify(filteredData, true, 4)}
            </pre>
        </div>
    </div>
}