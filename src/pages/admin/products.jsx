import axios from "axios"
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { FaPlus, FaRegTrashAlt,FaRegEdit  } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import Loader from "../../components/loader";

export default function AdminProductsPage(){

    const [products, setProducts] = useState([]);
    const [loaded, setLoaded] = useState(false);
    const navigate = useNavigate();
    useEffect(
        () => {
            if(!loaded){
            axios.get(import.meta.env.VITE_API_URL + "/product").then(
                (response) => {
                    setProducts(response.data);
                    setLoaded(true);
                }
            );
        }
        },
        [loaded]

    )
   async function deleteProduct(productId){
       const token = localStorage.getItem("token");
       if(token==null){
        toast.error("please login first!");
        return;
       } 
       try{
       await axios.delete(import.meta.env.VITE_API_URL + "/product/" + productId, {
           headers: {"Authorization": "Bearer " + token}
       })
       setLoaded(false);
       toast.success("Product deleted successfully!");
    } catch (error) {
       toast.error("Failed to delete product.");
    }
    }
    return(
        <div className="w-full h-full rounded-lg relative">
            <Link to={"/admin/add-products"} className="bg-gray-700 absolute text-white p-[12px] rounded-full text-3xl mb-4 flex items-center hover:bg-gray-400 hover:text-gray-700 right-5 bottom-5">
                <FaPlus />
            </Link>
            {loaded && <table className="w-full">
                <thead>
                    <tr className="text-center">
                        <th >Product ID</th>
                        <th >Product Name</th>
                        <th >Alt Name</th>
                        <th >Price</th>
                        <th >Labelled Price</th>
                        <th >Stock</th>
                        <th >Actions</th>

                    </tr>
                </thead>
                <tbody>
                    {products.map((product, index) => (
                        <tr key={index} className="border-b-2 border-gray-300 text-center cursor-pointer hover:bg-gray-100">
                            <td className="py-2">{product.productId}</td>
                            <td className="py-2">{product.name}</td>
                            <td className="py-2">{product.altnames.join(", ")}</td>
                            <td className="py-2">${product.price}</td>
                            <td className="py-2">${product.labeledPrice}</td>
                            <td className="py-2">{product.stock}</td>
                            <td className="py-2">
                                <div className="w-full h-full flex p-3 justify-center">
                                    <FaRegTrashAlt className="text-red-700 text-[20px] m-[10px] hover:text-red-400"
                                    onClick={()=>{deleteProduct(product.productId)}}  /> 
                                 <FaRegEdit className="text-blue-600 text-[20px] m-[10px] hover:text-blue-400"
                                 onClick={
                                    () => navigate("/admin/edit-product",{
                                        state:product
                                    })
                                 }
                                 /></div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>}{
                !loaded && <Loader />
            }
            
        </div>
    )
}