import React, { useState } from "react";
import { EFieldType, FieldFilterControlGroup } from '@mrwang2025/react-ui'

const mockDors = [
  {
    'taskId': 12345,
    'status': 'te_script',
    'dateCreated': '2021-11-01 00:00:00'
  },
  {
    'taskId': 12346,
    'status': 'Closed',
    'dateCreated': '2021-11-03 00:00:00'
  },
  {
    'taskId': 12348,
    'status': 'pe_review',
    'dateCreated': '2021-11-05 00:00:00'
  }
]

const descriptors = [
  {
    title: 'Date Created',
    name: 'field-filter-date-created',
    type: EFieldType.DATE_RANGE,
    impactedByOtherFilters: true,
    config: {
      field: 'dateCreated',
    }
  },
  {
    title: 'Status',
    name: 'field-filter-status',
    type: EFieldType.CATEGORY_MULTIPLE,
    impactedByOtherFilters: true,
    config: {
      field: 'status',
      showOccurrencesColumn: true,
      sortByOccurrences: true,
      sortAscent: false,
      searchBarDisplayThreshold: 2,
      sortBarDisplayThreshold: 2,
      collapseThreshold: 5,
    }
  }

]
function App() {
  const [filteredData, setFilteredData] = useState(mockDors)

  return <div style={{ display: 'flex', width: '100%', height: '100%', alignItems: 'center', justifyContent: 'center' }}>
    <div style={{ width: 300, position: 'relative', height: '100%', padding: 10, verticalAlign: 'top' }}>
      <FieldFilterControlGroup
        data={mockDors}
        filterDescriptors={descriptors}
        onFiltered={data => setFilteredData(data)}
      />
    </div>
    <div style={{ flex: 1, height: '100%', backgroundColor: "lightgreen", overflow: 'auto' }}>
      Filtered data
      <pre>
        {JSON.stringify(filteredData, true, 4)}
      </pre>
    </div>
  </div>
}

export default App;
