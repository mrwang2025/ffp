
import Checkbox from 'rc-checkbox';
import React, { useState } from 'react';
import Highlighter from 'react-highlight-words';
import { BsSortAlphaDown, BsSortAlphaDownAlt, BsSortDown, BsSortDownAlt } from "react-icons/bs";
import { Radio, RadioGroup } from 'react-radio-group';
import { filterSummaryByFieldName } from "./common/utils";
import './css/style.css';
import { FieldNameFilter, FilterGroupOrGate } from './filter';
const _ = require('lodash')


function Facet({ name, occurrences, checked, onChecked, showOccurrences, searchKey }) {
    return <div className="facets-list-item" onClick={() => {
        onChecked(!checked)
    }}>
        <Checkbox
            checked={checked}
            onClick={event => {
                onChecked(!checked)
                event.stopPropagation()
            }}
        />
        <div className="facets-list-item-label">
            <Highlighter
                highlightStyle={{ color: 'red', backgroundColor: 'inherit', padding: 0, margin: 0 }}
                searchWords={[searchKey]}
                autoEscape={true}
                textToHighlight={name}
            />
        </div>
        {
            showOccurrences &&
            <div className="facets-list-item-occurrences">({occurrences})</div>
        }
    </div>
}


function CheckboxOptionList({ name, summary, showOccurrencesColumn, onChange, searchKey, rowsToShow, selectedOptions }) {
    const rows = _.slice(summary, 0, rowsToShow > 0 ? rowsToShow : summary.length)
    return <>
        {
            rows.map(row => <Facet
                key={`react-ui-facets-list-${name}-${row.name}`}
                name={row.name}
                occurrences={row.occurrences}
                showOccurrences={showOccurrencesColumn}
                checked={!!_.find(selectedOptions, o => o === row.name)}
                onChecked={checked => {
                    if (checked) {
                        onChange([...selectedOptions, row.name])
                    }
                    else {
                        const temp = [...selectedOptions]
                        _.remove(temp, n => n === row.name)
                        onChange(temp)
                    }
                }}
                searchKey={searchKey}
            />)
        }
    </>
}

function FacetRadio({ name, occurrences, showOccurrences, onLabelClicked, searchKey }) {
    return <div className="facets-list-item" onClick={onLabelClicked}>
        <Radio value={name} />
        <div className="facets-list-item-label">
            <Highlighter
                highlightStyle={{ color: 'red', backgroundColor: 'inherit', padding: 0, margin: 0 }}
                searchWords={[searchKey]}
                autoEscape={true}
                textToHighlight={name}
            />
        </div>
        {
            showOccurrences &&
            <div className="facets-list-item-occurrences">({occurrences})</div>
        }
    </div>
}

function RadioOptionList({ name, summary, showOccurrencesColumn, onChange, searchKey, rowsToShow, selectedOptions }) {
    const rows = _.slice(summary, 0, rowsToShow > 0 ? rowsToShow : summary.length)
    const selected = _.isEmpty(selectedOptions) ? '' : selectedOptions[0]
    return <RadioGroup selectedValue={selected || ''} onChange={() => { }}>
        {
            rows.map(row => <FacetRadio
                key={`react-ui-facets-list-${name}-${row.name}`}
                name={row.name}
                occurrences={row.occurrences}
                showOccurrences={showOccurrencesColumn}
                onLabelClicked={() => {
                    onChange([row.name])
                }}
                searchKey={searchKey}
            />)
        }
    </RadioGroup>
}
/**
 * 
 * @param {*} props
 * -----------------------------------------------------------------------------
 *  Filter Control Common Props
 * -----------------------------------------------------------------------------
 * - name: the unique name of this FacetsList instance
 * - title: the user friendly or readable title of the field
 * - onFilterChanged: (filters) => {...}
 *      filters -> the created filter(s) list
 * - filters: all filter list
 * 
 * -----------------------------------------------------------------------------
 *  FacetsList Special Props
 * -----------------------------------------------------------------------------
 * - showOccurrencesColumn: indicates whether or not display the occurences columns
 * - searchBarDisplayThreshold: number of records to trigger the displaying of search bar
 *      <0 -> never display the search bar
 *      =0 -> always display the search bar
 *      >0 -> the number of records
 * - sortBarDisplayThreshold: number of records to trigger the displaying of sort bar
 *      <0 -> never display the sort bar
 *      =0 -> always display the sort bar
 *      >0 -> the number of records
 * - collapseThreshold: number of records to trigger the collapse of record
 *      <=0-> always expand all, never collapse
 *      >0 -> collapse and display the specified number of rows together with "expand all" button
 * - sortByOccurrences: 
 *      true -> sort by occurences, 
 *      false-> sort by group name
 * - sortAscent:
 *      true -> sort ascently, 
 *      false-> sort descently
 * @returns 
 */
