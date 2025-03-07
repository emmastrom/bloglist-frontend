import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { likeBlog, deleteBlog } from '../reducers/blogReducer'

const Blog = ({ user, blog }) => {
    const dispatch = useDispatch()

    const [blogVisible, setBlogVisible] = useState(false)

    if (blogVisible === false) {
        return (
            <div className="blog-info">
                <div>
                    {blog.title} {blog.author}
                </div>
                <div>
                    <button onClick={() => setBlogVisible(true)}>view</button>
                </div>
            </div>
        )
    }

    if (blogVisible === true) {
        return (
            <div className="blog-info">
                <p>
                    {blog.title} {blog.author}
                    <button
                        className="clickView"
                        onClick={() => setBlogVisible(false)}
                    >
                        hide
                    </button>
                </p>
                <a className="blog-url" href={blog.url}>
                    {blog.url}
                </a>
                <p className="blog-likes">
                    {blog.likes}{' '}
                    <button
                        className="clickLikes"
                        onClick={() => {
                            try {
                                dispatch(likeBlog(blog))
                            } catch (exception) {
                                return exception
                            }
                        }}
                    >
                        like
                    </button>
                </p>
                <p className="blog-creator">{blog.user.name}</p>
                <p>
                    {blog.user.username === user.username ? (
                        <button onClick={() => dispatch(deleteBlog(blog))}>
                            remove
                        </button>
                    ) : null}
                </p>
            </div>
        )
    }
}

export default Blog
