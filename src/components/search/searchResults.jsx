import { Link } from 'react-router'
import { FaStar } from 'react-icons/fa'
import { MdLocationOn } from 'react-icons/md'
import { useContext } from 'react'
import { productContext } from '../../context/productContext'
import { FaNairaSign } from 'react-icons/fa6'
import FormatPrice from '../../utils/formatPrice'

const SearchResults = () => {
  const { searchResults } = useContext(productContext)

  return (
    <div className="bg-white flex flex-col gap-5 flex-1">
      {searchResults.map(product => (
        <Link key={product._id} to={`/product/${product._id}`} className="bg-white flex gap-3 p-3 rounded-xl shadow-md shadow-neutral-300 dark:bg-neutral-800">
          <img src={product.image} alt={product.name} className="w-2/7 h-20 object-cover rounded-xl" />
          <div className="w-3/7 flex flex-col justify-between">
            <p className="font-bold leading-tight truncate">{product.name}</p>
            <div className="flex items-center gap-1">
              <FaStar className="text-amber-400" />
              <p className="text-neutral-500 text-sm dark:text-white">4.9 - 36 sold</p>
            </div>
            <p className="flex items-center text-neutral-500 dark:text-white"><MdLocationOn /> 10 km</p>
          </div>
          <p className="w-2/7 flex items-center self-start text-lg font-semibold"><FaNairaSign /> {FormatPrice(product.price)}</p>
        </Link>
      ))}
    </div>
  )
}

export default SearchResults