const emptyFilter = ''

const filterReducer = (state = emptyFilter, action) => {
  switch (action.type) {
  case 'FILTER':
    return state = action.filter
  case 'NO-FILTER':
    return state = emptyFilter
  default: return state
  }
}

export const filterSetting = (filter) => {
  return {
    type: 'FILTER',
    filter: filter
  }
}

export const clearFilter = () => {
  return { type: 'NO-FILTER' }
}


export default filterReducer