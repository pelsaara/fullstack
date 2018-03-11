import React from 'react'
import BlogService from '../services/blogs'

class Blog extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      visible: false,
      id: props.blog.id,
      title: props.blog.title,
      author: props.blog.author,
      url: props.blog.url,
      likes: props.blog.likes,
      user: props.blog.user ? props.blog.user : { name: 'Unknown' },
      loggedUser: props.loggedUser
    }
  }

  handleClick = (event) => {
    this.setState({ visible: !this.state.visible })
  }

  like = (event) => {
    event.preventDefault()
    this.setState({ likes: this.state.likes + 1 })
    const blogObject = {
      id: this.state.id,
      title: this.state.title,
      author: this.state.author,
      url: this.state.url,
      likes: this.state.likes,
      user: this.state.user
    }

    BlogService.update(blogObject)
  }

  deleteBlog = (event) => {
    event.preventDefault()
    if (window.confirm(`Haluatko varmasti poistaa blogin ${this.state.title}`)) {
      if (this.state.user.username === this.state.loggedUser.username) {
        BlogService.deleteBlog(this.state.id)
      } else if (this.state.user.name === 'Unknown') {
        BlogService.deleteBlog(this.state.id)
      }
    }
    window.location.reload()

  }

  render() {
    return (
      <div>
        <div>
          <h5
            className='nameview'
            onClick={this.handleClick}
          >{this.state.title} - {this.state.author}
          </h5>
          {this.state.visible &&
            <div className='fullview'>
              linkki: <a href={this.state.url}>{this.state.url}</a>
              <p>{this.state.likes} tykkäystä <button onClick={this.like}>tykkää</button></p>
              <p>lisännyt: {this.state.user.name ? this.state.user.name : 'Unknown'}</p>
              <DeleteButton
                user={this.state.user}
                loggedUser={this.state.loggedUser}
                deleteBlog={this.deleteBlog}
              />
            </div>}
        </div>
      </div>
    )
  }
}

const DeleteButton = (props) => {
  if (props.user.name === 'Unknown') {
    return (
      <div>
        <button onClick={props.deleteBlog}>poista</button>
      </div>
    )
  } else if (props.user.username === props.loggedUser.username) {
    return (
      <div>
        <button onClick={props.deleteBlog}>poista</button>
      </div>
    )
  }
  return null
}

export default Blog