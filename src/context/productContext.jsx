import { createContext, useState } from "react"

export const productContext = createContext()

const ProductProvider = ({ children }) => {
  const [recentSearches, setRecentSearches] = useState([])
  const [searchSuggestions, setSearchSuggestions] = useState([])
  const [searchResults, setSearchResults] = useState([])

  const value = { recentSearches, setRecentSearches, searchSuggestions, setSearchSuggestions, searchResults, setSearchResults }

  return (
    <productContext.Provider value={value}>
      { children }
    </productContext.Provider>
  )
}

export default ProductProvider