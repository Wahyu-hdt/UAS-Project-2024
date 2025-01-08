import { Link } from "react-router-dom";

const BackToHome = () => {
  return (
    <div className="font-Poppins text-white flex justify-center items-center mt-6 px-4">
      <Link
        to={"/UAS-Project-2024/"}
        className="bg-blue-600 text-sm sm:text-base px-4 py-2 rounded-md hover:bg-blue-700 transition duration-300 ease-in-out"
      >
        Kembali Ke Home
      </Link>
    </div>
  );
};

export default BackToHome;
