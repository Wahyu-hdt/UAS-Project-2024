import { Link } from "react-router-dom";

const BackToHome = () => {
  return (
    <div className="font-Poppins text-white">
      <Link
        to={"/UAS-Project-2024/"}
        className="bg-blue-600 px-2 py-1 mt-4 rounded-md hover:bg-blue-700"
      >
        Back to home
      </Link>
    </div>
  );
};

export default BackToHome;
