// src/pages/homePage.jsx
import { Link } from "react-scroll"
import { useEffect, useState } from "react"
import Header from "../components/header"
import ProductCard from "../components/productCard"
import HeroBanner from "../components/heroBanner"
import Marquee from "react-fast-marquee"

// Three banner videos (local files)
import dettyVideo from "../assets/banner1.mp4"
import afroVideo from "../assets/banner4.mp4"
import lagosVideo from "../assets/banner3.mp4"

// Original hero image, used as the poster on all three slides
// It lives in public/, so it's referenced by its public path
const heroPoster = "/hero.jpg"

const API_BASE = "https://quicktrade-backend.onrender.com"

const HomePage = () => {
  const [categories, setCategories] = useState([])
  const [products, setProducts] = useState([])
  const [ticketListings, setTicketListings] = useState([])
  const [selectedSlug, setSelectedSlug] = useState("all")
  const [catLoading, setCatLoading] = useState(true)
  const [prodLoading, setProdLoading] = useState(true)
  const [prodError, setProdError] = useState("")

  // Load categories
  useEffect(() => {
    let cancelled = false
    ;(async () => {
      try {
        const res = await fetch(`${API_BASE}/marketplace/categories/`)
        const data = await res.json()
        if (cancelled) return
        if (data?.success) {
          setCategories([
            { slug: "all", name: "All", image_url: "/hero.jpg" },
            ...(data.categories || []),
          ])
        }
      } catch (err) {
        console.error("Category load error:", err)
      } finally {
        if (!cancelled) setCatLoading(false)
      }
    })()
    return () => {
      cancelled = true
    }
  }, [])

  // Load ticket listings for the banner overlays
  useEffect(() => {
    let cancelled = false
    ;(async () => {
      try {
        const res = await fetch(
          `${API_BASE}/marketplace/listings/?type=ticket&page=1&page_size=10`
        )
        const data = await res.json()
        if (cancelled) return
        if (data?.success) setTicketListings(data.listings || [])
      } catch (err) {
        console.error("Ticket load error:", err)
      }
    })()
    return () => {
      cancelled = true
    }
  }, [])

  // Load products for the grid
  useEffect(() => {
    let cancelled = false
    ;(async () => {
      setProdLoading(true)
      setProdError("")
      try {
        const url =
          selectedSlug && selectedSlug !== "all"
            ? `${API_BASE}/marketplace/listings/?category=${encodeURIComponent(selectedSlug)}&page=1&page_size=30`
            : `${API_BASE}/marketplace/listings/?page=1&page_size=30`
        const res = await fetch(url)
        const data = await res.json()
        if (cancelled) return
        if (data?.success) setProducts(data.listings || [])
        else setProdError(data?.error || "Failed to load products")
      } catch (err) {
        console.error("Product load error:", err)
        if (!cancelled) setProdError("Network error loading products")
      } finally {
        if (!cancelled) setProdLoading(false)
      }
    })()
    return () => {
      cancelled = true
    }
  }, [selectedSlug])

  const info = [
    "Nationwide delivery",
    "10% off your first order",
    "Secure payment",
    "Free shipping on orders over $50",
    "New products added every week",
  ]

  const findTicket = (needle) => {
    const found = ticketListings.find((t) =>
      t.title?.toLowerCase().includes(needle.toLowerCase())
    )
    if (!found) return null
    return {
      id: found.id,
      name: found.title,
      image: found.image_url,
      price: found.price,
      date: found.ticket?.event_date
        ? new Date(found.ticket.event_date).toLocaleDateString(undefined, {
            month: "short",
            day: "numeric",
          })
        : "",
      venue: found.ticket?.event_venue || "",
      tier: found.ticket?.tier_badge || "",
    }
  }

  const slides = [
    {
      video: dettyVideo,
      poster: heroPoster,
      ticket: findTicket("detty"),
    },
    {
      video: afroVideo,
      poster: heroPoster,
      ticket: findTicket("afro"),
    },
    {
      video: lagosVideo,
      poster: heroPoster,
      ticket: findTicket("lagos"),
    },
  ]

  return (
    <div>
      <Header />
      <main className="bg-white flex flex-col gap-10 py-4 z-0 min-h-screen dark:bg-neutral-950 dark:text-white">
        <HeroBanner slides={slides} />

        <div className="mx-4">
          <Marquee pauseOnHover={true}>
            {info.map((item) => (
              <p key={item} className="px-2 font-bold">
                {item}
              </p>
            ))}
          </Marquee>
        </div>

        <div id="category" className="flex flex-col gap-10">
          <div className="bg-white flex overflow-x-auto sticky top-[15vh] py-2 z-10 dark:bg-neutral-950">
            {catLoading &&
              Array.from({ length: 6 }).map((_, i) => (
                <div
                  key={i}
                  className="flex flex-col items-center w-2/9 shrink-0 animate-pulse"
                >
                  <div className="w-18 h-18 rounded-full bg-neutral-200 dark:bg-neutral-800" />
                  <div className="w-12 h-3 bg-neutral-200 dark:bg-neutral-800 mt-2 rounded" />
                </div>
              ))}
            {!catLoading &&
              categories.map((cat) => {
                const active = cat.slug === selectedSlug
                return (
                  <button
                    key={cat.slug}
                    onClick={() => setSelectedSlug(cat.slug)}
                    className="flex flex-col items-center w-2/9 shrink-0 cursor-pointer"
                  >
                    <img
                      src={cat.image_url || "/placeholder.png"}
                      alt={cat.name}
                      className={`${
                        active ? "border-4 border-orange-600" : ""
                      } w-18 h-18 rounded-full object-cover`}
                    />
                    <span className={active ? "text-orange-600" : ""}>
                      {cat.name}
                    </span>
                  </button>
                )
              })}
          </div>

          <div className="flex flex-wrap justify-center gap-5 mb-20">
            {prodLoading &&
              Array.from({ length: 6 }).map((_, i) => (
                <div
                  key={i}
                  className="w-2/5 h-44 rounded-lg bg-neutral-200 dark:bg-neutral-800 animate-pulse"
                />
              ))}

            {!prodLoading && prodError && (
              <p className="text-red-500">{prodError}</p>
            )}

            {!prodLoading && !prodError && products.length === 0 && (
              <p className="text-neutral-500">
                No products in this category yet.
              </p>
            )}

            {!prodLoading &&
              products.map((item) => <ProductCard key={item.id} item={item} />)}
          </div>
        </div>
      </main>
    </div>
  )
}

export default HomePage