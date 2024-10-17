'use client'

import NavBar from "@/components/navbar";
import { useAuthContext } from "@/API/firebase_auth";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { DocumentData, Timestamp} from "firebase/firestore";
import { UserData, get_transaction_data, get_user_data, new_transaction } from "@/API/firebase_functions";

import { getAuth, signOut } from "firebase/auth";
import firebase from "@/API/firebase_config";
import TransactionFull from "@/components/transactionfull";

export default function Home() {
  const [transactionData, setTransactionData] = useState<null | {[id: string] : DocumentData}>(null);
  const [userData, setUserData] = useState<null |UserData >(null);
  const user = useAuthContext()
  const router =  useRouter()
  const auth = getAuth(firebase)

  useEffect(() => {
    console.log(auth.currentUser)
    if (user == null) router.push("/")
    else if (user.user != null) {
      get_transaction_data(user.user).then((transactions) => {setTransactionData(transactions)});
      get_user_data(user.user).then((userData) => setUserData(userData));
    }
  }, [user])
    return (
      <main className="flex min-h-screen flex-col items-center justify-between bg-gradient-to-b from-neutral-200 from-20% via-emerald-100 via-80% to-emerald-200 overflow-y-hidden">
        <NavBar page={2} />
        <section className="flex min-w-[70vw] max-h-[90vh] bg-neutral-200 overflow-y-scroll flex-col">
        {
            transactionData != null && Object.entries(transactionData).map(([id, data]) => { data != null
              return <TransactionFull success={data.success as boolean} timestamp={data.timestamp as Timestamp} balance={data.balance as number} image={data.image_url as string} />
            })
        }
        </section>
      </main>
    );
  }