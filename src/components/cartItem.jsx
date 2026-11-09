// src/components/cartItem.jsx
import { useContext, useState } from "react"
import { cartContext } from "../context/cartContext"
import { BiMinus, BiPlus, BiX } from "react-icons/bi"
import { Link } from "react-router"
import FormatPrice from "../utils/formatPrice"
import { FaNairaSign } from "react-icons/fa6"

const CartItem = ({ item }) => {
  const { updateQuantity, removeFromCart } = useContext(cartContext)
  const [busy, setBusy] = useState(false)

  const listing = item.listing
  const lineTotal = parseFloat(item.line_buyer_total || 0)

  const changeQty = async (newQty) => {
    if (busy) return
    setBusy(true)
    await updateQuantity(item.cart_item_id, newQty)
    setBusy(false)
  }

  const handleRemove = async () => {
    if (busy) return
    setBusy(true)
    await removeFromCart(item.cart_item_id)
    setBusy(false)
  }

  return (
    <div className={`flex gap-5 ${busy ? "opacity-60" : ""}`}>
      <Link to={`/product/${listing.id}`} className="w-1/3 h-20">
        <img src={listing.image_url || "/placeholder.png"} alt={listing.title} className="w-full h-full object-cover rounded-xl" />
      </Link>
      <div className="w-2/3 flex flex-col justify-between">
        <div className="flex justify-between items-center gap-5">
          <p className="leading-tight truncate">{listing.title}</p>
          <button className="cursor-pointer" onClick={handleRemove} disabled={busy}>
            <BiX className="text-2xl" />
          </button>
        </div>
        <div className="flex justify-between items-center">
          <div className="w-1/2 flex flex-col">
            <p className="font-semibold flex items-center">
              <FaNairaSign />{FormatPrice(parseFloat(listing.buyer_price || listing.price || 0))}
            </p>
            {item.quantity > 1 && (
              <p className="text-xs text-neutral-500 flex items-center gap-1">
                Total: <FaNairaSign className="text-[10px]" />{FormatPrice(lineTotal)}
              </p>
            )}
          </div>
          <div className="flex justify-between items-center border-2 border-neutral-200 dark:border-neutral-700 rounded-full w-1/2 px-2">
            <button className="cursor-pointer" onClick={() => changeQty(item.quantity - 1)} disabled={busy}>
              <BiMinus />
            </button>
            {item.quantity}
            <button className="cursor-pointer" onClick={() => changeQty(item.quantity + 1)} disabled={busy}>
              <BiPlus />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CartItem