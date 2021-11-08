
import React from 'react';
import FieldFilterControlCategory from './fieldFilterControl_Category';

export default function FieldFilterControlCategorySingle({
    name,
    onFilterChanged,
    filters,
    baseData,
    config
}) {
    return <FieldFilterControlCategory
        name={name}
        onFilterChanged={onFilterChanged}
        filters={filters}
        baseData={baseData}
        config={config}
        multipleSelect={false}
    />
}
