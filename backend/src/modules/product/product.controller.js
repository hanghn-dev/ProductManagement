import { productService } from "./product.service.js"
export const productController = {
    getAllProducts: async (req, res) => {
        try {
            const products = await productService.getAll();
            return res.status(200).json({products})
        } catch (error) {
            return res.status(500).json({ message: error.message });
        }
    },
    getDetailProduct: async(req,res) =>{
        try {
            const id = req.params 
            const product = await productService.getById(id)
            return res.status(200).json({products})
        } catch (error) {
            res.status(404).json({ message: error.message });
        }
    },
    createProduct: async (req, res) => {
        try {
            const data = req.body
            const product = await productService.create(data);
            res.status(201).json({ product });
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    },
    updateProduct: async (req, res) =>{
        try {
            const {id} = req.params
            const data = req.body
            const product = await productService.update(id,data)
            res.status(200).json({ product });
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    },
    deleteProduct: async (req, res) =>{
        try {
            const {id} = req.params
            await productService.remove(id);
            res.status(200).json({message:"Delete product successfully"})
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    }
}