// src/components/productCard.jsx
import { Link } from "react-router"
import { FaStar } from "react-icons/fa"
import { MdLocationOn } from "react-icons/md"
import { FaNairaSign } from "react-icons/fa6"
import FormatPrice from "../utils/formatPrice"

const ProductCard = ({ item }) => {
  const isTicket = item.type === "ticket"

  return (
    <div className="w-2/5 rounded-t-xl relative bg-white shrink-0 dark:bg-neutral-950">
      <Link to={`/product/${item.id}`}>
        <div className="relative">
          <img
            src={item.image_url || "/placeholder.png"}
            alt={item.title}
            className="rounded-t-xl h-35 w-full object-cover"
          />
          {isTicket && (
            <span className="absolute top-2 left-2 bg-orange-600 text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
              TICKET
            </span>
          )}
        </div>
        <div className="flex flex-col gap-2 py-2">
          <p className="font-bold leading-tight truncate">{item.title}</p>
          <div className="flex items-center gap-1">
            <FaStar className="text-amber-400" />
            <p className="text-neutral-500 text-sm dark:text-white">
              {item.seller_rating?.toFixed?.(1) || "4.9"} - {item.views || 0} sold
            </p>
          </div>
          <div className="flex justify-between items-center text-neutral-500 dark:text-white">
            <span className="flex items-center font-semibold">
              <FaNairaSign /> {FormatPrice(parseFloat(item.price))}
            </span>
            {item.distance != null && (
              <span className="flex items-center"><MdLocationOn /> {item.distance} km</span>
            )}
          </div>
        </div>
      </Link>
    </div>
  )
}

export default ProductCard