import React from 'react'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
import { Segment, Container, Table, Menu, Form, Button, Grid, Message } from 'semantic-ui-react'

const Navigation = () => (
  <div>
    <Menu inverted>
      <Menu.Item link>
        <Link to="/">anecdotes</Link>
      </Menu.Item>
      <Menu.Item link>
        <Link to="/create">create new</Link>
      </Menu.Item>
      <Menu.Item link>
        <Link to="/about">about</Link>
      </Menu.Item>
    </Menu>
  </div>
)

const AnecdoteList = ({ anecdotes }) => (
  <div>
    <h2>Anecdotes</h2>
    <Table striped celled>
      <Table.Body>
        {anecdotes.map(anecdote =>
          <Table.Row key={anecdote.id}>
            <Table.Cell>
              <Link to={`/anecdotes/${anecdote.id}`}>
                {anecdote.content}
              </Link>
            </Table.Cell>
            <Table.Cell>
              {anecdote.votes}
            </Table.Cell>
          </Table.Row>
        )}
      </Table.Body>
    </Table>
  </div>
)

const Anecdote = ({ anecdote }) => {
  return (
    <div>
      <h2>{anecdote.content}</h2>
      <Table striped>
        <Table.Body>
          <Table.Row><Table.Cell>...has {anecdote.votes} votes</Table.Cell></Table.Row>
          <Table.Row><Table.Cell>...is written by {anecdote.author}</Table.Cell></Table.Row>
        </Table.Body>
      </Table>
    </div>
  )
}

const About = () => (
  <div>
    <Grid>
      <Grid.Column width={10}>
        <h2>About anecdote app</h2>
        <Segment>
        <p>According to Wikipedia:</p>

        <em>An anecdote is a brief, revealing account of an individual person or an incident.
      Occasionally humorous, anecdotes differ from jokes because their primary purpose is not simply to provoke laughter but to reveal a truth more general than the brief tale itself,
      such as to characterize a person by delineating a specific quirk or trait, to communicate an abstract idea about a person, place, or thing through the concrete details of a short narrative.
      An anecdote is "a story with a point."</em>

        <p>Software engineering is full of excellent anecdotes, at this app you can find the best and add more.</p>
      </Segment>
      </Grid.Column>
      <Grid.Column width={5}>
        <a title="By Krd (photo) Von Sprat (crop/extraction) (File:LinuxCon Europe Linus Torvalds 03.jpg) [CC BY-SA 3.0 (https://creativecommons.org/licenses/by-sa/3.0) or CC BY-SA 4.0 (https://creativecommons.org/licenses/by-sa/4.0)], via Wikimedia Commons" href="https://commons.wikimedia.org/wiki/File%3ALinuxCon_Europe_Linus_Torvalds_03_(cropped).jpg"><img width="256" alt="LinuxCon Europe Linus Torvalds 03 (cropped)" src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/01/LinuxCon_Europe_Linus_Torvalds_03_%28cropped%29.jpg/256px-LinuxCon_Europe_Linus_Torvalds_03_%28cropped%29.jpg" /></a>
      </Grid.Column>
    </Grid>
  </div>
)

const Footer = () => (
  <div>
    <Segment>
    Anecdote app for <a href='https://courses.helsinki.fi/fi/TKT21009/121540749'>Full Stack -sovelluskehitys</a>.
    See <a href='https://github.com/mluukkai/routed-anecdotes'>https://github.com/mluukkai/routed-anecdotes</a> for the source code.
    </Segment>
  </div>
)

class CreateNew extends React.Component {
  constructor() {
    super()
    this.state = {
      content: '',
      author: '',
      info: ''
    }
  }

  handleChange = (e) => {
    console.log(e.target.name, e.target.value)
    this.setState({ [e.target.name]: e.target.value })
  }

  handleSubmit = (e) => {
    e.preventDefault()
    this.props.history.push('/')
    this.props.addNew({
      content: this.state.content,
      author: this.state.author,
      info: this.state.info,
      votes: 0
    })
  }

  render() {
    return (
      <div>
        <h2>create a new anecdote</h2>
        <Form onSubmit={this.handleSubmit}>
          <Form.Field>
            <label>content</label>
            <input name='content' value={this.state.content} onChange={this.handleChange} />
          </Form.Field>
          <Form.Field>
            <label>author</label>
            <input name='author' value={this.state.author} onChange={this.handleChange} />
          </Form.Field>
          <Form.Field>
            <label>url for more info</label>
            <input name='info' value={this.state.info} onChange={this.handleChange} />
          </Form.Field>
          <Button type='submit'>create</Button>
        </Form>
      </div>
    )

  }
}

class App extends React.Component {
  constructor() {
    super()

    this.state = {
      anecdotes: [
        {
          content: 'If it hurts, do it more often',
          author: 'Jez Humble',
          info: 'https://martinfowler.com/bliki/FrequencyReducesDifficulty.html',
          votes: 0,
          id: '1'
        },
        {
          content: 'Premature optimization is the root of all evil',
          author: 'Donald Knuth',
          info: 'http://wiki.c2.com/?PrematureOptimization',
          votes: 0,
          id: '2'
        }
      ],
      notification: ''
    }
  }

  addNew = (anecdote) => {
    anecdote.id = (Math.random() * 10000).toFixed(0)
    this.setState({ anecdotes: this.state.anecdotes.concat(anecdote) })
    this.setState({ notification: `a new anecdote ${anecdote.content} created!` })
    setTimeout(() => this.setState({ notification: '' }), 10000)
  }

  anecdoteById = (id) =>
    this.state.anecdotes.find(a => a.id === id)

  vote = (id) => {
    const anecdote = this.anecdoteById(id)

    const voted = {
      ...anecdote,
      votes: anecdote.votes + 1
    }

    const anecdotes = this.state.anecdotes.map(a => a.id === id ? voted : a)

    this.setState({ anecdotes })
  }

  render() {
    return (
      <Container>
        <div>

          <Router>
            <div>
              <h1>Software anecdotes</h1>
              <Navigation />
              {(this.state.notification &&
                <Message success>
                  {this.state.notification}
                </Message>
              )}
              <div>
                <Route exact path="/create" render={({ history }) =>
                  <CreateNew history={history} addNew={this.addNew} />} />
                <Route exact path="/about" render={() => <About />} />
                <Route exact path="/" render={() =>
                  <AnecdoteList anecdotes={this.state.anecdotes} />} />
                <Route exact path="/anecdotes/:id" render={({ match }) =>
                  <Anecdote anecdote={this.anecdoteById(match.params.id)} />} />
              </div>
              <Footer />
            </div>
          </Router>
        </div>
      </Container>
    );
  }
}

export default App;
