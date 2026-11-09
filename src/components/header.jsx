// src/components/header.jsx
import { useContext } from "react"
import { Link, useNavigate } from "react-router"
import { BiBell, BiSearchAlt } from "react-icons/bi"
import logo from "/logo.png"
import { cartContext } from "../context/cartContext"

const Header = () => {
  const navigate = useNavigate()
  const { cartItems } = useContext(cartContext)

  const goToSearch = () => {
    navigate("/search")
  }

  return (
    <header className="bg-white flex flex-col justify-center gap-3 px-4 h-[15vh] sticky top-0 z-10 dark:bg-neutral-950 dark:text-white">
      <div className="flex justify-between items-center">
        <Link to={`/`} className="flex items-center">
          <img src={logo} alt="" className="w-7 h-7 object-cover" />
          <span className="text-lg font-bold">QuickTrade</span>
        </Link>
        <Link to={`/notifications`} className="relative">
          <BiBell className="text-2xl" />
          <span className="bg-red-600 w-3 h-3 rounded-full absolute -top-1 right-0"></span>
        </Link>
      </div>

      <button
        onClick={goToSearch}
        className="bg-white text-neutral-500 flex justify-between items-center px-4 py-2 rounded-full border border-neutral-300 text-left dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400"
      >
        <span className="text-sm">Search products, tickets, events...</span>
        <BiSearchAlt className="text-xl dark:text-white" />
      </button>
    </header>
  )
}

export default Header