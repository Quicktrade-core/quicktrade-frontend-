import { useState } from "react"
import { MdPerson, MdVerified } from "react-icons/md"
import { Link } from "react-router"

const VideoInfo = ({ video }) => {
  const [following, setFollowing] = useState(false)

  return (
    <div className="bg-neutral-950/50 text-white w-full absolute bottom-[7vh] left-0 px-4 py-2 flex flex-col gap-4">
      <div className="flex justify-between items-center">
        <Link to={`/seller`} className="flex items-center gap-3">
          <img src={video.image} alt={video.name} className="w-10 h-10 object-cover rounded-full" />
          <div className="flex flex-col">
            <p className="font-semibold flex items-center gap-2">
              {video.name}
              <MdVerified className="text-blue-400" />
            </p>
            <p className="text-sm">High ranking seller</p>
          </div>
        </Link>
        <button onClick={() => { setFollowing(previous => !previous) }} className="bg-gradient-to-r from-orange-600 to-orange-400 text-white flex justify-center items-center gap-2 px-4 py-1 rounded-full cursor-pointer">
          <MdPerson className="" /> {following ? `Following` : `follow`}
        </button>
      </div>
      <p className="w-9/10 leading-tight line-clamp-2">{video.caption}</p>
    </div>
  )
}

export default VideoInfo