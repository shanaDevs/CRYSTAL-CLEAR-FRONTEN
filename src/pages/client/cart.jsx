import { PiTrash } from "react-icons/pi";
import getCart, { addToCart, removeFromCart } from "../../../utils/cart";
import {useEffect, useState } from "react";

export default function CartPage() {
    const [cartLoaded, setCartLoaded] = useState(false);
    const [cart, setCart] = useState([]);
    useEffect(() => {
       if(cartLoaded==false){
        const cart = getCart();
        setCart(cart);
        setCartLoaded(true);
       }
    }, [cartLoaded]);
  return (
    <div className="w-full h-full p-4 flex justify-center">
      <div className="w-[800px]">
        <h1 className="text-3xl font-bold text-center mb-4">Your Cart</h1>
        {cart.map((item, index) => {
          return (
            <div
              key={index}
              className="border-b-[1px] py-2 bg-white p-4 mb-2 rounded shadow flex items-center justify-between"
            >
              <img
                src={item.image}
                alt={item.name}
                className="w-[100px] h-[100px] object-cover mr-4 aspect-square"
              />
              <div className="h-full max-w-[300px] w-[300px] overflow-hidden text-ellipsis">
                <h1 className="text-lg font-bold">{item.name}</h1>
                <h2 className="text-sm text-gray-500 mb-2">
                  {item.altnames.join(" | ")}
                </h2>
                <p className="text-gray-600">
                  Price: RS.{item.price.toFixed(2)}
                </p>
              </div>
              <div className="h-full w-[100px] flex justify-center items-center">
                <button className="text-2xl w-[30px] h-[30px] bg-black text-white rounded-full mx-[5px] justify-center items-center cursor-pointer"
                onClick={() => {
                    addToCart(item , -1);
                    setCartLoaded(false);
                }}
                >-</button>
                <h1 className="text-gray-800 font-bold text-1xl">{item.quantity}</h1>
                <button className="text-2xl w-[30px] h-[30px] bg-black text-white rounded-full mx-[5px] justify-center items-center cursor-pointer"
                onClick={() => {
                    addToCart(item , 1);
                    setCartLoaded(false);
                }}
                >+</button>
              </div>
              <div className="h-full w-[100px] flex flex-col items-center">
                <p className="text-gray-800 font-bold text-1xl">
                  RS.{(item.price * item.quantity).toFixed(2)}
                </p>
              </div>
              <div className="h-full w-[100px] flex flex-col items-center">
                <button className="text-red-500" onClick={() => {
                    removeFromCart(item.productId);
                    setCartLoaded(false);
                }}>
                  <PiTrash className="text-2xl cursor-pointer" />
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
