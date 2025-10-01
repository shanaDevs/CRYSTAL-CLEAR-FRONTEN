export default function getCart(){
    let cart = localStorage.getItem("cart");
    if(cart==null){
        cart= [];
        localStorage.setItem("cart",JSON.stringify(cart));
        return [];
    }
    cart = JSON.parse(cart);
    return cart;
}

export function addToCart(product , quantity){
    let cart = getCart();
    const existingProductIndex = cart.findIndex((item) => item.productId === product.productId);
    if(existingProductIndex !== -1){
        cart[existingProductIndex].quantity += quantity;
        if(cart[existingProductIndex].quantity <= 0){
            cart = cart.filter((item) => item.productId !== product.productId);
        }
    }else{
        cart.push(
            {
                productId : product.productId,
                name: product.name,
                altnames: product.altnames,
                price: product.price,
                labeledPrice: product.labeledPrice,
                image: product.images[0],
                quantity: quantity,
            });
    }
    localStorage.setItem("cart",JSON.stringify(cart));
    return cart;
}
export function removeFromCart(productId){
    let cart = getCart();
    cart = cart.filter((item) => item.productId !== productId);
    localStorage.setItem("cart",JSON.stringify(cart));
    return cart;
}
export function getTotal(){
    let cart = getCart();
    let total = 0;
    cart.forEach((item) => {
        total += item.price * item.quantity;
    });
    return total;
}

export function getTotalForLabeledPrice(){
    let cart = getCart();
    let total = 0;
    cart.forEach((item) => {
    console.log(item);
        total += (item.labeledPrice + 50) * item.quantity;
    });
    return total;
}