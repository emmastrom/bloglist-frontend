import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import Notification from './components/Notification'
import BlogForm from './components/BlogForm'
import Togglable from './components/Togglable'
import blogService from './services/blogs'
import loginService from './services/login'
import { useDispatch, useSelector } from 'react-redux'
import { setNotification } from './reducers/notificationReducer'
import { initializeBlogs } from './reducers/blogReducer'
import { setUser } from './reducers/loginReducer'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import Users from './components/Users'
import { initializeUsers } from './reducers/userReducer'
import User from './components/User'
import BlogList from './components/BlogList'
import Menu from './components/Menu'

const App = () => {
    const blogs = useSelector((state) => {
        return state.blogs
    })
    const dispatch = useDispatch()
    const user = useSelector((state) => state.user)
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    useEffect(() => {
        dispatch(initializeBlogs())
    }, [dispatch])

    useEffect(() => {
        dispatch(initializeUsers())
    }, [dispatch])

    useEffect(() => {
        const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
        if (loggedUserJSON && loggedUserJSON !== 'null') {
            const user = JSON.parse(loggedUserJSON)
            dispatch(setUser(user))
            blogService.setToken(user.token)
        }
    }, [dispatch])

    const handleLogin = async (event) => {
        event.preventDefault()

        try {
            const user = await loginService.login({
                username,
                password,
            })
            dispatch(setUser(user))
            window.localStorage.setItem(
                'loggedBlogappUser',
                JSON.stringify(user)
            )
            blogService.setToken(user.token)
            setUsername('')
            setPassword('')
        } catch (exception) {
            dispatch(setNotification('error: wrong username or password'))
        }
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
        <Router>
            <div>
                <Menu />
                <Notification />
                <Routes>
                    <Route path="/users" element={<Users />} />
                    <Route path="/users/:id" element={<User />} />
                    <Route path="/blogs/:id" element={<Blog />} />
                    <Route path="/" element={<BlogList />} />
                </Routes>
            </div>
        </Router>
    )
}

export default App
