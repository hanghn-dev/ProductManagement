import React from "react";
import { useParams,useNavigate } from "react-router-dom";
import api from "../../../api";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { productSchema } from "../../../validation/productSchema";

const ProductFormPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(productSchema),
  });

  useEffect(() => {
     if (id){
      (async () => {
        try {
          const { data } = await api.get(`/products/${id}`); 
          setValue("title", data.product.title);   
          setValue("price", data.product.price);   
          setValue("desc", data.product.desc); 
        } catch (error) {
          console.log(error);
        }
      })();
     }
  },[id, setValue])
  
  const submit = async (data) => {
    try {
      if (id) {
        await api.put(`/products/${id}`, data);
      } else {
        await api.post("/products", data);
      }
      navigate("/admin/products");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <h1>{id ? "Update" : "Add"} Product</h1>
      <form action="" onSubmit={handleSubmit(submit)}>
        <div className="form-group">
          <label htmlFor="">Title</label>
          <input type="text" {...register("title")} />
          {errors?.title && (
            <p style={{ color: "red" }}>{errors.title.message}</p>
          )}
        </div>

        <div className="form-group">
          <label htmlFor="">Price</label>
          <input
            type="number"
            {...register("price", { valueAsNumber: true })}
          />
          {errors?.price && (
            <p style={{ color: "red" }}>{errors.price.message}</p>
          )}
        </div>

        <div className="form-group">
          <label htmlFor="">Description</label>
          <textarea cols="30" rows="10" {...register("desc")}></textarea>
        </div>

        <div className="form-group">
          <button>{id ? "Update" : "Add"}</button>
        </div>
      </form>
    </>
  );
};

export default ProductFormPage;