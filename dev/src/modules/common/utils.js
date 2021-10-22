const _ = require('lodash')

function filterSummaryByFieldName(data, fieldName) {
    const summary = _.map(_.sortBy(_.uniq(_.map(data, o => o[fieldName]))), s => ({
        name: s,
        label: s,
        occurrences: _.filter(data, o => o[fieldName] === s).length,
    }))

    return summary
}

export {
    filterSummaryByFieldName
}