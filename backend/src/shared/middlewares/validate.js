import { email, z } from "zod" 
export const validateRegister = z.object({
    fullName : z.string().min(1),
    email:z.string().email(),
    password: z.string().min(6)
})

export const validateLogin = z.object({
    email:z.string().email(),
    password: z.string().min(6)
})

export const validateForgotPass = z.object({
    email:z.string().email()
})