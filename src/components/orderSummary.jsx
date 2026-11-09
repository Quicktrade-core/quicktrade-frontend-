// src/components/orderSummary.jsx
import { Link } from "react-router"
import FormatPrice from "../utils/formatPrice"
import { FaNairaSign } from "react-icons/fa6"
import { useContext } from "react"
import { cartContext } from "../context/cartContext"

const OrderSummary = ({ path }) => {
  const { cartItems, subtotal, buyerFeesTotal, delivery, grandTotal } = useContext(cartContext)

  const rows = [
    { id: 1, title: "Subtotal", value: parseFloat(subtotal || 0) },
    { id: 2, title: "Buyer escrow fee", value: parseFloat(buyerFeesTotal || 0) },
    { id: 3, title: "Delivery", value: parseFloat(delivery || 0) },
    { id: 4, title: "Total", value: parseFloat(grandTotal || 0) },
  ]

  return (
    <div className="bg-white flex flex-col gap-4 p-4 rounded-xl shadow-md shadow-neutral-300 dark:bg-neutral-800">
      <p className="text-xl font-bold">Order Summary</p>

      <div className="flex flex-col gap-2">
        {rows.map((row) => (
          <div
            key={row.id}
            className={`flex justify-between ${
              row.id === 4
                ? "border-t pt-2 border-neutral-300 dark:border-neutral-600"
                : ""
            }`}
          >
            <span className={row.id === 4 ? "font-bold" : "font-semibold"}>
              {row.title}
            </span>
            <span className="flex items-center">
              <FaNairaSign />
              {FormatPrice(row.value)}
            </span>
          </div>
        ))}
      </div>

      {/* Checkout button only shows when there's something to check out */}
      {cartItems.length > 0 && (
        <Link
          to={path}
          className="bg-gradient-to-b from-orange-600 to-orange-400 text-white text-center rounded-full w-full py-2"
        >
          Checkout now
        </Link>
      )}
    </div>
  )
}

export default OrderSummary