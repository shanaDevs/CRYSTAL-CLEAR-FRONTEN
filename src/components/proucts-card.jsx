import { Link } from "react-router-dom";

function ProductsCard(props) {
  const product = props.product;
  return (
    <Link
      to={"/products/overview/"+product.productId}
      className="w-[250px] h-[350px] bg-white m-2 p-4 rounded-lg shadow-md flex flex-col justify-between items-center"
    >
      <img
        src={
          product.images && product.images.length > 0
            ? product.images[0]
            : "https://via.placeholder.com/150"
        }
        alt={product.name}
        className="w-full h-[200px] object-cover mb-2 rounded-md"
      />
      <div className="h-[110px] w-full flex flex-col px-4">
        <p className="text-gray-600">{product.productId}</p>
        <p className="font-bold text-lg">{product.name}</p>
        <p className="text-pink-500 font-bold">
          RS.{product.price.toFixed(2)}
          <span className="line-through text-gray-500 ml-2 text-md">
            RS.
            {product.price < product.labeledPrice &&
              product.labeledPrice.toFixed(2)}
          </span>
        </p>

        <button>Add to Cart</button>
      </div>
    </Link>
  );
}

export default ProductsCard;
