// src/components/ticket1/tickets.jsx
import { Link } from "react-router"
import { MdLocationOn, MdVerified } from "react-icons/md"
import { SlCalender } from "react-icons/sl"
import { FaCheckCircle, FaClock } from "react-icons/fa"

const STATUS_STYLE = {
  ACTIVE: "bg-green-200 text-green-500",
  USED: "bg-neutral-200 text-neutral-600",
  EXPIRED: "bg-red-200 text-red-500",
}
const STATUS_ICON = {
  ACTIVE: <MdVerified className="text-lg" />,
  USED: <FaCheckCircle className="text-xs" />,
  EXPIRED: <FaClock className="text-xs" />,
}

function fmt(d) {
  if (!d) return "TBA"
  try {
    return new Date(d).toLocaleString(undefined, { month: "short", day: "numeric", hour: "2-digit", minute: "2-digit" })
  } catch { return d }
}

const Tickets = ({ tickets }) => {
  if (!tickets || tickets.length === 0) {
    return <p className="text-center py-10 text-neutral-500">No tickets</p>
  }

  return (
    <div className="flex flex-col gap-5 px-4 py-5">
      {tickets.map((ticket) => {
        const e = ticket.event
        return (
          <Link to={`/tickets/${ticket.id}`} key={ticket.id} className="bg-white text-neutral-600 text-sm flex gap-3 p-2 rounded-xl shadow-md shadow-neutral-300 dark:bg-neutral-800">
            <img src={e.image_url || "/placeholder.png"} alt={e.event_name} className="w-1/3 h-30 object-cover rounded-xl" />
            <div className="w-2/3 min-w-0 flex flex-col justify-between items-start gap-1">
              <div className="w-full flex items-center gap-3">
                <p className="text-neutral-950 text-lg font-bold truncate dark:text-white">{e.event_name}</p>
                <span className={`${STATUS_STYLE[ticket.status]} flex items-center gap-1 px-2 rounded-full`}>
                  {STATUS_ICON[ticket.status]} {ticket.status}
                </span>
              </div>
              {ticket.tier_badge && (
                <span className="bg-orange-200 text-orange-500 px-2 rounded-full">{ticket.tier_badge}</span>
              )}
              <p className="flex items-center gap-2"><SlCalender /> {fmt(e.event_date)}</p>
              {e.event_venue && <p className="flex items-center gap-1 truncate"><MdLocationOn className="text-lg" /> {e.event_venue}</p>}
              <span className="text-xs">#{ticket.short_id}</span>
            </div>
          </Link>
        )
      })}
    </div>
  )
}

export default Tickets