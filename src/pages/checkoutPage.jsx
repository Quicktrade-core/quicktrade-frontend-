// src/pages/checkoutPage.jsx
import { useContext, useState } from "react"
import { useNavigate } from "react-router"
import { FaArrowLeft } from "react-icons/fa"
import { MdLocationOn } from "react-icons/md"
import { BsBank, BsCircleFill, BsCreditCard } from "react-icons/bs"
import { BiCircle, BiWallet } from "react-icons/bi"
import { LuCircle } from "react-icons/lu"
import { authContext } from "../context/authContext"
import { cartContext } from "../context/cartContext"
import OrderSummary from "../components/orderSummary"
import Scrolltotop from "../utils/scrolltotop"
import card from "../assets/card2.jpg"

const CheckoutPage = () => {
  const navigate = useNavigate()
  const { user, isAuthenticated } = useContext(authContext)
  const { cartItems } = useContext(cartContext)
  const [paymentType, setPaymentType] = useState("wallet")

  const payments = [
    { id: "1", title: "Quicktrade Wallet", type: "wallet", icon: BiWallet },
    { id: "2", title: "Credit / Debit Card", type: "card", icon: BsCreditCard },
    { id: "3", title: "Bank Transfer", type: "bank", icon: BsBank },
    { id: "4", title: "Opay", type: "opay", icon: LuCircle },
  ]

  const handlePay = () => {
    if (!isAuthenticated) { navigate("/auth"); return }
    alert("Payment will be wired to Paystack in the next iteration. Cart has " + cartItems.length + " item(s).")
  }

  return (
    <main className="bg-white min-h-screen flex flex-col dark:bg-neutral-900 dark:text-white">
      <Scrolltotop />
      <div className="bg-white flex items-center sticky top-0 ps-4 py-4 z-10 shadow-md shadow-neutral-300 dark:bg-neutral-800">
        <button onClick={() => navigate(-1)} className="cursor-pointer"><FaArrowLeft /></button>
        <p className="text-lg font-bold absolute left-1/2 -translate-x-1/2">Checkout</p>
      </div>
      <div className="bg-white flex flex-col gap-10 px-4 py-5 flex-1 dark:bg-neutral-900">
        <img src={card} alt="" className="w-full h-50 rounded-2xl shadow-md shadow-neutral-300" />
        <div className="flex flex-col gap-4 p-4 rounded-xl shadow-md shadow-neutral-300 dark:bg-neutral-800">
          <p className="font-bold">Delivery Address</p>
          <div className="flex items-center gap-4">
            <MdLocationOn className="bg-orange-100 text-orange-500 text-5xl p-1 rounded-xl" />
            <div className="w-2/3 flex flex-col">
              <p className="font-bold">{user ? `${user.first_name || ""} ${user.last_name || ""}`.trim() || user.email : "Guest"}</p>
              <p className="leading-tight">{user?.profile?.location || "No address on file"}</p>
            </div>
            <button onClick={() => navigate("/profile")} className="text-orange-500 cursor-pointer">Edit</button>
          </div>
        </div>
        <div className="flex flex-col gap-4">
          <p className="font-bold">Payment Method</p>
          <div className="bg-neutral-200 flex flex-col gap-0.5 rounded-xl overflow-hidden shadow-md shadow-neutral-300 dark:bg-neutral-800">
            {payments.map((payment) => (
              <button key={payment.id} onClick={() => setPaymentType(payment.type)} className={`bg-white flex justify-between items-center p-4 cursor-pointer dark:bg-neutral-900 ${paymentType === payment.type && "font-bold"}`}>
                <span className="flex items-center gap-3">
                  <payment.icon className={`bg-neutral-200 text-4xl p-2 rounded-xl ${paymentType === payment.type && "bg-orange-100 text-orange-500"}`} />
                  {payment.title}
                </span>
                {paymentType === payment.type ? <BsCircleFill className="text-xl text-orange-500" /> : <BiCircle className="text-xl" />}
              </button>
            ))}
          </div>
        </div>
        <OrderSummary path="#pay" />
        <button onClick={handlePay} className="bg-gradient-to-b from-orange-600 to-orange-400 text-white rounded-xl py-2">Pay now</button>
      </div>
    </main>
  )
}

export default CheckoutPage