"use server"
import db from "@repo/db/client"
import {transporter } from "../utils/emailTransporter";
import { generateVerificationHashAndToken } from "../utils/generateVerificationHashAndToken";


export async function sendNewVerificationLink(email: string) {

    const user = await db.user.findUnique({
        where : {
            email,
            isVerified : false
        },
        include : {
            verificationToken : true
        }
    })

    if (!user) {
        // User not found or already verified
        return;
    }

    // Check if the current verification token has expired
    const currentToken = user.verificationToken;
    if (currentToken && currentToken.expiresAt > new Date()) {
        // Token is still valid
        return;
    }

    const hashAndToken = generateVerificationHashAndToken();

    await db.verificationToken.update({
        where : {
            userId : user.id
        },
        data : {
            token : hashAndToken.hash,
            expiresAt : new Date(Date.now() + 1000 * 60 * 60 * 24),
        }
    })

    await transporter.sendMail({
        from: process.env.EMAIL_ADDRESS,
        to: email,
        subject: "Verify your email",
        html: `<a href="${process.env.NEXTAUTH_URL}/api/auth/verify?token=${hashAndToken.token}&userId=${user.id}">Verify</a>`
    })
}