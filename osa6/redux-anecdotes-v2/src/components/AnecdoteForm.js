import React from 'react'
import { anecdoteCreation } from '../reducers/anecdoteReducer'
import { setAddNotification, clearNotification } from '../reducers/notificationReducer'
import { connect } from 'react-redux'

class AnecdoteForm extends React.Component {

  addAnecdote = (event) => {
    event.preventDefault()
    this.props.anecdoteCreation(event.target.anecdote.value)
    this.props.setAddNotification(event.target.anecdote.value)
    setTimeout(() => {
      this.props.clearNotification()
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

const mapDispatchToProps = {
  anecdoteCreation,
  setAddNotification,
  clearNotification
}

export default connect(null, mapDispatchToProps)(AnecdoteForm)
