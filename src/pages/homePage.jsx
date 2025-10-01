import { Route, Routes } from "react-router-dom";
import Header from "../components/header";
import ProductPage from "./client/productPage";
import ProductOverview from "./client/productOverview";
import CartPage from "./client/cart";
import CheckoutPage from "./client/checkout";

function HomeContent() {
  return (
    <div>
      <h1>Welcome to Crystal Clear Beauty</h1>
      {/* Add your home page content here */}
    </div>
  );
}

export default function HomePage() {
  return (
    <div className="w-full h-screen min-h-screen bg-gray-200">
      <Header />
      <div className="w-full h-full p-4 ">
        <Routes>
          <Route path="/" element={<HomeContent />} />
          <Route path="/products" element={<ProductPage />} />
          <Route path="/products/overview/:id" element={<ProductOverview />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/checkout" element={<CheckoutPage />} />
          <Route path="*" element={<h1>404 Not Found</h1>} />
        </Routes>
      </div>
    </div>
  );
}
