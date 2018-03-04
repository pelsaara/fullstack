import React from 'react'
import ReactDOM from 'react-dom'
import { createStore } from 'redux'
import voteReducer from './reducers/voteReducer'

const store = createStore(voteReducer)

const Statistiikka = () => {
  const palautteita = store.getState()
  const resetStore = (event) => {
    store.dispatch({ type: 'ZERO' })
  }

  if (palautteita.bad === 0 && palautteita.ok === 0 && palautteita.good ===0) {
    return (
      <div>
        <h2>statistiikka</h2>
        <div>ei yhtään palautetta annettu</div>
      </div>
    )
  }



  return (
    <div>
      <h2>statistiikka</h2>
      <table>
        <tbody>
          <tr>
            <td>hyvä</td>
            <td>{palautteita.good}</td>
          </tr>
          <tr>
            <td>neutraali</td>
            <td>{palautteita.ok}</td>
          </tr>
          <tr>
            <td>huono</td>
            <td>{palautteita.bad}</td>
          </tr>
          <tr>
            <td>keskiarvo</td>
            <td>{palautteita.good - palautteita.bad / (palautteita.good + palautteita.ok + palautteita.bad)}</td>
          </tr>
          <tr>
            <td>positiivisia</td>
            <td>{palautteita.good / (palautteita.good + palautteita.ok + palautteita.bad) * 100}</td>
          </tr>
        </tbody>
      </table>

      <button onClick={resetStore}>nollaa tilasto</button>
    </div >
  )
}

class App extends React.Component {
  klik = (nappi) => () => {
    store.dispatch({ type: nappi })
  }

  render() {
    return (
      <div>
        <h2>anna palautetta</h2>
        <button onClick={this.klik('GOOD')}>hyvä</button>
        <button onClick={this.klik('OK')}>neutraali</button>
        <button onClick={this.klik('BAD')}>huono</button>
        <Statistiikka />
      </div>
    )
  }
}


const renderApp = () => {
  ReactDOM.render(<App />, document.getElementById('root'))
}

renderApp()
store.subscribe(renderApp)