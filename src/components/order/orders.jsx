import { BsBagCheck } from "react-icons/bs"
import { Link } from "react-router"

const Orders = ({ orders }) => {
  const statusStyle = {
    Processing: `bg-orange-200 text-orange-500`,
    Delivered: `bg-green-200 text-green-500`,
    Cancelled: `bg-red-200 text-red-500`
  }

  return (
    <div className="bg-white flex flex-col gap-5 px-4 py-5 flex-1">
      {orders.map(order => (
        <Link key={order.id} to={`/order/${order.id}`} className="bg-white flex flex-col gap-3 p-3 rounded-xl shadow-md shadow-neutral-300 dark:bg-neutral-800">
          <div className="flex items-center gap-3 pb-3 border-b border-b-neutral-300">
            <BsBagCheck className="text-xl" />
            <p className="font-bold flex items-center">Order ID {order.orderId}</p>
          </div>
          <div className="flex justify-between items-end">
            <div className="flex flex-col gap-1">
              <p>{order.amount}</p>
              <p>{order.date}</p>
            </div>
            <span className={`${statusStyle[order.status]} px-2`}>{order.status}</span>
          </div>
        </Link>
      ))}
    </div>
  )
}

export default Orders