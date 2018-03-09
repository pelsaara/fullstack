import React from 'react'
import { anecdoteVoting } from '../reducers/anecdoteReducer'
import { setVoteNotification, clearNotification } from '../reducers/notificationReducer'
import { connect } from 'react-redux'
import anecdoteService from '../services/anecdotes'

class AnecdoteList extends React.Component {
  voteHandler = async (anecdote) => {
    await anecdoteService.vote(anecdote)
    this.props.anecdoteVoting(anecdote.id)
    this.props.setVoteNotification(anecdote.content)
    setTimeout(() => {
      this.props.clearNotification()
    }, 5000)

  }

  render() {
    return (
      <div>
        <h2>Anecdotes</h2>
        {this.props.filteredAnecdotes.sort((a, b) => b.votes - a.votes).map(anecdote =>
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

const anecdotesToShow = (anecdotes, filter) => {
  if (filter === '') {
    return anecdotes
  }

  return anecdotes.filter(a => a.content.toLowerCase().includes(filter))
}

const mapStateToProps = (state) => {
  return {
    filteredAnecdotes: anecdotesToShow(state.anecdotes, state.filter)
  }
}

const mapDispatchToProps = {
  anecdoteVoting,
  setVoteNotification,
  clearNotification
}

export default connect(mapStateToProps, mapDispatchToProps)(AnecdoteList)
