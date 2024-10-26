import { redirect } from "next/navigation"
import db from "@repo/db/client"
import crypto from "crypto"
import { VerifyEmailLayout } from "../components/layouts/VerifyEmailLayout";
export default async function Verify(context : any){

    const { token, userId } = context.searchParams;

    if(!token || !userId){
        return (
            <VerifyEmailLayout title={"Invalid request"}>
                <p>The verification link is invalid please request for a new verification link</p>
            </VerifyEmailLayout>
        )
    }

    const verificationToken  = await db.verificationToken.findFirst({
        where : {
            token : crypto.createHash("sha256").update(token).digest("hex"),
            userId : Number(userId)
        }
    })

    if(!verificationToken){
        return (
            <VerifyEmailLayout title={"Invalid request"}>
                <p>The verification link is invalid please request for a new verification link </p>
            </VerifyEmailLayout>
        )
    }

    if(verificationToken.expiresAt < new Date()){
        return (
            <VerifyEmailLayout title={"Invalid request"}>
                <p>The verification link expired please request for a new verification link</p>
            </VerifyEmailLayout>
        )
    }

    await db.user.update({
        where : {
            id : Number(userId)
        },
        data : {
            isVerified : true
        }
    })

    await db.verificationToken.delete({
        where : {
            id : verificationToken.id
        }
    })

    redirect("/api/auth/signin");


}