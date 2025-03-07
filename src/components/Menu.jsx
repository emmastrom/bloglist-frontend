import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { setUser } from '../reducers/loginReducer'

const Menu = () => {
    const dispatch = useDispatch()
    const user = useSelector((state) => state.user)
    console.log(user)
    const padding = {
        paddingRight: 5,
    }
    const handleLogout = () => {
        window.localStorage.removeItem('loggedBlogappUser')
        dispatch(setUser(null))
    }
    return (
        <div className="menu">
            <Link style={padding} to="/">
                blogs
            </Link>
            <Link style={padding} to="/users">
                users
            </Link>
            {user.name} logged in
            <button style={padding} onClick={handleLogout}>
                logout
            </button>
        </div>
    )
}

export default Menu
