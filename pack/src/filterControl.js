
import React, { useState } from 'react';

import { BiShow, BiHide } from "react-icons/bi";
import './css/style.css';
const _ = require('lodash')

export default function FilterControl({
    name,
    expand,
    title,
    onFilterChanged,
    filters,
    children
}) {
    const [show, setShow] = useState(expand)
    const currentFilter = _.find(filters, f => f.getOwner() === name)
    return <div className="filter-control">
        {
            title &&
            <div className="filter-control-title-bar">
                <div className="filter-control-title-bar-hide-button" onClick={() => setShow(p => !p)}>
                    {
                        show ? <BiShow /> : <BiHide />
                    }
                </div>
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
        {
            show &&
            <div className="filter-control-content-container">
                {children}
            </div>
        }

    </div>
}
