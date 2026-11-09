import { Link, useNavigate } from "react-router"
import { useContext } from "react"
import { FaArrowLeft } from "react-icons/fa"
import { BiSolidMoviePlay } from "react-icons/bi"
import { savedContext } from "../../context/savedContext"
import Scrolltotop from "../../utils/scrolltotop"
import Saved from "../../components/saved/saved"
import Empty from "../../components/saved/empty"

const SavedPage = () => {
  const navigate = useNavigate()
  const { savedVideos, setSavedVideos } = useContext(savedContext)

  return (
    <main className="bg-white min-h-screen flex flex-col dark:bg-neutral-900 dark:text-white">
      <Scrolltotop />
      <div className="bg-white flex items-center sticky top-0 ps-4 py-4 z-10 shadow-md shadow-neutral-300 dark:bg-neutral-800">
        <button onClick={() => { navigate(-1) }} className="cursor-pointer">
          <FaArrowLeft />
        </button>
        <p className="text-lg font-bold absolute left-1/2 -translate-x-1/2">Saved</p>
      </div>
      {savedVideos.length === 0 && <Empty />}
      {savedVideos.length !== 0 && <Saved savedVideos={savedVideos} />}
      {/* <div className="bg-white flex flex-wrap gap-1 px-1 py-5">
        {savedVideos.map(savedVideo => (
          // <Link to={`/video/${video._id}`} key={video._id} className="relative w-3/7 h-70">
          <Link to={`/videos`} key={savedVideo._id} className="relative width h-45">
            <img src={savedVideo.cover} alt="" className="w-full h-full object-cover rounded-lg" />
            <div className="bg-neutral-950/20 absolute inset-0 rounded-lg"></div>
            <BiSolidMoviePlay className="text-white text-xl absolute top-2 right-2" />
          </Link>
        ))}
      </div> */}
    </main>
  )
}

export default SavedPage