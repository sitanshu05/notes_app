"use client"
import { Input } from "@nextui-org/input"
import { Button } from "@nextui-org/button"
import { sendNewVerificationLink } from "../../actions/sendNewVerificationLink"
import { useState } from "react"
import { AlertPopup } from "@repo/ui"


export function VerifyEmailLayout({title, children}:{title : string, children : React.ReactNode}) {

    const [email,setEmail] = useState("")
    const [loading,setLoading] = useState(false)
    const [isLinkSent, setIsLinkSent] = useState(false)


    const handleSubmit =  async() => {
        setLoading(true)
        await sendNewVerificationLink(email)
        setIsLinkSent(true)
        setLoading(false)

    }
    return (
        <div className="w-full mt-20 flex items-center justify-center">
           {isLinkSent &&  <AlertPopup onClose={() => setIsLinkSent(false)} type="success" message="If the current verification link is invalid you will receive a new link"/> }
            <div className=" flex flex-col gap-5 items-center">
                <h1 className="text-3xl font-bold tracking-tight">{title}</h1>
                {children}
                <p>Enter your registered email</p>
                <Input label="email" type="email" value={email} required onChange={(e) => setEmail(e.target.value)} />
                <div className="w-full flex justify-end">
                    <Button onClick={handleSubmit} className="bg-secondary" isLoading={loading}>Submit</Button>
                </div>
            </div>
        </div>
    )
}