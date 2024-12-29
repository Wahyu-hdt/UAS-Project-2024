import supabase from "../Config/supabaseClient";
import { useEffect, useState } from "react";
import { BsChevronDoubleRight, BsChevronDoubleLeft } from "react-icons/bs";

const ImageCarousel = () => {
  const [imageUrls, setImageUrls] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const fetchImageUrls = async () => {
      // Fetch public URLs for each image
      const images = [
        "newyear.jpg",
        "gameps5.jpg",
        "gamexbox.jpg",
        "eafc25.jpg",
      ];
      const url = [];

      for (const image of images) {
        const {
          data: { publicUrl },
          error,
        } = await supabase.storage.from("images").getPublicUrl(image);
        if (error) {
          console.log("Error Terjadi Fetching Image URL", error);
        }

        url.push(publicUrl);
      }

      // Set the image URLs to the state
      setImageUrls(url);
    };

    fetchImageUrls(); // Call the function to fetch image URLs
  }, []); // Empty dependency array to run only once

  // Automatically change images every 10 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % imageUrls.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [imageUrls.length]);

  // Previous button for image
  const prevSlide = () => {
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + imageUrls.length) % imageUrls.length
    );
  };

  // Next button for image
  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % imageUrls.length);
  };

  return (
    <div className="relative w-[1200px] h-[600px] mx-auto mt-6">
      {/* Rendering The current image */}
      {imageUrls.length > 0 ? (
        <img
          src={imageUrls[currentIndex]}
          alt="news"
          className="absolute w-full h-full rounded-lg "
        />
      ) : (
        <p>Loading images...</p>
      )}

      {/* Navigation buttons */}
      <div className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-gray-800 text-white p-2 rounded-full hover:bg-gray-700 hover:cursor-pointer ">
        <BsChevronDoubleLeft onClick={prevSlide} />
      </div>

      <div className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-gray-800 text-white p-2 rounded-full hover:bg-gray-700 hover:cursor-pointer">
        <BsChevronDoubleRight onClick={nextSlide} />
      </div>
    </div>
  );
};

export default ImageCarousel;
