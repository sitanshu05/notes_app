"use client"
import {useBalance} from "@repo/store/useBalance"

export default function Home() {
  const balance = useBalance()
  return (
   <div className="bg-red-500 text-3xl">
    Hi {balance}
   </div>
  );
}
