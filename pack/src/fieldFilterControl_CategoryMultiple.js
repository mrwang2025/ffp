
import React from 'react';
import FieldFilterControlCategory from './fieldFilterControl_Category';


export default function FieldFilterControlCategoryMultiple({
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
        multipleSelect={true}
    />
}
