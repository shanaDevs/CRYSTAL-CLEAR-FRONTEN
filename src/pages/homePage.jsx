import { Route, Routes } from "react-router-dom";
import Header from "../components/header";
import ProductPage from "./client/productPage";
import ProductOverview from "./client/productOverview";
import CartPage from "./client/cart";

export default function HomePage() {
  return (
    <div className="w-full h-screen min-h-screen bg-gray-200">
      <Header />
      <div className="w-full h-full p-4 ">
        <Routes path="/*">
          <Route path="/" element={<HomePage />} />
          <Route path="/products" element={<ProductPage />} />
          <Route path="/products/overview/:id" element={<ProductOverview />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/*" element={<h1>404 Not Found</h1>} />

        </Routes>
      </div>
    </div>
  );
}
