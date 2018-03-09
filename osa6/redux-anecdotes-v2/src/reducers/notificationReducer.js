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

export const notify = (notification, time) => {
  return (dispatch) => {
    dispatch({
      type: 'ACTION',
      notification
    })
    setTimeout(() => dispatch({ type: 'DEFAULT' }), time*1000)
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