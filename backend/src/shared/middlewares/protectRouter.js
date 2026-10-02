import User from "../../modules/auth/auth.schema"
import jwt from "jsonwebtoken"
import dotenv from "dotenv"
dotenv.config()
export const protectRoute = async (req, res, next) => {
  try {
    const { token } = req.cookies

    if (!token) {
      return res.status(401).json({ message: "Unauthorized - No token" })
    }

    const payload = jwt.verify(token, process.env.JWT)
    const userId = payload.userId

    if (!userId) {
      return res.status(401).json({ message: "Unauthorized - Invalid token" })
    }

    const user = await User.findById(userId).select("-password")
    if (!user) {
      return res.status(401).json({ message: "Unauthorized - User not found" })
    }

    req.user = user
    next()
  } catch (error) {
    console.error("protectRoute error:", error)

    if (
      error.name === "TokenExpiredError" ||
      error.name === "JsonWebTokenError"
    ) {
      return res.status(401).json({ message: "Unauthorized - Invalid or expired token" })
    }

    res.status(500).json({ message: "Server Error" })
  }
}