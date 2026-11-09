import { createContext, useState } from "react"

export const savedContext = createContext()

const SavedProvider = ({ children }) => {
  const [savedVideos, setSavedVideos] = useState([])

  return (
    <savedContext.Provider value={{ savedVideos, setSavedVideos }}>
      { children }
    </savedContext.Provider>
  )
}

export default SavedProvider