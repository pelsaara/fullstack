import React from 'react';

class App extends React.Component {

  voteAnecdote = (id) => () => {
    this.props.store.dispatch({
      type: 'VOTE',
      data: { id }
    })
  }

  render() {
    const anecdotes = this.props.store.getState()
    const sortedAnecdotes = anecdotes.sort((a, b) => a.votes - b.votes < 0)



    return (
      <div>
        <h2>Anecdotes</h2>
        {sortedAnecdotes.map(anecdote =>
          <div key={anecdote.id}>
            <div>
              {anecdote.content}
            </div>
            <div>
              has {anecdote.votes}
              <button onClick={this.voteAnecdote(anecdote.id)}>vote</button>
            </div>
          </div>
        )}
      </div>
    )
  }
}

export default App