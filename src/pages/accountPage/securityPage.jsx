import { Link, useNavigate } from "react-router"
import { FaAngleLeft, FaAngleRight, FaArrowLeft } from "react-icons/fa"
import { PiPassword } from "react-icons/pi"
import { BiChat, BiUpload } from "react-icons/bi"
import { TbLockPassword, TbUpload } from "react-icons/tb"
import { BsChat } from "react-icons/bs"
import Scrolltotop from "../../utils/scrolltotop"

const SecurityPage = () => {
  const navigate = useNavigate()

  const routes = [
    { id: 1, title: `Change 4-digit PIN`, path: `/pin`, icon: <TbLockPassword className="text-xl" /> },
    { id: 2, title: `File reports / upload proof`, path: `/report`, icon: <TbUpload className="text-xl" /> },
    { id: 3, title: `Chat with SecOps`, path: `/chat`, icon: <BsChat className="text-xl" /> }
  ]

  return (
    <main className="bg-white min-h-screen flex flex-col dark:bg-neutral-900 dark:text-white">
      <Scrolltotop />
      <div className="bg-white flex items-center sticky top-0 ps-4 py-4 z-10 shadow-md shadow-neutral-300 dark:bg-neutral-800">
        <button onClick={() => { navigate(-1) }} className="cursor-pointer">
          <FaArrowLeft />
        </button>
        <p className="text-lg font-bold absolute left-1/2 -translate-x-1/2">Security & Support</p>
      </div>
      <div className="bg-white px-4 py-5 flex-1 dark:bg-neutral-900">
        <div className="bg-white rounded-xl shadow-md shadow-neutral-300 dark:bg-neutral-800">
          {routes.map(route => (
            <Link key={route.id} to={route.path} className="flex justify-between items-center p-3">
              <div className="flex items-center gap-3">
                {route.icon}
                {route.title}
              </div>
              <FaAngleRight className="text-lg" />
            </Link>
          ))}
        </div>
      </div>
    </main>
  )
}

export default SecurityPage