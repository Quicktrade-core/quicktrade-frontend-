import orders from "../../assets/orders.png"

const Empty = () => {
  return (
    <div className="bg-white flex flex-col justify-center items-center py-10 flex-1">
      <div className="w-80 text-center">
        <img src={orders} alt="" className="w-1/2 mx-auto" />
        <p className="text-xl font-bold mb-2">No orders yet</p>
        <p className="leading-tight">Your orders will appear here once you place them</p>
      </div>
    </div>
  )
}

export default Empty