// src/pages/forgotPasswordPage/newPasswordPage.jsx
import { useContext, useState } from "react"
import { useNavigate, useSearchParams } from "react-router"
import { FaArrowLeft } from "react-icons/fa"
import { authContext } from "../../context/authContext"
import Scrolltotop from "../../utils/scrolltotop"
import lock from "../../assets/lock.png"

const NewPasswordPage = () => {
  const navigate = useNavigate()
  const [params] = useSearchParams()
  const { api } = useContext(authContext)

  const email = params.get("email") || ""
  const otp = params.get("otp") || ""

  const [newPassword, setNewPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [info, setInfo] = useState("")

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError(""); setInfo("")
    if (newPassword !== confirmPassword) { setError("Passwords do not match."); return }
    if (newPassword.length < 8) { setError("Password must be at least 8 characters."); return }
    if (!email || !otp) { setError("Missing reset session. Start over."); return }

    setLoading(true)
    try {
      const res = await api.post("/accounts/reset-password-otp/", {
        email,
        otp,
        new_password: newPassword,
        confirm_password: confirmPassword,
      })
      if (res.data?.success) {
        setInfo("Password reset successfully. Please sign in.")
        setTimeout(() => navigate("/auth"), 1200)
      } else {
        setError(res.data?.error || "Reset failed.")
      }
    } catch (err) {
      setError(err.response?.data?.error || "Reset failed.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="bg-white w-screen min-h-screen flex flex-col dark:bg-neutral-900 dark:text-white">
      <Scrolltotop />
      <div className="bg-white flex items-center sticky top-0 ps-4 py-4 shadow-md shadow-neutral-300 dark:bg-neutral-800">
        <button onClick={() => navigate(-1)} className="cursor-pointer"><FaArrowLeft /></button>
        <p className="text-lg font-bold absolute left-1/2 -translate-x-1/2">New Password</p>
      </div>
      <div className="flex flex-col justify-center gap-5 px-4 flex-1">
        <img src={lock} alt="" className="w-1/2 mx-auto" />
        <div className="text-center w-80 mx-auto mb-10 flex flex-col gap-5">
          <p className="text-orange-400 text-2xl font-bold">Enter New Password</p>
          <p className="font-semibold leading-tight">Your new password must be different from previously used password</p>
        </div>
        {error && <p className="bg-red-100 text-red-600 border border-red-300 rounded-xl p-2 text-sm text-center">{error}</p>}
        {info && <p className="bg-green-100 text-green-700 border border-green-300 rounded-xl p-2 text-sm text-center">{info}</p>}
        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          <input type="password" placeholder="New Password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} className="bg-orange-100 text-neutral-900 p-2 outline-none rounded-xl placeholder:text-neutral-700" required />
          <input type="password" placeholder="Confirm Password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} className="bg-orange-100 text-neutral-900 p-2 outline-none rounded-xl placeholder:text-neutral-700" required />
          <button type="submit" disabled={loading} className="bg-gradient-to-b from-orange-600 to-orange-400 text-white rounded-xl py-2 disabled:opacity-50">
            {loading ? "Saving..." : "Save"}
          </button>
        </form>
      </div>
    </main>
  )
}

export default NewPasswordPage