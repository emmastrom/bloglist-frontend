import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'

const User = () => {
    const users = useSelector((state) => state.users)
    //console.log(users)
    const id = useParams().id
    //console.log(id)
    const user = users.find((u) => u.id === id)
    console.log(user)
    if (!user) {
        return null
    }

    return (
        <div>
            <h2>{user.name}</h2>
            <h4>added blogs</h4>
            <div>
                {[...user.blogs].map((blog) => (
                    <div key={blog.id}>
                        <li>{blog.title}</li>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default User
