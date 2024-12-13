import Navbar from "../Components/Navigationbar";
import logo from "../Images/OGHlogo 2.png";
import Faq from "../Components/Faq";

const About = () => {
  return (
    <>
      <div className="h-full  bg-gradient-to-r from-gray-900 to-gray-800 font-Poppins">
        <Navbar />
        <div className=" flex ml-44 mt-12">
          <img src={logo} alt="logo" />
        </div>

        {/* Container Profil */}
        <div className="flex w-3/4 ml-52 mt-10 bg-gray-700 rounded-lg h-60 shadow-2xl">
          <p
            style={{ lineHeight: "1.8" }}
            className="flex text-white  text-xl items-center justify-center px-5 py-2 "
          >
            Orbital Gamehouse adalah badan usaha yang bergerak dalam bidang
            rental PlayStation 4 dan PlayStation 5. <br />
            Dengan fokus pada penyewaan konsol game, kami menyediakan layanan
            yang memudahkan para gamers untuk menikmati pengalaman bermain tanpa
            terbaik harus membeli perangkat. <br />
            Orbital Gamehouse berkomitmen untuk memberikan pelayanan terbaik dan
            menjangkau berbagai kalangan, sehingga dapat memenuhi kebutuhan
            hiburan digital.
          </p>
        </div>

        {/* Container FAQs */}
        <div className="flex flex-row w-full mt-48 h-[400px] ">
          <h1
            style={{ lineHeight: "1.4" }}
            className="w-2/4 ml-28  text-white text-7xl"
          >
            Frequently <br /> Asked <br /> Questions
          </h1>
          <Faq />
        </div>
      </div>
    </>
  );
};

export default About;
