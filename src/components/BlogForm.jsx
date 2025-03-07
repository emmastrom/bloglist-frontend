import { useDispatch } from 'react-redux'
import { createBlog } from '../reducers/blogReducer'
import { setNotification } from '../reducers/notificationReducer'

const BlogForm = () => {
    const dispatch = useDispatch()

    const addBlog = async (event) => {
        //event.preventDefault()
        const newBlog = {
            title: event.target.title.value,
            author: event.target.author.value,
            url: event.target.url.value,
            likes: 0,
        }
        event.target.title.value = ''
        event.target.author.value = ''
        event.target.url.value = ''
        console.log(newBlog)
        dispatch(createBlog(newBlog))
        //dispatch(setNotification('created new blog'))
    }

    return (
        <div>
            <h2>create new blog</h2>
            <form onSubmit={addBlog}>
                <div>
                    title:
                    <input
                        type="text"
                        name="title"
                        id="title-input"
                        data-testid="title-textbox"
                    />
                </div>
                <div>
                    author:
                    <input
                        type="text"
                        name="author"
                        id="author-input"
                        data-testid="author-textbox"
                    />
                </div>
                <div>
                    url:
                    <input
                        type="text"
                        name="url"
                        id="url-input"
                        data-testid="url-textbox"
                    />
                </div>
                <button type="submit">create</button>
            </form>
        </div>
    )
}

export default BlogForm
