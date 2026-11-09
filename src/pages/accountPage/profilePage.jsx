// src/pages/accountPage/profilePage.jsx
import { useContext, useEffect, useState } from "react"
import { useNavigate } from "react-router"
import { BiCamera } from "react-icons/bi"
import { FaArrowLeft } from "react-icons/fa"
import userImg from "../../assets/userProfile.jpg"
import Scrolltotop from "../../utils/scrolltotop"
import { authContext } from "../../context/authContext"

const ProfilePage = () => {
  const navigate = useNavigate()
  const { user, isAuthenticated, loading: authLoading, refreshUser, updateProfile, uploadAvatar } = useContext(authContext)

  const [loading, setLoading] = useState(true)
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState("")
  const [info, setInfo] = useState("")
  const [form, setForm] = useState({ first_name: "", last_name: "", email: "", phone: "", location: "" })

  const update = (k, v) => setForm((prev) => ({ ...prev, [k]: v }))

  useEffect(() => {
    if (authLoading) return
    if (!isAuthenticated) { navigate("/auth"); return }
    ;(async () => {
      const res = await refreshUser()
      if (res.success) {
        const u = res.data
        setForm({
          first_name: u.first_name || "",
          last_name: u.last_name || "",
          email: u.email || "",
          phone: u.phone || "",
          location: u.profile?.location || "",
        })
      }
      setLoading(false)
    })()
  }, [authLoading, isAuthenticated, refreshUser, navigate])

  const handleAvatar = async (e) => {
    const file = e.target.files?.[0]
    if (!file) return
    setBusy(true); setError(""); setInfo("")
    const res = await uploadAvatar(file)
    setBusy(false)
    if (res.success) setInfo("Picture updated.")
    else setError(res.error || "Upload failed.")
    e.target.value = ""
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setBusy(true); setError(""); setInfo("")
    const res = await updateProfile(form)
    setBusy(false)
    if (res.success) { setInfo("Saved."); setTimeout(() => setInfo(""), 2000) }
    else setError(res.error || "Save failed.")
  }

  if (authLoading || loading) {
    return (
      <main className="bg-white min-h-screen flex items-center justify-center dark:bg-neutral-900 dark:text-white">
        <Scrolltotop />
        <p className="text-neutral-500">Loading…</p>
      </main>
    )
  }

  const avatarSrc = user?.profile?.avatar_url || userImg

  return (
    <main className="bg-white min-h-screen flex flex-col dark:bg-neutral-900 dark:text-white">
      <Scrolltotop />
      <div className="bg-white flex items-center sticky top-0 ps-4 py-4 z-10 shadow-md shadow-neutral-300 dark:bg-neutral-800">
        <button onClick={() => navigate(-1)} className="cursor-pointer"><FaArrowLeft /></button>
        <p className="text-lg font-bold absolute left-1/2 -translate-x-1/2">Edit Profile</p>
      </div>
      {error && <p className="mx-4 mt-3 bg-red-100 text-red-600 border border-red-300 rounded-xl p-2 text-sm text-center">{error}</p>}
      {info && <p className="mx-4 mt-3 bg-green-100 text-green-700 border border-green-300 rounded-xl p-2 text-sm text-center">{info}</p>}
      <form onSubmit={handleSubmit} className="flex flex-col py-10 px-4">
        <div className="relative self-center mb-15">
          <label htmlFor="profileImage" className="cursor-pointer">
            <img src={avatarSrc} alt="" className="w-30 h-30 object-cover rounded-full" />
            <BiCamera className="bg-white text-neutral-900 text-4xl p-2 rounded-full absolute bottom-0 right-0" />
          </label>
          <input type="file" accept="image/*" id="profileImage" onChange={handleAvatar} className="hidden" />
        </div>
        <div className="bg-white rounded-2xl mb-10 shadow-md shadow-neutral-300 dark:bg-neutral-800">
          <div className="flex items-center p-3">
            <label className="w-1/3">First name</label>
            <input type="text" value={form.first_name} onChange={(e) => update("first_name", e.target.value)} className="text-end font-semibold w-2/3 outline-none py-2 bg-transparent" />
          </div>
          <div className="flex items-center p-3">
            <label className="w-1/3">Last name</label>
            <input type="text" value={form.last_name} onChange={(e) => update("last_name", e.target.value)} className="text-end font-semibold w-2/3 outline-none py-2 bg-transparent" />
          </div>
          <div className="flex items-center p-3">
            <label className="w-1/3">Phone</label>
            <input type="tel" value={form.phone} onChange={(e) => update("phone", e.target.value)} className="text-end font-semibold w-2/3 outline-none py-2 bg-transparent" />
          </div>
          <div className="flex items-center p-3">
            <label className="w-1/3">Email</label>
            <input type="email" value={form.email} onChange={(e) => update("email", e.target.value)} className="text-end font-semibold w-2/3 outline-none py-2 bg-transparent" />
          </div>
          <div className="flex items-center p-3">
            <label className="w-1/3">Address</label>
            <input type="text" value={form.location} onChange={(e) => update("location", e.target.value)} className="text-end font-semibold w-2/3 outline-none py-2 bg-transparent" />
          </div>
        </div>
        <button type="submit" disabled={busy} className="bg-gradient-to-b from-orange-600 to-orange-400 text-white rounded-xl py-2 disabled:opacity-60">
          {busy ? "Saving…" : "Save Changes"}
        </button>
      </form>
    </main>
  )
}

export default ProfilePage