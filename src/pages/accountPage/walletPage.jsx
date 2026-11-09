// src/pages/accountPage/walletPage.jsx
import { useContext, useState } from "react"
import { useNavigate } from "react-router"
import { BsArrowDown, BsArrowUp, BsAsterisk, BsPlus, BsSend } from "react-icons/bs"
import { LuEye, LuEyeClosed, LuSend } from "react-icons/lu"
import { FaArrowLeft } from "react-icons/fa"
import { FaNairaSign } from "react-icons/fa6"
import { BiCopy, BiPlus, BiWallet } from "react-icons/bi"
import { CgMore } from "react-icons/cg"
import { TfiMore } from "react-icons/tfi"
import Scrolltotop from "../../utils/scrolltotop"
import FormatPrice from "../../utils/formatPrice"
import { MdAdd } from "react-icons/md"
import { PiHandWithdraw } from "react-icons/pi"
import { AiFillMoneyCollect } from "react-icons/ai"
import { RiUserReceivedFill } from "react-icons/ri"
import { GiReceiveMoney } from "react-icons/gi"
import { FcAcceptDatabase } from "react-icons/fc"
import { userContext } from "../../context/userContext"

const WalletPage = () => {
  const navigate = useNavigate()
  const [close, setClose] = useState(false)
  const [transactionStatus, setTransactionStatus] = useState(`All`)
  const { userData } = useContext(userContext)

  const accountNumber = 2412389764
  const accountBalance = 680000
  const hide = [1,2,3,4,5,6]
  const actionStyle = `border-2 border-neutral-300 text-6xl p-3 rounded-full`

  const actions = [
    { id: 1, title: `Add funds`, icon: <MdAdd className={actionStyle} />, action: 2 },
    { id: 2, title: `Send`, icon: <LuSend className={actionStyle} />, action: 2 },
    { id: 3, title: `Withdraw`, icon: <BiWallet className={actionStyle} />, action: 2 }
  ]

  const transactions = [
    { id: 1, name: `Ada Femi`, amount: 62500, status: `Send`, date: `Oct 2` },
    { id: 2, name: userData.fullName, amount: 2500, status: `Withdraw`, date: `Aug 22` },
    { id: 3, name: `Tunde Ugo`, amount: 12000, status: `Send`, date: `May 12` },
    { id: 4, name: `Musa Adebayo`, amount: 62500, status: `Send`, date: `Oct 2` },
    { id: 5, name: userData.fullName, amount: 2500, status: `Withdraw`, date: `Aug 22` },
    { id: 6, name: `Paul Favour`, amount: 12000, status: `Send`, date: `May 12` },
    { id: 7, name: `Abu Sule`, amount: 62500, status: `Send`, date: `Oct 2` },
    { id: 8, name: userData.fullName, amount: 2500, status: `Withdraw`, date: `Aug 22` }
  ]

  const filteredTransactions = transactionStatus === `All` ? transactions : transactions.filter(value => value.status === transactionStatus)

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(accountNumber)
    } catch (error) {
      console.error(`Failed to copy account number: ${error}`)
    }
  }

  return (
    <main className="bg-white min-h-screen flex flex-col dark:bg-neutral-900 dark:text-white">
      <Scrolltotop />
      <div className="bg-white flex items-center sticky top-0 ps-4 py-4 z-10 shadow-md shadow-neutral-300 dark:bg-neutral-800">
        <button onClick={() => { navigate(-1) }} className="cursor-pointer">
          <FaArrowLeft />
        </button>
        <p className="text-lg font-bold absolute left-1/2 -translate-x-1/2">Wallet</p>
      </div>
      <div className="bg-white flex flex-col gap-5 px-4 py-5 flex-1 dark:bg-neutral-900">
        <div className="bg-gradient-to-b from-orange-500 to-orange-400 h-50 flex justify-center items-center rounded-xl relative shadow-md shadow-neutral-300">
          <button onClick={() => { setClose(previous => !previous) }} className="text-2xl absolute top-3 right-3 cursor-pointer">
            {close ? <LuEyeClosed /> : <LuEye />}
          </button>
          <div className="flex flex-col items-center gap-1">
            <p className="text-lg">Account balance</p>
            {close ? <div className="flex gap-2 p-2">{hide.map(value => <BsAsterisk key={value} />)}</div>
            : <p className="text-3xl font-bold p-1 flex items-center"><FaNairaSign /> {FormatPrice(accountBalance)}</p>}
            <button onClick={handleCopy} className="flex items-center gap-1 cursor-pointer hover:text-neutral-600"><BiCopy />{accountNumber}</button>
          </div>
        </div>
        <div className="flex justify-center gap-10 py-4">
          {actions.map(action =>
            <button key={action.id} className="flex flex-col items-center cursor-pointer">
              {action.icon} <span>{action.title}</span>
            </button>
          )}
        </div>
        <div className="flex justify-between items-center">
          <p className="font-bold">Transactions</p>
          <select name="transactions" id="transactions" onChange={(e) => {setTransactionStatus(e.target.value)}} className="border-2 border-neutral-300 p-1 rounded-xl outline-none cursor-pointer">
            <option value="All">All transactions</option>
            <option value="Send">Sent</option>
            <option value="Withdraw">Withdraw</option>
          </select>
        </div>
        <div className="flex flex-col gap-5">
          {transactions.length === 0 && <p>No transaction found</p>}
          {filteredTransactions.map(transaction => (
            <div key={transaction.id} className={`${transaction.status === `Send` ? `bg-orange-100` : `bg-green-100`} flex items-center gap-3 p-3 rounded-xl shadow-md shadow-neutral-300`}>
              {transaction.status === `Send` ? <LuSend className="text-orange-500 text-4xl" /> : <GiReceiveMoney className="text-green-500 text-4xl" /> }
              <div className="flex justify-between w-full">
                <div className="flex flex-col">
                  <p className="font-bold">{transaction.name}</p>
                  <p className="text-sm">{transaction.status === `Send` ? `Sent` : `Withdraw`} by you {transaction.date}</p>
                </div>
                <p className={`${transaction.status === `Send` ? `text-orange-500` : `text-green-500`} text-xl font-bold flex items-center`}><FaNairaSign /> {FormatPrice(transaction.amount)}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  )
}

export default WalletPage