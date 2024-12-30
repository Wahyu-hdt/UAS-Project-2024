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
        total: product.price * product.quantity,
      }));

      // Inserting dataOrder to supabase
      const { data, error } = await supabase
        .from("Orders")
        .insert(dataOrder)
        .select();

      if (error) {
        throw error;
      }

      // Clear cart dan navigate to confirm page
      updateCart([]);
      navigate("/UAS-Project-2024/confirm", {
        state: {
          orderItems: data,
          subtotal: calculateSubtotal(),
        },
      });
    } catch (error) {
      console.error("Error submitting order:", error);
      alert("Gagal membuat pesanan. Silakan coba lagi.");
    } finally {
      setIsSubmitting(false);
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
            <div className="flex justify-end mt-6">
              <h1 className="min-w-[100px]  font-bold text-3xl text-white flex justify-end  mr-20">
                Subtotal
              </h1>
              <p className="min-w-[150px] text-white font-bolde text-2xl">
                {" "}
                Rp. {calculateSubtotal()}
              </p>
            </div>
            <div className="flex justify-end mt-5">
              <button
                className="bg-green-600 px-2 py-1 mt-4 rounded-md hover:bg-green-700 f"
                onClick={handleSubmit}
                disabled={isSubmitting}
              >
                {isSubmitting ? "Pesanan Diproses" : "Konfirmasi Pesanan"}
              </button>
            </div>
          </ul>
        )}
      </div>
    </>
  );
};

export default Checkout;
