"use client";

import { useRouter } from "next/navigation";
import { HiHome, HiSearch } from "react-icons/hi";
import { RxCaretLeft, RxCaretRight } from "react-icons/rx";
import { twMerge } from "tailwind-merge";
import Button from "./Button";


interface HeaderProps {
  children: React.ReactNode;
  className?: string;
}

const Header: React.FC<HeaderProps> = ({
  children,
  className
}) => {
  const router = useRouter();

  const handleLogout = () => {
    //Handle logout in the future
  }

  return (
    <div className={twMerge(`h-fit bg-gradient-to-b from-emerald-900 p-6`, className )}>
      <div className="w-full mb-4 flex justify-between items-center"> 
        <div className="hidden md:flex gap-x-2 items-center">
          <button onClick={() => router.back()} className="flex bg-black rounded-full justify-center items-center hover:opacity-75 transition">
            <RxCaretLeft className="text-white" size={35}/>
          </button>
          <button onClick={() => router.forward()} className="flex bg-black rounded-full justify-center items-center hover:opacity-75 transition">
            <RxCaretRight  className="text-white" size={35} />
          </button>
        </div>

        <div className="flex md:hidden gap-x-2 items-center">
          <button className="rounded-full bg-white p-2 items-center justify-center hover:opacity-75 transition">
            <HiHome className="text-black size={20}" />
          </button>
          <button className="rounded-full bg-white p-2 items-center justify-center hover:opacity-75 transition">
            <HiSearch className="text-black size={20}" />
          </button>
        </div>

        <div className=" flex justify-center items-center gap-x-4">
          <>
          <div>
            <Button onClick={() => {}} className="bg-transparent text-neutral-300 font-mudium">
              Sign up
            </Button>
          </div>

          <div>
            <Button onClick={() => {}} className="bg-white px-6 py-2 font-mudium">
              Log in
            </Button>
          </div>
          </>
        </div>
      </div>
      {children}
    </div>
    
  )
}

export default Header
