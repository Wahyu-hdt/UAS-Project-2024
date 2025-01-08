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
    <div className="bg-gray-900 text-white min-h-screen p-4 sm:p-6 lg:p-8 font-Poppins">
      {/* Main container with responsive padding */}
      <div className="max-w-5xl mx-auto">
        {/* Title */}
        <h1 className="text-3xl sm:text-4xl font-bold mb-6 mt-5 flex justify-center text-center bg-clip-text text-transparent bg-white">
          Konfirmasi Orderanmu
        </h1>

        {/* Displaying order id */}
        {confirmOrder.length > 0 && (
          <div className="text-center mb-8">
            <h2 className="inline-block px-4 sm:px-6 py-2 bg-gray-800/60 rounded-full backdrop-blur-sm text-lg sm:text-xl font-bold">
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
            confirmOrder.map((order, index) => (
              <li
                key={index}
                className="bg-gray-800/50 backdrop-blur-sm p-4 sm:p-6 rounded-xl shadow-lg border border-gray-700 hover:border-gray-600 transition-all"
              >
                <span className="text-lg sm:text-xl font-medium text-white max-w-[160px]">
                  {order.product_name}
                </span>
                <div className="flex flex-col sm:flex-row justify-between mt-4 gap-4 sm:gap-10">
                  {/* Quantity add/decrease button */}
                  <div className="flex items-center bg-gray-700/50 rounded-lg p-1 max-w-[200px]">
                    <button
                      className="w-12 h-12 flex items-center justify-center bg-gray-600 hover:bg-gray-500 rounded-lg transition-colors text-lg font-medium"
                      onClick={() =>
                        updateQuantity(
                          order.order_id,
                          order.product_id,
                          order.quantity - 1,
                          order.price_per_product
                        )
                      }
                    >
                      -
                    </button>
                    <span className="mx-4 min-w-[60px] sm:min-w-[100px] text-center text-lg">
                      {order.quantity}
                    </span>
                    <button
                      className="w-12 h-12 flex items-center justify-center bg-gray-600 hover:bg-gray-500 rounded-lg transition-colors text-lg font-medium"
                      onClick={() =>
                        updateQuantity(
                          order.order_id,
                          order.product_id,
                          order.quantity + 1,
                          order.price_per_product
                        )
                      }
                    >
                      +
                    </button>
                  </div>

                  {/* Total price of the product */}
                  <span className="text-lg sm:text-xl font-semibold min-w-[80px] sm:min-w-[100px] text-emerald-400">
                    Rp. {order.total}
                  </span>

                  {/* Delete button */}
                  <FaTrashCan
                    className="w-6 sm:w-7 h-6 sm:h-7 text-red-400 hover:text-red-300 hover:bg-red-500/10 p-1 rounded-lg cursor-pointer transition-all"
                    onClick={() =>
                      deleteProduct(order.order_id, order.product_id)
                    }
                  />
                </div>
              </li>
            ))
          ) : (
            <div className="flex flex-col justify-center items-center mt-14 bg-gray-800/50 backdrop-blur-sm rounded-xl p-8 border border-gray-700/50">
              <p className="text-center text-base sm:text-lg text-gray-300 mb-8">
                Tidak ada order, kembali ke home.
              </p>
              <BackToHome />
            </div>
          )}
        </ul>

        {/* Display payment button */}
        {confirmOrder.length > 0 && (
          <div className="flex flex-col sm:flex-col items-center sm:items-end mt-8 bg-gray-800/50 backdrop-blur-sm p-4 sm:p-6 rounded-xl border border-gray-700/50">
            <div className="flex flex-col sm:flex-row items-center sm:justify-between space-y-4 sm:space-y-0 sm:space-x-10 w-full">
              <h1 className="font-bold text-2xl sm:text-3xl text-white/90">
                Subtotal
              </h1>
              <p className="text-xl sm:text-2xl font-bold text-emerald-400">
                Rp.{" "}
                {confirmOrder.reduce(
                  (acc, order) => acc + (order.total || 0),
                  0
                )}
              </p>
            </div>
            <div className="mt-6 sm:mt-0">
              <button
                className="bg-blue-500 text-white px-6 sm:px-8 py-2 sm:py-3 sm:mt-3 font-bold rounded-xl text-base sm:text-lg transition-all shadow-lg"
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
