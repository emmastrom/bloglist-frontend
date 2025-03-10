import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

const Users = () => {
    const users = useSelector((state) => state.users)
    console.log(users)
    return (
        <div>
            <h2 className="smallHeader">Users</h2>
            <table>
                <tbody>
                    <tr>
                        <th> </th>
                        <th>blogs created</th>
                    </tr>
                    {[...users].map((user) => (
                        <tr key={user.id}>
                            <td>
                                <Link className="user" to={`/users/${user.id}`}>
                                    {user.name}
                                </Link>
                            </td>
                            <td>{user.blogs.length}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default Users
