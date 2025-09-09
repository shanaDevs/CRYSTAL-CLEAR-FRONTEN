import axios from "axios"
import { useEffect, useState } from "react";
import { FaPlus } from "react-icons/fa";
import { Link } from "react-router-dom";

export default function AdminProductsPage(){

    const [products, setProducts] = useState([]);
    useEffect(
        () => {
            axios.get(import.meta.env.VITE_API_URL + "/product").then(
                (response) => {
                    setProducts(response.data);
                }
            );
        },
        []

    )

    axios.get(import.meta.env.VITE_API_URL + "/product").then(
        (response) => {
            setProducts(response.data);
        }
    )
    return(
        <div className="w-full h-full rounded-lg relative">
            <Link to={"/admin/add-products"} className="bg-gray-700 absolute text-white p-[12px] rounded-full text-3xl mb-4 flex items-center hover:bg-gray-400 hover:text-gray-700 right-5 bottom-5">
                <FaPlus />
            </Link>
            <table className="w-full">
                <thead>
                    <tr>
                        <th className="text-left">Product ID</th>
                        <th className="text-left">Product Name</th>
                        <th className="text-left">Price</th>
                        <th className="text-left">Labelled Price</th>
                        <th className="text-left">Stock</th>

                    </tr>
                </thead>
                <tbody>
                    {products.map((product, index) => (
                        <tr key={index} className="border-b-2 border-gray-300 text-center cursor-pointer hover:bg-gray-800 hover:text-white">
                            <td className="py-2">{product.productId}</td>
                            <td className="py-2">{product.name}</td>
                            <td className="py-2">${product.price}</td>
                            <td className="py-2">${product.labeledPrice}</td>
                            <td className="py-2">{product.stock}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            
        </div>
    )
}