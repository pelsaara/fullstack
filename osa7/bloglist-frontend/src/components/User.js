import React from 'react'
import { Table } from 'semantic-ui-react'
import userService from '../services/users'
import PropTypes from 'prop-types'

class User extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      user: null
    }
  }

  componentDidMount() {
    userService.getOneById(this.props.id)
      .then(user => this.setState({ user: user }))
  }

  render() {
    return (
      <div>
        <h2> {this.state.user.name}</h2>

        <p>Käyttäjänimi: {this.state.user.username}</p>

        <h3>Lisätyt blogit</h3>
        <Table striped celled>
          <Table.Body>
            <Table.Row >
              <Table.Cell>
                Blogin nimi
          </Table.Cell>
              <Table.Cell>
                Kirjoittaja
          </Table.Cell>
            </Table.Row>
            {this.state.user.blogs.map(blog =>
              <Table.Row key={blog.id}>
                <Table.Cell>
                  {blog.name}
                </Table.Cell>
                <Table.Cell>
                  {blog.author}
                </Table.Cell>
              </Table.Row>
            )}
          </Table.Body>
        </Table>
      </div >
    )
  }
}

User.propTypes = {
  id: PropTypes.string.isRequired
}

export default User