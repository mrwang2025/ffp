const _ = require('lodash')

/**
 * Filter base class
 */
class Filter {
    owner
    constructor(owner) {
        this.owner = owner
    }

    getOwner() {
        return this.owner
    }

    getTitle() {
        throw new Error('Not Implemented Error')
    }

    filter(data) {
        throw new Error('Not Implemented Error')
    }
}

/**
 * FileGroup base class
 */
class FilterGroup extends Filter {
    filters
    constructor(owner, filters) {
        super(owner)
        this.filters = filters || []
    }

    getTitle() {
        return undefined
    }

    getFilters() {
        return this.filters
    }
}

class FilterGroupOrGate extends FilterGroup {
    filter(data) {
        if (_.isEmpty(this.filters)) {
            return data
        }
        const finalData = []
        this.filters.map(filter => finalData.push(...filter.filter(data)))
        return _.uniqWith(finalData, _.isEqual)
    }
}

class FilterGroupAndGate extends FilterGroup {
    filter(data) {
        if (_.isEmpty(this.filters)) {
            return data
        }
        const finalDataArray = []
        this.filters.map(filter => finalDataArray.push(filter.filter(data)))
        return _.intersectionWith(...finalDataArray, _.isEqual)
    }
}

class FieldNameFilter extends Filter {
    fieldName
    fieldValue
    constructor(owner, fieldName, fieldValue) {
        super(owner)
        this.fieldName = fieldName
        this.fieldValue = fieldValue
    }

    getTitle() {
        return `${this.fieldName}:${this.fieldValue}`
    }

    filter(data) {
        return _.filter(data, o => {
            const value = o[this.fieldName]
            return _.isArray(value) ? _.includes(value, this.fieldValue) : (value === this.fieldValue)
        })
    }

    //special
    getFieldName() {
        return this.fieldName
    }

    getFieldValue() {
        return this.fieldValue
    }
}


class FieldValueRangeFilter extends Filter {
    fieldName
    lowerLimit
    upperLimit
    constructor(owner, fieldName, lowerLimit, upperLimit) {
        super(owner)
        this.fieldName = fieldName
        this.lowerLimit = lowerLimit
        this.upperLimit = upperLimit
    }

    getTitle() {
        return `${this.fieldName}:(${this.lowerLimit} - ${this.upperLimit})`
    }

    filter(data) {
        return _.filter(data, o => o[this.fieldName] <= this.upperLimit && o[this.fieldName] >= this.lowerLimit)
    }

    //special
    getFieldName() {
        return this.fieldName
    }

    getLowerLimit() {
        return this.lowerLimit
    }

    getUpperLimit() {
        return this.upperLimit
    }
}

class FieldDateRangeFilter extends Filter {
    fieldName
    startDate
    endDate
    constructor(owner, fieldName, startDate, endDate) {
        super(owner)
        this.fieldName = fieldName
        this.startDate = startDate
        this.endDate = endDate
    }

    getTitle() {
        return `${this.fieldName}:(${this.startDate} - ${this.endDate})`
    }

    filter(data) {
        return _.filter(data, o => {
            try {
                const date = new Date(Date.parse(o[this.fieldName]))
                const time = date.getTime()
                const startTime = this.startDate.getTime()
                const endTime = this.endDate.getTime()

                return time <= endTime && time >= startTime
            } catch (error) {
                return false
            }
        })
    }

    //special
    getFieldName() {
        return this.fieldName
    }

    getStartDate() {
        return this.startDate
    }

    getEndDate() {
        return this.endDate
    }
}

export {
    Filter,
    FieldNameFilter,
    FieldValueRangeFilter,
    FieldDateRangeFilter,
    FilterGroup,
    FilterGroupOrGate,
    FilterGroupAndGate
}