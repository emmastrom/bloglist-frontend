import { useDispatch } from 'react-redux'
import { commentBlog } from '../reducers/blogReducer'

const Comments = (blog) => {
    const dispatch = useDispatch()

    const addComment = async (event) => {
        event.preventDefault()
        const comment = { content: event.target.newComment.value }
        event.target.newComment.value = ''
        dispatch(commentBlog(blog.blog.id, comment))
    }

    if (!blog) {
        return null
    }

    return (
        <div>
            <h4>comments</h4>
            <form onSubmit={addComment}>
                <input type="text" name="newComment"></input>
                <button type="submit">add comment</button>
            </form>
            {blog.blog.comments.map((comment) => (
                <div key={comment.id}>
                    <li>{comment.content}</li>
                </div>
            ))}
        </div>
    )
}

export default Comments
