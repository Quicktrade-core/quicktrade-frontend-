// src/pages/cartPage.jsx
import { useContext } from "react"
import { useNavigate } from "react-router"
import { MdDelete } from "react-icons/md"
import { FaArrowLeft } from "react-icons/fa"
import { cartContext } from "../context/cartContext"
import { authContext } from "../context/authContext"
import OrderSummary from "../components/orderSummary"
import CartItem from "../components/cartItem"
import Scrolltotop from "../utils/scrolltotop"
import cart from "../assets/cart.png"

const CartPage = () => {
  const navigate = useNavigate()
  const { cartItems, loading, error, clearCart } = useContext(cartContext)
  const { isAuthenticated } = useContext(authContext)

  const handleClear = async () => {
    if (!confirm("Remove all items from your cart?")) return
    await clearCart()
  }

  return (
    <main className="bg-white min-h-screen flex flex-col dark:bg-neutral-900 dark:text-white">
      <Scrolltotop />
      <div className="bg-white flex justify-between items-center p-4 sticky top-0 shadow-md shadow-neutral-300 dark:bg-neutral-900 dark:shadow-none">
        <button onClick={() => navigate(-1)} className="cursor-pointer">
          <FaArrowLeft />
        </button>
        <p className="text-lg font-bold">Cart ({cartItems.length})</p>
        <button onClick={handleClear} className="cursor-pointer" disabled={!cartItems.length}>
          <MdDelete className={`text-2xl ${!cartItems.length ? "opacity-40" : ""}`} />
        </button>
      </div>

      <div className="bg-white flex flex-col gap-10 px-4 py-5 flex-1 dark:bg-neutral-900">
        <div className="bg-white flex flex-col gap-5 min-h-[50vh] overflow-auto dark:bg-neutral-800">
          {loading && (
            <p className="text-center text-neutral-500 py-10">Loading cart…</p>
          )}

          {!loading && error && (
            <p className="text-center text-red-500 py-10">{error}</p>
          )}

          {!loading && !error && cartItems.length === 0 && (
            <div className="flex flex-col justify-center items-center h-full py-10">
              <img src={cart} alt="" className="w-2/5" />
              <p className="text-lg font-bold">Your cart is empty!</p>
            </div>
          )}

          {!loading && cartItems.map((item) => (
            <CartItem key={item.cart_item_id} item={item} />
          ))}
        </div>

        {/* Order Summary — always visible, even when the cart is empty */}
        <OrderSummary path="/checkout" />

        {!isAuthenticated && (
          <button
            onClick={() => navigate("/auth")}
            className="bg-gradient-to-r from-orange-600 to-orange-400 text-white rounded-xl py-2"
          >
            Sign in to view your cart
          </button>
        )}
      </div>
    </main>
  )
}

export default CartPage