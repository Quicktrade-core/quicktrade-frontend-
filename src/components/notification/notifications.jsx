import { Link } from "react-router"

const Notifications = ({ notifications }) => {
  const statusStyle = {
    New: `bg-neutral-100`,
    Read: `bg-white`
  }

  return (
    <div className="bg-white flex flex-col gap-5 px-4 py-5 flex-1">
      {notifications.map(notification => (
        <Link key={notification.id} to={`/notification/${notification.id}`} className={`${statusStyle[notification.status]} flex flex-col gap-3 p-3 rounded-xl shadow-md shadow-neutral-300 dark:bg-neutral-800`}>
          <div className="flex gap-3">
            <div className="w-1/5">{notification.image}</div>
            <div className="w-4/5">
              <div className="flex justify-between items-center">
                <p className="font-bold w-3/5 truncate">{notification.title}</p>
                <p className="text-sm">{notification.date}</p>
              </div>
              <p className="font-bold truncate">{notification.subtitle}</p>
            </div>
          </div>
          <p className="leading-tight">{notification.content}</p>
        </Link>
      ))}
    </div>
  )
}

export default Notifications