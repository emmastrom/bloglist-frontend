import { useDispatch } from 'react-redux'
import { createBlog } from '../reducers/blogReducer'
import { setNotification } from '../reducers/notificationReducer'

const BlogForm = () => {
    const dispatch = useDispatch()

    const addBlog = async (event) => {
        event.preventDefault()
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
        dispatch(setNotification('created new blog'))
    }

    return (
        <div>
            <h2 className="smallHeader">create new blog</h2>
            <form onSubmit={addBlog}>
                <table>
                    <tbody>
                        <tr>
                            <td className="blog-form">
                                title:
                                <input
                                    className="blog-input"
                                    type="text"
                                    name="title"
                                    id="title-input"
                                    data-testid="title-textbox"
                                />
                            </td>
                        </tr>
                        <tr>
                            <td className="blog-form">
                                author:
                                <input
                                    className="blog-input"
                                    type="text"
                                    name="author"
                                    id="author-input"
                                    data-testid="author-textbox"
                                />
                            </td>
                        </tr>
                        <tr>
                            <td className="blog-form">
                                url:
                                <input
                                    className="blog-input"
                                    type="text"
                                    name="url"
                                    id="url-input"
                                    data-testid="url-textbox"
                                />
                            </td>
                        </tr>
                    </tbody>
                </table>
                <button type="submit">create</button>
            </form>
        </div>
    )
}

export default BlogForm
