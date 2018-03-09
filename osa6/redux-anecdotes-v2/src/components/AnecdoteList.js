import React from 'react'
import { anecdoteVoting } from '../reducers/anecdoteReducer'
import { setVoteNotification, clearNotification } from '../reducers/notificationReducer'

class AnecdoteList extends React.Component {
  voteHandler = (anecdote) => {
    this.props.store.dispatch(anecdoteVoting(anecdote.id))
    this.props.store
      .dispatch(setVoteNotification(anecdote.content))
    setTimeout(() => {
      this.props.store
        .dispatch(clearNotification())
    }, 5000)

  }

  render() {
    const anecdotesToShow = () => {
      const anecdotes = this.props.store.getState().anecdotes
      const filter = this.props.store.getState().filter.toLowerCase()

      if (filter === '') {
        return anecdotes
      }

      return anecdotes.filter(a => a.content.toLowerCase().includes(filter))
    }

    return (
      <div>
        <h2>Anecdotes</h2>
        {anecdotesToShow().sort((a, b) => b.votes - a.votes).map(anecdote =>
          <div key={anecdote.id}>
            <div>
              {anecdote.content}
            </div>
            <div>
              has {anecdote.votes}
              <button onClick={() => this.voteHandler(anecdote)}>
                vote
              </button>
            </div>
          </div>
        )}
      </div>
    )
  }
}

export default AnecdoteList
