import { useState } from "react"

const Blog = ({ blog, updateBlog }) => {
  const [blogVisible, setBlogVisible] = useState(false)

  const updatedBlog = {
    title: blog.title,
    author: blog.author,
    url: blog.url,
    likes: blog.likes + 1,
    user: blog.user.id
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
        <p>{blog.url}</p>
        <p>{blog.likes} <button onClick={() => updateBlog(blog.id, updatedBlog)}>like</button></p>
        <p>{blog.user.name}</p>
      </div>
    )
  }
}

export default Blog