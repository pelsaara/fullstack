import React from 'react'
import userService from '../services/users'
import { Table } from 'semantic-ui-react'
import { Link } from 'react-router-dom'

class UserList extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      users: []
    }
  }

  componentDidMount() {
    userService.getAll()
      .then(users => this.setState({ users }))
  }

  render() {
    return (
      <div>
        <h2>Käyttäjät</h2>
        <Table striped celled>
          <Table.Body>
            <Table.Row>
              <Table.Cell>
                Käyttäjä
            </Table.Cell>
              <Table.Cell>
                Blogeja
                  </Table.Cell>
            </Table.Row>
            {this.state.users.map(user =>
              <Table.Row key={user.id}>
                <Table.Cell>
                  <Link to={`/users/${user.id}`}>{user.name}</Link>
                </Table.Cell>
                <Table.Cell>
                  {user.blogs.length}
                </Table.Cell>
              </Table.Row>
            )}
          </Table.Body>
        </Table>
      </div>
    )
  }
}

export default UserList