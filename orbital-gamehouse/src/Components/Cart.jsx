import { useState } from "react";
import ProductList from "./ProductList";

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);

  // Adding Product from ProductList to Cart
  const addToCart = (product) => {
    setCartItems([cartItems, product]);
  };

  return (
    <div className="text-white">
      <h1>Keranjang Belanja</h1>
      {/* Render produk yang ada di keranjang */}
      {cartItems.map((item) => (
        <div key={item.id}>
          <h2>{item.name}</h2>
          <p>Harga: RP. {item.price}</p>
        </div>
      ))}
    </div>
  );
};

export default Cart;
