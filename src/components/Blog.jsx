import { useState } from "react"

const Blog = ({ blog }) => {
  const [blogVisible, setBlogVisible] = useState(false)

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
        <p>{blog.likes} <button>like</button></p>
        <p>{blog.user.name}</p>
      </div>
    )
  }
}

export default Blog