import { BiX } from "react-icons/bi"
import { useContext, useState } from "react"
import { videoContext } from "../../context/videoContext"
import user from "../../assets/userProfile.jpg"

const VideoComments = ({ video, setShowComments }) => {
  const [input, setInput] = useState(``)
  const { videos, setVideos } = useContext(videoContext)

  const closeComments = () => {
    setShowComments(false)
  }

  const handleSearchInput = (e) => {
    const value = e.target.value
    setInput(value)

    const matches = product_list.filter(product => {
      const name = product.name?.toLowerCase() || ``
      const category = product.category?.toLowerCase() || ``
      return (
        name.split(/\s+/).some(word => word.startsWith(value.trim().toLowerCase())) ||
        category.startsWith(value.trim().toLowerCase())
      )
    })

    setSearchSuggestions(matches)
    //setSearchSuggestions(matches.slice(0, 6))
    input.length === 0 && setSearch(false)
  }

  const handleComment = (e, value) => {
    e.preventDefault()

    // setCartItems(previous => {
    //   const foundItem = previous.find(value => value._id === item._id)
    //   if (foundItem) {
    //     alert(`already added to cart`)
    //     return previous
    //   }

    //   return [...previous, { _id: item._id, name: item.name, image: item.image, price: item.price, quantity: 1 }]
    // })

    const comment = { id: video.comments.length + 1, image: user, name: `John Paul`, time: `just now`, comment: value }

    setVideos(previous => 
      previous.map(vid => 
        vid._id === video._id ? { ...vid, comments: [...vid.comments, comment] } : vid
      )
    )

    setInput(``)
  }

  return (
    <div className="bg-neutral-950/20 text-white h-full w-full flex flex-col absolute bottom-0 overflow-auto overscroll-y-contain z-20">
      <div onClick={closeComments} className="h-1/3"></div>
      <div className="bg-neutral-900 h-2/3 flex flex-col rounded-t-xl">
        <div className="flex justify-between p-4">
          <p className="text-lg font-bold">Comments ({video.comments.length})</p>
          <button className="cursor-pointer">
            <BiX onClick={closeComments} className="text-2xl" />
          </button>
        </div>
        <div className="bg-neutral-950 flex flex-col gap-5 p-4 flex-1 overflow-auto">
          {video.comments.map(comment => (
            <div key={comment.id} className="flex gap-3">
              <img src={comment.image} alt="" className="bg-white w-10 h-10 object-cover rounded-full" />
              <div className="w-full flex flex-col gap-1">
                <p className="flex justify-between items-center">
                  <span className="font-semibold">{comment.name}</span>
                  <span className="text-sm">{comment.time}</span>
                </p>
                <p className="leading-tight">{comment.comment}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="flex items-center gap-4 p-4">
          <img src={user} alt="" className="w-10 h-10 object-cover rounded-full" />
          <form onSubmit={(e) => { handleComment(e, input) }} className="bg-white text-neutral-900 rounded-full w-full">
            <input onChange={handleSearchInput} type="text" name="comment" value={input} placeholder="Add a comment..." className="w-full px-4 py-2 rounded-full outline-none" />
          </form>
        </div>
      </div>
    </div>
  )
}

export default VideoComments