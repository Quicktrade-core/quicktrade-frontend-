import { FaStar } from "react-icons/fa"
import { MdVerified } from "react-icons/md"
import { Link } from "react-router"
import { product_list } from "../../assets/assets"
import FormatPrice from "../../utils/formatPrice"
import { FaNairaSign } from "react-icons/fa6"

const Products = () => {
  return (
    <div className="flex flex-col gap-4 p-4">
      {product_list.map(product => (
        <Link to={`/product/${product._id}`} key={product._id} className="bg-white flex gap-4 p-2 rounded-xl shadow-md shadow-neutral-300 dark:bg-neutral-800">
          <img src={product.image} alt="" className="w-1/4 h-20 object-cover rounded-xl" />
          <div className="w-3/4 flex flex-col justify-between">
            <div className="flex justify-between">
              <span className="bg-green-200 text-green-500 flex items-center gap-1 px-2 rounded-full">
                <MdVerified className="text-green-500 text-lg" /> Active
              </span>
              <div className="flex items-center gap-1">
                <FaStar className="text-amber-400" />
                <p className="text-neutral-500 text-sm dark:text-white">4.9 - 36 sold</p>
              </div>
            </div>
            <p className="font-bold">{product.name}</p>
            <div className="flex justify-between">
              <span className="flex items-center font-bold"><FaNairaSign /> {FormatPrice(product.price)}</span>
              <span className="text-neutral-500 dark:text-white">42 stocks</span>
            </div>
          </div>
        </Link>
        ))}
    </div>
  )
}

export default Products