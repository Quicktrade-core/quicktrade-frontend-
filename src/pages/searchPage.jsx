// src/pages/searchPage.jsx
import { useEffect, useRef, useState } from "react"
import { Link, useNavigate, useSearchParams } from "react-router"
import { FaArrowLeft, FaStar, FaHistory, FaTimes } from "react-icons/fa"
import { FaHashtag, FaNairaSign } from "react-icons/fa6"
import { MdLocationOn, MdCategory } from "react-icons/md"
import { BiSearch } from "react-icons/bi"
import Scrolltotop from "../utils/scrolltotop"
import FormatPrice from "../utils/formatPrice"
import { useDebouncedValue } from "../hooks/useDebouncedValue"

const API_BASE = import.meta.env.VITE_API_BASE || "http://localhost:8000"
const RECENT_KEY = "qt_recent_searches"
const MIN_RESULTS = 15

// Safe client-side highlighting
const highlightText = (text, query) => {
  if (!text) return text
  const q = query.trim()
  if (!q) return text
  const escaped = q.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")
  const regex = new RegExp(`(${escaped})`, "gi")
  const parts = String(text).split(regex)
  const qLower = q.toLowerCase()
  return parts.map((part, i) =>
    part.toLowerCase() === qLower ? (
      <mark
        key={i}
        className="bg-orange-200 text-neutral-900 px-0.5 rounded font-semibold"
      >
        {part}
      </mark>
    ) : (
      <span key={i}>{part}</span>
    )
  )
}

const ProductResult = ({ item, query }) => (
  <Link
    to={`/product/${item.id}`}
    className="flex flex-col rounded-xl overflow-hidden bg-white shadow-sm shadow-neutral-200 dark:bg-neutral-800 dark:shadow-none"
  >
    <div className="relative">
      <img
        src={item.image_url || "/placeholder.png"}
        alt={item.title}
        className="w-full aspect-square object-cover"
      />
      {item.type === "ticket" && (
        <span className="absolute top-1.5 left-1.5 bg-orange-600 text-white text-[9px] font-bold px-1.5 py-0.5 rounded-full">
          TICKET
        </span>
      )}
    </div>
    <div className="flex flex-col gap-1 p-2">
      <p className="font-semibold text-xs leading-tight line-clamp-2">
        {highlightText(item.title, query || "")}
      </p>
      <div className="flex items-center justify-between">
        <span className="flex items-center font-bold text-sm">
          <FaNairaSign className="text-[10px]" />
          {FormatPrice(parseFloat(item.price || 0))}
        </span>
        <div className="flex items-center gap-1">
          <FaStar className="text-amber-400 text-[10px]" />
          <span className="text-[10px] text-neutral-500 dark:text-neutral-400">
            {item.seller_rating?.toFixed?.(1) || "4.9"}
          </span>
        </div>
      </div>
    </div>
  </Link>
)

