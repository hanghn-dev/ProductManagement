import jwt from "jsonwebtoken"
import dotenv from "dotenv"
dotenv.config()
export const generateRefreshToken = (userId, res) => {
  const refreshToken = jwt.sign(
    { userId },
    process.env.REFRESH_SECRET,
    { expiresIn: "30d" }
  )

  res.cookie("refreshToken", refreshToken, {
    maxAge: 30 * 24 * 60 * 60 * 1000,
    httpOnly: true,
    sameSite: "Strict",
    secure: process.env.NODE_ENV === "production",
  })
  return refreshToken
}