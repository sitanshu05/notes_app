"use server"

import { getServerSession } from "next-auth";
import { authOptions } from "../lib/authOptions";
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import {getSignedUrl} from "@aws-sdk/s3-request-presigner"
import crypto from "crypto"

const generateFileName = (bytes=32) => crypto.randomBytes(bytes).toString("hex");

const r2 = new S3Client({

  region:"auto",
  endpoint: `https://${process.env.CLOUDFLARE_ACCOUNT_ID!}.r2.cloudflarestorage.com`,
  credentials : {
    accessKeyId: process.env.CLOUDFLARE_ACCESS_KEY_ID!,
    secretAccessKey: process.env.CLOUDFLARE_ACCESS_KEY!
  }
})


export async function getPresignedURL() {

  const session = await getServerSession(authOptions);
  console.log(session)

  
  if (!session) {
    return { failure: "not authenticated" }
  }

  const putObjectCommand = new PutObjectCommand({
    Bucket: process.env.R2_BUCKET_NAME!,
    Key : `notes/${session.collegeId}/${session.user.id}/${generateFileName()}`
  })

  const presignedURL = await getSignedUrl(r2,putObjectCommand, {
    expiresIn : 90,

  })

  const publicUrl = new URL(presignedURL.split("?")[0]!)

  publicUrl.hostname = process.env.CLOUDFLARE_DOMAIN!

  return {success: {uploadUrl: presignedURL, publicUrl : publicUrl.toString()}}
}
