import React from "react";
import logo from "../Images/OGHlogo 2.png";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <>
      <nav class=" sticky top-0 w-full z-50 font-Poppins rounded-md bg-gray-600 backdrop-filter backdrop-blur-md bg-opacity-30  border-b border-gray-500 ">
        {/* Layout Navbar*/}
        <div class="max-w-screen flex flex-wrap items-center justify-between ml-11 mb-1 p-1">
          <img src={logo} class="h-11 w-38" alt="Logo" />

          {/* Link to Home and About page */}
          <div class="flex items-center text-white  ">
            <Link
              to="/UAS-Project-2024/"
              className="hover:text-gray-300 hover:underline transition duration-200 ease-in-out "
            >
              Home
            </Link>
            <Link
              to="/UAS-Project-2024/about"
              className="ml-7 hover:text-gray-300 hover:underline transition duration-200 ease-in-out "
            >
              About Us
            </Link>
          </div>

          {/* Link to Cart Using SVG */}
          <div className="flex mr-44">
            <Link
              to="/UAS-Project-2024/checkout"
              className="hover:bg-gray-300 rounded-sm transition duration-300 ease-in-out hover:underline"
            >
              <svg
                width="40px"
                height="40px"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M7.5 18C8.32843 18 9 18.6716 9 19.5C9 20.3284 8.32843 21 7.5 21C6.67157 21 6 20.3284 6 19.5C6 18.6716 6.67157 18 7.5 18Z"
                  fill="#FEA1A1"
                />
                <path
                  d="M16.5 18.0001C17.3284 18.0001 18 18.6716 18 19.5001C18 20.3285 17.3284 21.0001 16.5 21.0001C15.6716 21.0001 15 20.3285 15 19.5001C15 18.6716 15.6716 18.0001 16.5 18.0001Z"
                  fill="#FEA1A1"
                />
                <path
                  d="M2.08368 2.7512C2.22106 2.36044 2.64921 2.15503 3.03998 2.29242L3.34138 2.39838C3.95791 2.61511 4.48154 2.79919 4.89363 3.00139C5.33426 3.21759 5.71211 3.48393 5.99629 3.89979C6.27827 4.31243 6.39468 4.76515 6.44841 5.26153C6.47247 5.48373 6.48515 5.72967 6.49184 6H17.1301C18.815 6 20.3318 6 20.7757 6.57708C21.2197 7.15417 21.0461 8.02369 20.699 9.76275L20.1992 12.1875C19.8841 13.7164 19.7266 14.4808 19.1748 14.9304C18.6231 15.38 17.8426 15.38 16.2816 15.38H10.9787C8.18979 15.38 6.79534 15.38 5.92894 14.4662C5.06254 13.5523 4.9993 12.5816 4.9993 9.64L4.9993 7.03832C4.9993 6.29837 4.99828 5.80316 4.95712 5.42295C4.91779 5.0596 4.84809 4.87818 4.75783 4.74609C4.66977 4.61723 4.5361 4.4968 4.23288 4.34802C3.91003 4.18961 3.47128 4.03406 2.80367 3.79934L2.54246 3.7075C2.1517 3.57012 1.94629 3.14197 2.08368 2.7512Z"
                  fill="#DFDFDE"
                />
                <path
                  d="M13.75 9C13.75 8.58579 13.4142 8.25 13 8.25C12.5858 8.25 12.25 8.58579 12.25 9V10.25H11C10.5858 10.25 10.25 10.5858 10.25 11C10.25 11.4142 10.5858 11.75 11 11.75H12.25V13C12.25 13.4142 12.5858 13.75 13 13.75C13.4142 13.75 13.75 13.4142 13.75 13V11.75H15C15.4142 11.75 15.75 11.4142 15.75 11C15.75 10.5858 15.4142 10.25 15 10.25H13.75V9Z"
                  fill="#1C274C"
                />
              </svg>
            </Link>
            {/* Quantity in cart */}
            <span className="flex ml-1 bg-yellow-400 w-5 h-5 rounded-3xl  items-center justify-center">
              0
            </span>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
