import { Router} from "express"
import productRoutes from "../modules/product/product.router.js"
import authRouter from "../modules/auth/auth.route.js"
const routes = Router()

routes.use("/products", productRoutes)
routes.use("/auth", authRouter)
export default routes