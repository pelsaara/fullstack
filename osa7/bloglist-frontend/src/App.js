import React from 'react'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
import { Container, Menu } from 'semantic-ui-react'
import Home from './components/Home'
import UserList from './components/UserList'
import User from './components/User'
import userService from './services/users'

const Navigation = () => (
  <div>
    <Menu inverted>
      <Menu.Item link>
        <Link to="/">blogs</Link>
      </Menu.Item>
      <Menu.Item link>
        <Link to="/users">users</Link>
      </Menu.Item>
    </Menu>
  </div>
)

class App extends React.Component {

  componentDidMount() {
    console.log('ei toimi')
  }

  render() {
    return (
      <Container>
        <div>
          <Router>
            <div>
              <Navigation />
              <div>
                <Route exact path="/" render={() =>
                  <Home />} />
                <Route exact path="/users/:id" render={({ match }) =>
                  <User id={(match.params.id)} />} />
                <Route exact path="/users" render={() => <UserList />} />
              </div>
            </div>
          </Router>
        </div>
      </Container>
    )
  }
}

export default App
