import { BiSolidMoviePlay } from "react-icons/bi"
import { Link } from "react-router"

const Saved = ({ savedVideos }) => {
  return (
    <div className="bg-white flex flex-wrap gap-1 px-1 py-5">
      {savedVideos.map(savedVideo => (
        <Link to={`/videos`} key={savedVideo._id} className="relative width h-45">
          <img src={savedVideo.cover} alt="" className="w-full h-full object-cover rounded-lg" />
          <div className="bg-neutral-950/20 absolute inset-0 rounded-lg"></div>
          <BiSolidMoviePlay className="text-white text-xl absolute top-2 right-2" />
        </Link>
      ))}
    </div>
  )
}

export default Saved