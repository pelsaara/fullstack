import React from 'react'
import { shallow } from 'enzyme'
import SimpleBlog from './SimpleBlog'

describe('<SimpleBlog/>', () => {
  it('renders blog information', () => {
    const blog = {
      title: 'Testi',
      author: 'T.esti',
      url: 'testi.com',
      likes: 2
    }
    
    const blogComponent = shallow(
      <SimpleBlog
        blog={blog}
      />)

    const informationDiv = blogComponent
      .find('.blogInformation')
    const likesDiv = blogComponent
      .find('.blogLikes')

    expect(informationDiv.text())
      .toContain(blog.title, blog.author)
    expect(likesDiv.text())
      .toContain(blog.likes)
  })

  it('clicking like button twice calls event handler twice', () => {
    const blog = {
      title: 'Testi',
      author: 'T.esti',
      url: 'testi.com',
      likes: 2
    }

    const mockHandler = jest.fn()

    const blogComponent = shallow(
      <SimpleBlog
        blog={blog}
        onClick={mockHandler}
      />
    )

    const button = blogComponent
      .find('.likeButton')
      button.simulate('click')
      button.simulate('click')

    expect(mockHandler.mock.calls.length).toBe(2)
  })
})