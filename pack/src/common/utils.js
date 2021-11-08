const _ = require('lodash')

function filterSummaryByFieldName(data, fieldName, sortByOccurrences = false, sortAscent = true) {
    const values = []
    _.map(_.map(data, o => o[fieldName]), v => {
        if (_.isArray(v)) {
            values.push(...v)
        }
        else {
            values.push(v)
        }
    })

    const summary = _.map(_.sortBy(_.uniq(values)), s => ({
        name: s,
        occurrences: _.filter(data, o => {
            const value = o[fieldName]
            return _.isArray(value) ? _.includes(value, s) : (value === s)
        }).length,
    }))

    return _.orderBy(summary, [sortByOccurrences ? 'occurrences' : 'name'], [sortAscent ? 'asc' : 'desc'])
}

function filterValuesByFieldName(data, fieldName) {
    const values = _.map(data, o => o[fieldName])
    const realValues = _.filter(values, v => !_.isNaN(v))
    return realValues
}

function filterDatesByFieldName(data, fieldName) {
    const rawDates = _.map(data, o => o[fieldName])
    const realDates = []
    _.map(rawDates, d => {
        try {
            const date = new Date(Date.parse(d))
            realDates.push(date)
        } catch (e) {
            //ignore
        }
    })
    return realDates
}

function formatDate(date) {
    return (new Date(date)).toISOString().slice(0, 19).replace("T", " ");
}

export {
    filterSummaryByFieldName,
    filterValuesByFieldName,
    filterDatesByFieldName,
    formatDate
}