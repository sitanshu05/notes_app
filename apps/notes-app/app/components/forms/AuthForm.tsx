"use client"
import {AlertPopup, InputBox} from "@repo/ui";
import { GradientButton } from "@repo/ui";
import { useState } from "react";
import {Image} from "@nextui-org/image";
import { signIn, signOut } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useRegisterUser } from "../../hooks/useRegisterUser";
import { loginSchema } from "@repo/schemas";


export const AuthForm = ({type} : {type : "register" | "login"}) => {

    const [email, setEmail] = useState("")
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [loading, setLoading] = useState(false)
    const {registerUser} = useRegisterUser()
    const [showSuccessAlert, setShowSuccessAlert] = useState(false);
    const [showErrorAlert, setShowErrorAlert] = useState(false);
    const router = useRouter()
    const [message, setMessage] = useState<string | undefined>(undefined)

    const handleSubmit = async (e : React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true)
        setShowSuccessAlert(false); // Reset alerts on new submission
        setShowErrorAlert(false);
        

        if(type === "register"){
            const result = await registerUser({username, email, password});

            if(result?.success){
                setShowSuccessAlert(true);
                setMessage(result.message)
            }
            else{
                setShowErrorAlert(true);
                setMessage(result.error)
            }


        }
        else if(type === "login"){
            await signOut({redirect : false})

            const validationResult = loginSchema.safeParse({ email, password });
            if (!validationResult.success) {
                setLoading(false);
                setMessage(validationResult.error.errors[0]?.message)
                setShowErrorAlert(true);
                return;
            }

            const result = await signIn('credentials', {
                email,
                password,
                redirect : false
            }) 

            if(result?.error){
                setShowErrorAlert(true);
                setMessage("error while logging in")
            }
            router.push("/courses")
        }

        setLoading(false)
    }

    return (
        <div className="grid grid-cols-1 lg:grid-cols-2 overflow-hidden">
            { showSuccessAlert && <AlertPopup message={message || ""} type={"success"} onClose={() => {setShowErrorAlert(false)}} /> }
            {showErrorAlert && <AlertPopup message={message || ""} type="error" onClose={()=>{setShowErrorAlert(false)}} />}
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