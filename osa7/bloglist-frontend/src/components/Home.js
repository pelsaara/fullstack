import React from 'react'
import Blog from './Blog'
import blogService from '../services/blogs'
import loginService from '../services/login'
import LoginForm from './LoginForm'
import BlogForm from './BlogForm'
import { Table, Button, Message } from 'semantic-ui-react'

class Home extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      blogs: [],
      blogTitle: '',
      blogAuthor: '',
      blogUrl: '',
      username: '',
      password: '',
      user: null,
      error: null,
      loginVisible: false
    }
  }

  componentDidMount() {
    blogService.getAll().then(blogs =>
      blogs.sort((a, b) => { return b.likes - a.likes })
    ).then(blogs => this.setState({ blogs }))


    const loggerUserJSON = window.localStorage.getItem('loggedBlogAppUser')
    if (loggerUserJSON) {
      const user = JSON.parse(loggerUserJSON)
      this.setState({ user })
      blogService.setToken(user.token)
    }
  }

  addBlog = (event) => {
    event.preventDefault()
    const blogObject = {
      title: this.state.blogTitle,
      author: this.state.blogAuthor,
      url: this.state.blogUrl
    }

    blogService
      .create(blogObject)
      .then(newBlog => {
        this.setState({
          blogs: this.state.blogs.concat(newBlog),
          blogTitle: '',
          blogAuthor: '',
          blogUrl: '',
          error: `blogi ${blogObject.title} lisätty onnistuneesti`
        })
        setTimeout(() => {
          this.setState({ error: null })
        }, 5000)
      })

  }

  login = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username: this.state.username,
        password: this.state.password
      })
      window.localStorage.setItem('loggedBlogAppUser', JSON.stringify(user))
      blogService.setToken(user.token)
      this.setState({ username: '', password: '', user: user, error: 'kirjauduit onnistuneesti sisään' })
      setTimeout(() => {
        this.setState({ error: null })
      }, 5000)
    } catch (exception) {
      this.setState({
        error: 'käyttäjätunnus tai salasana on virheellinen'
      })
      setTimeout(() => {
        this.setState({ error: null })
      }, 5000)
    }
  }

  logout = (event) => {
    event.preventDefault()
    try {
      window.localStorage.removeItem('loggedBlogAppUser')
      this.setState({
        user: null,
        error: 'uloskirjautuminen onnistui'
      })
      setTimeout(() => {
        this.setState({ error: null })
      }, 5000)
      blogService.setToken = null

    } catch (exception) {
      this.setState({
        error: 'jokin meni pieleen'
      })
    }
    setTimeout(() => {
      this.setState({ error: null })
    }, 5000)
  }

  handleFieldChange = (event) => {
    this.setState({ [event.target.name]: event.target.value })
  }

  handleVisibleChange = (event) => {
    this.setState({ loginVisible: !this.state.loginVisible })
  }

  render() {
    return (
      <div>
        <h2>Blogikirjasto</h2>
        {this.state.error &&
          <Message success>
            {this.state.error}
          </Message>
        }

        {this.state.user === null
          ?
          <div>
            <LoginForm
              state={this.state}
              login={this.login}
              handleLoginFieldChange={this.handleFieldChange}
              handleVisibleChange={this.handleVisibleChange}
            />
          </div>
          :
          <div>
            <p>
              {this.state.user.name} kirjautunut sisään
          <Button
                type="submit"
                onClick={this.logout}
              >kirjaudu ulos
          </Button>
            </p>
            <BlogForm
              state={this.state}
              addBlog={this.addBlog}
              handleBlogFieldChange={this.handleFieldChange}
            />
            <br />
            <Table striped>
              <Table.Body>

                {this.state.blogs.map(blog =>
                  <Table.Row key={blog.id}>
                    <Table.Cell>
                      <Blog blog={blog} loggedUser={this.state.user} />
                    </Table.Cell>
                  </Table.Row>
                )}

              </Table.Body>
            </Table>
          </div>
        }

      </div>
    )
  }
}

export default Home