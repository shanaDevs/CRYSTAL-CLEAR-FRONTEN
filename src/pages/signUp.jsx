import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";

export default function SignupPage() {
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(false);
  
  const navigate = useNavigate();

  function handleSubmit() {
    // Basic validation
    if (!email || !firstName || !lastName || !password || !confirmPassword) {
      toast.error("Please fill in all required fields!");
      return;
    }

    if (password !== confirmPassword) {
      toast.error("Passwords do not match!");
      return;
    }

    if (password.length < 6) {
      toast.error("Password must be at least 6 characters long!");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      toast.error("Please enter a valid email address!");
      return;
    }

    setLoading(true);

    const userData = {
      email,
      firstName,
      lastName,
      password,
      phone: phone || "Not given",
    };

    axios.post(import.meta.env.VITE_API_URL + "/user", userData)
      .then(response => {
        toast.success("Account created successfully!");
        navigate("/login");
        setLoading(false);
      })
      .catch(error => {
        console.error("Signup error:", error);
        if (error.response?.data?.message) {
          toast.error(error.response.data.message);
        } else if (error.response?.status === 400) {
          toast.error("User with this email already exists!");
        } else {
          toast.error("Signup failed! Please try again.");
        }
        setLoading(false);
      });
  }

  return (
    <div className="w-full h-screen bg-[url('/loginbg.jpg')] bg-cover bg-center flex">
      <div className="w-[50%] h-full"></div>
      <div className="w-[50%] h-full flex justify-center items-center">
        <div className="w-[450px] h-[550px] backdrop-blur-xl shadow-lg rounded-lg flex flex-col justify-center items-center">
          <h2 className="text-2xl font-bold text-center mb-6 text-white">
            Create Account
          </h2>
          
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email Address"
            className="w-[400px] h-[50px] border border-gray-300 rounded-md p-2 text-center outline-none m-[5px]"
            required
          />

          <div className="flex w-[400px] gap-2">
            <input
              type="text"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              placeholder="First Name"
              className="w-[195px] h-[50px] border border-gray-300 rounded-md p-2 text-center outline-none m-[5px]"
              required
            />
            <input
              type="text"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              placeholder="Last Name"
              className="w-[195px] h-[50px] border border-gray-300 rounded-md p-2 text-center outline-none m-[5px]"
              required
            />
          </div>

          <input
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="Phone Number (Optional)"
            className="w-[400px] h-[50px] border border-gray-300 rounded-md p-2 text-center outline-none m-[5px]"
          />

          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            className="w-[400px] h-[50px] border border-gray-300 rounded-md p-2 text-center outline-none m-[5px]"
            required
            minLength="6"
          />

          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="Confirm Password"
            className="w-[400px] h-[50px] border border-gray-300 rounded-md p-2 text-center outline-none m-[5px]"
            required
            minLength="6"
          />

          <button
            onClick={handleSubmit}
            disabled={loading}
            className="w-[400px] h-[50px] bg-green-500 text-white rounded-md cursor-pointer"
          >
            {loading ? "Creating Account..." : "Sign Up"}
          </button>
          
          <p>
            Already have an account?{" "}
            <span className="text-blue-500 cursor-pointer">
              <Link to="/login">Please Sign In</Link>
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}
