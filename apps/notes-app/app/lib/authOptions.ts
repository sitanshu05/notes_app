import CredentialsProvider from "next-auth/providers/credentials"
import db from "@repo/db/client"
import bcrypt from "bcrypt"

export const authOptions = {
    providers :[
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email :{label :"email", type: "email",required : true},
                password : {label :"password",type:"password",required : true}
            },

            async authorize(credentials) {

                if(!credentials){
                    return null;
                }
                
                const existingUser = await db.user.findFirst({
                    where:{
                        email : credentials?.email
                    }
                })

                if(existingUser){
                    const passwordValidation = await bcrypt.compare(credentials.password,existingUser.password)

                    if(passwordValidation){
                        //check if email is verified
                        console.log("signed in")
                        return {
                            id: existingUser.id.toString(),
                            collegeId:existingUser.collegeId,
                            username : existingUser.username
                        }
                    }
                    else{
                        return null;
                    }
                }else{

                    return null
                    
                }
            },
        })
    ],
    secret : process.env.JWT_SECRET,
    callbacks :{
        async jwt({token,user} : any){
            if(user){
                token.id=user.id;
                token.username = user.username
                token.collegeId = user.collegeId
            }
            return token
        },

        async session({session,token} : any){
            if(token){
                session.user.id = token.id
                session.user.username = token.username
                session.collegeId = token.collegeId
            }
            return session
        }
    },
    pages : {
        signIn : "/login"
    }
}
