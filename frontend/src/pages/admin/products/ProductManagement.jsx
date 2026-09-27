import React, { useEffect, useState } from "react";
import api from "../../../api";
import { Link } from "react-router-dom";

const ProductManagement = () => {
  const [products, setProducts] = useState([]);
  useEffect(() => {
    (async function () {
      try {
        const { data } = await api.get("/products");
        setProducts(data.products);
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);

  const handleDelete = async(id)=>{
  try {
     await api.delete(`/products/${id}`);
    setProducts(products.filter((item) => item._id !== id));
  } catch (error) {
    console.log(error);
  }
  }

  return (
    <>
      <div>
        <h1>Management Products</h1>
        <Link to="add">Create new</Link>
      </div>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Title</th>
            <th>Thumbnail</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {products.length != 0 &&
            products.map((item) => (
              <tr key={item.id}>
                <td>{item.id}</td>
                <td>{item.title}</td>
                <td>
                  <img src={item.thumbnail} alt={item.title} width="100px" />
                </td>
                <td>
                  <Link to={`update/${item.id}`}>Update</Link>{" "}
                  <button onClick={() => handleDelete(item._id)}>Delete</button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </>
  );
};

export default ProductManagement;