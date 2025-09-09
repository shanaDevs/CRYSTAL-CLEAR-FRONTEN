import { Link } from "react-router-dom";

export default function AddProductForm() {
  return (
    <div className="w-full h-full rounded-lg flex justify-center items-center bg-gray-700">
      <div className="w-[500px] h-[600px] flex flex-col rounded-lg shadow-lg items-center">
        <input
          type="text"
          placeholder="Product Name"
          className="w-[90%] p-2 border-2 border-gray-300 focus:outline-none focus:border-blue-500 mb-1 rounded-sm"
        />
        <input
          type="text"
          placeholder="Alt Name"
          className="w-[90%] p-2 border-2 border-gray-300 focus:outline-none focus:border-blue-500 mb-1 rounded-sm"
        />
        <input
          type="text"
          placeholder="Price"
          className="w-[90%] p-2 border-2 border-gray-300 focus:outline-none focus:border-blue-500 mb-1 rounded-sm"
        />
        <input
          type="text"
          placeholder="Labeled Price"
          className="w-[90%] p-2 border-2 border-gray-300 focus:outline-none focus:border-blue-500 mb-1 rounded-sm"
        />
        <textarea
          type="text"
          placeholder="Description"
          className="w-[90%] p-2 border-2 border-gray-300 focus:outline-none focus:border-blue-500 mb-1 rounded-sm"
        />
        <input
          type="text"
          placeholder="Stock"
          className="w-[90%] p-2 border-2 border-gray-300 focus:outline-none focus:border-blue-500 mb-1 rounded-sm"
        />
        <div className="w-[380px] h-[100px] flex justify-between items-center rounded-lg">
          <Link to={["/admin/products"]} className="text-white rounded-lg p-[10px] w-[180px] text-center bg-red-500 hover:bg-red-700">
            Cancel
          </Link>
          <button className=" text-white rounded-lg p-[10px] w-[180px] text-center bg-green-500 hover:bg-green-700">
            Add Product
          </button>
        </div>
      </div>
    </div>
  );
}
//   productId: {
//     type: String,
//     required: true,
//     unique: true,
//   }
//   name: {
//     type: String,
//     required: true,
//   }
//   altnames:{
//     type: [String],
//     default: [],
//   }
//   price: {
//     type: Number,
//     required: true,
//   }
//   labeledPrice:{
//     type: Number,
//     required: true,
//   }
//   description: {
//     type: String,
//     required: true,
//   }
//   images:{
//     type: [String],
//     required: true,
//     default: ["https://tse4.mm.bing.net/th/id/OIP.-TtQuPhug-niTY5lVHc7agHaHa?pid=Api&P=0&h=220"],

//   stock: {
//     type: Number,
//     required: true,
