import Navbar from "../Components/Navigationbar";

const Home = () => {
  /* Save SVG in a variable */
  const svgBackground = `
    <svg width="250px" height="250px" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path opacity="0.7" d="M8 0L15 4V12L8 16L1 12V4L8 0Z" fill="#1f2937" />
    </svg>
  `;

  return (
    <div
      className="h-screen bg-gray-950"
      style={{
        backgroundImage: `url("data:image/svg+xml;utf8,${encodeURIComponent(
          svgBackground
        )}")`,
        backgroundPosition: "center 10%",
      }}
    >
      <Navbar />
      <div className="w-screen h-96 flex mt-28 justify-center">
        <h1 className="w-1/2 h-auto justify-center bg-gray-600 rounded-lg text-white p-4">
          Ini Tempat Promo/Berita (image carousel)
        </h1>
      </div>
    </div>
  );
};

export default Home;
