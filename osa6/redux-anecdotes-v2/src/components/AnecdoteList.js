import React from 'react'
import { voteAnecdote } from '../reducers/anecdoteReducer'
import { notify } from '../reducers/notificationReducer'
import { connect } from 'react-redux'

class AnecdoteList extends React.Component {
  voteHandler = async (anecdote) => {
    this.props.voteAnecdote(anecdote)
    this.props.notify(`you voted '${anecdote.content}'`, 5)
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
  voteAnecdote,
  notify
}

export default connect(mapStateToProps, mapDispatchToProps)(AnecdoteList)
