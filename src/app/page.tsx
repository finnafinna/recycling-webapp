'use client'
import { initializeApp } from "firebase/app";
import firebase from "@/API/firebase_config";
import { useEffect, useState } from "react";
import { GoogleAuthProvider, getAuth, signInWithCredential, signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { FaEye, FaEyeSlash, FaGoogle } from "react-icons/fa";
import { useAuthContext } from "@/API/firebase_auth";
import { useRouter } from "next/navigation";



export default function main(){
    const [passwordVisible, setPasswordVisibility] = useState<boolean>(true);
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const auth = getAuth(firebase);
    const router = useRouter();
    const user = useAuthContext();

    const handleSignIn =  async () => {
        const user = await signInWithEmailAndPassword(auth, email, password).then(() => {
            router.push("/dashboard")
        }).catch((error) => {
            alert("Account does not exist with those credentials, please try again.")
        })
    }
    const handleGoogleSignIn = async () => {
        const user = await signInWithPopup(auth, new GoogleAuthProvider()).then(() => {
            router.push("/dashboard")
        }).catch((error) => {
            alert("Error occured while signing in with Google.")
        })
    }
    useEffect(() => {
        if (user != null) router.push("/dashboard")
    }, [user])
    return(
    <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-teal-200 from-20% via-emerald-100 via-80% to-emerald-200 backdrop-blur-lg">
        <section className="flex flex-col items-center justify-center p-5 bg-neutral-100 rounded-xl outline-1 outline outline-neutral-500">
            <h1 className="font-semibold text-neutral-900 text-lg px-3  w-full">Sign In</h1>
            <div className="flex flex-col items-start justify-center w-full py-3">
                <input onChange={(e) => setEmail(e.target.value)} placeholder="Email or Username" className="py-2 px-3 bg-transparent border-b text-neutral-800 border-b-neutral-400 placeholder:text-neutral-500 shadow-md rounded-lg"></input>
                <div className="flex justify-center items-center mt-5">
                    <input onChange={(e) => setPassword(e.target.value)} placeholder="Password" type={passwordVisible ? "password" : "text"} className=" py-2 px-3 bg-transparent border-b text-neutral-800 border-b-neutral-400 placeholder:text-neutral-500 shadow-md rounded-lg"></input>
                    {passwordVisible ? <FaEye onClick={() => setPasswordVisibility(!passwordVisible)} className="text-neutral-800 ml-2 text-lg cursor-pointer"/> 
                    : <FaEyeSlash onClick={() => setPasswordVisibility(!passwordVisible)} className="text-neutral-800 ml-2 text-lg cursor-pointer" />}
                </div>
                <button onClick={() => handleSignIn()} className="w-full text-neutral-200 mt-7 p-2 bg-gradient-to-bl from-emerald-400 to-teal-500 rounded-full hover:from-emerald-300 hover:to-teal-400">Log In</button>
                <button onClick={() => handleGoogleSignIn()} className="w-full flex justify-center items-center text-neutral-200 mt-4 p-2 bg-gradient-to-bl from-cyan-400 to-indigo-500 hover:from-cyan-300 hover:to-indigo-400 rounded-full"> <FaGoogle className="mr-2"/> Sign in with Google</button>
            </div>
        </section>
    </main>
    )
}