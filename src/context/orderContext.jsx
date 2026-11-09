import { createContext, useState } from "react"

export const orderContext = createContext()

const OrderProvider = ({ children }) => {
  const [orders, setOrders] = useState([
    { id: `1`, orderId: `#100100`, date: `2 Feb 2026, 10:27 AM`, amount: `$245.92`, status: `Processing` },
    { id: `2`, orderId: `#100170`, date: `28 Feb 2026, 6:02 PM`, amount: `$165.25`, status: `Delivered` },
    { id: `3`, orderId: `#100130`, date: `3 June 2026, 8:48 AM`, amount: `$120.95`, status: `Cancelled` },
    { id: `4`, orderId: `#100160`, date: `2 Feb 2026, 10:27 AM`, amount: `$245.92`, status: `Delivered` },
    { id: `5`, orderId: `#100140`, date: `9 Aug 2026, 4:16 PM`, amount: `$212.49`, status: `Cancelled` },
    { id: `6`, orderId: `#100150`, date: `20 Aug 2026, 9:10 AM`, amount: `$88.62`, status: `Delivered` }
  ])

  return (
    <orderContext.Provider value={{ orders, setOrders }}>
      { children }
    </orderContext.Provider>
  )
}

export default OrderProvider