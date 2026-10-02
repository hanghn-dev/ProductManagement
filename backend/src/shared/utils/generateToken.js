import jwt from "jsonwebtoken"
import dotenv from "dotenv"
dotenv.config()
export const generateToken = (userId, res) => {
    const Token =  jwt.sign({userId},process.env.JWT, {expiresIn:"7d"})
    res.cookie("token", Token, {
        maxAge : 7*24*60*60*1000, 
        httpOnly : true,
        sameSite : "Strict",
        secure : process.env.NODE_ENV === "production"
    })
}