import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import Notification from './components/Notification'
import BlogForm from './components/BlogForm'
import Togglable from './components/Togglable'
import blogService from './services/blogs'
import loginService from './services/login'
import { useDispatch } from 'react-redux'
import { setNotification } from './reducers/notificationReducer'

const App = () => {
    const dispatch = useDispatch()
    const [blogs, setBlogs] = useState([])
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [user, setUser] = useState(null)

    useEffect(() => {
        blogService.getAll().then((blogs) => setBlogs(blogs))
    }, [])

    useEffect(() => {
        const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
        if (loggedUserJSON) {
            const user = JSON.parse(loggedUserJSON)
            setUser(user)
            blogService.setToken(user.token)
        }
    }, [])

    const addBlog = (blogObject) => {
        blogFormRef.current.toggleVisibility()
        blogService.create(blogObject).then((returnedBlog) => {
            setBlogs([returnedBlog].concat(blogs))
            dispatch(setNotification(`new blog ${returnedBlog.title} added`))
            setTimeout(() => {
                dispatch(setNotification(''))
            }, 5000)
        })
    }

    const updateBlog = (id, blogObject) => {
        blogService
            .update(id, blogObject)
            .then(
                setBlogs(
                    blogs.map((blog) => (blog.id !== id ? blog : blogObject))
                )
            )
    }

    const deleteBlog = (id, name) => {
        if (window.confirm(`Remove blog ${name}?`)) {
            try {
                blogService.remove(id)
                setBlogs(blogs.filter((blog) => blog.id !== id))
                dispatch(setNotification('blog deleted'))
                setTimeout(() => {
                    dispatch(setNotification(''))
                }, 5000)
            } catch (exception) {
                dispatch(setNotification('error: could not delete blog'))
                setTimeout(() => {
                    dispatch(setNotification(''))
                }, 5000)
            }
        }
    }

    const handleLogin = async (event) => {
        event.preventDefault()

        try {
            const user = await loginService.login({
                username,
                password,
            })
            window.localStorage.setItem(
                'loggedBlogappUser',
                JSON.stringify(user)
            )

            setUser(user)
            setUsername('')
            setPassword('')
        } catch (exception) {
            dispatch(setNotification('error: wrong username or password'))
            setTimeout(() => {
                dispatch(setNotification(''))
            }, 5000)
        }
    }

    const handleLogout = () => {
        window.localStorage.removeItem('loggedBlogappUser')
        setUser(null)
    }

    const blogFormRef = useRef()

    if (user === null) {
        return (
            <div>
                <h2>Log in to application</h2>
                <Notification />
                <form onSubmit={handleLogin}>
                    <div>
                        username
                        <input
                            type="text"
                            data-testid="username"
                            value={username}
                            name="Username"
                            onChange={({ target }) => setUsername(target.value)}
                        />
                    </div>
                    <div>
                        password
                        <input
                            type="password"
                            data-testid="password"
                            value={password}
                            name="Password"
                            onChange={({ target }) => setPassword(target.value)}
                        />
                    </div>
                    <button type="submit">login</button>
                </form>
            </div>
        )
    }

    return (
        <div>
            <h2>blogs</h2>
            <Notification />
            <p>
                {user.name} logged in
                <button onClick={handleLogout}>logout</button>
            </p>
            <Togglable buttonLabel="new blog" ref={blogFormRef}>
                <BlogForm createBlog={addBlog} />
            </Togglable>
            {blogs
                .sort((a, b) => b.likes - a.likes)
                .map((blog) => (
                    <Blog
                        className="blog"
                        key={blog.id}
                        blog={blog}
                        updateBlog={updateBlog}
                        currentUser={user}
                        deleteBlog={deleteBlog}
                    />
                ))}
        </div>
    )
}

export default App
