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
          // Check if the current order matches the order_id and product_id from place_order tabel
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
    <div className="bg-gray-900 text-white min-h-screen p-6 font-Poppins ">
      <div className="">
        <h1 className="text-3xl font-bold mb-4 mt-5 flex justify-center">
          Konfirmasi Orderanmu
        </h1>

        {/* Displaying order id */}
        {confirmOrder.length > 0 && (
          <div className="text-center mb-6">
            <h2 className="text-xl font-bold">
              Order ID: {confirmOrder[0].order_id}
            </h2>
          </div>
        )}

        {/* Displaying list of order from confirmOrder */}
        <ul className="space-y-4">
          {confirmOrder.length > 0 ? (
            confirmOrder.map((confirmOrder, index) => (
              <li
                key={index}
                className="bg-gray-800 p-4 rounded-lg shadow-md flex justify-between"
              >
                <span className="text-lg">{confirmOrder.product_name}</span>
                <div className="flex justify-between">
                  <div className="mr-32">
                    <button
                      className="px-2 py-1 bg-gray-600 rounded"
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
                    <span className="mx-4 min-w-[100px]">
                      {confirmOrder.quantity}
                    </span>
                    <button
                      className="px-2 py-1 bg-gray-600 rounded"
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
                  <span className="text-lg font-semibold min-w-[100px]">
                    RP. {confirmOrder.total}
                  </span>
                  <FaTrashCan
                    className="w-7 h-7 text-red-500 hover:cursor-pointer hover:text-red-700 "
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
            <div className="flex flex-col justify-center items-center mt-14">
              <p className="text-center  mb-8 ">
                Tidak ada order, kembali ke home.
              </p>
              <BackToHome />
            </div>
          )}
        </ul>

        {/* payment button */}
        {confirmOrder.length > 0 && (
          <div className="flex flex-col items-end  mt-6">
            <div className="flex items-center space-x-10">
              <h1 className="font-bold text-3xl text-white">Subtotal</h1>
              <p className="text-white  text-2xl">
                Rp.
                {confirmOrder.reduce(
                  (acc, confirmOrder) => acc + (confirmOrder.total || 0),
                  0
                )}
              </p>
            </div>
            <div className="mt-4">
              <button
                className="bg-green-600 text-white px-3 py-2 font-bold  rounded-lg text-lg  hover:bg-green-700"
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
