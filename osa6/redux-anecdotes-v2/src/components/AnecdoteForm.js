import React from 'react'
import { anecdoteCreation } from '../reducers/anecdoteReducer'
import { setAddNotification, clearNotification } from '../reducers/notificationReducer'

class AnecdoteForm extends React.Component {

  addAnecdote = (event) => {
    event.preventDefault()
    this.props.store
      .dispatch(anecdoteCreation(event.target.anecdote.value))
    this.props.store
      .dispatch(setAddNotification(event.target.anecdote.value))
    setTimeout(() => {
      this.props.store
        .dispatch(clearNotification())
    }, 5000)
    event.target.anecdote.value = ''
  }

  render() {
    return (
      <div>
        <h2>create new</h2>
        <form onSubmit={this.addAnecdote}>
          <div><input name='anecdote' /></div>
          <button>create</button>
        </form>
      </div>
    )
  }
}

export default AnecdoteForm
