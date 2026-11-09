// src/pages/forgotPasswordPage/forgotPasswordPage.jsx
import { useContext, useState } from "react"
import { useNavigate } from "react-router"
import { FaArrowLeft } from "react-icons/fa"
import { authContext } from "../../context/authContext"
import Scrolltotop from "../../utils/scrolltotop"
import emailIcon from "../../assets/email.png"

const ForgotPasswordPage = () => {
  const navigate = useNavigate()
  const { api } = useContext(authContext)
  const [email, setEmail] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [info, setInfo] = useState("")

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError(""); setInfo("")
    if (!email) { setError("Enter your email address."); return }
    setLoading(true)
    try {
      const res = await api.post("/accounts/forgot-password/", { email })
      if (res.data?.success) {
        setInfo("A 6-digit code has been sent to your email.")
        setTimeout(() => navigate(`/verification?email=${encodeURIComponent(email)}&mode=reset`), 800)
      } else {
        setError(res.data?.error || "Could not send code.")
      }
    } catch (err) {
      setError(err.response?.data?.error || "Could not send code.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="bg-white w-screen min-h-screen flex flex-col dark:bg-neutral-900 dark:text-white">
      <Scrolltotop />
      <div className="bg-white flex items-center sticky top-0 ps-4 py-4 shadow-md shadow-neutral-300 dark:bg-neutral-800">
        <button onClick={() => navigate(-1)} className="cursor-pointer"><FaArrowLeft /></button>
        <p className="text-lg font-bold absolute left-1/2 -translate-x-1/2">Forgot Password</p>
      </div>
      <div className="flex flex-col justify-center gap-5 px-4 flex-1">
        <img src={emailIcon} alt="" className="w-1/2 mx-auto" />
        <div className="text-center w-80 mx-auto mb-10 flex flex-col gap-5">
          <p className="text-orange-400 text-2xl font-bold">Email address</p>
          <p className="font-semibold leading-tight">Please enter your email address to continue verification</p>
        </div>
        {error && <p className="bg-red-100 text-red-600 border border-red-300 rounded-xl p-2 text-sm text-center">{error}</p>}
        {info && <p className="bg-green-100 text-green-700 border border-green-300 rounded-xl p-2 text-sm text-center">{info}</p>}
        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          <div className="flex flex-col gap-2">
            <label htmlFor="email">Email address</label>
            <input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} className="bg-orange-100 text-neutral-900 outline-none rounded-xl p-2" required />
          </div>
          <button type="submit" disabled={loading} className="bg-gradient-to-b from-orange-600 to-orange-400 text-white rounded-xl py-2 disabled:opacity-50">
            {loading ? "Sending..." : "Send"}
          </button>
        </form>
      </div>
    </main>
  )
}

export default ForgotPasswordPage