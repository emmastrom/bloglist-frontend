import { useDispatch, useSelector } from 'react-redux'
import { likeBlog } from '../reducers/blogReducer'
import { useParams } from 'react-router-dom'
import Comments from './Comments'
import { setNotification } from '../reducers/notificationReducer'

const Blog = () => {
    const dispatch = useDispatch()
    const blogs = useSelector((state) => state.blogs)

    const id = useParams().id
    const blog = blogs.find((b) => b.id === id)

    if (!blog) {
        return null
    }

    return (
        <div className="blog-open">
            <h2 className="smallHeader">
                {blog.title} {blog.author}
            </h2>
            <a className="blog-url" href={blog.url}>
                {blog.url}
            </a>
            <p className="blog-likes">
                {blog.likes} likes{' '}
                <button
                    className="clickLikes"
                    onClick={() => {
                        try {
                            dispatch(likeBlog(blog))
                            dispatch(setNotification(`liked ${blog.title}`))
                        } catch (exception) {
                            return exception
                        }
                    }}
                >
                    like
                </button>
            </p>
            <p className="blog-creator"> added by {blog.user.name}</p>
            <Comments blog={blog} />
        </div>
    )
}

export default Blog
