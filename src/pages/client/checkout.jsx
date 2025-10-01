import { PiTrash } from "react-icons/pi";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";

export default function CheckoutPage() {
  const location = useLocation();
  const [cart, setCart] = useState(location.state.items);
  const [cartRefresh, setCartRefresh] = useState(false);
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");

  const navigate = useNavigate();

  function getTotalForLabeledPriceLocal(cart) {
    let total = 0;
    cart.forEach((element) => {
      total += (element.labeledPrice + 50) * element.quantity;
    });
    return total;
  }

  function getTotalLocal(cart) {
    let total = 0;
    cart.forEach((element) => {
      total += element.price * element.quantity;
    });
    return total;
  }

  function placeOrder() {
    const orderData = {
      name: name,
      address: address,
      phoneNumber: phoneNumber,
      billItems: [],
    };
    for (let i = 0; i < cart.length; i++) {
      orderData.billItems[i] = {
        productId: cart[i].productId,
        quantity: cart[i].quantity,
      };
    }
    const token = localStorage.getItem("token");
    axios
      .post(import.meta.env.VITE_API_URL + "/order", orderData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(() => {
        toast.success("Order placed successfully!", { duration: 3000 });
        localStorage.removeItem("cart");
        navigate("/");
      })
      .catch((error) => {
        toast.error("Error placing order!", { duration: 3000 });
      });
  }

  return (
    <div className="w-full h-full p-4 flex justify-center">
      <div className="w-[800px]">
        <h1 className="text-3xl font-bold text-center mb-4">Checkout</h1>
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
                <button
                  className="text-2xl w-[30px] h-[30px] bg-black text-white rounded-full mx-[5px] justify-center items-center cursor-pointer"
                  onClick={() => {
                    const newCart = cart;
                    newCart[index].quantity -= 1;
                    if (newCart[index].quantity <= 0)
                      newCart[index].quantity = 1;
                    setCart(newCart);
                    setCartRefresh(!cartRefresh);
                  }}
                >
                  -
                </button>
                <h1 className="text-gray-800 font-bold text-1xl">
                  {item.quantity}
                </h1>
                <button
                  className="text-2xl w-[30px] h-[30px] bg-black text-white rounded-full mx-[5px] justify-center items-center cursor-pointer"
                  onClick={() => {
                    const newCart = cart;
                    newCart[index].quantity += 1;
                    setCart(newCart);
                    setCartRefresh(!cartRefresh);
                  }}
                >
                  +
                </button>
              </div>
              <div className="h-full w-[100px] flex flex-col items-center">
                <p className="text-gray-800 font-bold text-1xl">
                  RS.{(item.price * item.quantity).toFixed(2)}
                </p>
              </div>
              <div className="h-full w-[100px] flex flex-col items-center">
                <button
                  className="text-red-500"
                  onClick={() => {
                    const newCart = cart.filter(
                      (product) => product.productId !== item.productId
                    );
                    setCart(newCart);
                  }}
                >
                  <PiTrash className="text-2xl cursor-pointer" />
                </button>
              </div>
            </div>
          );
        })}
        <div className="w-full flex gap-8 mt-6">
          {/* Left side - Totals and Place Order Button */}
          <div className="flex-1">
            <div className="w-full flex justify-between items-center">
              <h2 className="text-2xl h-[40px] font-bold">Total:</h2>
              <h2 className="text-2xl h-[40px] font-bold">
                RS.{getTotalForLabeledPriceLocal(cart).toFixed(2)}
              </h2>
            </div>
            <div className="w-full flex justify-between items-center">
              <h2 className="text-2xl h-[40px] font-bold">Discount:</h2>
              <h2 className="text-2xl h-[40px] font-bold border-b border-black">
                RS.
                {(getTotalForLabeledPriceLocal(cart) - getTotalLocal(cart)).toFixed(
                  2
                )}
              </h2>
            </div>
            <div className="w-full flex justify-between items-center mb-6">
              <h2 className="text-2xl h-[40px] font-bold">Net Total:</h2>
              <h2 className="text-2xl h-[40px] font-bold border-b-4 border-double border-black">
                RS.{getTotalLocal(cart).toFixed(2)}
              </h2>
            </div>
            <div className="w-full flex justify-start">
              <button
                className="bg-pink-500 text-white px-6 py-3 rounded hover:bg-white hover:text-pink-500 transition duration-300 cursor-pointer text-lg font-semibold"
                onClick={placeOrder}
              >
                Place Order
              </button>
            </div>
          </div>

          {/* Right side - Customer Information */}
          <div className="flex-1">
            <h3 className="text-xl font-bold mb-4">Customer Information</h3>
            <div className="flex flex-col gap-4">
              <div className="w-full flex flex-col gap-2">
                <h2 className="text-sm font-medium">Name:</h2>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="border border-gray-300 p-2 rounded w-full"
                  placeholder="Enter your full name"
                />
              </div>
              <div className="w-full flex flex-col gap-2">
                <h2 className="text-sm font-medium">Address:</h2>
                <input
                  type="text"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  className="border border-gray-300 p-2 rounded w-full"
                  placeholder="Enter your delivery address"
                />
              </div>
              <div className="w-full flex flex-col gap-2">
                <h2 className="text-sm font-medium">Phone Number:</h2>
                <input
                  type="text"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  className="border border-gray-300 p-2 rounded w-full"
                  placeholder="Enter your phone number"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
