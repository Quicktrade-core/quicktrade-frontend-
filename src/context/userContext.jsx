// src/context/userContext.jsx
import { createContext, useContext, useEffect, useState } from "react"
import { authContext } from "./authContext"

export const userContext = createContext()

const UserProvider = ({ children }) => {
  const { user, isAuthenticated, refreshUser } = useContext(authContext)

  const [profileImage, setProfileImage] = useState(null)
  const [deliveryAddress, setDeliveryAddress] = useState("No address on file")

  // Mirror the real user for legacy consumers
  const userData = {
    fullName: user
      ? `${user.first_name || ""} ${user.last_name || ""}`.trim() || user.email
      : "Guest",
    phoneNumber: user?.phone || "",
    email: user?.email || "",
    address: user?.profile?.location || "",
  }

  useEffect(() => {
    if (isAuthenticated) refreshUser()
  }, [isAuthenticated, refreshUser])

  return (
    <userContext.Provider value={{ profileImage, setProfileImage, deliveryAddress, setDeliveryAddress, userData, setUserData: () => {} }}>
      {children}
    </userContext.Provider>
  )
}

export default UserProvider