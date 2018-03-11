import React from 'react'

const BlogForm = ({ state, addBlog, handleBlogFieldChange }) => {
  return (
    <div>
      <h2> Lisää uusi blogi</h2>

      <form onSubmit={addBlog}>
        <div>
          otsikko
          <input
            type="text"
            name="blogTitle"
            value={state.blogTitle}
            onChange={handleBlogFieldChange}
          />
        </div>
        <div>
          kirjoittaja
          <input
            type="text"
            name="blogAuthor"
            value={state.blogAuthor}
            onChange={handleBlogFieldChange}
          />
        </div>
        <div>
          url
          <input
            type="text"
            name="blogUrl"
            value={state.blogUrl}
            onChange={handleBlogFieldChange}
          />
        </div>
        <button type="submit">lisää</button>
      </form>
    </div>
  )
}

export default BlogForm