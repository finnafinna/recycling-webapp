'use client'
import Image from "next/image";
import NavBar from "@/components/navbar";
import { useAuthContext } from "@/API/firebase_auth";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { DocumentData, Timestamp} from "firebase/firestore";
import { UserData, get_transaction_data, get_user_data, new_transaction } from "@/API/firebase_functions";
import Transaction from "@/components/transaction";

export default function Home() {
  const [transactionData, setTransactionData] = useState<null | {[id: string] : DocumentData}>(null);
  const [userData, setUserData] = useState<null |UserData >(null);
  const user = useAuthContext()
  const router =  useRouter()

  useEffect(() => {
    if (user == null) router.push("/")
    else if (user.user != null) {
      get_transaction_data(user.user).then((transactions) => {setTransactionData(transactions)});
      get_user_data(user.user).then((userData) => setUserData(userData));
    }
  }, [user])

  const handle_transaction = (uid: string, result: boolean) => {
    new_transaction(uid, result)
    if (user.user != null) {
      get_transaction_data(user.user).then((transactions) => {setTransactionData(transactions)});
      get_user_data(user.user).then((userData) => setUserData(userData));
      router.refresh()
    }
  }

  return (
    <main className="flex min-h-screen min-w-screen flex-col bg-neutral-100">
      <NavBar page={1} />
      <section className="px-12 py-6 h-[90vh] w-full flex">
        <div className="w-1/3 h-full flex flex-col rounded-xl ">
          <div className="w-full h-1/3 bg-gradient-to-bl from-cyan-200 via-teal-200 to-green-200 rounded-2xl p-3 shadow-neutral-400 shadow-md flex flex-col">
            <div className="w-full h-full flex flex-col items-center justify-center">
              <span className="text-9xl p-2 px-[15%] bg-gradient-to-tr from-green-400 via-teal-500 to-emerald-400 bg-clip-text text-transparent font-medium">{userData ? userData.items : 0}</span>
              <span className="text-lg text-neutral-600 font-semibold "> Items recycled since last pickup</span>
            </div>
          </div>
          <div className="w-full h-1/3 rounded-2xl p-3 shadow-neutral-400 shadow-md flex flex-col mt-4">
            <div className="w-full h-full flex flex-col items-center justify-center">
              <span className="text-7xl p-2 px-[15%] bg-neutral-900 bg-clip-text text-transparent font-medium">${userData ? userData.balance : "0"}<span className="text-xl text-neutral-700">/ $100.00</span></span>

              <span className="text-lg text-neutral-600 font-semibold "> Total Balance</span>
            </div>
          </div>
          <div className="w-full h-1/3 rounded-2xl p-3 shadow-neutral-400 shadow-md flex flex-col mt-4">
            <div className="w-full h-full flex flex-col items-center justify-center">
              <span className="text-3xl p-2 px-[15%] bg-neutral-900 bg-clip-text text-transparent font-medium">Add Transactions:</span>
              {user.user != null && 
              <div className="flex flex-row">
                <button onClick={() => handle_transaction((user.user ? user.user.uid : ""), true)} className="p-4 bg-emerald-500 rounded-xl mx-3">Successful</button>
                <button onClick={() => handle_transaction((user.user ? user.user.uid : ""), false)} className="p-4 bg-red-500 rounded-xl mx-3 ">Unsuccessful</button>
              </div>
              }
            </div>
          </div>
        </div>
        
        <div className="w-2/3 h-full border-2 border-neutral-300 rounded-xl mx-3 flex flex-col p-5">
          <div className="w-full flex col">
            <span className="w-full text-neutral-900 font-semibold text-xl pb-2 border-b-neutral-900 border-b">Recent Transactions</span>
          </div>
          {
            transactionData != null && Object.entries(transactionData).map(([id, data]) => { data != null
              return <Transaction success={data.success as boolean} timestamp={data.timestamp as Timestamp} balance={data.balance as number} />
            })
          }
        </div>
      </section>
    </main>
  );
}
