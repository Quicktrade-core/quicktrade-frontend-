import ticket from "../../assets/ticket.png"

const Empty = () => {
  return (
    <div className="bg-white flex flex-col justify-center items-center py-10 flex-1">
      <div className="w-80 text-center">
        <img src={ticket} alt="" className="w-1/2 mx-auto" />
        <p className="text-xl font-bold mb-2">No tickets yet</p>
        <p className="leading-tight">Your available tickets will appear here for you to use anytime</p>
      </div>
    </div>
  )
}

export default Empty