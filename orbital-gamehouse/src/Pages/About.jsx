import Navbar from "../Components/Navigationbar";
import logo from "../Images/OGHlogo 2.png";
import Faq from "../Components/Faq";

const About = () => {
  return (
    <div className="h-full bg-gradient-to-r from-gray-950 to-gray-800 font-Poppins">
      <Navbar />

      {/* Logo Section */}
      <div className="flex justify-center mt-12">
        <img src={logo} alt="logo" className="max-w-[200px] sm:max-w-[300px]" />
      </div>

      {/* Profile Container */}
      <div className="flex flex-col sm:flex-row w-full sm:w-3/4 mx-auto mt-10 bg-gray-700 rounded-lg shadow-2xl p-5">
        <div className="bg-gray-800 p-4 rounded-lg max-w-full">
          <p
            style={{ lineHeight: "1.8" }}
            className="text-white text-xl items-center justify-center"
          >
            Orbital Gamehouse adalah badan usaha yang bergerak dalam bidang
            rental PlayStation 4 dan PlayStation 5. <br />
            Dengan fokus pada penyewaan konsol game, kami menyediakan layanan
            yang memudahkan para gamers untuk menikmati pengalaman bermain tanpa
            harus membeli perangkat. <br />
            Orbital Gamehouse berkomitmen untuk memberikan pelayanan terbaik dan
            menjangkau berbagai kalangan, sehingga dapat memenuhi kebutuhan
            hiburan digital.
          </p>
        </div>
      </div>

      {/* FAQ Section */}
      <div className="flex flex-col sm:flex-row w-full mt-10 sm:mt-48">
        <h1
          style={{ lineHeight: "1.4" }}
          className="w-full sm:w-2/4 mx-auto sm:ml-28 text-white text-3xl sm:text-7xl text-center sm:text-left mb-10 sm:mb-0"
        >
          Frequently <br /> Asked <br /> Questions
        </h1>
        <Faq />
      </div>
    </div>
  );
};

export default About;
