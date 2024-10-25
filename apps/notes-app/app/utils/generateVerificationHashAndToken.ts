import crypto from "crypto"

export const generateVerificationHashAndToken = () => {
    const token = crypto.randomBytes(64).toString("hex");

    return {
        token:token,
        hash :crypto.createHash("sha256").update(token).digest("hex")}
        ;
}