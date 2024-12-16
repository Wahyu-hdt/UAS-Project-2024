import Navbar from "../Components/Navigationbar";

const Home = () => {
  /* Save SVG in a variable */
  const svgBackground = `
    <svg width="300px" height="300px" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
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
      }}
    >
      <Navbar />
      <div className=" ml-24 mt-60">
        <h1 className="text-white "> adadjadkjahadhadaid</h1>
      </div>
    </div>
  );
};

export default Home;
