// src/components/heroBanner.jsx
import { useEffect, useRef, useState } from "react"
import { Link } from "react-router"
import { FaCalendarAlt, FaMapMarkerAlt, FaVolumeMute, FaVolumeUp } from "react-icons/fa"
import { FaNairaSign } from "react-icons/fa6"
import FormatPrice from "../utils/formatPrice"

const HeroBanner = ({ slides }) => {
  const [current, setCurrent] = useState(0)
  const [showCard, setShowCard] = useState(false)
  const [isMuted, setIsMuted] = useState(true)
  const foregroundRef = useRef(null)
  const backdropRef = useRef(null)
  const cardTimeoutRef = useRef(null)

  const active = slides[current]

  useEffect(() => {
    return () => {
      if (cardTimeoutRef.current) clearTimeout(cardTimeoutRef.current)
    }
  }, [])

  const handleVideoEnd = () => {
    setShowCard(true)
    cardTimeoutRef.current = setTimeout(() => {
      setShowCard(false)
      setCurrent((prev) => (prev + 1) % slides.length)
    }, 5000)
  }

  useEffect(() => {
    const fg = foregroundRef.current
    const bg = backdropRef.current

    if (fg) {
      try {
        fg.currentTime = 0
        fg.muted = isMuted
        fg.play().catch(() => {})
      } catch (err) {
        console.warn("Foreground video restart failed:", err)
      }
    }

    if (bg) {
      try {
        bg.currentTime = 0
        bg.play().catch(() => {})
      } catch (err) {
        console.warn("Backdrop video restart failed:", err)
      }
    }
  }, [current, isMuted])

  const toggleMute = () => {
    setIsMuted((prev) => !prev)
  }

  if (!active) return null

  const ticket = active.ticket

  return (
    <div className="h-[35vh] mx-4 rounded-2xl relative overflow-hidden bg-neutral-900">
      {/* LAYER 1: blurred backdrop */}
      <video
        ref={backdropRef}
        className="absolute inset-0 w-full h-full object-cover scale-110 blur-lg"
        src={active.video}
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        poster={active.poster}
      />

      {/* LAYER 2: dark gradient tint */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/10 to-black/40"></div>

      {/* LAYER 3: foreground 9:16 video, centered */}
      <div
        className={`absolute inset-0 flex items-center justify-center transition-all duration-500 ${
          showCard ? "blur-sm" : ""
        }`}
      >
        <video
          ref={foregroundRef}
          className="h-full w-auto aspect-[9/16] object-cover rounded-2xl shadow-2xl"
          src={active.video}
          autoPlay
          muted={isMuted}
          playsInline
          preload="metadata"
          poster={active.poster}
          onEnded={handleVideoEnd}
        />
      </div>

      {/* Mute toggle */}
      <button
        onClick={toggleMute}
        className="absolute top-3 right-3 z-20 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full cursor-pointer transition-colors"
        aria-label={isMuted ? "Unmute video" : "Mute video"}
      >
        {isMuted ? <FaVolumeMute className="text-sm" /> : <FaVolumeUp className="text-sm" />}
      </button>

      {/* LAYER 4: ticket overlay — horizontal glass card */}
      {showCard && ticket && (
        <div className="absolute inset-0 flex items-center justify-center px-4 z-10 pointer-events-none">
          <div className="bg-black/70 backdrop-blur-md rounded-2xl px-5 py-4 flex items-center gap-4 max-w-md pointer-events-auto">
            <img
              src={ticket.image}
              alt={ticket.name}
              className="w-20 h-20 rounded-xl object-cover shadow-lg shrink-0"
            />

            <div className="flex flex-col gap-1.5 min-w-0 flex-1">
              <p className="text-white font-bold text-sm leading-tight truncate">
                {ticket.name}
              </p>

              {ticket.tier && (
                <span className="bg-white/20 text-white text-[10px] font-semibold px-2 py-0.5 rounded-full self-start">
                  {ticket.tier}
                </span>
              )}

              <div className="flex items-center gap-3 text-white/80 text-[11px] flex-wrap">
                {ticket.date && (
                  <span className="flex items-center gap-1">
                    <FaCalendarAlt /> {ticket.date}
                  </span>
                )}
                {ticket.venue && (
                  <span className="flex items-center gap-1 truncate">
                    <FaMapMarkerAlt /> {ticket.venue}
                  </span>
                )}
              </div>

              <Link
                to={`/product/${ticket.id}`}
                className="mt-1 bg-white text-neutral-900 hover:bg-neutral-100 px-4 py-1.5 rounded-full font-semibold text-xs flex items-center justify-center gap-1 self-start transition-colors"
              >
                Buy now · <FaNairaSign className="text-[10px]" />
                {FormatPrice(parseFloat(ticket.price || 0))}
              </Link>
            </div>
          </div>
        </div>
      )}

      {/* LAYER 5: dots */}
      <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1.5 z-10">
        {slides.map((_, i) => (
          <span
            key={i}
            className={`h-1.5 rounded-full transition-all ${
              i === current ? "w-4 bg-white" : "w-1.5 bg-white/50"
            }`}
          />
        ))}
      </div>
    </div>
  )
}

export default HeroBanner