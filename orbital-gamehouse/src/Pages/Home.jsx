import Navbar from "../Components/Navigationbar";
import Imagecarousel from "../Components/Imagecarousel";
import ProductList from "../Components/ProductList";

const Home = () => {
  /* Save SVG in a variable */
  const svgBackground = `
    <svg width="250px" height="250px" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path opacity="0.7" d="M8 0L15 4V12L8 16L1 12V4L8 0Z" fill="#1f2937" />
    </svg>
  `;

  return (
    // Rendering the background
    <div
      className="min-h-screen w-full bg-gray-950 flex flex-col"
      style={{
        backgroundImage: `url("data:image/svg+xml;utf8,${encodeURIComponent(
          svgBackground
        )}")`,
        backgroundPosition: "center 10%",
      }}
    >
      {/* Rendering the navigation bar */}
      <Navbar />
      {/* Rendering the image carousel */}
      <div className="flex flex-col items-center justify-center flex-grow px-4 md:px-10">
        <h1 className="font-Poppins text-white text-2xl sm:text-3xl md:text-4xl mt-10 font-bold text-center">
          NEWS
        </h1>
        <div className="flex w-full max-w-[95%] sm:max-w-[90%] md:max-w-[1250px] h-[250px] sm:h-[350px] md:h-[650px] mt-5 mb-10 justify-center bg-gray-600 rounded-lg">
          <Imagecarousel />
        </div>
      </div>
      {/* Rendering the product list */}
      <div className="w-full h-auto bg-gradient-to-b from-gray-950 to-gray-700 px-4 md:px-10">
        <h1 className="text-white font-bold text-2xl sm:text-3xl md:text-5xl mt-10 text-center">
          Product List
        </h1>
        <div className="mt-5">
          <ProductList />
        </div>
      </div>
    </div>
  );
};

export default Home;
