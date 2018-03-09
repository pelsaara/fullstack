const emptyNotification = ''

const notificationReducer = (state = emptyNotification, action) => {
  switch (action.type) {
  case 'DEFAULT':
    return state = emptyNotification
  case 'ACTION':
    return state = action.notification
  default: return state
  }
}

export const clearNotification = () => {
  return { type: 'DEFAULT' }
}

export const setAddNotification = (anecdote) => {
  return {
    type: 'ACTION',
    notification: `new anecdote '${anecdote}' added!`
  }
}

export const setVoteNotification = (anecdote) => {
  return {
    type: 'ACTION',
    notification: `you voted '${anecdote}'!`
  }
}


export default notificationReducer