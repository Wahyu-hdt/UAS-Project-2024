import BackToHome from "../Components/BackToHome";
import { useCart } from "../CartContext";
import { FaTrashCan } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import supabase from "../Config/supabaseClient";
import { useState } from "react";

const Checkout = () => {
  // Import cart from context
  const { cart, updateCart } = useCart();

  // Variabel to store the submitting status of order
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Using Navigate from react router
  const navigate = useNavigate();

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

  // Calculate subtotal
  const calculateSubtotal = () => {
    let total = 0;
    for (const product of cart) {
      total += product.price * product.quantity;
    }
    return total;
  };

  // Generate unique order id for each order based on UTC time
  const generateOrderId = new Date().getTime();

  // Handle order submission
  const handleSubmit = async () => {
    try {
      setIsSubmitting(true);

      // variabel to store order before submitting to supabase
      const dataOrder = cart.map((product) => ({
        order_id: generateOrderId,
        product_id: product.id,
        created_at: new Date().toLocaleString("en-US", {
          timeZone: "Asia/Jakarta",
        }),
        product_name: product.name,
        quantity: product.quantity,
        price_per_product: product.price,
        total: product.price * product.quantity,
      }));

      // Inserting dataOrder to supabase
      const { error } = await supabase
        .from("place_order")
        .insert(dataOrder)
        .select();

      if (error) {
        throw error;
      }

      // Clear cart dan navigate to confirm page
      updateCart([]);
      navigate("/UAS-Project-2024/confirm", {});

      // error handling
    } catch (error) {
      console.error("Error submitting order:", error);
      alert("Gagal membuat pesanan. Silakan coba lagi.");

      // reset submitting state
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-4 sm:p-8 font-Poppins">
      <BackToHome />
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl sm:text-4xl font-bold mb-8 mt-5 text-center bg-clip-text text-transparent bg-white">
          Checkout
        </h1>
        {/* Check if cart is empty */}
        {cart.length === 0 ? (
          <div className="text-lg sm:text-2xl font-bold text-center p-6 sm:p-8 bg-gray-800 bg-opacity-50 rounded-lg shadow-lg border border-gray-700">
            Keranjangmu Kosong nih, silakan pilih paket dulu
          </div>
        ) : (
          // if cart not empty
          <div className="space-y-4">
            <ul className="space-y-4">
              {/* Displaying the product in cart*/}
              {cart.map((product, index) => (
                <li
                  key={index}
                  className="bg-gray-800 bg-opacity-50 p-4 sm:p-6 rounded-xl shadow-lg border border-gray-700 hover:border-blue-500 transition-all duration-300"
                >
                  <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                    <span className="text-lg sm:text-xl font-semibold text-white">
                      {product.name}
                    </span>
                    <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6">
                      <div className="flex items-center bg-gray-700 rounded-lg p-1">
                        {/* Button to add quantity and decrease quantity*/}
                        <button
                          onClick={() => decreaseQuantity(index)}
                          className="px-3 sm:px-4 py-1 sm:py-2 rounded-lg bg-gray-600 hover:bg-gray-500 transition-colors text-white"
                        >
                          -
                        </button>
                        <span className="mx-4 sm:mx-6 text-base sm:text-lg">
                          {product.quantity}
                        </span>
                        <button
                          onClick={() => increaseQuantity(index)}
                          className="px-3 sm:px-4 py-1 sm:py-2 rounded-lg bg-gray-600 hover:bg-gray-500 transition-colors text-white"
                        >
                          +
                        </button>
                      </div>
                      {/* total per product */}
                      <span className="text-base sm:text-lg font-semibold text-green-400">
                        Rp.{" "}
                        {product.price * product.quantity > 0
                          ? product.price * product.quantity
                          : 0}
                      </span>
                      {/* Button to remove */}
                      <button
                        onClick={() => removeItem(index)}
                        className="p-2 text-red-400 hover:text-red-300 transition-colors"
                      >
                        <FaTrashCan className="w-5 sm:w-6 h-5 sm:h-6" />
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>

            {/* Subtotal */}
            <div className="mt-8 bg-gray-800 bg-opacity-50 p-4 sm:p-6 rounded-xl shadow-lg border border-gray-700">
              <div className="flex flex-col sm:flex-row justify-between items-center">
                <h2 className="text-2xl sm:text-3xl font-bold text-white">
                  Subtotal
                </h2>
                <p className="text-xl sm:text-2xl font-bold text-green-400">
                  Rp. {calculateSubtotal()}
                </p>
              </div>

              {/* Button to send product in cart into supabase tabel*/}
              <div className="mt-6 flex justify-center sm:justify-end">
                <button
                  className="px-6 sm:px-8 py-2 sm:py-3 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg font-semibold text-base sm:text-lg hover:from-blue-600 hover:to-purple-600 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                  onClick={handleSubmit}
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Pesanan Diproses..." : "Konfirmasi Pesanan"}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Checkout;
