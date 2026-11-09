// src/context/cartContext.jsx
import { createContext, useCallback, useContext, useEffect, useState } from "react"
import { authContext } from "./authContext"

export const cartContext = createContext()

const CartProvider = ({ children }) => {
  const { api, isAuthenticated } = useContext(authContext)

  const [cartItems, setCartItems] = useState([])
  const [subtotal, setSubtotal] = useState("0.00")
  const [buyerFeesTotal, setBuyerFeesTotal] = useState("0.00")
  const [delivery, setDelivery] = useState("0.00")
  const [grandTotal, setGrandTotal] = useState("0.00")
  const [cartCount, setCartCount] = useState(0)
  const [ticketCount, setTicketCount] = useState(0)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  const refreshCart = useCallback(async () => {
    if (!isAuthenticated) {
      setCartItems([])
      setSubtotal("0.00"); setBuyerFeesTotal("0.00"); setDelivery("0.00"); setGrandTotal("0.00")
      setCartCount(0)
      return
    }
    setLoading(true); setError("")
    try {
      const res = await api.get("/transactions/cart/")
      if (res.data?.success) {
        setCartItems(res.data.items || [])
        setSubtotal(res.data.subtotal || "0.00")
        setBuyerFeesTotal(res.data.buyer_fees_total || "0.00")
        setDelivery(res.data.delivery || "0.00")
        setGrandTotal(res.data.grand_total || "0.00")
        setCartCount((res.data.items || []).reduce((s, i) => s + (i.quantity || 0), 0))
      } else {
        setError(res.data?.error || "Failed to load cart")
      }
    } catch (err) {
      if (err.response?.status !== 401) setError("Network error loading cart")
      else {
        setCartItems([]); setCartCount(0)
        setSubtotal("0.00"); setBuyerFeesTotal("0.00"); setDelivery("0.00"); setGrandTotal("0.00")
      }
    } finally {
      setLoading(false)
    }
  }, [api, isAuthenticated])

  const refreshTicketCount = useCallback(async () => {
    if (!isAuthenticated) { setTicketCount(0); return }
    try {
      const res = await api.get("/transactions/tickets/count/")
      if (res.data?.success) setTicketCount(res.data.data.active_tickets || 0)
    } catch {
      setTicketCount(0)
    }
  }, [api, isAuthenticated])

  useEffect(() => {
    refreshCart()
    refreshTicketCount()
  }, [refreshCart, refreshTicketCount])

  const addToCart = async (listingId, quantity = 1) => {
    if (!isAuthenticated) return { success: false, error: "Please sign in first.", code: "NOT_AUTHENTICATED" }
    try {
      const res = await api.post(`/transactions/cart/add/${listingId}/`, { quantity })
      if (res.data?.success) await refreshCart()
      return { success: res.data?.success, data: res.data }
    } catch (err) {
      return { success: false, error: err.response?.data?.error || "Could not add to cart" }
    }
  }

  const updateQuantity = async (cartItemId, quantity) => {
    try {
      const res = await api.post(`/transactions/cart/update/${cartItemId}/`, { quantity })
      if (res.data?.success) await refreshCart()
      return { success: res.data?.success, data: res.data }
    } catch (err) {
      return { success: false, error: err.response?.data?.error || "Could not update quantity" }
    }
  }

  const removeFromCart = async (cartItemId) => {
    try {
      const res = await api.post(`/transactions/cart/remove/${cartItemId}/`)
      if (res.data?.success) await refreshCart()
      return { success: res.data?.success, data: res.data }
    } catch (err) {
      return { success: false, error: err.response?.data?.error || "Could not remove item" }
    }
  }

  const clearCart = async () => {
    try {
      const res = await api.post("/transactions/cart/clear/")
      if (res.data?.success) await refreshCart()
      return { success: res.data?.success, data: res.data }
    } catch (err) {
      return { success: false, error: err.response?.data?.error || "Could not clear cart" }
    }
  }

  return (
    <cartContext.Provider value={{
      cartItems, subtotal, buyerFeesTotal, delivery, grandTotal,
      cartCount, ticketCount,
      loading, error,
      addToCart, updateQuantity, removeFromCart, clearCart,
      refreshCart, refreshTicketCount,
    }}>
      {children}
    </cartContext.Provider>
  )
}

export default CartProvider