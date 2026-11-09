import { createContext, useState } from "react"
import { BiInfoCircle } from "react-icons/bi"
import { FcAdvertising } from "react-icons/fc"
import { GiBuyCard } from "react-icons/gi"
import { GrNew } from "react-icons/gr"
import { MdNearMe, MdPayment } from "react-icons/md"
import { TbMenuOrder } from "react-icons/tb"

export const notificationContext = createContext()

const NotificationProvider = ({ children }) => {
  const [notifications, setNotifications] = useState([
    { id: `1`, status: `New`, image: <TbMenuOrder className="bg-gradient-to-t from-sky-600 to-sky-400 text-white text-5xl p-1 rounded-lg" />, date: `Oct 7, 2026`, title: `Your order has arrived Your order has arrived Your order has arrived`, subtitle: `Lorem ipsum dolor sit amet consectetur adipisicing elit.`, content: `Lorem ipsum dolor sit amet consectetur adipisicing elit. Unde eligendi soluta nisi rerum voluptates harum odit facilis qui enim quae.` },
    { id: `2`, status: `New`, image: <MdPayment className="bg-gradient-to-t from-orange-600 to-orange-400 text-white text-5xl p-1 rounded-lg" />, date: `Aug 11, 2026`, title: `Payment verified`, subtitle: `Lorem ipsum dolor sit amet consectetur adipisicing elit.`, content: `Lorem ipsum dolor sit amet consectetur adipisicing elit. Unde eligendi soluta nisi rerum voluptates harum odit facilis qui enim quae.` },
    { id: `3`, status: `Read`, image: <FcAdvertising className="bg-white text-5xl p-1 rounded-lg" />, date: `Jun 6, 2026`, title: `New promo just for you`, subtitle: `Lorem ipsum dolor sit amet consectetur adipisicing elit.`, content: `Lorem ipsum dolor sit amet consectetur adipisicing elit. Unde eligendi soluta nisi rerum voluptates harum odit facilis qui enim quae.` },
    { id: `4`, status: `Read`, image: <MdNearMe className="bg-gradient-to-t from-violet-600 to-violet-400 text-white text-5xl p-1 rounded-lg" />, date: `Feb 27, 2026`, title: `Check out products near you`, subtitle: `Lorem ipsum dolor sit amet consectetur adipisicing elit.`, content: `Lorem ipsum dolor sit amet consectetur adipisicing elit. Unde eligendi soluta nisi rerum voluptates harum odit facilis qui enim quae.` },
    { id: `5`, status: `Read`, image: <GrNew className="bg-gradient-to-t from-red-600 to-red-400 text-white text-5xl p-1 rounded-lg" />, date: `Feb 3, 2026`, title: `A new product just arrived`, subtitle: `Lorem ipsum dolor sit amet consectetur adipisicing elit.`, content: `Lorem ipsum dolor sit amet consectetur adipisicing elit. Unde eligendi soluta nisi rerum voluptates harum odit facilis qui enim quae.` },
    { id: `6`, status: `Read`, image: <GiBuyCard className="bg-gradient-to-t from-orange-600 to-orange-400 text-white text-5xl p-1 rounded-lg" />, date: `Dec 12, 2025`, title: `People are buying these products`, subtitle: `Lorem ipsum dolor sit amet consectetur adipisicing elit.`, content: `Lorem ipsum dolor sit amet consectetur adipisicing elit. Unde eligendi soluta nisi rerum voluptates harum odit facilis qui enim quae.` }
  ])

  return (
    <notificationContext.Provider value={{ notifications, setNotifications }}>
      { children }
    </notificationContext.Provider>
  )
}

export default NotificationProvider