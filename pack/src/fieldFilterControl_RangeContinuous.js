import { Range } from 'rc-slider';
import 'rc-slider/assets/index.css';
import React from 'react';
import { filterValuesByFieldName } from './common/utils';
import { FieldValueRangeFilter } from './filter';
const _ = require('lodash')

export default function FieldFilterControlRangeContinuous({
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
    const ownedFilter = _.find(filters, f => f.getOwner() === name)
    const lowerLimit = ownedFilter ? ownedFilter.getLowerLimit() : minValue
    const upperLimit = ownedFilter ? ownedFilter.getUpperLimit() : maxValue
    const marks = {
        [lowerLimit]: `${lowerLimit}${unit}`,
        [upperLimit]: `${upperLimit}${unit}`,
    }

    if (_.isEmpty(values)) {
        return <div>no values</div>
    }
    return <div style={{ padding: '5px 20px 20px 20px' }}>
        <Range
            value={[lowerLimit, upperLimit]}
            marks={marks}
            min={minValue}
            max={maxValue}
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

