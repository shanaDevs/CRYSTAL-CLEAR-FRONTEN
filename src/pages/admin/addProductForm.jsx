import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import mediaUpload from "../../../utils/mediaUpload";

export default function AddProductForm() {
  const [productName, setProductName] = useState("");
  const [productId, setProductId] = useState("");
  const [altName, setAltName] = useState("");
  const [price, setPrice] = useState("");
  const [labeledPrice, setLabeledPrice] = useState("");
  const [description, setDescription] = useState("");
  const [stock, setStock] = useState("");
  const [images, setImages] = useState([]);
  const navigate = useNavigate();

async function handleSubmit() {
    const promisesArray = [];

  for(let i =0; i<images.length; i++){
    const promise = mediaUpload(images[i]);
    promisesArray[i] = promise;
  }
  try{
    const results = await Promise.all(promisesArray);
    console.log(results);

    const altNameInArray= altName.split(",");
    console.log(altNameInArray);
    const product = {
      productId: productId,
      name: productName,
      altName: altNameInArray,
      price: price,
      labeledPrice: labeledPrice,
      description: description,
      stock: stock,
      images: [...results]
    }
    const token = localStorage.getItem("token");
   await axios.post(import.meta.env.VITE_API_URL + "/product", product, {
      headers:{
        "Authorization": "Bearer " + token
      }
    })
    toast.success("Product added successfully!");
    // navigate("/admin/products");
  }catch(error){
    toast.error("Product adding failed!");
    console.error("Product adding failed: ", error);
  }
}
  
  return (
    <div className="w-full h-full rounded-lg flex justify-center items-center bg-gray-700">
      <div className="w-[500px] h-[600px] flex flex-col rounded-lg shadow-lg items-center">
        <input
          value={productId}
          onChange={(e) => { setProductId(e.target.value) }}
          type="text"
          placeholder="Product ID"
          className="w-[90%] p-2 border-2 border-gray-300 focus:outline-none focus:border-blue-500 mb-1 rounded-sm"
        />
        <input
          value={productName}
          onChange={(e) => { setProductName(e.target.value) }}
          type="text"
          placeholder="Product Name"
          className="w-[90%] p-2 border-2 border-gray-300 focus:outline-none focus:border-blue-500 mb-1 rounded-sm"
        />
        <input
          value={altName}
          onChange={(e) => { setAltName(e.target.value) }}
          type="text"
          placeholder="Alt Name"
          className="w-[90%] p-2 border-2 border-gray-300 focus:outline-none focus:border-blue-500 mb-1 rounded-sm"
        />
        <input
          value={price}
          onChange={(e) => { setPrice(e.target.value) }}
          type="number"
          placeholder="Price"
          className="w-[90%] p-2 border-2 border-gray-300 focus:outline-none focus:border-blue-500 mb-1 rounded-sm"
        />
        <input
          value={labeledPrice}
          onChange={(e) => { setLabeledPrice(e.target.value) }}
          type="number"
          placeholder="Labeled Price"
          className="w-[90%] p-2 border-2 border-gray-300 focus:outline-none focus:border-blue-500 mb-1 rounded-sm"
        />
        <textarea
          value={description}
          onChange={(e) => { setDescription(e.target.value) }}
          placeholder="Description"
          className="w-[90%] p-2 border-2 border-gray-300 focus:outline-none focus:border-blue-500 mb-1 rounded-sm"
        />
        <input type="file" onChange={(e)=>{
          setImages(e.target.files);
        }}
          className="w-[90%] p-2 border-2 border-gray-300 focus:outline-none focus:border-blue-500 mb-1 rounded-sm"
          multiple
          placeholder="Select Images"
        />
        <input
          value={stock}
          onChange={(e) => { setStock(e.target.value) }}
          type="number"
          placeholder="Stock"
          className="w-[90%] p-2 border-2 border-gray-300 focus:outline-none focus:border-blue-500 mb-1 rounded-sm"
        />
        <div className="w-[380px] h-[100px] flex justify-between items-center rounded-lg">
          <Link to={["/admin/products"]} className="text-white rounded-lg p-[10px] w-[180px] text-center bg-red-500 hover:bg-red-700">
            Cancel
          </Link>
          <button onClick={handleSubmit} className=" text-white rounded-lg p-[10px] w-[180px] text-center bg-green-500 hover:bg-green-700">
            Add Product
          </button>
        </div>
      </div>
    </div>
  );
}