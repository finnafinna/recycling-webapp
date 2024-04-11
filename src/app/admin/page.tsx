"use client"
import { useAuthContext } from "@/API/firebase_auth"
import { useRouter } from "next/navigation"
import { useEffect } from "react"


export default function Admin() {
    const user = useAuthContext()
    const router =  useRouter()

    useEffect(() => {
        if (user == null) router.push("/")
      }, [user])

    return (
        <div className="min-h-screen w-full bg-neutral-100 flex flex-col">
            
        </div>
    )
}