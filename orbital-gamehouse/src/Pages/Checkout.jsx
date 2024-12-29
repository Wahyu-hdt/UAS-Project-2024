import BackToHome from "../Components/BackToHome";
import { useCart } from "../CartContext";

const Checkout = () => {
  // Import cart from context
  const { cart, updateCart } = useCart();
  console.log(cart, updateCart);

  // Increase Quantity Function
  const increaseQuantity = (index) => {
    const newCart = [...cart];
    newCart[index].quantity += 1;
    updateCart(newCart);
  };

  // Decrease Quantity Function
  const decreaseQuantity = (index) => {
    const newCart = [...cart];
    if (newCart[index].quantity > 1) {
      newCart[index].quantity -= 1;
      updateCart(newCart);
    }
  };

  return (
    <>
      {/* Rendering the Checkout Page */}
      <div className="min-h-screen bg-gray-900 text-white p-6 font-Poppins">
        <BackToHome />
        <h1 className="text-3xl font-bold mb-4 mt-5 flex justify-center">
          Checkout
        </h1>
        {/* Condition to check if cart is empty */}
        {cart.length === 0 ? (
          <h1 className="text-2xl font-bold flex justify-center">
            Keranjangmu Kosong nih, silakan pilih paket dulu
          </h1>
        ) : (
          <ul className="space-y-4">
            {cart.map((product, index) => (
              <li
                key={index}
                className="bg-gray-800 p-4 rounded-lg shadow-md flex justify-between"
              >
                <span className="text-lg">{product.name}</span>
                <div className="flex justify-end">
                  <div className="mr-40">
                    <button onClick={() => decreaseQuantity(index)}>-</button>
                    <span className="mx-2">{product.quantity}</span>
                    <button onClick={() => increaseQuantity(index)}>+</button>
                  </div>
                  <span className="text-lg font-semibold">
                    RP.{" "}
                    {typeof product.price === "number"
                      ? product.price *
                        (typeof product.quantity === "number"
                          ? product.quantity
                          : 0)
                      : 0}
                  </span>
                </div>
              </li>
            ))}
            <h1 className="font-bold text-3xl text-white flex justify-end mt-6 ">
              Subtotal
            </h1>
          </ul>
        )}
      </div>
    </>
  );
};

export default Checkout;
