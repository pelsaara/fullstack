import React from 'react'
import PropTypes from 'prop-types'

const LoginForm = ({ state, login, handleLoginFieldChange, handleVisibleChange }) => {
  const hideWhenVisible = { display: state.loginVisible ? 'none' : '' }
  const showWhenVisible = { display: state.loginVisible ? '' : 'none' }

  return (
    <div >
      <h2>Kirjaudu</h2>
      <div style={hideWhenVisible}>
        <button onClick={handleVisibleChange}>kirjaudu sisään</button>
      </div>

      <div style={showWhenVisible}>
        <form onSubmit={login}>
          <div>
            käyttäjätunnus
              <input
              type="text"
              name="username"
              value={state.username}
              onChange={handleLoginFieldChange}
            />
          </div>
          <div>
            salasana
          <input
              type="password"
              name="password"
              value={state.password}
              onChange={handleLoginFieldChange}
            />
          </div>
          <button type="submit">kirjaudu</button>
        </form>
        <button onClick={handleVisibleChange}>peruuta</button>
      </div>
    </div>
  )
}

LoginForm.propTypes = {
  state: PropTypes.object.isRequired,
  login: PropTypes.func.isRequired,
  handleLoginFieldChange: PropTypes.func.isRequired,
  handleVisibleChange: PropTypes.func.isRequired
}

export default LoginForm