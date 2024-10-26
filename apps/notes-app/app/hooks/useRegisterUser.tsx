import { useState } from "react";
import {registerSchema} from "@repo/schemas"
import { registerUserAction } from "../actions/registerUserAction";

export function useRegisterUser() {
    const [loading,setLoading] = useState(false)
    const [error,setError] = useState<null | string>(null)
    const [successMessage, setSuccessMessage] = useState<null | string>(null);

    
    const registerUser = async ({username, email, password} : {username : string, email : string, password : string}) => {
        setLoading(true)

        //validate 
        const validationResult = registerSchema.safeParse({ username, email, password });
        if (!validationResult.success) {
            setError(validationResult.error.message);
            setLoading(false);
            return;
        }

        try{
             const response  = await registerUserAction({username, email, password})

             if(response.success){
                setSuccessMessage(response.message)
             }else{
                setError(response.message)
             }
        }
        catch(e){
            setError("An unexpected error occurred.");
        }finally{
            setLoading(false)
        }

    }
    return {loading,error,successMessage,registerUser}
    
}
