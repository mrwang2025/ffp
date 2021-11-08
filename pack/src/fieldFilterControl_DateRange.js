import React, { useState } from 'react';
import { DateRangePicker, defaultStaticRanges } from 'react-date-range';
import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css file
import { Dropdown, useDropdownMenu, useDropdownToggle } from "react-overlays";
import { filterDatesByFieldName, formatDate } from './common/utils';
import './css/style.css';
import { FieldDateRangeFilter } from './filter';

const _ = require('lodash')

function DateRangeButton({ id, startDate, endDate }) {
    const [props, { toggle }] = useDropdownToggle()
    return <button type="button" id={id} {...props} onClick={toggle} className="date-range-button" >
        {formatDate(startDate).substring(0, 10)} &nbsp; ~ &nbsp; {formatDate(endDate).substring(0, 10)}
    </ button>
}

function DateRangePanel({ role, show, onClose, startDate, endDate, onDateRangeChanged }) {
    const thisYearStart = new Date(new Date().getFullYear(), 0, 1)
    const lastYearStart = new Date(new Date().getFullYear() - 1, 0, 1)
    const { props } = useDropdownMenu({
        flip: true,
        offset: [0, 8]
    })

    return <div
        style={{ display: show ? '' : 'none' }}
        {...props}
        role={role}
    >
        <DateRangePicker
            ranges={[{
                startDate: startDate,
                endDate: endDate,
                key: 'selection',
            }]}
            onChange={ranges => {
                onClose()
                onDateRangeChanged(ranges.selection)
            }}
            inputRanges={[]}
            staticRanges={[...defaultStaticRanges,
            {
                label: 'This Year',
                hasCustomRendering: false,
                range: () => ({
                    startDate: thisYearStart,
                    endDate: new Date()
                }),
                isSelected() {
                    return false;
                }
            },
            {
                label: 'Last Year',
                hasCustomRendering: false,
                range: () => ({
                    startDate: lastYearStart,
                    endDate: thisYearStart
                }),
                isSelected() {
                    return false;
                }
            }]}
        />
    </div>
}

function DateRangeSelecttor({ name, startDate, endDate, onDateRangeChanged }) {
    const [show, setShow] = useState(false);
    return <Dropdown
        show={show}
        onToggle={() => {
            setShow(p => !p)
        }}
    >
        <DateRangeButton id={`date-range-${name}`} startDate={startDate} endDate={endDate} />
        <DateRangePanel show={show} onClose={() => setShow(false)} startDate={startDate} endDate={endDate} onDateRangeChanged={selection => {
            onDateRangeChanged(selection.startDate, selection.endDate)
        }} />
    </Dropdown>
}

export default function FieldFilterControlDateRange({
    name,
    onFilterChanged,
    filters,
    baseData,
    config }) {

    const { field } = config
    const values = filterDatesByFieldName(baseData, field)
    const times = _.map(values, v => v.getTime())
    const minTime = _.min(times)
    const maxTime = _.max(times)
    const ownedFilter = _.find(filters, f => f.getOwner() === name)
    const startTime = ownedFilter ? ownedFilter.getStartDate().getTime() : minTime
    const endTime = ownedFilter ? ownedFilter.getEndDate().getTime() : maxTime
    if (_.isEmpty(values)) {
        return <div>no values</div>
    }
    return <DateRangeSelecttor
        name={name}
        startDate={new Date(startTime)}
        endDate={new Date(endTime)}
        onDateRangeChanged={(startDate, endDate) => {
            if (onFilterChanged) {
                const filter = new FieldDateRangeFilter(name, field, startDate, endDate)
                onFilterChanged(filter)
            }
        }}
    />
}