const SearchPage = () => {
  const navigate = useNavigate()
  const [params, setParams] = useSearchParams()
  const queryParam = params.get("q") || ""

  const [query, setQuery] = useState(queryParam)
  const [results, setResults] = useState([])
  const [total, setTotal] = useState(0)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  const [discoveryProducts, setDiscoveryProducts] = useState([])
  const [discoverySuggestions, setDiscoverySuggestions] = useState([])
  const [discoveryLoading, setDiscoveryLoading] = useState(true)

  const [suggestions, setSuggestions] = useState([])
  const [relatedTerms, setRelatedTerms] = useState([])
  const [fillerProducts, setFillerProducts] = useState([])

  const [recentSearches, setRecentSearches] = useState([])

  const debouncedQuery = useDebouncedValue(query, 350)
  const inputRef = useRef(null)

  const hasQuery = !!queryParam.trim()

  useEffect(() => {
    try {
      const stored = JSON.parse(localStorage.getItem(RECENT_KEY) || "[]")
      if (Array.isArray(stored)) setRecentSearches(stored)
    } catch {
      setRecentSearches([])
    }
  }, [])

  useEffect(() => {
    inputRef.current?.focus()
  }, [])

  useEffect(() => {
    const t = debouncedQuery.trim()
    if (t === queryParam) return
    if (t) setParams({ q: t }, { replace: true })
    else setParams({}, { replace: true })
  }, [debouncedQuery, queryParam, setParams])

  useEffect(() => {
    if (hasQuery) return
    let cancelled = false
    setDiscoveryLoading(true)
    ;(async () => {
      try {
        const res = await fetch(`${API_BASE}/marketplace/search/discovery/`)
        const data = await res.json()
        if (cancelled) return
        if (data?.success) {
          setDiscoveryProducts(data.products || [])
          setDiscoverySuggestions(data.suggestions || [])
        }
      } catch (err) {
        console.error("Discovery load error:", err)
      } finally {
        if (!cancelled) setDiscoveryLoading(false)
      }
    })()
    return () => {
      cancelled = true
    }
  }, [hasQuery])

  useEffect(() => {
    if (!hasQuery) {
      setResults([])
      setTotal(0)
      setSuggestions([])
      setRelatedTerms([])
      setFillerProducts([])
      setError("")
      return
    }

    let cancelled = false
    ;(async () => {
      setLoading(true)
      setError("")
      try {
        const res = await fetch(
          `${API_BASE}/marketplace/listings/?q=${encodeURIComponent(queryParam)}&page=1&page_size=30`
        )
        const data = await res.json()
        if (cancelled) return

        if (data?.success) {
          const listings = data.listings || []
          setResults(listings)
          setTotal(data.total || 0)
          setSuggestions(data.suggestions || [])
          setRelatedTerms(data.related_terms || [])

          if (listings.length < MIN_RESULTS) {
            const fillerRes = await fetch(`${API_BASE}/marketplace/search/discovery/`)
            const fillerData = await fillerRes.json()
            if (cancelled) return
            if (fillerData?.success) {
              const existingIds = new Set(listings.map((l) => l.id))
              const filler = (fillerData.products || [])
                .filter((p) => !existingIds.has(p.id))
                .slice(0, MIN_RESULTS - listings.length)
              setFillerProducts(filler)
            }
          } else {
            setFillerProducts([])
          }
        } else {
          setError(data?.error || "Search failed")
        }
      } catch (err) {
        console.error("Search error:", err)
        if (!cancelled) setError("Network error. Please try again.")
      } finally {
        if (!cancelled) setLoading(false)
      }
    })()

    return () => {
      cancelled = true
    }
  }, [hasQuery, queryParam])

  const saveRecent = (term) => {
    const t = term.trim()
    if (!t) return
    const next = [
      t,
      ...recentSearches.filter((s) => s.toLowerCase() !== t.toLowerCase()),
    ].slice(0, 10)
    setRecentSearches(next)
    localStorage.setItem(RECENT_KEY, JSON.stringify(next))
  }

  const handleRemoveRecent = (term) => {
    const next = recentSearches.filter((s) => s !== term)
    setRecentSearches(next)
    localStorage.setItem(RECENT_KEY, JSON.stringify(next))
  }

  const handleClearAllRecent = () => {
    setRecentSearches([])
    localStorage.removeItem(RECENT_KEY)
  }

  const submitSearch = (term) => {
    const t = term.trim()
    if (!t) return
    saveRecent(t)
    setQuery(t)
    setParams({ q: t }, { replace: true })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    submitSearch(query)
  }

  const handleRecentClick = (term) => submitSearch(term)
  const handleSuggestionClick = (term) => submitSearch(term)
  const handleRelatedClick = (term) => submitSearch(term.value)

  const handleClearInput = () => {
    setQuery("")
    setParams({}, { replace: true })
    inputRef.current?.focus()
  }

  return (
    <main className="bg-white min-h-screen flex flex-col dark:bg-neutral-900 dark:text-white">
      <Scrolltotop />

      <div className="bg-white flex items-center gap-3 p-4 sticky top-0 z-10 shadow-md shadow-neutral-300 dark:bg-neutral-800 dark:shadow-none">
        <button onClick={() => navigate(-1)} className="cursor-pointer">
          <FaArrowLeft />
        </button>
        <form
          onSubmit={handleSubmit}
          className="bg-white text-neutral-900 border border-neutral-300 rounded-full w-full relative dark:bg-neutral-900 dark:border-neutral-700 dark:text-white"
        >
          <button
            type="submit"
            className="text-xl absolute top-3 left-3 cursor-pointer"
          >
            <BiSearch />
          </button>
          <input
            ref={inputRef}
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search products, tickets, events..."
            className="w-full ps-10 pe-10 py-2 rounded-full outline-none bg-transparent"
          />
          {query && (
            <button
              type="button"
              onClick={handleClearInput}
              className="absolute top-3 right-3 text-neutral-500 hover:text-neutral-800 cursor-pointer"
            >
              <FaTimes />
            </button>
          )}
        </form>
      </div>

      <div className="bg-white px-4 py-5 flex-1 dark:bg-neutral-900">
        {/* ============ MODE A: NO QUERY ============ */}
        {!hasQuery && (
          <div className="flex flex-col gap-6">
            {recentSearches.length > 0 && (
              <div className="flex flex-col gap-3">
                <div className="flex justify-between items-center">
                  <p className="font-bold">Recent searches</p>
                  <button
                    onClick={handleClearAllRecent}
                    className="text-orange-400 text-sm cursor-pointer hover:text-orange-600"
                  >
                    Clear all
                  </button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {recentSearches.map((term) => (
                    <div
                      key={term}
                      className="flex items-center gap-1 bg-neutral-100 dark:bg-neutral-800 rounded-full pl-3 pr-1 py-1"
                    >
                      <button
                        onClick={() => handleRecentClick(term)}
                        className="flex items-center gap-2 cursor-pointer text-sm"
                      >
                        <FaHistory className="text-neutral-400 text-xs" />
                        <span>{term}</span>
                      </button>
                      <button
                        onClick={() => handleRemoveRecent(term)}
                        className="text-neutral-400 hover:text-red-500 cursor-pointer p-1"
                      >
                        <FaTimes className="text-xs" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {discoverySuggestions.length > 0 && (
              <div className="flex flex-col gap-3">
                <p className="font-bold">Browse categories</p>
                <div className="flex flex-wrap gap-2">
                  {discoverySuggestions.map((term) => (
                    <button
                      key={term}
                      onClick={() => handleSuggestionClick(term)}
                      className="flex items-center gap-1 bg-orange-100 text-orange-600 hover:bg-orange-200 px-3 py-1 rounded-full text-sm cursor-pointer"
                    >
                      <MdCategory className="text-xs" />
                      {term}
                    </button>
                  ))}
                </div>
              </div>
            )}

            <div className="flex flex-col gap-3">
              <p className="font-bold">Fresh on QuickTrade</p>
              {discoveryLoading && (
                <p className="text-center text-neutral-500 py-6">Loading…</p>
              )}
              {!discoveryLoading && (
                <div className="grid grid-cols-2 gap-3">
                  {discoveryProducts.map((item) => (
                    <ProductResult key={item.id} item={item} query="" />
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        {/* ============ MODE B: WITH QUERY ============ */}
        {hasQuery && (
          <div className="flex flex-col gap-4">
            {suggestions.length > 0 && (
              <div className="bg-orange-50 border border-orange-200 rounded-xl p-3 dark:bg-orange-900/20 dark:border-orange-800">
                <p className="text-sm text-neutral-700 dark:text-neutral-300">
                  Did you mean:{" "}
                  {suggestions.map((s, i) => (
                    <span key={s}>
                      <button
                        onClick={() => handleSuggestionClick(s)}
                        className="font-semibold text-orange-600 hover:text-orange-800 underline cursor-pointer"
                      >
                        {s}
                      </button>
                      {i < suggestions.length - 1 && ", "}
                    </span>
                  ))}
                  ?
                </p>
              </div>
            )}

            {relatedTerms.length > 0 && results.length > 0 && (
              <div>
                <p className="text-xs font-semibold text-neutral-500 mb-2 uppercase tracking-wider">
                  Related
                </p>
                <div className="flex flex-wrap gap-2">
                  {relatedTerms.map((term) => (
                    <button
                      key={`${term.type}-${term.value}`}
                      onClick={() => handleRelatedClick(term)}
                      className="flex items-center gap-1 bg-neutral-100 hover:bg-orange-100 hover:text-orange-600 text-neutral-700 px-3 py-1 rounded-full text-sm cursor-pointer transition-colors dark:bg-neutral-800 dark:text-neutral-300 dark:hover:bg-orange-900/30"
                    >
                      {term.type === "category" ? (
                        <MdCategory className="text-sm" />
                      ) : (
                        <FaHashtag className="text-[10px]" />
                      )}
                      {term.label}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {loading && (
              <p className="text-center text-neutral-500 py-10">Searching…</p>
            )}

            {!loading && error && (
              <p className="text-center text-red-500 py-10">{error}</p>
            )}

            {!loading && !error && results.length > 0 && (
              <p className="text-sm text-neutral-500">
                {total} result{total === 1 ? "" : "s"} for "{queryParam}"
              </p>
            )}

            {!loading && !error && results.length > 0 && (
              <div className="grid grid-cols-2 gap-3">
                {results.map((item) => (
                  <ProductResult key={item.id} item={item} query={queryParam} />
                ))}
              </div>
            )}

            {!loading && !error && results.length === 0 && (
              <div className="flex flex-col items-center justify-center py-16 text-center">
                <BiSearch className="text-6xl text-neutral-300 dark:text-neutral-600" />
                <p className="mt-4 font-bold">
                  No results for "{queryParam}"
                </p>
                <p className="text-sm text-neutral-500">
                  Try a different word or check your spelling
                </p>
              </div>
            )}

            {!loading && !error && fillerProducts.length > 0 && (
              <div className="flex flex-col gap-3 mt-6">
                <div className="flex items-center gap-3">
                  <span className="flex-1 h-px bg-neutral-200 dark:bg-neutral-700"></span>
                  <p className="text-xs font-semibold text-neutral-500 uppercase tracking-wider">
                    More from QuickTrade
                  </p>
                  <span className="flex-1 h-px bg-neutral-200 dark:bg-neutral-700"></span>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  {fillerProducts.map((item) => (
                    <ProductResult key={item.id} item={item} query="" />
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </main>
  )
}

export default SearchPage