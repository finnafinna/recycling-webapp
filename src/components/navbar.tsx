'use client'
import { useEffect } from "react";
import { User } from "firebase/auth"
import { MdOutlineRecycling } from "react-icons/md";
import profile_pic from "@/assets/profile_pic.jpg"
import Link from 'next/link'
import Image from 'next/image'
import { useAuthContext } from "@/API/firebase_auth";

interface NavBarProps {
    page: number;
}

const NavBar: React.FC<NavBarProps> = ({page}) => {
    const user = useAuthContext();
    useEffect(() => {
        for (let i = 0; i < 3; i++){
            let heading = document.getElementById((i+1).toString());
            if (heading) {
                heading.className = "mx-[10%] px-2 cursor-pointer hover:text-neutral-800 hover:ease-in-out";
                if ((i+1) == page){
                    heading.className = "mx-[10%] px-2 cursor-pointer font-bold text-neutral-800 border-b-neutral-800 border-b";
                }
            }
            

        }
    }, [])


return (
    <section className="w-full bg-transparent flex flex-row p-4 font-sans">
        <div className="px-3 flex content-between w-full items-center justify-between">
            <span className="font-bold text-xl flex items-center pb-3 text-black"><MdOutlineRecycling className="mx-1 text-2xl" />MyRecycling</span>
            <div className="flex mx-3 w-1/3 justify-center font-medium text-neutral-600">
                <div className="flex justify-between w-full">
                    <Link href="/dashboard" id="1" className="">DASHBOARD</Link>
                    <Link href="/history" id="2" className="">HISTORY</Link>
                    <Link href="/payments" id="3" className="">PAYMENT</Link>
                </div>
            </div>
            <div className="rounded-2xl bg-gradient-to-bl from-cyan-200 via-teal-200 to-green-200 p-2 flex items-center cursor-pointer drop-shadow-md shadow-neutral-900">
                <Image alt="Profile Pic" width={20} height={20} className="rounded-full max-h-8 max-w-8 mr-2" src={ user.user?.photoURL != null ? user.user.photoURL : profile_pic} />
                <span className="text-sm font-semibold text-neutral-900 hover:text-neutral-600">Finlay Marshalsey</span>
            </div>
        </div>

    </section>
)
}

export default NavBar