import supabase from "../Config/supabaseClient";
import { useState, useEffect } from "react";
import qrisLogo from "../Images/qris.jpg";
import cashlogo from "../Images/cash logo.jpg";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";

const Payment = () => {
  // Initialize Navigate
  const navigate = useNavigate();

  // Initialize payment state
  const [payment, setPayment] = useState([]);

  // Fetch data from place_order tabel in supabase
  useEffect(() => {
    const fetchPayment = async () => {
      const { data, error } = await supabase.from("place_order").select("*");

      // error handling
      if (error) {
        console.log("Gagal fetching data", error);
      } else {
        // Set fetched data to payment state
        setPayment(data);
      }
    };
    fetchPayment(); // Call the function to fetch data from place_order tabel
  }, []); // Empty dependency array to run only once

  // Function to pass data from place_order tabel to fix_order tabel
  const handlePayment = async (paymentMethod) => {
    try {
      // Show loading toast
      const loadingToast = toast.loading("Sedang memproses pembayaran...");

      // Insert all data from place_order into fix_order
      const { data: orders, error: fetchError } = await supabase
        .from("place_order")
        .select("*");
      if (fetchError) throw new Error(fetchError.message);

      const { error: insertError } = await supabase
        .from("fix_order")
        .insert(orders);
      if (insertError) throw new Error(insertError.message);

      // Delete all data from place_order
      const { error: deleteError } = await supabase
        .from("place_order")
        .delete()
        .gt("order_id", 0);
      if (deleteError) throw new Error(deleteError.message);

      // Update loadingToast if success
      toast.update(loadingToast, {
        render: `Pembayaran berhasil menggunakan Metode ${paymentMethod}!`,
        type: "success",
        isLoading: false,
        autoClose: 3000,
      });

      // Navigate after a short delay to allow the toast to be seen
      setTimeout(() => {
        navigate("/UAS-Project-2024/");
      }, 3000);
    } catch (error) {
      console.error("Error during payment process:", error);
      toast.error("Terjadi kesalahan saat memproses pembayaran.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 flex flex-col items-center py-10 font-Poppins">
      <ToastContainer
        position="top-center"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />

      {/* Order Summary */}
      <h2 className="text-white text-2xl font-semibold mb-3">Orderan mu</h2>
      <div className="bg-gray-800 p-5 rounded-lg shadow-lg mt-2 text-lg">
        {payment.length > 0 ? (
          <>
            <p className="text-yellow-500">
              Order ID: <span className="font-bold">{payment[0].order_id}</span>
            </p>
            <p className="font-bold text-green-500 text-2xl">
              Total: Rp {payment[0].total}
            </p>
          </>
        ) : (
          <p className="text-gray-400">Loading...</p>
        )}
      </div>

      <h1 className="text-white text-4xl font-bold mt-7">
        Pilih Metode Pembayaran
      </h1>
      <div className="mt-10 flex flex-row space-x-10">
        <div className="h-auto w-80 flex flex-col items-center bg-gray-800 p-5 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
          <h2 className="text-white text-2xl font-bold">Qris</h2>
          <img
            src={qrisLogo}
            alt="Qris Logo"
            className="h-[150px] w-[150px] my-5 rounded-md "
          />
          <p className="text-gray-400">Pembayaran menggunakan QRIS.</p>
          <button
            className="mt-3 bg-blue-500 text-white py-2 px-4 rounded hover:bg-green-600 transition-colors duration-300"
            onClick={() => handlePayment("QRIS")}
          >
            Bayar dengan Qris
          </button>
        </div>
        <div className="h-auto w-80 flex flex-col items-center bg-gray-800 p-5 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
          <h2 className="text-white text-2xl font-bold">Cash</h2>
          <img
            src={cashlogo}
            alt="Cash Logo"
            className="h-[150px] w-[150px] my-5 rounded-md"
          />
          <p className="text-gray-400">Pembayaran tunai dikasir.</p>
          <button
            className="mt-3 bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition-colors duration-300"
            onClick={() => handlePayment("Cash")}
          >
            Bayar dengan Cash
          </button>
        </div>
      </div>
    </div>
  );
};

export default Payment;
