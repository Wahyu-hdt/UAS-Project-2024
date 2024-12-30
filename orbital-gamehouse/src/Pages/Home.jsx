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
    /* SVG for Background */
    <div
      className="h-full w-full bg-gray-950 flex flex-col"
      style={{
        backgroundImage: `url("data:image/svg+xml;utf8,${encodeURIComponent(
          svgBackground
        )}")`,
        backgroundPosition: "center 10%",
      }}
    >
      <Navbar />
      {/* Container Image Carousel */}
      <div className="flex flex-col items-center justify-center flex-grow">
        <h1 className="font-Poppins text-white text-4xl mt-10 font-bold">
          NEWS
        </h1>
        <div className="flex w-[1250px] h-[650px] mt-5 mb-20 justify-center bg-gray-600 rounded-lg">
          <Imagecarousel />
        </div>
      </div>
      {/* Product List Part */}
      <div className="h-auto bg-gradient-to-b from-gray-950 to-gray-700">
        <h1 className="text-white font-bold text-5xl mt-10 flex justify-center ">
          Product List
        </h1>
        <ProductList />
      </div>
    </div>
  );
};

export default Home;
