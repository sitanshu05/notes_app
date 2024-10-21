"use client"
import {InputBox} from "@repo/ui";
import { GradientButton } from "@repo/ui";
import { useState } from "react";
import {registerUserAction } from "../../actions/registerUserAction";

export const Signup = () => {

    const [email, setEmail] = useState("")
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")

    return (
        <div className="flex justify-center items-center h-screen ">
            <div className="w-4/12  border border-solid border-gray-700 rounded-lg p-8">
                <form action={registerUserAction} className="w-full flex flex-col gap-8">
                    <h2 className="text-2xl">
                        Sign Up
                    </h2>
                    <InputBox 
                        type="email" 
                        label="Email" 
                        placeholder="name@college.com" 
                        value={email}
                        name="email"
                        onChange={(e) => setEmail(e.target.value)}
                        />
                    <InputBox 
                        type="text" 
                        label="Username"
                        placeholder="Enter your username" 
                        value={username}
                        name="username"
                        onChange={(e) => setUsername(e.target.value)}
                        />
                    <InputBox 
                        type="password" 
                        label="Password" 
                        placeholder="Enter your password" 
                        value={password}
                        name="password"
                        onChange={(e) => setPassword(e.target.value)}
                        />
                    <div className="flex justify-end">
                        <GradientButton  title="Sign Up"/>
                    </div>
                </form>
            </div>
        </div>
    )
}