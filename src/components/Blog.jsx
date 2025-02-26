import { useState } from 'react'

const Blog = ({ blog, updateBlog, currentUser, deleteBlog }) => {
  const [blogVisible, setBlogVisible] = useState(false)
  const userInfo = {
    username: blog.user.username,
    name: blog.user.name,
    id: blog.user.id
  }

  const updatedBlog = {
    id: blog.id,
    title: blog.title,
    author: blog.author,
    url: blog.url,
    likes: blog.likes + 1,
    user: userInfo
  }

  if (blogVisible === false) {
    return (
      <div className="blog">
        {blog.title} {blog.author}
        <button onClick={() => setBlogVisible(true)}>view</button>
      </div>
    )
  }

  if (blogVisible === true) {
    return (
      <div className="blog">
        <p>{blog.title} {blog.author}<button onClick={() => setBlogVisible(false)}>hide</button></p>
        <a className='blog-url' href={blog.url}>{blog.url}</a>
        <p className='blog-likes'>{blog.likes} <button onClick={() => updateBlog(blog.id, updatedBlog)}>like</button></p>
        <p className='blog-creator'>{blog.user.name}</p>
        <p>{blog.user.username === currentUser.username ?
          <button onClick={() => deleteBlog(blog.id, blog.title)}>remove</button> : null}</p>
      </div>
    )
  }
}

export default Blog