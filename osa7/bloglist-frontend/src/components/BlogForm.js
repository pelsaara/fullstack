import React from 'react'
import { Form, Button } from 'semantic-ui-react'
import PropTypes from 'prop-types'

const BlogForm = ({ state, addBlog, handleBlogFieldChange }) => {
  return (
    <div>
      <h2> Lisää uusi blogi</h2>

      <Form onSubmit={addBlog}>
        <Form.Field>
          <label>otsikko</label>
          <input
            type="text"
            name="blogTitle"
            value={state.blogTitle}
            onChange={handleBlogFieldChange}
          />
        </Form.Field>
        <Form.Field>
          <label>kirjoittaja</label>
          <input
            type="text"
            name="blogAuthor"
            value={state.blogAuthor}
            onChange={handleBlogFieldChange}
          />
        </Form.Field>
        <Form.Field>
          <label>url</label>
          <input
            type="text"
            name="blogUrl"
            value={state.blogUrl}
            onChange={handleBlogFieldChange}
          />
        </Form.Field>
        <Button type="submit">lisää</Button>
      </Form>
    </div>
  )
}

BlogForm.propTypes = {
  state: PropTypes.object.isRequired,
  addBlog: PropTypes.func.isRequired,
  handleBlogFieldChange: PropTypes.func.isRequired,
}

export default BlogForm