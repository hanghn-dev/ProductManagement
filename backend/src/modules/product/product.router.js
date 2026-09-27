import { Router } from "express";
import { productController } from "./product.controller.js";
const productRoutes = Router();

productRoutes.get("/", productController.getAllProducts);
productRoutes.get("/:id", productController.getDetailProduct);
productRoutes.post("/", productController.createProduct);
productRoutes.put("/:id", productController.updateProduct);
productRoutes.delete("/:id", productController.deleteProduct);

export default productRoutes;