// src/pages/registerPage.jsx
import { useContext, useEffect, useState } from "react"
import { Link, useNavigate } from "react-router"
import { FaArrowLeft } from "react-icons/fa"
import { authContext } from "../context/authContext"
import apple from "../assets/apple.png";
import google from "../assets/google.png";
import Scrolltotop from "../utils/scrolltotop"

const RegisterPage = () => {
  const navigate = useNavigate()
  const { registerUser, verifyOTP, resendOTP, isAuthenticated, loading: authLoading } = useContext(authContext)

  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [email, setEmail] = useState("")
  const [phone, setPhone] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [mode, setMode] = useState("Buyer")
  const [otp, setOtp] = useState("")
  const [showOTP, setShowOTP] = useState(false)

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [info, setInfo] = useState("")

  const modes = [
    { id: "Buyer", label: "Buyer", icon: "🛍️" },
    { id: "Seller", label: "Seller", icon: "📦" },
  ]

  useEffect(() => {
    if (!authLoading && isAuthenticated) navigate("/")
  }, [authLoading, isAuthenticated, navigate])

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError(""); setInfo("")
    if (password !== confirmPassword) { setError("Passwords do not match."); return }
    if (password.length < 8) { setError("Password must be at least 8 characters."); return }

    setLoading(true)
    const result = await registerUser({
      email, password, password2: confirmPassword,
      first_name: firstName || email.split("@")[0],
      last_name: lastName, phone, current_mode: mode,
    })
    setLoading(false)
    if (result.success) { setShowOTP(true); setInfo("OTP sent. Check your email.") }
    else setError(result.error || "Registration failed.")
  }

  const handleVerify = async (e) => {
    e.preventDefault()
    setError(""); setInfo("")
    if (otp.length !== 6) { setError("Enter the 6-digit code."); return }
    setLoading(true)
    const result = await verifyOTP({ email, otp })
    setLoading(false)
    if (result.success) navigate("/")
    else setError(result.error || "Verification failed.")
  }

  const handleResend = async () => {
    setError(""); setInfo("")
    const result = await resendOTP(email)
    if (result.success) setInfo("OTP resent.")
    else setError(result.error || "Could not resend OTP.")
  }

  if (showOTP) {
    return (
      <main className="bg-white w-screen relative flex flex-col gap-8 justify-center min-h-screen dark:bg-neutral-900 dark:text-white p-5">
        <Scrolltotop />
        <button onClick={() => setShowOTP(false)} className="absolute top-5 left-5"><FaArrowLeft className="text-xl" /></button>
        <div className="flex flex-col gap-3 items-center pt-8">
          <p className="text-orange-400 text-2xl font-bold">Verify Email</p>
          <p className="text-sm">Enter the 6-digit code sent to {email}</p>
        </div>
        {error && <p className="bg-red-100 text-red-600 border border-red-300 rounded-xl p-2 text-sm text-center">{error}</p>}
        {info && <p className="bg-green-100 text-green-700 border border-green-300 rounded-xl p-2 text-sm text-center">{info}</p>}
        <form onSubmit={handleVerify} className="flex flex-col gap-4">
          <input type="text" inputMode="numeric" maxLength={6} value={otp} onChange={(e) => setOtp(e.target.value.replace(/\D/g, "").slice(0, 6))} placeholder="6-digit code" className="bg-orange-100 text-neutral-900 text-center tracking-widest text-xl rounded-xl p-3 outline-none" />
          <button type="submit" disabled={loading || otp.length !== 6} className="bg-gradient-to-b from-orange-600 to-orange-400 text-white rounded-xl py-2 disabled:opacity-50">
            {loading ? "Verifying..." : "Verify"}
          </button>
          <button type="button" onClick={handleResend} className="text-orange-400 text-sm">Resend code</button>
        </form>
      </main>
    )
  }

  return (
    <main className="bg-white w-screen relative flex flex-col gap-8 justify-center min-h-screen overflow-y-auto py-10 dark:bg-neutral-900 dark:text-white">
      <Scrolltotop />
      <button onClick={() => navigate(-1)} className="absolute top-5 left-5 z-20 cursor-pointer"><FaArrowLeft className="text-xl" /></button>
      <div className="flex flex-col gap-3 items-center pt-8">
        <p className="text-orange-400 text-2xl font-bold">Create Account</p>
        <p className="font-semibold text-neutral-600 dark:text-neutral-300 text-sm">Create an account with QuickTrade</p>
      </div>
      {error && <p className="mx-5 bg-red-100 text-red-600 border border-red-300 rounded-xl p-2 text-center text-sm">{error}</p>}
      <form noValidate onSubmit={handleSubmit} className="flex flex-col gap-4 p-5">
        <div className="flex gap-3">
          <input type="text" placeholder="First name" value={firstName} onChange={(e) => setFirstName(e.target.value)} className="bg-orange-100 outline-none rounded-xl p-2 w-1/2 placeholder:text-neutral-700" required />
          <input type="text" placeholder="Last name" value={lastName} onChange={(e) => setLastName(e.target.value)} className="bg-orange-100 outline-none rounded-xl p-2 w-1/2 placeholder:text-neutral-700" />
        </div>
        <input type="email" placeholder="email" value={email} onChange={(e) => setEmail(e.target.value)} className="bg-orange-100 outline-none rounded-xl p-2 placeholder:text-neutral-700" required />
        <input type="tel" placeholder="phone (optional)" value={phone} onChange={(e) => setPhone(e.target.value)} className="bg-orange-100 outline-none rounded-xl p-2 placeholder:text-neutral-700" />
        <div className="flex flex-col gap-2">
          <label className="font-semibold text-sm text-neutral-600 dark:text-neutral-300">I want to join as:</label>
          <div className="flex gap-3">
            {modes.map((m) => (
              <button key={m.id} type="button" onClick={() => setMode(m.id)} className={`flex-1 py-3 rounded-xl border-2 ${mode === m.id ? "border-orange-500 bg-orange-50 dark:bg-neutral-800" : "border-neutral-200 dark:border-neutral-700"}`}>
                <div className="text-2xl">{m.icon}</div>
                <div className="font-bold text-sm">{m.label}</div>
              </button>
            ))}
          </div>
        </div>
        <input type="password" placeholder="password" value={password} onChange={(e) => setPassword(e.target.value)} className="bg-orange-100 outline-none rounded-xl p-2 placeholder:text-neutral-700" required />
        <input type="password" placeholder="confirm password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} className="bg-orange-100 outline-none rounded-xl p-2 placeholder:text-neutral-700" required />
        <p className="text-xs text-neutral-500 dark:text-neutral-400">Password must be at least 8 characters and include an uppercase letter, a lowercase letter, a number, and a special symbol.</p>
        <button type="submit" disabled={loading} className="bg-gradient-to-b from-orange-600 to-orange-400 text-white rounded-xl py-2 disabled:opacity-50">
          {loading ? "Creating account..." : "Create account"}
        </button>
        <div className="flex justify-center items-center gap-3">
          <span className="w-1/5 h-0.5 bg-neutral-300"></span>
          <p className="text-sm">or continue with</p>
          <span className="w-1/5 h-0.5 bg-neutral-300"></span>
        </div>
        <div className="flex justify-center gap-5">
          <button type="button"><img src={google} alt="Google" className="w-10" /></button>
          <button type="button"><img src={apple} alt="Apple" className="w-8" /></button>
        </div>
      </form>
      <p className="flex justify-center gap-2 text-sm pb-4">
        <span>Already have an account?</span>
        <Link to="/auth" className="text-orange-400 font-semibold">Login here</Link>
      </p>
    </main>
  )
}

export default RegisterPage