// src/context/ticketContext.jsx
import { createContext, useCallback, useContext, useEffect, useState } from "react"
import { authContext } from "./authContext"

export const ticketContext = createContext()

const TicketProvider = ({ children }) => {
  const { api, isAuthenticated } = useContext(authContext)
  const [tickets, setTickets] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  const refreshTickets = useCallback(async (status = "ACTIVE") => {
    if (!isAuthenticated) { setTickets([]); return }
    setLoading(true); setError("")
    try {
      const res = await api.get("/transactions/tickets/", { params: { status } })
      if (res.data?.success) setTickets(res.data.tickets || [])
      else setError(res.data?.error || "Failed to load tickets")
    } catch (err) {
      setError(err.response?.data?.error || "Network error")
    } finally {
      setLoading(false)
    }
  }, [api, isAuthenticated])

  useEffect(() => { refreshTickets() }, [refreshTickets])

  return (
    <ticketContext.Provider value={{ tickets, setTickets, loading, error, refreshTickets }}>
      {children}
    </ticketContext.Provider>
  )
}

export default TicketProvider