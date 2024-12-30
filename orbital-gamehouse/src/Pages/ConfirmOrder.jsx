import BackToHome from "../Components/BackToHome";

const ConfirmOrder = () => {
  return (
    <div className="bg-gray-900 text-white min-h-screen p-6 font-Poppins ">
      <div className="">
        <BackToHome />
        <h1 className="text-3xl font-bold mb-4 mt-5 flex justify-center">
          Confirm Your Order
        </h1>
      </div>
    </div>
  );
};

export default ConfirmOrder;
