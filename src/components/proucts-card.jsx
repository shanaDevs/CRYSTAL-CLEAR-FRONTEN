function ProductsCard(props) { 
 return(
    <div>
        <h1>{props.name}</h1>
        <p>{props.description}</p>
        <p>{props.price}</p>
        <button>Add to Cart</button>
    </div>
 )
}

export default ProductsCard