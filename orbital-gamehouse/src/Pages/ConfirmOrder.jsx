import BackToHome from "../Components/BackToHome";
import supabase from "../Config/supabaseClient";
import { useEffect, useState } from "react";
import { FaTrashCan } from "react-icons/fa6";

const ConfirmOrder = () => {
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

  return (
    <div className="bg-gray-900 text-white min-h-screen p-6 font-Poppins ">
      <div className="">
        <h1 className="text-3xl font-bold mb-4 mt-5 flex justify-center">
          Confirm Your Order
        </h1>

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
                    <button className="px-2 py-1 bg-gray-600 rounded">-</button>
                    <span className="mx-4 min-w-[100px]">
                      {confirmOrder.quantity}
                    </span>
                    <button className="px-2 py-1 bg-gray-600 rounded">+</button>
                  </div>
                  <span className="text-lg font-semibold min-w-[100px]">
                    RP. {confirmOrder.total}
                  </span>
                  <FaTrashCan className="w-7 h-7 text-red-500 hover:cursor-pointer hover:text-red-700 " />
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
      </div>
    </div>
  );
};

export default ConfirmOrder;
