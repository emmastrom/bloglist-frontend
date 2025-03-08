import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { setUser } from '../reducers/loginReducer'

const Menu = () => {
    const dispatch = useDispatch()
    const user = useSelector((state) => state.user)

    const padding = {
        marginRight: 15,
    }
    const handleLogout = () => {
        window.localStorage.removeItem('loggedBlogappUser')
        dispatch(setUser(null))
    }
    return (
        <div className="menu">
            <Link className="link" style={padding} to="/">
                blogs
            </Link>
            <Link className="link" style={padding} to="/users">
                users
            </Link>
            <a style={padding}>{user.name} logged in</a>
            <button className="button" onClick={handleLogout}>
                logout
            </button>
        </div>
    )
}

export default Menu
