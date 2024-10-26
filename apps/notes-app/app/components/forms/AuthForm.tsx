"use client"
import {AlertPopup, InputBox} from "@repo/ui";
import { GradientButton } from "@repo/ui";
import { useState } from "react";
import {Image} from "@nextui-org/image";
import { signIn, signOut } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useRegisterUser } from "../../hooks/useRegisterUser";


export const AuthForm = ({type} : {type : "register" | "login"}) => {

    const [email, setEmail] = useState("")
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [loading, setLoading] = useState(false)
    const {registerUser,error,successMessage} = useRegisterUser()
    const router = useRouter()

    const handleSubmit = async (e : React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true)
        if(type === "register"){
            await registerUser({username, email, password});
        }
        else if(type === "login"){
            await signOut({redirect : false})

            await signIn('credentials', {
                email,
                password,
                redirect : false
            }) 
            router.push("/courses")
        }

        setLoading(false)
    }

    return (
        <div className="grid grid-cols-1 lg:grid-cols-2 overflow-hidden">
            {successMessage && <AlertPopup message={successMessage} type={"success"} /> }
            {error && <AlertPopup message={error} type="error" />}
           <div className="hidden lg:block bg-red-50">
               <Image
                    src="https://images.unsplash.com/photo-1531674842274-9563aa15686f?q=80&w=2565&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                    alt="Signup background image"
                    className= "w-full object-cover overflow-hidden"
                    radius="none"
                    height={830}
                />
           </div>
            <div className="w-full rounded-lg p-10 lg:mt-32 flex justify-center">
                <form onSubmit={handleSubmit} className="w-full flex flex-col gap-10 max-w-xl">
                    <h2 className="text-3xl font-bold tracking-tight">
                        {type === "register" ? "Register" : "Login" }
                    </h2>
                    <InputBox 
                        type="email" 
                        label="Email" 
                        placeholder="name@college.com" 
                        value={email}
                        name="email"
                        onChange={(e) => setEmail(e.target.value)}
                        />
                    { type === "register" && <InputBox 
                        type="text" 
                        label="Username"
                        placeholder="Enter your username" 
                        value={username}
                        name="username"
                        onChange={(e) => setUsername(e.target.value)}
                        />}
                    <InputBox 
                        type="password" 
                        label="Password" 
                        placeholder="Enter your password" 
                        value={password}
                        name="password"
                        onChange={(e) => setPassword(e.target.value)}
                        />
                    <div className="flex justify-end">
                        <GradientButton  title={type === "register" ? "Sign Up" : "Login"} loading={loading}/>
                    </div>
                </form>
            </div>
        </div>
    )
}