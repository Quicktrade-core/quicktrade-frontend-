// src/pages/accountPage/accountPage.jsx
import { MdPerson, MdSecurity, MdAccountBalance } from "react-icons/md"
import { BiBell, BiBookmark, BiBookOpen, BiBox } from "react-icons/bi"
import { FaAngleRight, FaArrowLeft } from "react-icons/fa"
import { FiSettings } from "react-icons/fi"
import { TiTicket } from "react-icons/ti"
import { Link, useNavigate } from "react-router"
import userImg from "../../assets/userProfile.jpg"
import Scrolltotop from "../../utils/scrolltotop"
import { useContext } from "react"
import { authContext } from "../../context/authContext"

const AccountPage = () => {
  const navigate = useNavigate()
  const { user, isAuthenticated, logoutUser } = useContext(authContext)

  const displayName = user
    ? `${user.first_name || ""} ${user.last_name || ""}`.trim() || user.email
    : "Guest"

  const avatarSrc = user?.profile?.avatar_url || userImg

  const route1 = [
    { id: 1, title: "Profile", path: "/profile", icon: <MdPerson className="text-2xl" /> },
    { id: 2, title: "Wallet", path: "/wallet", icon: <MdAccountBalance className="text-2xl" /> },
    { id: 3, title: "Security & Support", path: "/security", icon: <MdSecurity className="text-2xl" /> },
    { id: 4, title: "System Settings", path: "/settings", icon: <FiSettings className="text-2xl" /> },
  ]

  const route2 = [
    { id: 1, title: "Ebooks", path: "/ebooks", icon: <BiBookOpen className="text-2xl" /> },
    { id: 2, title: "Tickets", path: "/tickets", icon: <TiTicket className="text-2xl" /> },
    { id: 3, title: "Orders", path: "/orders", icon: <BiBox className="text-2xl" /> },
    { id: 4, title: "Saved", path: "/saved", icon: <BiBookmark className="text-2xl" /> },
  ]

  const handleLogout = async () => {
    await logoutUser()
    navigate("/auth")
  }

  return (
    <main className="bg-white min-h-screen flex flex-col dark:bg-neutral-950 dark:text-white">
      <Scrolltotop />
      <div className="bg-white flex justify-center sticky top-0 ps-4 py-10 z-10 shadow-md shadow-neutral-300 dark:bg-neutral-800 dark:shadow-none">
        <button onClick={() => navigate(-1)} className="absolute top-4 left-4 cursor-pointer"><FaArrowLeft /></button>
        <div className="flex flex-col items-center gap-1">
          <img src={avatarSrc} alt="" className="w-25 h-25 object-cover rounded-full" />
          <p className="text-xl font-bold">{displayName}</p>
          {user?.current_mode && (
            <span className="text-xs px-2 py-0.5 bg-orange-100 text-orange-600 rounded-full">{user.current_mode} mode</span>
          )}
        </div>
      </div>
      <div className="bg-white flex flex-col gap-10 px-4 py-10 dark:bg-neutral-950">
        <div className="bg-neutral-200 flex flex-col gap-0.5 rounded-xl overflow-hidden shadow-md shadow-neutral-300 dark:bg-neutral-900 dark:shadow-none">
          {route1.map((route) => (
            <Link key={route.id} to={route.path} className="bg-white flex justify-between items-center p-3 dark:bg-neutral-800">
              <div className="flex items-center gap-3">{route.icon}{route.title}</div>
              <FaAngleRight className="text-lg" />
            </Link>
          ))}
        </div>
        <div className="bg-neutral-200 flex flex-col gap-0.5 rounded-xl overflow-hidden shadow-md shadow-neutral-300 dark:bg-neutral-900 dark:shadow-none">
          {route2.map((route) => (
            <Link key={route.id} to={route.path} className="bg-white flex justify-between items-center p-3 dark:bg-neutral-800">
              <div className="flex items-center gap-3">{route.icon}{route.title}</div>
              <FaAngleRight className="text-lg" />
            </Link>
          ))}
        </div>
        {isAuthenticated ? (
          <button onClick={handleLogout} className="bg-red-600 text-white rounded-xl py-2 cursor-pointer">Logout</button>
        ) : (
          <button onClick={() => navigate("/auth")} className="bg-gradient-to-b from-orange-600 to-orange-400 text-white rounded-xl py-2 cursor-pointer">Login</button>
        )}
      </div>
    </main>
  )
}

export default AccountPage