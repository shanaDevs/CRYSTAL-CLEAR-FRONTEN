import { CiDatabase } from "react-icons/ci";
import { FaUsers } from "react-icons/fa";
import { GoPackage } from "react-icons/go";
import { HiOutlineDocumentReport } from "react-icons/hi";
import { Link, Route, Routes } from "react-router-dom";

export default function AdminPage(){
    return(
        <div className="w-full h-screen bg-gray-200 flex p-2">
            <div className="h-full w-[300px] ">
                <Link to="/admin/users" className="flex p-2 hover:bg-gray-300 items-center"><CiDatabase className="mr-2" />Products</Link>
                <Link to="/admin/orders" className="flex p-2 hover:bg-gray-300 items-center"><GoPackage className="mr-2" />Orders</Link>
                <Link to="/admin/customers" className="flex p-2 hover:bg-gray-300 items-center"><FaUsers className="mr-2" />Customers</Link>
                <Link to="/admin/reports" className="flex p-2 hover:bg-gray-300 items-center"><HiOutlineDocumentReport className="mr-2" />Reports</Link>
            </div>
            <div className="h-full bg-white w-[calc(100vh-300px)]">
                <Routes path="/*">
                    <Route path="/users" element={<h1>Users</h1>} />
                    <Route path="/orders" element={<h1>Orders</h1>} />
                    <Route path="/customers" element={<h1>Customers</h1>} />
                    <Route path="/reports" element={<h1>Reports</h1>} />
                </Routes>
            </div>
        </div>
    )
}