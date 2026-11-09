import { useContext, useState } from 'react'
import { BiHistory, BiX } from 'react-icons/bi'
import { productContext } from '../../context/productContext'

const RecentSearches = ({ handleSearch }) => {
  const { recentSearches, setRecentSearches } = useContext(productContext)

  const deleteAll = () => {
    setRecentSearches([])
  }

  const deleteSearch = (id) => {
    setRecentSearches(previous => previous.filter(value => value.id !== id))
  }

  return (
    <div className="flex flex-col gap-3">
      <div className="flex justify-between">
        <p className="font-bold">Recent searches</p>
        <button onClick={deleteAll} className="text-orange-400 cursor-pointer">Clear all</button>
      </div>
      <div className="flex flex-col gap-3">
        {recentSearches.map(value => (
          <button key={value.id}  className="flex justify-between items-center">
            <p onClick={() => { handleSearch(value.title) }} className="flex items-center gap-2 cursor-pointer">
              <BiHistory className="text-lg" />
              {value.title}
            </p>
            <BiX onClick={() => { deleteSearch(value.id) }} className="text-lg cursor-pointer" />
          </button>
        ))}
      </div>
    </div>
  )
}

export default RecentSearches