import { useState } from "react";
import {registerSchema} from "@repo/schemas"
import { registerUserAction } from "../actions/registerUserAction";
import { m } from "framer-motion";

export function useRegisterUser() {
    const [loading,setLoading] = useState(false)

    
    const registerUser = async ({username, email, password} : {username : string, email : string, password : string}) => {
        setLoading(true)

        //validate 
        const validationResult = registerSchema.safeParse({ username, email, password });
        if (!validationResult.success) {
            setLoading(false);
            return {
                success : false,
                error : validationResult.error.errors[0]?.message
            };
        }

        try{
             const response  = await registerUserAction({username, email, password})

             if(response.success){
                return {
                    success : true,
                    message : response.message
                }
             }else{
                return {
                    success : false,
                    error : response.message
                }
             }
        }
        catch(e){
            return {
                success : false,
                error : "An error occurred while registering"
            }
        }finally{
            setLoading(false)
        }

    }
    return {loading,registerUser}
    
}