export default function FieldFilterControlCategory({
    name,
    onFilterChanged,
    filters,
    multipleSelect,
    baseData,
    config
}) {
    const {
        field,
        showOccurrencesColumn = true,
        searchBarDisplayThreshold = 10,
        sortBarDisplayThreshold = 10,
        collapseThreshold = 5,
        sortByOccurrences = true,
        sortAscent = false,
        exclude = []
    } = config

    const [searchText, setSearchText] = useState('')
    const [sortByOccurrencesBuffer, setSortByOccurrences] = useState(sortByOccurrences)
    const [sortAscentBuffer, setSortAscentBuffer] = useState(sortAscent)
    const [rowsToShow, setRowsToShow] = useState(collapseThreshold)

    const summaryAll = filterSummaryByFieldName(baseData, field, sortByOccurrencesBuffer, sortAscentBuffer)
    const summary = _.filter(summaryAll, s => !exclude.includes(s.name))
    const showSearchBar = (searchBarDisplayThreshold === 0) || (searchBarDisplayThreshold > 0 && searchBarDisplayThreshold < summary.length)
    const searchedResult = _.filter(summary, s => !searchText || _.toLower(s.name).includes(_.toLower(searchText)))

    // based on search result
    const showSortBar = (sortBarDisplayThreshold === 0) || (sortBarDisplayThreshold > 0 && sortBarDisplayThreshold < searchedResult.length)
    const showExpandBar = (collapseThreshold > 0 && collapseThreshold < searchedResult.length && rowsToShow < searchedResult.length)

    const filterGroup = _.find(filters, f => f.getOwner() === name)
    const selectedOptions = filterGroup ? filterGroup.getFilters().map(f => f.getFieldValue()) : []

    function onChange(selected) {
        console.log(selected)
        if (onFilterChanged) {
            const filter = _.isEmpty(selected) ? undefined : new FilterGroupOrGate(name, selected.map(fieldValue => new FieldNameFilter(name, field, fieldValue)))
            onFilterChanged(filter)
        }
    }
    return <>
        {
            showSearchBar &&
            <div className="facets-list-search-bar-box">
                <input
                    className="facets-list-search-bar-input"
                    value={searchText || ''}
                    onChange={(event) => setSearchText(event.target.value)}
                    autoComplete={"on"}
                    placeholder={'search...'}
                />
            </div>
        }
        {
            showSortBar &&
            <div className="facets-list-item">
                <div className="facets-list-item-label" onClick={() => {
                    setSortByOccurrences(false)
                    setSortAscentBuffer(p => !p)
                }}>
                    {
                        sortAscentBuffer
                            ? <BsSortAlphaDown className={!sortByOccurrencesBuffer ? 'facets-list-sort-button-active' : 'facets-list-sort-button-deactive'} />
                            : <BsSortAlphaDownAlt className={!sortByOccurrencesBuffer ? 'facets-list-sort-button-active' : 'facets-list-sort-button-deactive'} />
                    }
                </div>
                {
                    showOccurrencesColumn &&
                    <div className="facets-list-item-occurrences" onClick={() => {
                        setSortByOccurrences(true)
                        setSortAscentBuffer(p => !p)
                    }}>
                        {
                            sortAscentBuffer
                                ? <BsSortDownAlt className={sortByOccurrencesBuffer ? 'facets-list-sort-button-active' : 'facets-list-sort-button-deactive'} />
                                : <BsSortDown className={sortByOccurrencesBuffer ? 'facets-list-sort-button-active' : 'facets-list-sort-button-deactive'} />
                        }
                    </div>
                }
            </div>
        }
        {
            _.isEmpty(summary)
                ? <div className="facets-list-no-availble-items"> no available data</div>
                : (
                    multipleSelect
                        ? <CheckboxOptionList
                            name={name}
                            summary={searchedResult}
                            showOccurrencesColumn={showOccurrencesColumn}
                            onChange={onChange}
                            searchKey={searchText}
                            rowsToShow={rowsToShow}
                            selectedOptions={selectedOptions}
                        />
                        : <RadioOptionList
                            name={name}
                            summary={searchedResult}
                            showOccurrencesColumn={showOccurrencesColumn}
                            onChange={onChange}
                            searchKey={searchText}
                            rowsToShow={rowsToShow}
                            selectedOptions={selectedOptions}
                        />
                )
        }
        {
            showExpandBar &&
            <div className="facets-list-expand-button"
                onClick={() => setRowsToShow(searchedResult.length)}
            >
                show all
            </div>
        }
    </>
}
