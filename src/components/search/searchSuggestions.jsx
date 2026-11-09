import { useContext } from "react"
import { BiSearch } from "react-icons/bi"
import { productContext } from "../../context/productContext"

const SearchSuggestions = ({ handleSearch }) => {
  const { searchSuggestions } = useContext(productContext)

  if (searchSuggestions.length === 0) {
    return null
  }

  return (
    <div className="flex flex-col gap-3 p-4 rounded-3xl max-h-60 overflow-auto shadow-md shadow-neutral-300">
      {searchSuggestions.map(value => (
        <button key={value.id} onClick={() => { handleSearch(value.name) }} className="flex items-center gap-2 cursor-pointer">
          <BiSearch className="text-lg" /> {value.name}
        </button>
      ))}
    </div>
  )
}

export default SearchSuggestions