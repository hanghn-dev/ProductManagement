import { Router } from "express"
import { authController } from "./auth.controller.js"
import { validateLogin, validateRegister } from "../../shared/middlewares/validate.js"
import { validateForgotPass } from "../../shared/middlewares/validate.js"

const authRouter = Router()

authRouter.post("/register", validateRegister , authController.register)
authRouter.get("/verify-email/:token", authController.verifyEmail)
authRouter.post("/login", validateLogin, authController.login)
authRouter.post("/forgot-password", validateForgotPass, authController.forgotPasword)
authRouter.post("/refresh-token", authController.refreshToken)

export default authRouter