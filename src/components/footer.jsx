import { BiHome, BiMoviePlay, BiUser } from "react-icons/bi"
import { GiShoppingCart } from "react-icons/gi"
import { Link } from "react-router"
import { useContext } from "react"
import { cartContext } from "../context/cartContext"

const Footer = () => {
  const { cartItems } = useContext(cartContext)

  return (
    <footer className="bg-neutral-950/90 text-white w-[90vw] fixed bottom-5 translate-x-1/2 right-1/2 flex justify-between items-center px-6 py-3 rounded-full z-10">
      <Link to={`/`} className="text-orange-600 text-2xl">
        <BiHome />
      </Link>
      <Link to={`/cart`} className="text-3xl relative">
        <GiShoppingCart />
        {cartItems.length !== 0 && <span className="bg-red-600 w-3 h-3 rounded-full absolute top-0 right-0"></span>}
      </Link>
      <Link to={`/videos`} className="text-2xl">
        <BiMoviePlay />
      </Link>
      <Link to={`/account`} className="text-2xl">
        <BiUser />
      </Link>
    </footer>
  )
}

export default Footer