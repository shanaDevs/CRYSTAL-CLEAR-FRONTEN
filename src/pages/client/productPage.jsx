import axios from "axios";
import { useEffect, useState } from "react";
import Loader from "../../components/loader";
import ProductsCard from "../../components/proucts-card";

export default function ProductPage() {

    const [productList, setProductList] = useState([]);
    const [productLoaded, setProductLoaded] = useState(false);

    useEffect(() => {
        if(!productLoaded){
        axios.get(import.meta.env.VITE_API_URL + "/product")
            .then((response) => {
                
                setProductList(response.data);
                setProductLoaded(true);
            })
            .catch((error) => {
                console.error("Error fetching products: ", error);
            });
            
        }
    }, [productLoaded]);

    return (
        <div className="w-full h-full bg-gray-200 p-4 flex flex-col justify-start items-center overflow-y-auto">
            <h1 className="text-2xl font-bold mb-4">Product Details</h1>
            <p className="text-lg">Here you can find more information about our products.</p>
                {productLoaded?<div className="w-full h-full flex flex-wrap justify-center items-center">
                    {productList.map((product , index) => {
                        return(
                            <ProductsCard key={product.productId} product={product} />
                        )
                    })}
                </div> : <Loader />}

        </div>
    );
}
