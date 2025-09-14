import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useParams } from "react-router-dom"
import Loader from "../../components/loader";

export default function ProductOverview() {
    const params=useParams();
    const productId = params.id;

    if(productId == null){
        window.location.href="/products";
    }
    const [product, setProduct] = useState();
    const [status, setStatus] = useState("loading...");
    const [loading, setLoading] = useState(false);

    useEffect(
        () => {
        if(status =="loading..."){
            axios.get(import.meta.env.VITE_API_URL + "/product/"+productId)
            .then((response) => {
                console.log("Product fetched successfully: ", response.data);
                setProduct(response.data);
                setStatus("loaded");
            })
            .catch((error) => {
                toast.error("Error fetching product details!");
                setStatus("error");
            });
        }
    }, [loading]);

    return (
        <div className="w-full h-full bg-gray-200 p-4">
            {status == "loading..." && <Loader />}
            {status == "loaded" && product && <div className="w-full h-full bg-white rounded-lg p-4 flex flex-col md:flex-row">
                <div className="w-full md:w-1/2 h-[400px] flex justify-center items-center">
                    <img src={product.images && product.images.length > 0 ? product.images[0] : "https://via.placeholder.com/300"} alt={product.name} className="max-w-full max-h-full object-contain rounded-lg shadow-md"/>
                </div>
            </div>}
            {status == "error" && <h1>Error loading product details. Please try again later.</h1>}
        </div>
    )
}