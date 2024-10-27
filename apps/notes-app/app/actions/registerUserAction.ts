"use server"

import db from "@repo/db/client";
import bcrypt from "bcrypt"
import { transporter } from "../utils/emailTransporter";
import { generateVerificationHashAndToken } from "../utils/generateVerificationHashAndToken";
import { registerSchema } from "@repo/schemas";


export const registerUserAction = async ({username,email,password} : {username : string, email : string, password : string}) => {

    // add validation
    try{
        const validationResult = registerSchema.safeParse({username,email,password});

        if(!validationResult.success){
            throw new Error(validationResult.error.message);
        }
        const collegeDomain = email.split("@")[1];

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
            subject: "Verify Your Email to Complete Registration",
            html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 20px; color: #333; background-color: #f9f9f9; border-radius: 8px; border: 1px solid #ddd;">
                <h2 style="text-align: center; color: #4CAF50;">Welcome to Our Community!</h2>
                <p style="font-size: 1.1em;">Hi there,</p>
                <p>We're excited to have you on board! Please confirm your email address to activate your account and get started.</p>
                
                <div style="text-align: center; margin: 20px 0;">
                    <a href="${verificationUrl}" 
                       style="background-color: #4CAF50; color: #fff; padding: 10px 20px; text-decoration: none; border-radius: 5px; font-size: 1.1em;">
                        Verify Your Email
                    </a>
                </div>
        
                <p>If you're unable to click the button above, copy and paste this link into your browser:</p>
                <p style="word-break: break-all; color: #555;">${verificationUrl}</p>
                
                <hr style="border: none; border-top: 1px solid #ddd; margin: 20px 0;">
                <p style="font-size: 0.9em; color: #777;">
                    If you didn't create this account, you can safely ignore this email.
                </p>
                
                <p style="font-size: 1.1em;">Thank you,</p>
                <p>The Notes Team</p>
            </div>
            `
        };

        await transporter.sendMail(mailOptions);

        return {
            success : true,
            message : "Registration successful! A verification email has been sent."
        }
    }catch(e){
        return {
            success : false,
            message: e instanceof Error ? e.message : "An unexpected error occurred.",
        };
    }
}