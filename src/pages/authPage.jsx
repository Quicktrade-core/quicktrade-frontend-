// src/pages/authPage.jsx
import { useContext, useEffect, useState } from "react"
import { Link, useNavigate } from "react-router"
import { FaArrowLeft } from "react-icons/fa"
import { MdEmail, MdLock } from "react-icons/md"
import { authContext } from "../context/authContext"
import apple from "../assets/apple.png"
import google from "../assets/google.png"
import loginIcon from "../assets/login.png"
import Scrolltotop from "../utils/scrolltotop"

const AuthPage = () => {
  const navigate = useNavigate()
  const { loginUser, isAuthenticated, loading: authLoading } = useContext(authContext)

  const [rememberMe, setRememberMe] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  useEffect(() => {
    if (!authLoading && isAuthenticated) navigate("/")
  }, [authLoading, isAuthenticated, navigate])

  const submitForm = async (e) => {
    e.preventDefault()
    setError("")
    setLoading(true)
    const result = await loginUser({ identifier: email, password, remember_me: rememberMe })
    setLoading(false)
    if (result.success) {
      navigate("/")
    } else if (result.code === "EMAIL_NOT_VERIFIED") {
      navigate(`/verification?email=${encodeURIComponent(email)}`)
    } else {
      setError(result.error || "Login failed.")
    }
  }

  return (
    <main className="bg-white min-h-screen flex flex-col dark:bg-neutral-900 dark:text-white">
      <Scrolltotop />
      <div className="bg-white sticky top-0 p-4 z-10">
        <button onClick={() => navigate(-1)} className="cursor-pointer">
          <FaArrowLeft />
        </button>
      </div>
      <div className="bg-white flex flex-col gap-10 p-4 flex-1">
        <div className="flex flex-col items-center">
          <img src={loginIcon} alt="" className="w-2/5 mx-auto" />
          <p className="text-orange-400 text-2xl font-bold">Welcome Back</p>
          <p className="text-sm">Let's get you signed in</p>
        </div>
        {error && (
          <p className="bg-red-100 text-red-600 border border-red-300 rounded-xl p-2 text-sm text-center">
            {error}
          </p>
        )}
        <form noValidate onSubmit={submitForm} className="flex flex-col gap-5">
          <div className="relative">
            <MdEmail className="text-lg absolute top-1/2 -translate-y-1/2 left-2" />
            <input type="email" name="email" placeholder="Email address" value={email} required onChange={(e) => setEmail(e.target.value)} className="bg-orange-100 text-neutral-900 w-full outline-none rounded-xl ps-8 py-2 placeholder:text-neutral-700" />
          </div>
          <div className="relative">
            <MdLock className="text-lg absolute top-1/2 -translate-y-1/2 left-2" />
            <input type="password" name="password" placeholder="Password" value={password} required onChange={(e) => setPassword(e.target.value)} className="bg-orange-100 text-neutral-900 w-full outline-none rounded-xl ps-8 py-2 placeholder:text-neutral-700" />
          </div>
          <label className="text-sm flex items-center gap-2 self-start">
            <input type="checkbox" checked={rememberMe} onChange={(e) => setRememberMe(e.target.checked)} />
            Remember me for 2 weeks
          </label>
          <Link to={`/forgotpassword`} className="text-orange-400 self-end hover:text-orange-600">Forgot Password?</Link>
          <button type="submit" disabled={loading} className="bg-gradient-to-b from-orange-600 to-orange-400 text-white rounded-xl py-2 cursor-pointer disabled:opacity-60">
            {loading ? "Signing in..." : "Login"}
          </button>
          <div className="flex justify-center items-center gap-3">
            <span className="w-1/3 h-0.5 bg-neutral-300"></span>
            <p>Or</p>
            <span className="w-1/3 h-0.5 bg-neutral-300"></span>
          </div>
          <div className="flex flex-col gap-5">
            <button type="button" className="flex justify-center items-center gap-2 rounded-xl cursor-pointer shadow-md shadow-neutral-300">
              <img src={google} alt="Google icon" className="w-10" />
              <p>Continue with Google</p>
            </button>
            <button type="button" className="flex justify-center items-center gap-2 rounded-xl cursor-pointer shadow-md shadow-neutral-300">
              <img src={apple} alt="Apple icon" className="w-10" />
              <p>Continue with Apple</p>
            </button>
          </div>
        </form>
        <p className="flex justify-center gap-2">
          <span>Create a new account?</span>
          <Link to="/register" className="text-orange-400 cursor-pointer hover:text-orange-600">Sign up</Link>
        </p>
      </div>
    </main>
  )
}

export default AuthPage