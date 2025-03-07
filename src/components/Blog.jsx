import { useDispatch, useSelector } from 'react-redux'
import { likeBlog } from '../reducers/blogReducer'
import { useParams } from 'react-router-dom'

const Blog = () => {
    const dispatch = useDispatch()
    const blogs = useSelector((state) => state.blogs)
    console.log(blogs)
    const id = useParams().id
    console.log(id)
    const blog = blogs.find((b) => b.id === id)
    console.log(blog)

    if (!blog) {
        return null
    }

    return (
        <div className="blog-open">
            <h2>
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
                        } catch (exception) {
                            return exception
                        }
                    }}
                >
                    like
                </button>
            </p>
            <p className="blog-creator"> added by {blog.user.name}</p>
        </div>
    )
}

export default Blog
