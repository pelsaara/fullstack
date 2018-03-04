import React from 'react'
import { shallow } from 'enzyme'
import Blog from './Blog'

describe('<Blog/>', () => {
  it('renders blog information correctly', () => {
    const blog = {
      title: 'Testi',
      author: 'T.esti',
      url: 'testi.com',
      likes: 2,
      user: {
        id: 1,
        name: "Testi",
        username: "testi"
      }
    }

    const mockHandler = jest.fn()

    const blogComponent = shallow(
      <Blog
        blog={blog}
        handleClick={mockHandler}
      />
    )

    const nameDiv = blogComponent
      .find('.nameview')

    nameDiv.simulate('click')

    expect(nameDiv.text()).toContain(blog.author, blog.name)
    expect(nameDiv.text()).not.toContain(blog.url, blog.user.name)

    const contentDiv = blogComponent
      .find('.fullview')

    expect(contentDiv.text()).toContain(blog.url, blog.likes, blog.user.name)
  })
})