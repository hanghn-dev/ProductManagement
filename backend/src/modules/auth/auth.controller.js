import { hashPassword } from "../../shared/utils/password.js"
import { authService } from "./auth.service.js"
import { sendEmail } from "../../shared/utils/emailVerify.js"
import { generateToken } from "../../shared/utils/generateToken.js"
import { comparePassword } from "../../shared/utils/password.js"
import { generateRefreshToken } from "../../shared/utils/generateRefreshToken.js"
import crypto from "node:crypto"
export const authController = {
  register: async (req, res) => {
    try {
      const { email, password, fullName } = req.body

      const userExist = await authService.findByMail(email)
      if (userExist) {
        return res.status(400).json({
          message: "Nguoi dung da ton tai!",
        })
      }
      const hashPass = await hashPassword(password)
      const user = await authService.createUser(email, hashPass, fullName)
      const newToken = user.emailVerificationToken
      await sendEmail(user.email,
                     "Xác nhận email của bạn",
                     `<p>Bấm vào link để xác nhận: <a href="http://localhost:5173/verify-email/${newToken}">Verify email</a></p>`)

      return res.status(201).json({ message: "Please check your email to verify your account." })
    } catch (error) {
      console.error("Register unsuccessfully:", error)
      res.status(500).json({ message: "Server Error" })
    }
  },
  verifyEmail : async(req,res)=>{
    try {
      const {token} = req.params
      if (!token) {
        return res.status(400).json({ message: "Invalid token" })
      }
      const user = await authService.findByVerifyToken(token)
      if (!user) {
        return res.status(400).json({ message: "Invalid token" })
      }
      if (
        user.emailVerificationExpires &&
        user.emailVerificationExpires.getTime() < Date.now()
      ) {
        return res.status(410).json({ message: "Verification link has expired" })
      }
      await authService.markEmailVerified(user._id)
       generateToken(user._id, res)
       const refreshToken = generateRefreshToken(user._id, res)
       const expires = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)
       await authService.saveRefreshToken(user._id, refreshToken, expires)
       return res.status(200).json({ message: "Email verified successfully" })
    } catch (error) {
      console.error("VerifyEmail error:", error)
      return res.status(500).json({ message: "Server Error" })
    }
  },
  login:async(req,res)=>{
    try {
      const { email, password } = req.body
      const user = await authService.loginAccount(email)
      if (!user) {
        return res.status(401).json({ message: "Email or Password is wrong" })
      }
      const checkedPass = await comparePassword(password, user.password)
      if (!checkedPass) {
      return res.status(401).json({ message: "Email or Password is wrong" })
      if (!user.isEmailVerified) {
       return res.status(403).json({ message: "Please verify your email first" })}
      generateToken(user._id, res)
      const refreshToken = generateRefreshToken(user._id, res)
      const expires = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)
      await authService.saveRefreshToken(user._id, refreshToken, expires)
      return res.status(200).json({ message:"Login successfully" ,data: {
        fullName: user.fullName,
        email: user.email,
      }})
}
    } catch (error) {
      console.error("Login error:", error)
      return res.status(500).json({ message: "Server Error" })
    }
  },
  forgotPasword: async(req,res)=>{
    try {
       const { email } = req.body
       const user = await authService.findByMail(email)
       if (!user) {
      return res.status(200).json({ message: "Invalid Email" })
    }
    const token = crypto.randomBytes(32).toString("hex")
    const expires = new Date(Date.now() + 3 * 60 * 60 * 1000)
    await authService.setResetToken(user._id, token, expires)
    await sendEmail(
      user.email,
      "Đặt lại mật khẩu",
      `<a href="${process.env.CLIENT_URL}/reset-password/${token}">Reset</a>`
    )
     return res.status(200).json({ message: "Link already sent to email" })
    } catch (error) {
      console.error("ForgotPassword error:", error)
      return res.status(500).json({ message: "Server Error" })
    }
  },
  refreshToken: async (req,res) =>{
    try {
       const { refreshToken } = req.cookies
      if (!refreshToken) {
      return res.status(401).json({ message: "No refresh token" })
      }

     let payload
      try {
      payload = jwt.verify(refreshToken, process.env.REFRESH_SECRET)
      } catch (err) {
      return res.status(401).json({ message: "Invalid refresh token" })}
      const userId = payload.userId
      if (!userId) {
      return res.status(401).json({ message: "Invalid refresh token" })
      }

       const user = await authService.findById(userId)
       if (!user) {
      return res.status(401).json({ message: "User not found" })
       }
      if (user.refreshToken !== refreshToken) {
      return res.status(401).json({ message: "Refresh token revoked" })}
      if (
      user.refreshTokenExpires &&
      user.refreshTokenExpires.getTime() < Date.now()
    ) {
      return res.status(401).json({ message: "Refresh token expired" })}
      generateToken(user._id, res)
      return res.status(200).json({ message: "Token refreshed successfully" })
    } catch (error) {
      console.error("RefreshToken error:", error)
      return res.status(500).json({ message: "Server Error" })
    }
  }
}