import anecdoteService from '../services/anecdotes'

const anecdoteReducer = (state = [], action) => {
  switch (action.type) {
  case 'VOTE': {
    const old = state.filter(a => a.id !== action.id)
    const voted = state.find(a => a.id === action.id)
    return [...old, { ...voted, votes: voted.votes + 1 }]
  }
  case 'CREATE':
    return [...state, action.data]
  case 'INIT':
    return action.data
  default:
    return state
  }
}

export const initializeAnecdotes = () => {
  return async (dispatch) => {
    const anecdotes = await anecdoteService.getAll()
    dispatch({
      type: 'INIT',
      data: anecdotes
    })
  }
}

export const createNew = (content) => {
  return async (dispatch) => {
    const newAnecdote = await anecdoteService.createNew(content)
    dispatch({
      type: 'CREATE',
      data: newAnecdote
    })
  }
}

export const voteAnecdote = (anecdote) => {
  return async (dispatch) => {
    const votedAnecdote = await anecdoteService.vote(anecdote)
    dispatch({
      type: 'VOTE',
      id: votedAnecdote.id
    })
  }
}

export default anecdoteReducer