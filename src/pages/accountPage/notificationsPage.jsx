import { useContext, useState } from "react"
import { useNavigate } from "react-router"
import { BiBell } from "react-icons/bi"
import { FaArrowLeft } from "react-icons/fa"
import { notificationContext } from "../../context/notificationContext"
import Empty from "../../components/notification/empty"
import Notifications from "../../components/notification/notifications"
import Scrolltotop from "../../utils/scrolltotop"

const NotificationsPage = () => {
  const navigate = useNavigate()
  const [status, setStatus] = useState(`All`)
  const { notifications, setNotifications } = useContext(notificationContext)

  const toggle = [
    { id: `1`, title: `All`, status: `All` },
    { id: `2`, title: `New`, status: `New` },
    { id: `3`, title: `Read`, status: `Read` }
  ]

  const filteredNotifications = status === `All` ? notifications : notifications.filter(notification => notification.status === status)

  return (
    <main className="bg-white min-h-screen flex flex-col dark:bg-neutral-900 dark:text-white">
      <Scrolltotop />
      <div className="bg-white flex flex-col gap-4 p-4 sticky top-0 shadow-md shadow-neutral-300">
        <div className="flex justify-between items-center dark:bg-neutral-800">
          <button onClick={() => { navigate(-1) }} className="cursor-pointer">
            <FaArrowLeft />
          </button>
          <p className="text-xl font-bold">Notifications</p>
          <BiBell className="text-xl" />
        </div>
        <div className="flex justify-between gap-2">
          {toggle.map(item => (
            <button key={item.id} onClick={() => { setStatus(item.status) }} className={`bg-white w-full py-1 rounded-lg cursor-pointer ${item.status === status && 'text-white bg-gradient-to-r from-orange-600 to-orange-400'}`}>{item.title}</button>
          ))}
        </div>
      </div>
      {notifications.length === 0 && <Empty />}
      {notifications.length !== 0 && <Notifications notifications={filteredNotifications} />}
    </main>
  )
}

export default NotificationsPage