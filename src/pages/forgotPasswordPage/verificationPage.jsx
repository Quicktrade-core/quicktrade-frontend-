// src/pages/forgotPasswordPage/verificationPage.jsx
import { useContext, useEffect, useRef, useState } from "react"
import { useNavigate, useSearchParams } from "react-router"
import { FaArrowLeft } from "react-icons/fa"
import { authContext } from "../../context/authContext"
import Scrolltotop from "../../utils/scrolltotop"
import verify from "../../assets/verify.png"

const VerificationPage = () => {
  const navigate = useNavigate()
  const [params] = useSearchParams()

  const {
    verifyOTP,
    isAuthenticated,
    loading: authLoading,
    api,
  } = useContext(authContext)

  // Which flow are we in?
  //   ?email=...           -> registration OTP
  //   ?email=...&mode=reset -> password reset OTP
  const email = params.get("email") || ""
  const mode = params.get("mode") || "registration"

  const [digits, setDigits] = useState(["", "", "", "", "", ""])
  const [loading, setLoading] = useState(false)
  const [resending, setResending] = useState(false)
  const [error, setError] = useState("")
  const [info, setInfo] = useState("")

  const inputsRef = useRef([])

  // If already signed in (e.g. registration completed elsewhere), skip
  useEffect(() => {
    if (mode === "registration" && !authLoading && isAuthenticated) {
      navigate("/")
    }
  }, [authLoading, isAuthenticated, mode, navigate])

  // Focus first box on mount
  useEffect(() => {
    inputsRef.current[0]?.focus()
  }, [])

  const otp = digits.join("")

  // ---- Box handlers ----

  const handleChange = (index, value) => {
    const v = value.replace(/\D/g, "").slice(-1)
    const next = [...digits]
    next[index] = v
    setDigits(next)
    if (v && index < 5) inputsRef.current[index + 1]?.focus()
  }

  const handleKeyDown = (index, e) => {
    if (e.key === "Backspace" && !digits[index] && index > 0) {
      inputsRef.current[index - 1]?.focus()
    }
  }

  const handlePaste = (e) => {
    const pasted = e.clipboardData.getData("text").replace(/\D/g, "").slice(0, 6)
    if (!pasted) return
    e.preventDefault()
    const next = pasted.split("").concat(Array(6 - pasted.length).fill(""))
    setDigits(next)
    inputsRef.current[Math.min(pasted.length, 5)]?.focus()
  }

  // ---- Submit ----

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError("")
    setInfo("")

    if (!email) {
      setError("Email is missing. Please go back and try again.")
      return
    }
    if (otp.length !== 6) {
      setError("Please enter the 6-digit code.")
      return
    }

    setLoading(true)

    if (mode === "reset") {
      // Password reset OTP — we don't complete the reset here; the
      // NewPasswordPage does that. We just carry the code forward.
      // For now, forward to /newpassword with email + otp in the URL.
      setLoading(false)
      navigate(`/newpassword?email=${encodeURIComponent(email)}&otp=${encodeURIComponent(otp)}`)
      return
    }

    // Registration OTP
    const result = await verifyOTP({ email, otp })
    setLoading(false)
    if (result.success) {
      navigate("/")
    } else {
      setError(result.error || "Invalid or expired code.")
    }
  }

  // ---- Resend ----

  const handleResend = async () => {
    setError("")
    setInfo("")
    if (!email) {
      setError("Email is missing.")
      return
    }

    setResending(true)
    try {
      if (mode === "reset") {
        const res = await api.post("/accounts/forgot-password/", { email })
        if (res.data?.success) setInfo("A new code has been sent to your email.")
        else setError(res.data?.error || "Could not resend code.")
      } else {
        const res = await api.post("/accounts/resend-otp/", { email })
        if (res.data?.success) setInfo("A new code has been sent to your email.")
        else setError(res.data?.error || "Could not resend code.")
      }
    } catch (err) {
      setError(err.response?.data?.error || "Could not resend code.")
    } finally {
      setResending(false)
    }
  }

  return (
    <main className="bg-white w-screen min-h-screen flex flex-col dark:bg-neutral-900 dark:text-white">
      <Scrolltotop />

      <div className="bg-white flex items-center sticky top-0 ps-4 py-4 shadow-md shadow-neutral-300 dark:bg-neutral-800">
        <button onClick={() => navigate(-1)} className="cursor-pointer">
          <FaArrowLeft />
        </button>
        <p className="text-lg font-bold absolute left-1/2 -translate-x-1/2">
          Verification
        </p>
      </div>

      <div className="flex flex-col justify-center gap-5 px-4 flex-1 py-8">
        <img src={verify} alt="" className="w-1/2 mx-auto" />

        <div className="text-center w-80 mx-auto mb-6 flex flex-col gap-3">
          <p className="text-orange-400 text-2xl font-bold">Verification Code</p>
          <p className="font-semibold leading-tight">
            Please enter the 6-digit code that was sent to
          </p>
          {email ? (
            <p className="text-sm text-neutral-600 dark:text-neutral-300 break-all">
              {email}
            </p>
          ) : (
            <p className="text-sm text-red-500">
              No email provided. Go back and try again.
            </p>
          )}
        </div>

        {error && (
          <p className="bg-red-100 text-red-600 border border-red-300 rounded-xl p-2 text-sm text-center">
            {error}
          </p>
        )}
        {info && (
          <p className="bg-green-100 text-green-700 border border-green-300 rounded-xl p-2 text-sm text-center">
            {info}
          </p>
        )}

        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          <div
            className="flex justify-between w-80 mx-auto gap-2"
            onPaste={handlePaste}
          >
            {digits.map((d, i) => (
              <input
                key={i}
                ref={(el) => (inputsRef.current[i] = el)}
                type="text"
                inputMode="numeric"
                maxLength={1}
                value={d}
                onChange={(e) => handleChange(i, e.target.value)}
                onKeyDown={(e) => handleKeyDown(i, e)}
                className="bg-orange-100 text-neutral-900 text-center text-xl font-bold outline-none w-12 h-12 rounded-xl focus:ring-2 focus:ring-orange-400"
              />
            ))}
          </div>

          <button
            type="submit"
            disabled={loading || otp.length !== 6}
            className="bg-gradient-to-b from-orange-600 to-orange-400 text-white rounded-xl py-2 cursor-pointer disabled:opacity-50"
          >
            {loading ? "Verifying..." : "Verify"}
          </button>

          <div className="flex flex-col items-center gap-1">
            <span className="text-sm text-neutral-500">Didn't receive the code?</span>
            <button
              type="button"
              onClick={handleResend}
              disabled={resending}
              className="text-orange-400 hover:text-orange-600 text-sm disabled:opacity-60"
            >
              {resending ? "Sending..." : "Resend code"}
            </button>
          </div>
        </form>
      </div>
    </main>
  )
}

export default VerificationPage