import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useParams } from "react-router-dom";
import Loader from "../../components/loader";
import ImageSlider from "../../components/imageSlider";
import getCart, { addToCart } from "../../../utils/cart";

export default function ProductOverview() {
  const params = useParams();
  const productId = params.id;

  if (productId == null) {
    window.location.href = "/products";
  }
  const [product, setProduct] = useState();
  const [status, setStatus] = useState("loading...");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (status == "loading...") {
      axios
        .get(import.meta.env.VITE_API_URL + "/product/" + productId)
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
    <div className="w-full h-full bg-gray-300 p-4">
      {status == "loading..." && <Loader />}
      {status == "loaded" && product && (
        <div className="w-full h-full rounded-lg p-4 flex">
          <div className="w-[50%] h-full p-4">
            <ImageSlider images={product.images} />
          </div>

          <div className="w-[50%] h-full justify-center items-center p-4 flex flex-col">
            <h1 className="text-3xl font-bold text-center">
              {product.name}
              <span className="text-gray-500 font-medium text-sm">
                {product.altnames.join(" | ")}{" "}
              </span>
            </h1>
            <p className="text-gray-600 mb-2">
              Product ID: {product.productId}
            </p>
            <div className="w-full flex justify-center items-center">
              {product.labeledPrice > product.price ? (
                <>
                  <h2 className="text-pink-500 font-bold text-3xl mx-[20px] mb-4">
                    RS.{product.price.toFixed(2)}
                  </h2>
                  <h2 className="line-through text-gray-500 ml-2 text-md">
                    RS.{product.labeledPrice.toFixed(2)}
                  </h2>
                </>
              ) : (
                <p className="text-pink-500 font-bold text-3xl mb-4">
                  RS.{product.price.toFixed(2)}
                </p>
              )}
            </div>
            <p className="text-gray-800 mb-4">{product.description}</p>
            <div className="w-full flex justify-center items-center gap-4">
              <button className="bg-pink-500 text-white px-4 py-2 rounded hover:bg-white hover:text-pink-500 transition duration-300 border-1 cursor-pointer" onClick={()=>{
                addToCart(product , 1);
                toast.success("Product added to cart!");
                console.log(getCart());
              }}>
                Add to Cart
              </button>
              <button className="bg-amber-500 text-white px-4 py-2 rounded hover:bg-white hover:text-amber-500 transition duration-300 border-1 cursor-pointer">
                Buy Now
              </button>
            </div>
          </div>
        </div>
      )}
      {status == "error" && (
        <h1>Error loading product details. Please try again later.</h1>
      )}
    </div>
  );
}
