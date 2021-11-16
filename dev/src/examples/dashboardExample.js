import { useState } from "react";
import { AiOutlineMinusSquare, AiOutlinePlusSquare } from "react-icons/ai";
import { mockProducts } from "../data/mockList";
import { EFieldType, FieldFilterControlGroup } from "../modules";
import { FieldNameFilter, FilterGroupOrGate } from "../modules/filter";

const descriptors = [
    {
        title: 'Date Published',
        name: 'field-filter-publish',
        type: EFieldType.DATE_RANGE,
        impactedByOtherFilters: true,
        expand: true,
        config: {
            field: 'datePublished',
        }
    },
    {
        title: 'Price',
        name: 'field-filter-price',
        type: EFieldType.RANGE_CONTINUOUS,
        impactedByOtherFilters: true,
        expand: true,
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
        expand: true,
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
        expand: true,
        expandIcon: <AiOutlineMinusSquare />,
        collapseIcon: <AiOutlinePlusSquare />,
        config: {
            field: 'origin',
            showOccurrencesColumn: true,
            sortByOccurrences: true,
            sortAscent: false,
            searchBarDisplayThreshold: 2,
            sortBarDisplayThreshold: 2,
            collapseThreshold: 5,
            exclude: ['USA'],
        }
    },
    {
        title: 'Brand',
        name: 'field-filter-brand',
        type: EFieldType.CATEGORY_SINGLE,
        impactedByOtherFilters: true,
        expand: false,
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
        expand: true,
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
        expand: false,
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
        expand: false,
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

const DEFAULT_FILTERS = [
    new FilterGroupOrGate('field-filter-origin', [
        new FieldNameFilter('field-filter-origin', 'origin', 'China'),
        new FieldNameFilter('field-filter-origin', 'origin', 'Vietnam'),
    ]),

    new FilterGroupOrGate('field-filter-conditions', [
        new FieldNameFilter('field-filter-conditions', 'conditions', 'new'),
    ])
]

export default function DashboardExample() {
    const [filteredData, setFilteredData] = useState(mockProducts)

    return <div style={{ display: 'flex', width: '100%', height: '100%', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ width: 300, position: 'relative', height: '100%', padding: 10, verticalAlign: 'top' }}>
            <FieldFilterControlGroup
                data={mockProducts}
                filterDescriptors={descriptors}
                defaultFilters={DEFAULT_FILTERS}
                onFiltered={data => setFilteredData(data)}
                onFilterChanged={filters => console.log(filters)}
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