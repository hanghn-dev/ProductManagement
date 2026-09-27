import Product from "./product.schema.js";

export const productService = {
  getAll: async()=>{
    return await Product.find({ deletedAt: null })
  },
  getById:async(id)=>{
    const product = await Product.findOne({ _id: id, deletedAt: null });
    if (!product) throw new Error("Product not found");
    return product;
  },
  create: async (data) => {
    return await Product.create(data);
  },
  update: async (id, data) => {
    const product = await Product.findByIdAndUpdate(id, data, { new: true });
    if (!product) throw new Error("Product not found");
    return product;
  },
   remove: async (id) => {
    const product = await Product.findByIdAndUpdate(
      id,
      { deletedAt: new Date() },
      { new: true }
    );
    if (!product) throw new Error("Product not found");
    return product;
  },
}