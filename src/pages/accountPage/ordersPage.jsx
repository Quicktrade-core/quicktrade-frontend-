import { useContext, useState } from "react"
import { useNavigate } from "react-router"
import { BiBox } from "react-icons/bi"
import { FaArrowLeft } from "react-icons/fa"
import { orderContext } from "../../context/orderContext"
import Orders from "../../components/order/orders"
import Empty from "../../components/order/empty"
import Scrolltotop from "../../utils/scrolltotop"

const OrdersPage = () => {
  const navigate = useNavigate()
  const [status, setStatus] = useState(`All`)
  const { orders, setOrders } = useContext(orderContext)

  const toggle = [
    { id: `1`, title: `All`, status: `All` },
    { id: `2`, title: `Active`, status: `Processing` },
    { id: `3`, title: `Delivered`, status: `Delivered` },
    { id: `4`, title: `Cancelled`, status: `Cancelled` }
  ]

  const filteredOrders = status === `All` ? orders : orders.filter(order => order.status === status)

  return (
    <main className="bg-white min-h-screen flex flex-col dark:bg-neutral-900 dark:text-white">
      <Scrolltotop />
      <div className="bg-white flex flex-col gap-4 p-4 sticky top-0 shadow-md shadow-neutral-300">
        <div className="flex justify-between items-center dark:bg-neutral-800">
          <button onClick={() => { navigate(-1) }} className="cursor-pointer">
            <FaArrowLeft />
          </button>
          <p className="text-xl font-bold">Orders</p>
          <BiBox className="text-xl" />
        </div>
        <div className="flex justify-between gap-2">
          {toggle.map(item => (
            <button key={item.id} onClick={() => { setStatus(item.status) }} className={`bg-white w-full py-1 rounded-lg cursor-pointer ${item.status === status && 'text-white bg-gradient-to-r from-orange-600 to-orange-400'}`}>{item.title}</button>
          ))}
        </div>
      </div>
      {orders.length === 0 && <Empty />}
      {orders.length !== 0 && <Orders orders={filteredOrders} />}
    </main>
  )
}

export default OrdersPage