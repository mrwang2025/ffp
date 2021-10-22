
import React from 'react';
import Checkbox from 'rc-checkbox';
import { filterSummaryByFieldName } from "./common/utils";
import './css/facets-list.css';
const _ = require('lodash')

function Facet({ name, label, occurrences, checked, onChecked, showOccurrences }) {
    return <div className="facets-list-item">
        <Checkbox
            checked={checked}
            onChange={event => onChecked(event.checked)}
        />
        <div className="facets-list-item-label">{label}</div>
        {
            showOccurrences &&
            <div className="facets-list-item-occurrences">({occurrences})</div>
        }
    </div>
}

function FacetsList({
    name,
    title,
    data,
    field,
    showOccurrences,
    showSearchBar,
    onSelected,
    showOnlyNumOfRows
}) {
    const summary = filterSummaryByFieldName(data, field)
    return <div className="facets-list">
        {
            title &&
            <div className="facets-list-title-bar">{title}</div>
        }
        <div className="facets-list-content-container">
            {
                _.isEmpty(summary)
                    ? <div className="facets-list-no-availble-items">
                        no available data
                    </div>
                    : summary.map(row => <Facet
                        key={`react-ui-facets-list-${name}-${row.name}`}
                        name={row.name}
                        label={row.label}
                        occurrences={row.occurrences}
                        showOccurrences={showOccurrences}
                        checked={false}
                        onChecked={c => console.log(c)}
                    />)
            }
        </div>
    </div>
}

export {
    FacetsList
}