
import React from 'react';
import FieldFilterControlCategoryMultiple from './fieldFilterControl_CategoryMultiple';
import FieldFilterControlCategorySingle from './fieldFilterControl_CategorySingle';
import FieldFilterControlDateRange from './fieldFilterControl_DateRange';
import FieldFilterControlRangeContinuous from './fieldFilterControl_RangeContinuous';
import FieldFilterControlRangeDiscrete from './fieldFilterControl_RangeDiscrete';
import { FilterGroupAndGate } from './filter';
import FilterControl from './filterControl';
const _ = require('lodash')

const EFieldType = {
    CATEGORY_SINGLE: 'CATEGORY_SINGLE',
    CATEGORY_MULTIPLE: 'CATEGORY_MULTIPLE',
    DATE_RANGE: 'DATE_RANGE',
    VALUE_DISCRETE: 'VALUE_DISCRETE',
    VALUE_CONTINUOUS: 'VALUE_CONTINUOUS',
    RANGE_DISCRETE: 'RANGE_DISCRETE',
    RANGE_CONTINUOUS: 'RANGE_CONTINUOUS',
}

const EFieldFilterControl = {
    [EFieldType.CATEGORY_SINGLE]: FieldFilterControlCategorySingle,
    [EFieldType.CATEGORY_MULTIPLE]: FieldFilterControlCategoryMultiple,
    [EFieldType.DATE_RANGE]: FieldFilterControlDateRange,
    [EFieldType.RANGE_DISCRETE]: FieldFilterControlRangeDiscrete,
    [EFieldType.RANGE_CONTINUOUS]: FieldFilterControlRangeContinuous,
}

function FieldFilterControl({
    // for frame
    name,
    title,
    onFilterChanged,
    filters,

    // for base data
    data,
    impactedByOtherFilters,
    isActive,

    // for control selection
    type,

    // for special control 
    config
}) {
    let baseData = data
    if (impactedByOtherFilters) {
        if (isActive) {
            const otherFilters = _.filter(filters, f => f.getOwner() !== name)
            baseData = (new FilterGroupAndGate('', otherFilters)).filter(data)
        }
        else {
            baseData = (new FilterGroupAndGate('', filters)).filter(data)
        }
    }

    const Control = (type in EFieldType) ? EFieldFilterControl[type] : undefined
    return <FilterControl
        name={name}
        title={title}
        onFilterChanged={onFilterChanged}
        filters={filters}
    >
        {
            Control
                ? <Control
                    name={name}
                    onFilterChanged={onFilterChanged}
                    filters={filters}
                    baseData={baseData}
                    config={config}
                />
                : <div>Invalid field filter</div>
        }
    </FilterControl>
}

export {
    FieldFilterControl,
    EFieldType
};
