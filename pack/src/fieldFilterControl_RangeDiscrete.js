
import { Range } from 'rc-slider';
import 'rc-slider/assets/index.css';
import React from 'react';
import { filterValuesByFieldName } from "./common/utils";
import { FieldValueRangeFilter } from './filter';
const _ = require('lodash')

export default function FieldFilterControlRangeDiscrete({
    name,
    onFilterChanged,
    filters,
    baseData,
    config
}) {
    const { field, unit } = config
    const values = filterValuesByFieldName(baseData, field)
    const minValue = _.min(values)
    const maxValue = _.max(values)
    const marks = {}
    _.map(values, v => marks[`${v}`] = `${v}${unit}`)

    const ownedFilter = _.find(filters, f => f.getOwner() === name)
    const lowerLimit = ownedFilter ? ownedFilter.getLowerLimit() : minValue
    const upperLimit = ownedFilter ? ownedFilter.getUpperLimit() : maxValue
    if (_.isEmpty(values)) {
        return <div>no values</div>
    }
    return <div style={{ padding: '5px 20px 20px 20px' }}>
        <Range
            value={[lowerLimit, upperLimit]}
            min={minValue}
            max={maxValue}
            marks={marks}
            onChange={range => {
                if (onFilterChanged) {
                    const lower = range[0]
                    const upper = range[1]
                    const filter = new FieldValueRangeFilter(name, field, lower, upper)
                    onFilterChanged(filter)
                }
            }}
        />
    </div>
}
