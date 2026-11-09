import { useContext, useState } from "react"
import { FaComment, FaHeart, FaPaperPlane } from "react-icons/fa"
import { TbBookmarkFilled } from "react-icons/tb"
import { videoContext } from "../../context/videoContext"
import { savedContext } from "../../context/savedContext"

const VideoActions = ({ video, setShowComments }) => {
  const { videos, setVideos } = useContext(videoContext)
  const { savedVideos, setSavedVideos } = useContext(savedContext)

  // const [like, setLike] = useState(false)
  const style = `text-white flex flex-col items-center cursor-pointer`

  const likedVideo = videos.find(vid => vid._id === video._id)
  const handleLike = () => {
    setVideos(previous =>
      previous.map(vid => {
        if (vid._id !== video._id) return vid

        const liked = !vid.liked
        return {
          ...vid, liked, likes: vid.likes + (liked ? 1 : -1)
        }
      })
    )
  }

  const openComments = () => {
    setShowComments(true)
  }

  const savedVideo = savedVideos.find(vid => vid._id === video._id)
  const handleSave = (e, value) => {
    setSavedVideos(previous =>
      previous.some(vid => vid._id === video._id)
      ? previous.filter(vid => vid._id !== video._id) : [...previous, video]
    )

    setVideos(previous =>
      previous.map(vid =>
        vid._id === video._id ? { ...vid, save: vid.save + (savedVideo ? -1 : 1) } : vid
      )
    )
  }

  const handleShare = async () => {
    const videoUrl = `${window.location.origin}/videos/${video._id}`

    const shareData = {
      // title: video.caption || `Check out this product`,
      text: `Check out this product`,
      url: videoUrl
    }

    try {
      if (navigator.share) {
        await navigator.share(shareData)
      } else {
        await navigator.clipboard.writeText(videoUrl)
      }
    } catch (error) {
      if (error.name !== `AbortError`) {
        console.error(`Sharing failed: ${error}`)
      }
    }
  }

  return (
    <div className="absolute right-5 bottom-45 flex flex-col gap-5">
      {/* <button onClick={() => { setLike(previous => !previous) }} className={`${style}`}> */}
      <button onClick={handleLike} className={`${style}`}>
        {likedVideo.liked ? <FaHeart className="text-red-600 text-xl" /> : <FaHeart className="text-xl" />}
        <span>{video.likes}</span>
      </button>
      <button onClick={openComments} className={`${style}`}>
        <FaComment className="text-xl" />
        <span>{video.comments.length}</span>
      </button>
      <button onClick={handleSave} className={`${style}`}>
        {savedVideo ? <TbBookmarkFilled className="text-orange-600 text-xl" /> : <TbBookmarkFilled className="text-xl" />}
        <span>{video.save}</span>
      </button>
      <button onClick={handleShare} className={`${style}`}>
        <FaPaperPlane className="text-xl" />
        <span>{video.share}</span>
      </button>
    </div>
  )
}

export default VideoActions