import { Link } from "react-router"
import { FaStar } from "react-icons/fa"
import { BsArrowRight } from "react-icons/bs"
import { product_list } from "../../assets/assets"

const Ebooks = ({ ebooks }) => {
  return (
    <div className="flex flex-col gap-5 px-4 py-5">
      {product_list.map(product => (
        <Link to={`/product/${product._id}`} key={product._id} className="bg-white flex gap-4 p-2 rounded-xl shadow-md shadow-neutral-300 dark:bg-neutral-800">
          <img src={product.image} alt="" className="w-1/3 h-30 object-cover rounded-xl" />
          <div className="w-2/3 min-w-0 flex flex-col justify-between">
            <div className="flex flex-col">
              <p className="text-lg font-bold truncate">The darkest hour.</p>
              <p className="text-neutral-500 font-semibold">Danile Obi</p>
            </div>
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-1">
                <FaStar className="text-amber-400" />
                <FaStar className="text-amber-400" />
                <FaStar className="text-amber-400" />
                <FaStar className="text-amber-400" />
                <FaStar className="text-neutral-300" />
              </div>
              <Link to={`/`} className="text-orange-600 flex items-center gap-2">
                <span className="text-md">Read</span>
                <BsArrowRight className="text-lg" />
              </Link>
            </div>
          </div>
        </Link>
      ))}
    </div>
  )
}

export default Ebooks