
import React from 'react';
import Checkbox from 'rc-checkbox';

function FacetsList({ title, data }) {
    return <div style={{ width: '100%' }}>
        <div style={{ fontWeight: 'bold' }}>{title}</div>
        <div>
            <Checkbox />
        </div>
    </div>
}

export {
    FacetsList
}