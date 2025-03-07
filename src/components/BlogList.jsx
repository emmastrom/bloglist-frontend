import { useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { likeBlog, deleteBlog } from '../reducers/blogReducer'
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
            <h2>blog app</h2>
            <Togglable buttonLabel="new blog" ref={blogFormRef}>
                <BlogForm />
            </Togglable>
            <div>
                {[...blogs]
                    .sort((a, b) => b.likes - a.likes)
                    .map((blog) => (
                        <div key={blog.id} className="blog-info">
                            <div>
                                <Link to={`/blogs/${blog.id}`}>
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
