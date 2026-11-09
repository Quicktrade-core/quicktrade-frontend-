import { createContext, useState } from "react"
import { video_list } from "../assets/assets"

export const videoContext = createContext()

const VideoProvider = ({ children }) => {
  const [videos, setVideos] = useState(video_list)

  return (
    <videoContext.Provider value={{ videos, setVideos }}>
      { children }
    </videoContext.Provider>
  )
}

export default VideoProvider