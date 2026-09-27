import z from "zod";

export const productSchema = z.object({
  title: z.string().min(3),
  price: z.number().min(0, "Gia thi ko dk am!"),
  desc: z.string().optional(),
});