import React from 'react'

const SimpleBlog = ({ blog, onClick }) => (
  <div>
    <div className='blogInformation'>
      {blog.title} {blog.author}
    </div>
    <div className='blogLikes'>
      blog has {blog.likes} likes
      <button className="likeButton" onClick={onClick}>like</button>
    </div>
  </div>
)

export default SimpleBlog