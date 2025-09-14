import { Link } from "react-router-dom";

export default function Header() {
    return (
        <header className="w-full h-[70px] text-pink-400 flex justify-between items-center px-4">
            <h1 className="text-xl">Crystal Clear Beauty</h1>
            <div className="w-[500px] h-full flex justify-evenly items-center text-lg text-pink-500 ">
                <Link to="/">Home</Link>
                <Link to="/products">Products</Link>
                <Link to="/contact">Contact</Link>
                <Link to="/about">About Us</Link>
                <Link to="/reviews">Reviews</Link>
                </div>
        </header>
    );
}

