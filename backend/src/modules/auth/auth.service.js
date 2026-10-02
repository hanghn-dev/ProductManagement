import crypto from "node:crypto"
import User from "./auth.schema.js"

export const authService = {
  findByMail: (email) => User.findOne({ email }),
  findById: (id) => User.findById(id),
  createUser: async (email, password, fullName) => {
    const user = await User.create({
      email,
      password,
      fullName,
      isEmailVerified: false,
      emailVerificationToken: crypto.randomBytes(32).toString("hex"),
      emailVerificationExpires: new Date(Date.now() + 3 * 60 * 60 * 1000),
    })
    return user
  },
  findByVerifyToken: (token) =>
  User.findOne({ emailVerificationToken: token }),

  markEmailVerified: (userId) =>
  User.findByIdAndUpdate(
    userId,
    {
      isEmailVerified: true,
      emailVerificationToken: undefined,
      emailVerificationExpires: undefined,
    },
    { new: true }
  ),
  saveRefreshToken: (userId, token, expires) =>
  User.findByIdAndUpdate(
    userId,
    { refreshToken: token, refreshTokenExpires: expires },
    { new: true }
  ),
  loginAccount: (email) =>
  User.findOne({ email }).select("+password"),


  setResetToken:(userId,token, expires) =>{
    User.findByIdAndUpdate(userId,{
      resetPasswordToken: token, resetPasswordExpires: expires
    }, {new: true})
  }
}