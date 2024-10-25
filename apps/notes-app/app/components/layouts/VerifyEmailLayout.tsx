"use client"
import { Input } from "@nextui-org/input"
import { Button } from "@nextui-org/button"
import { sendNewVerificationLink } from "../../actions/sendNewVerificationLink"
import { useState } from "react"


export function VerifyEmailLayout({title, children}:{title : string, children : React.ReactNode}) {

    const [email,setEmail] = useState("")


    const handleSubmit =  async() => {
        await sendNewVerificationLink(email)
        alert("If the current link is invalid you will receive a new link")

    }
    return (
        <div className="w-full mt-20 flex items-center justify-center">
            <div className=" flex flex-col gap-5 items-center">
                <h1 className="text-3xl font-bold tracking-tight">{title}</h1>
                {children}
                <p>Enter Your registered email</p>
                <Input label="email" type="email" value={email} required onChange={(e) => setEmail(e.target.value)}/>
                <div className="w-full flex justify-end">
                    <Button onClick={handleSubmit} className="bg-secondary">Submit</Button>
                </div>
            </div>
        </div>
    )
}