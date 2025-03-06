import { useSelector } from 'react-redux'

const Notification = () => {
    const notification = useSelector((state) => state.notification)

    if (notification !== '') {
        console.log(notification)
        if (notification.includes('error')) {
            return <div className="error">{notification}</div>
        } else {
            return (
                <div>
                    <div className="notification">{notification}</div>
                </div>
            )
        }
    }
}

export default Notification
