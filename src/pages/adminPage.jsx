import { CiDatabase } from "react-icons/ci";
import { FaUsers } from "react-icons/fa";
import { GoPackage } from "react-icons/go";
import { HiOutlineDocumentReport } from "react-icons/hi";
import { Link, Route, Routes } from "react-router-dom";
import AdminProductsPage from "./admin/products";
import AddProductForm from "./admin/addProductForm";
import EditProductForm from "./admin/editProdut";

export default function AdminPage(){
    return(
        <div className="w-full h-screen bg-gray-200 flex p-2">
            <div className="h-full w-[300px] ">
                <Link to="/admin/products" className="flex p-2 hover:bg-gray-300 items-center"><CiDatabase className="mr-2" />Products</Link>
                <Link to="/admin/orders" className="flex p-2 hover:bg-gray-300 items-center"><GoPackage className="mr-2" />Orders</Link>
                <Link to="/admin/customers" className="flex p-2 hover:bg-gray-300 items-center"><FaUsers className="mr-2" />Customers</Link>
                {/* <Link to="/admin/reports" className="flex p-2 hover:bg-gray-300 items-center"><HiOutlineDocumentReport className="mr-2" />Reports</Link> */}
            </div>
            <div className="w-full h-full bg-white ">
                <Routes path="/*">
                    <Route path="/Products" element={<AdminProductsPage />} />
                    <Route path="/orders" element={<h1>Orders</h1>} />
                    <Route path="/customers" element={<h1>Customers</h1>} />
                    <Route path="/add-products" element={<AddProductForm />} />
                    <Route path="/edit-product" element={<EditProductForm />} />
                </Routes>
            </div>
        </div>
    )
}