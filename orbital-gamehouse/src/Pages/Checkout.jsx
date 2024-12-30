import BackToHome from "../Components/BackToHome";
import { useCart } from "../CartContext";
import { FaTrashCan } from "react-icons/fa6";

const Checkout = () => {
  // Import cart from context
  const { cart, updateCart } = useCart();

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

  // Remove item from cart
  const removeItem = (index) => {
    const newCart = cart.filter((_, i) => i !== index);
    updateCart(newCart);
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
                <div className="flex justify-between">
                  <div className="mr-32">
                    <button
                      onClick={() => decreaseQuantity(index)}
                      className="px-2 py-1 bg-gray-600 rounded"
                    >
                      -
                    </button>
                    <span className="mx-4 min-w-[100px]">
                      {product.quantity}
                    </span>
                    <button
                      onClick={() => increaseQuantity(index)}
                      className="px-2 py-1 bg-gray-600 rounded"
                    >
                      +
                    </button>
                  </div>
                  <span className="text-lg font-semibold min-w-[100px]">
                    RP.
                    {product.price * product.quantity > 0
                      ? product.price * product.quantity
                      : 0}
                  </span>
                  <FaTrashCan
                    onClick={() => removeItem(index)}
                    className="w-7 h-7 text-red-500 hover:cursor-pointer hover:text-red-700 "
                  />
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
