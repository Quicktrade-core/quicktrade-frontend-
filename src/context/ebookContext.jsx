import { createContext, useState } from "react"

export const ebookContext = createContext()

const EbookProvider = ({ children }) => {
  const [ebooks, setEbooks] = useState([])

  return (
    <ebookContext.Provider value={{ ebooks, setEbooks }}>
      { children }
    </ebookContext.Provider>
  )
}

export default EbookProvider