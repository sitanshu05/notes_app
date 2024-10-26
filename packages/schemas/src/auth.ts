import zod from "zod"


const registerSchema = zod.object({
    email : zod.string().email("Please enter a valid email"),
    username : zod.string().min(4, "username must be at least 4 characters")
              .max(15, "username must be at most 15 characters")
              .regex(/^[a-zA-Z0-9]+$/, "username must contain only letters and numbers"),
    password : zod.string().min(6,"Password must be at least 6 characters")
    .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
    .regex(/[!@#$%^&*(),.?":{}|<>]/, "Password must contain at least one special character"),
})

const loginSchema = zod.object({
    email : zod.string().email("Please enter a valid email"),
    password : zod.string().min(6,"Password must be at least 6 characters")
    .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
    .regex(/[!@#$%^&*(),.?":{}|<>]/, "Password must contain at least one special character"),
})

export {registerSchema, loginSchema}