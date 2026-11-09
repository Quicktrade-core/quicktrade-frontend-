// src/pages/accountPage/ticketsPage.jsx
import { useContext, useEffect, useState } from "react"
import { useNavigate } from "react-router"
import { BiBell } from "react-icons/bi"
import { FaArrowLeft } from "react-icons/fa"
import { ticketContext } from "../../context/ticketContext"
import { authContext } from "../../context/authContext"
import Scrolltotop from "../../utils/scrolltotop"
import Empty from "../../components/ticket1/empty"
import Tickets from "../../components/ticket1/tickets"

const TicketsPage = () => {
  const navigate = useNavigate()
  const { isAuthenticated } = useContext(authContext)
  const { tickets, loading, error, refreshTickets } = useContext(ticketContext)
  const [status, setStatus] = useState("ACTIVE")

  const toggle = [
    { id: "1", title: "Active", status: "ACTIVE" },
    { id: "2", title: "Used", status: "USED" },
    { id: "3", title: "Expired", status: "EXPIRED" },
  ]

  useEffect(() => {
    if (isAuthenticated) refreshTickets(status)
  }, [isAuthenticated, status, refreshTickets])

  return (
    <main className="bg-white min-h-screen flex flex-col dark:bg-neutral-900 dark:text-white">
      <Scrolltotop />
      <div className="bg-white flex flex-col gap-4 p-4 sticky top-0 shadow-md shadow-neutral-300 dark:bg-neutral-800">
        <div className="flex justify-between items-center">
          <button onClick={() => navigate(-1)} className="cursor-pointer"><FaArrowLeft /></button>
          <p className="text-xl font-bold">Tickets</p>
          <BiBell className="text-xl" />
        </div>
        <div className="flex justify-between gap-2">
          {toggle.map((item) => (
            <button key={item.id} onClick={() => setStatus(item.status)} className={`bg-white w-full py-1 rounded-lg cursor-pointer dark:bg-neutral-900 ${item.status === status && "text-white bg-gradient-to-r from-orange-600 to-orange-400"}`}>
              {item.title}
            </button>
          ))}
        </div>
      </div>
      {!isAuthenticated && (
        <div className="flex-1 flex flex-col items-center justify-center gap-4 py-20">
          <p className="font-bold">Sign in to see your tickets</p>
          <button onClick={() => navigate("/auth")} className="bg-gradient-to-r from-orange-600 to-orange-400 text-white px-6 py-2 rounded-full">Sign in</button>
        </div>
      )}
      {isAuthenticated && loading && <p className="text-center text-neutral-500 py-10">Loading tickets…</p>}
      {isAuthenticated && !loading && error && <p className="text-center text-red-500 py-10">{error}</p>}
      {isAuthenticated && !loading && !error && tickets.length === 0 && <Empty />}
      {isAuthenticated && !loading && !error && tickets.length !== 0 && <Tickets tickets={tickets} />}
    </main>
  )
}

export default TicketsPage