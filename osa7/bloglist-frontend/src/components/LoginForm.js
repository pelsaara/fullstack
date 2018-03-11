import React from 'react'
import PropTypes from 'prop-types'
import { Form, Button } from 'semantic-ui-react'

const LoginForm = ({ state, login, handleLoginFieldChange, handleVisibleChange }) => {
  const hideWhenVisible = { display: state.loginVisible ? 'none' : '' }
  const showWhenVisible = { display: state.loginVisible ? '' : 'none' }

  return (
    <div >
      <h2>Kirjaudu</h2>
      <div style={hideWhenVisible}>
        <Button onClick={handleVisibleChange}>kirjaudu sisään</Button>
      </div>

      <div style={showWhenVisible}>
        <Form onSubmit={login}>
          <Form.Field>
            <label>käyttäjätunnus</label>
            <input
              type="text"
              name="username"
              value={state.username}
              onChange={handleLoginFieldChange}
            />
          </Form.Field>
          <Form.Field>
            <label>salasana</label>
            <input
              type="password"
              name="password"
              value={state.password}
              onChange={handleLoginFieldChange}
            />
          </Form.Field>
          <Button type="submit">kirjaudu</Button>
        </Form>
        <Button onClick={handleVisibleChange}>peruuta</Button>
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