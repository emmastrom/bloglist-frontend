import { useState } from 'react'
import PropTypes from 'prop-types'

const BlogForm = ({ createBlog }) => {
  const [newTitle, setNewTitle] = useState('')
  const [newAuthor, setNewAuthor] = useState('')
  const [newUrl, setNewUrl] = useState('')

  const addBlog = (event) => {
    event.preventDefault()
    createBlog({
      title: newTitle,
      author: newAuthor,
      url: newUrl,
    })

    setNewTitle('')
    setNewAuthor('')
    setNewUrl('')

  }

  return (
    <div>
      <h2>create new blog</h2>
      <form onSubmit={addBlog}>
        <div>
            title:
          <input
            type="text"
            value={newTitle}
            name="Title"
            onChange={event => setNewTitle(event.target.value)}
            id='title-input'
            data-testid='title-textbox'
          />
        </div>
        <div>
            author:
          <input
            type="text"
            value={newAuthor}
            name="Author"
            onChange={event => setNewAuthor(event.target.value)}
            id='author-input'
            data-testid='author-textbox'
          />
        </div>
        <div>
            url:
          <input
            type="text"
            value={newUrl}
            name="URL"
            onChange={event => setNewUrl(event.target.value)}
            id='url-input'
            data-testid='url-textbox'
          />
        </div>
        <button type="submit">create</button>
      </form>
    </div>
  )
}

BlogForm.propTypes = {
  createBlog: PropTypes.func.isRequired
}

export default BlogForm