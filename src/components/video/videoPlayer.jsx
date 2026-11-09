import { Link } from "react-router"
import { useEffect, useRef, useState } from "react"
import { BiPackage } from "react-icons/bi"
import VideoActions from "./videoActions"
import VideoInfo from "./videoInfo"
import VideoComments from "./videoComments"

const VideoPlayer = ({ src, videoData, muted, setMuted }) => {
  const videoRef = useRef(null)
  const [showComments, setShowComments] = useState(false)
  const style = `w-full h-[85vh] object-cover absolute top-1/2 -translate-y-1/2`

  const toggleMute = () => {
    setMuted(previous => !previous)
  }

  useEffect(() => {
    const video = videoRef.current
    const observer = new IntersectionObserver(([entry]) => {
      entry.isIntersecting ? video.play().catch(() => {}) : video.pause()
    }, {
      threshold: 0.7
    })

    observer.observe(video)

    return () => {
      observer.disconnect()
    }
  }, [])

  return (
    <div className="absolute inset-0">

      <video className={style} ref={videoRef} src={src} muted={muted} loop playsInline preload="metadata" />

      <div onClick={toggleMute} className="bg-neutral-950/20 w-full h-[85vh] absolute top-1/2 -translate-y-1/2"></div>

      <Link to={`/product/${videoData._id}`} className="bg-neutral-950/50 text-white absolute left-5 bottom-45 flex items-center gap-2 px-2 py-1 rounded-full">
        <BiPackage className="text-xl" /> view product
      </Link>

      <VideoActions video={videoData} setShowComments={setShowComments} />
      <VideoInfo video={videoData} />
      {showComments && <VideoComments video={videoData} setShowComments={setShowComments} />}
    </div>
  );
}

export default VideoPlayer