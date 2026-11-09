import { useState } from "react"
import { BiTrash } from "react-icons/bi"

const DeleteAccount = ({ setDeleteAccount }) => {
  const [password, setPassword] = useState(``)
  const handleDelete = () => {
    alert(`deleted`)
  }

  return (
    <div className="bg-neutral-950/50 h-screen w-full flex justify-center items-center absolute top-0 left-0 z-20">
      <div className="bg-white w-[90%] flex flex-col gap-5 p-4 rounded-2xl">
        <div className="flex flex-col items-center gap-1 text-center">
          <BiTrash className="bg-red-200 text-red-600 text-5xl p-2 rounded-full" />
          <p className="text-2xl font-bold">Delete account?</p>
          <p className="leading-tight">This action is permanent and cannot be undone.</p>
        </div>
        <div className="flex flex-col gap-2">
          <p className="leading-tight">Once your account is deleted, all your data will be permanently deleted. Please enter your password for confirmation.</p>
          <div className="flex flex-col gap-1">
            <label htmlFor="password" className="font-bold">Password</label>
            <input type="password" id="password" required value={password} onChange={(e) => {setPassword(e.target.value)}} className="bg-orange-100 w-full p-2 rounded-xl outline-none" />
          </div>
        </div>
        <div className="flex gap-2">
          <button onClick={() => {setDeleteAccount(pre => !pre)}} className="bg-neutral-300 p-2 rounded-xl cursor-pointer w-full">Cancel</button>
          <button onClick={handleDelete} className="bg-red-600 text-white p-2 rounded-xl cursor-pointer w-full">Delete account</button>
        </div>
      </div>
    </div>
  )
}

export default DeleteAccount