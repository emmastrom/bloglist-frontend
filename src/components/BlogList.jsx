import { useRef } from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import Togglable from './Togglable'
import BlogForm from './BlogForm'

const BlogList = () => {
    const blogFormRef = useRef()
    const blogs = useSelector((state) => state.blogs)
    if (!blogs) {
        return null
    }
    return (
        <div>
            <h2 className="header">blog app</h2>
            <Togglable buttonLabel="new blog" ref={blogFormRef}>
                <BlogForm />
            </Togglable>
            <div>
                {[...blogs]
                    .sort((a, b) => b.likes - a.likes)
                    .map((blog) => (
                        <div key={blog.id} className="blog-info">
                            <div>
                                <Link className="link" to={`/blogs/${blog.id}`}>
                                    {' '}
                                    {blog.title} {blog.author}
                                </Link>
                            </div>
                        </div>
                    ))}
            </div>
        </div>
    )
}

export default BlogList
