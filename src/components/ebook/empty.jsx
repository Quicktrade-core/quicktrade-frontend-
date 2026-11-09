import books from "../../assets/books.png"

const Empty = () => {
  return (
    <div className="bg-white flex flex-col justify-center items-center py-10 flex-1">
      <div className="w-80 text-center">
        <img src={books} alt="" className="w-2/3 mx-auto" />
        <p className="text-xl font-bold mb-2">No ebooks yet</p>
        <p className="leading-tight">Your available ebooks will appear here for you to read anytime</p>
      </div>
    </div>
  )
}

export default Empty