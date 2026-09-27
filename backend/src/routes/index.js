import { Router} from "express"
import productRoutes from "../modules/product/product.router.js"
const routes = Router()

routes.use("/products", productRoutes)


export default routes