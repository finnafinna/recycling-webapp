import { User } from "firebase/auth";
import { DocumentData, Timestamp, addDoc, collection, doc, getDoc, getDocs, getFirestore, orderBy, query, serverTimestamp, updateDoc } from "firebase/firestore";
import firebase from "./firebase_config";
import { LargeNumberLike } from "crypto";


export const get_transaction_data = async (user: User) => {
    const db = getFirestore(firebase)
    const coll = collection(db, "users", user.uid, "transactions")
    const q = query(coll, orderBy("timestamp", "desc"))
    const transactionSnapshot = await getDocs(q)
    let all_transactions: {[id: string] : DocumentData; } = {}
    transactionSnapshot.forEach((doc) => {
      all_transactions[doc.id] = doc.data();
      console.log(doc.data())
    })
    return all_transactions
  }

export interface UserData {
  uid: string;
  balance: number;
  items: number;
}

export const get_user_data = async (user: User) => {
  const db = getFirestore(firebase);
  const userRef = await getDoc(doc(db, "users", user.uid))
  if (userRef.exists()){
    const userData: UserData = {uid: user.uid, balance: userRef.data().balance, items: userRef.data().items }
    return userData
  }
  else return null
}


export const new_transaction = async (uid: string, result: boolean) => {
  const db = getFirestore(firebase);
  const userData = (await getDoc(doc(db, "users", uid))).data()
  let new_balance = 0;
  if (result && userData) {
    new_balance = userData.balance + 0.1
  } else if (userData)
  {new_balance = userData.balance}

  const docRef = await addDoc(collection(db, "users", uid, "transactions"), {
    timestamp: serverTimestamp(),
    success: result,
    balance: new_balance
  })

  let items = 0;
  if (result && userData){
    items = userData.items + 1;
  } else if (userData) {
    items = userData.items
  }

  const updateRef = await updateDoc(doc(db, "users", uid), {
    balance: new_balance,
    items: items
  })

}