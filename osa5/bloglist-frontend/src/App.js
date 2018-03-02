import React from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      blogs: [],
      username: '',
      password: '',
      user: null,
      error: null
    }
  }

  componentDidMount() {
    blogService.getAll().then(blogs =>
      this.setState({ blogs })
    )
  }

  login = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username: this.state.username,
        password: this.state.password
      })
      this.setState({ username: '', password: '', user })
    } catch (exception) {
      this.setState({
        error: 'käyttäjätunnus tai salasana on virheellinen'
      })
      setTimeout(() => {
        this.setState({ error: null })
      }, 5000)
    }
  }

  handleLoginFieldChange = (event) => {
    this.setState({ [event.target.name]: event.target.value })
  }

  render() {
    return (
      <div>
        <h2>blogs</h2>
        {this.state.user === null && loginForm(this.state, this.login, this.handleLoginFieldChange)}
        {this.state.blogs.map(blog =>
          <Blog key={blog.id} blog={blog} />
        )}
      </div>
    );
  }
}

const loginForm = (state, login, handleLoginFieldChange) => (
  <div>
    <h2>Kirjaudu</h2>

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
  </div>
)

export default App;
