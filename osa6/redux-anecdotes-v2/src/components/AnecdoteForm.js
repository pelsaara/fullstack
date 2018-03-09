import React from 'react'
import { anecdoteCreation } from '../reducers/anecdoteReducer'
import { setAddNotification, clearNotification } from '../reducers/notificationReducer'
import { connect } from 'react-redux'
import anecdoteService from '../services/anecdotes'

class AnecdoteForm extends React.Component {

  addAnecdote = async (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    const newAnecdote = await anecdoteService.createNew(content)
    console.log(content)
    console.log(newAnecdote)
    this.props.anecdoteCreation(newAnecdote)
    this.props.setAddNotification(content)
    setTimeout(() => {
      this.props.clearNotification()
    }, 5000)
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
