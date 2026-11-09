import { Link, useNavigate } from "react-router"
import { FaAngleLeft, FaAngleRight, FaArrowLeft, FaMoon } from "react-icons/fa"
import { BsToggleOff, BsToggleOn } from "react-icons/bs"
import { useContext, useState } from "react"
import { MdDelete, MdPrivacyTip } from "react-icons/md"
import { GrSystem } from "react-icons/gr"
import { themeContext } from "../../context/themeContext"
import Scrolltotop from "../../utils/scrolltotop"
import DeleteAccount from "../../components/deleteAccount"

const SettingsPage = () => {
  const navigate = useNavigate()
  const [deleteAccount, setDeleteAccount] = useState(false)
  const { darkMode, toggleDarkMode } = useContext(themeContext)

  return (
    <main className="bg-white min-h-screen flex flex-col relative dark:bg-neutral-900 dark:text-white">
      <Scrolltotop />
      {deleteAccount && <DeleteAccount setDeleteAccount={setDeleteAccount} />}
      <div className="bg-white flex items-center sticky top-0 ps-4 py-4 z-10 shadow-md shadow-neutral-300 dark:bg-neutral-800">
        <button onClick={() => { navigate(-1) }} className="cursor-pointer">
          <FaArrowLeft />
        </button>
        <p className="text-lg font-bold absolute left-1/2 -translate-x-1/2">System Settings</p>
      </div>
      <div className="bg-white px-4 py-5 flex-1 dark:bg-neutral-900">
        <div className="bg-white rounded-xl shadow-md shadow-neutral-300 dark:bg-neutral-800">
          <div className="flex justify-between items-center p-3">
            <div className="flex items-center gap-3">
              <FaMoon className="text-lg" />
              <span>Dark mode</span>
            </div>
            <button onClick={toggleDarkMode} className="cursor-pointer">
              { darkMode ? <BsToggleOn className="text-xl" /> : <BsToggleOff className="text-xl" /> }
            </button>
          </div>
          <Link to={`/version`} className="flex justify-between items-center p-3">
            <div className="flex items-center gap-3">
              <MdPrivacyTip className="text-lg" />
              <span>App version / privacy</span>
            </div>
            <FaAngleRight className="text-lg" />
          </Link>
          <button onClick={() => {setDeleteAccount(pre => !pre)}} className="w-full flex justify-between items-center p-3 cursor-pointer">
            <div className="flex items-center gap-3">
              <MdDelete className="text-xl text-red-600" />
              <span className="text-red-600">Delete account</span>
            </div>
            <FaAngleRight className="text-red-600 text-lg" />
          </button>
        </div>
      </div>
    </main>
  )
}

export default SettingsPage