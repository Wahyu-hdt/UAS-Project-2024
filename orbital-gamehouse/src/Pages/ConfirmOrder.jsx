import BackToHome from "../Components/BackToHome";
import supabase from "../Config/supabaseClient";
import { useEffect, useState } from "react";
import { FaTrashCan } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";

const ConfirmOrder = () => {
  const navigate = useNavigate();

  // Initialize state to store the order details
  const [confirmOrder, setConfirmOrder] = useState([]);

  // Fetch data from place_order table in supabase
  useEffect(() => {
    const fetchConfirmOrder = async () => {
      const { data, error } = await supabase.from("place_order").select("*");

      // Error handling
      if (error) {
        console.log(
          "Terjadi error ketika fetching data dari tabel place_order",
          error
        );
      } else {
        // Set state with the fetched data
        setConfirmOrder(data);
      }
    };
    fetchConfirmOrder(); // Call the function to fetch data from place_order tabel
  }, []); // Empty dependency array to run only once

  // Updating the quantity of product in supabase tabel
  const updateQuantity = async (
    orderId,
    productId,
    newQuantity,
    pricePerProduct
  ) => {
    if (newQuantity < 1) return;

    const newTotal = newQuantity * pricePerProduct;

    const { error } = await supabase
      .from("place_order")
      .update({ quantity: newQuantity, total: newTotal })
      .match({ order_id: orderId, product_id: productId });

    // error handling
    if (error) {
      console.log("Error updating quantity:", error);
    } else {
      // Refresh the order list after update
      setConfirmOrder((prevOrders) =>
        prevOrders.map((place_order) =>
          // Check if the current order matches the order_id and product_id from place_order array
          place_order.order_id === orderId &&
          place_order.product_id === productId
            ? // if it matches, return the updated order
              { ...place_order, quantity: newQuantity, total: newTotal }
            : // if it doesn't match return the cureent order
              place_order
        )
      );
    }
  };

  // Delete product from Supabase
  const deleteProduct = async (orderId, productId) => {
    const { error } = await supabase
      .from("place_order")
      .delete()
      .match({ order_id: orderId, product_id: productId });

    // error handling
    if (error) {
      console.log("Error deleting product:", error);
    } else {
      // Refresh the order list after delete
      setConfirmOrder((prevOrders) =>
        // Create a new array by filtering the previous orders
        prevOrders.filter(
          (place_order) =>
            !(
              place_order.order_id === orderId &&
              place_order.product_id === productId
            )
        )
      );
    }
  };

  return (
    <div className="bg-gray-900 text-white min-h-screen p-8 font-Poppins">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-4xl font-bold mb-6 mt-5 flex justify-center bg-clip-text text-transparent bg-white">
          Konfirmasi Orderanmu
        </h1>

        {/* Displaying order id */}
        {confirmOrder.length > 0 && (
          <div className="text-center mb-8">
            <h2 className="inline-block px-6 py-2 bg-gray-800/60 rounded-full backdrop-blur-sm text-xl font-bold">
              Order ID:{" "}
              <span className="text-emerald-400">
                {confirmOrder[0].order_id}
              </span>
            </h2>
          </div>
        )}

        {/* Displaying list of order from confirmOrder */}
        <ul className="space-y-6">
          {confirmOrder.length > 0 ? (
            confirmOrder.map((confirmOrder, index) => (
              <li
                key={index}
                className="bg-gray-800/50 backdrop-blur-sm p-6 rounded-xl shadow-lg border border-gray-700/50 hover:border-gray-600/50 transition-all"
              >
                <span className="text-xl font-medium text-white/90">
                  {confirmOrder.product_name}
                </span>
                <div className="flex justify-between mt-4">
                  <div className="mr-32">
                    <div className="flex items-center bg-gray-700/50 rounded-lg p-1">
                      <button
                        className="w-8 h-8 flex items-center justify-center bg-gray-600 hover:bg-gray-500 rounded-lg transition-colors text-lg font-medium"
                        onClick={() =>
                          updateQuantity(
                            confirmOrder.order_id,
                            confirmOrder.product_id,
                            confirmOrder.quantity - 1,
                            confirmOrder.price_per_product
                          )
                        }
                      >
                        -
                      </button>
                      <span className="mx-4 min-w-[100px] text-center text-lg">
                        {confirmOrder.quantity}
                      </span>
                      <button
                        className="w-8 h-8 flex items-center justify-center bg-gray-600 hover:bg-gray-500 rounded-lg transition-colors text-lg font-medium"
                        onClick={() =>
                          updateQuantity(
                            confirmOrder.order_id,
                            confirmOrder.product_id,
                            confirmOrder.quantity + 1,
                            confirmOrder.price_per_product
                          )
                        }
                      >
                        +
                      </button>
                    </div>
                  </div>
                  <span className="text-xl font-semibold min-w-[100px] text-emerald-400">
                    Rp. {confirmOrder.total}
                  </span>
                  <FaTrashCan
                    className="w-7 h-7 text-red-400 hover:text-red-300 hover:bg-red-500/10 p-1 rounded-lg cursor-pointer transition-all"
                    onClick={() =>
                      deleteProduct(
                        confirmOrder.order_id,
                        confirmOrder.product_id
                      )
                    }
                  />
                </div>
              </li>
            ))
          ) : (
            <div className="flex flex-col justify-center items-center mt-14 bg-gray-800/50 backdrop-blur-sm rounded-xl p-8 border border-gray-700/50">
              <p className="text-center text-lg text-gray-300 mb-8">
                Tidak ada order, kembali ke home.
              </p>
              <BackToHome />
            </div>
          )}
        </ul>

        {/* payment button */}
        {confirmOrder.length > 0 && (
          <div className="flex flex-col items-end mt-8 bg-gray-800/50 backdrop-blur-sm p-6 rounded-xl border border-gray-700/50">
            <div className="flex items-center space-x-10">
              <h1 className="font-bold text-3xl text-white/90">Subtotal</h1>
              <p className="text-2xl font-bold text-emerald-400">
                Rp.{" "}
                {confirmOrder.reduce(
                  (acc, confirmOrder) => acc + (confirmOrder.total || 0),
                  0
                )}
              </p>
            </div>
            <div className="mt-6">
              <button
                className="bg-blue-500 text-white px-8 py-3 font-bold rounded-xl text-lg transition-all shadow-lg"
                onClick={() => navigate("/UAS-Project-2024/payment")}
              >
                Bayar
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ConfirmOrder;
