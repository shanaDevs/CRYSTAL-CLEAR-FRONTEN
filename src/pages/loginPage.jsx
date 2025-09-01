import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
export default function LoginPage(){
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    function handleLogin(){
        axios.post(import.meta.env.VITE_API_URL + "/user/login", { email, password })
            .then(response => {
                console.log("Login successful:", response.data);
                toast.success("Login successful");
                localStorage.setItem("token", response.data.token);
                const user = response.data.user;
                if(user.role === "admin"){
                    localStorage.setItem("user", JSON.stringify(user));
                    navigate("/admin");
                }else{
                    localStorage.setItem("user", JSON.stringify(user));
                    navigate("/");
                }

            })
            .catch(error => {
                console.error("Login failed:", error);
                toast.error("Login failed");
            });
    }
    return (
        <div className="w-full h-screen bg-[url('/loginbg.jpg')] bg-cover bg-center flex">
            <div className="w-[50%] h-full"></div>
            <div className="w-[50%] h-full flex justify-center items-center">
                <div className="w-[450px] h-[450px] backdrop-blur-xl shadow-lg rounded-lg flex flex-col justify-center items-center">
                    <input onChange={(e) => setEmail(e.target.value)} type="email" placeholder="E-mail" className="w-[400px] h-[50px] border border-gray-300 rounded-md p-2 text-center outline-none m-[5px]" />
                    <input onChange={(e) => setPassword(e.target.value)} type="password" placeholder="Password" className="w-[400px] h-[50px] border border-gray-300 rounded-md p-2 text-center outline-none m-[5px]" />
                    <button onClick={handleLogin} className="w-[400px] h-[50px] bg-green-500 text-white rounded-md cursor-pointer">Log In</button>

                </div>
            </div>
        </div>
    );
}
