
import React from 'react';
import './css/style.css';
const _ = require('lodash')

export default function FilterControl({
    name,
    title,
    onFilterChanged,
    filters,
    children
}) {
    const currentFilter = _.find(filters, f => f.getOwner() === name)
    return <div className="filter-control">
        {
            title &&
            <div className="filter-control-title-bar">
                <div className="filter-control-title-bar-text">{title}</div>
                {
                    currentFilter &&
                    <div className="filter-control-title-bar-clear-button"
                        onClick={() => onFilterChanged(undefined)}>
                        clear filters
                    </div>
                }
            </div>
        }
        <div className="filter-control-content-container">
            {children}
        </div>
    </div>
}
