"use server"

import db from "@repo/db/client";
import bcrypt from "bcrypt"
import { transporter } from "../utils/emailTransporter";
import { generateVerificationHashAndToken } from "../utils/generateVerificationHashAndToken";


export const registerUserAction = async (formData : FormData) => {

    // add validation 
    try{
        const email = formData.get("email") as string;
        const username = formData.get("username") as string;
        const password = formData.get("password") as string;

        const collegeDomain = email.split("@")[1];
        console.log(email,username,password)
        console.log(collegeDomain)

        const college = await db.college.findFirst({
            where: {
                college_domain: collegeDomain
            }
        })

        if(!college){ 
            throw new Error("College not found");
        }

        const existingUserByEmail = await db.user.findUnique({
            where: { email: email },
        });

        if (existingUserByEmail) {
            throw new Error("User with this email already exists.");
        }
        // Check if the user already exists by username
        const existingUserByUsername = await db.user.findUnique({
            where: { username: username },
        });

        if (existingUserByUsername) {
            throw new Error("Username is already taken.");
        }

        //generateToken
        const verificationToken = generateVerificationHashAndToken();

        
        const user = await db.user.create({
            data: {
                email: email,
                username: username,
                password: await bcrypt.hash(password,10),
                collegeId: college.id
            }
        })
        
        await db.verificationToken.create({
            data : {
                userId : user.id,
                token : verificationToken.hash,
                expiresAt : new Date(Date.now() + 1000 * 60 * 60 * 24)
            }
        })

        const verificationUrl = `${process.env.NEXTAUTH_URL}/verify?token=${verificationToken.token}&userId=${user.id}`

        const mailOptions = {
            from: process.env.EMAIL_ADDRESS,
            to: email,
            subject: "Verify your email",
            html: `<p>Click <a href="${verificationUrl}">here</a> to verify your email</p>`
        };

        await transporter.sendMail(mailOptions);

        return {
            message : "success"
        }
    }catch(e){
        console.log(e)

    }
}