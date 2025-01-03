import React, { useState } from "react";

/* variabel to store array of question and answer */
const Faq = () => {
  const [openIndex, setOpenIndex] = useState(null);

  // Storing the question and answer
  const faqs = [
    {
      question: "Apa saja fasilitas yang disediakan?",
      answer:
        "Konsol yang lengkap, Wi-Fi kencang, TV, AC, Kamar mandi, Kursi yang tebal dan nyaman dan masih banyak lagi.",
    },
    {
      question: "Bagaimana jika terjadi kerusakan pada perangkat?",
      answer:
        "Anda akan dikenakan biaya ganti rugi sesuai dengan apa saja perangkat yang rusak.",
    },
    {
      question: "Jam operasional Orbital Gamehouse berapa lama",
      answer: "Kami buka setiap hari mulai pukul 10.00 sampai 22.00 WIB.",
    },
  ];

  /* Function to locate which question is being clicked */
  const togglefaqs = (index) => {
    setOpenIndex(openIndex === index ? null : index); // If openindex is equal to the index, it will sets openindex to null (closing it)
  };

  return (
    <div className="max-w-xl  mt-14 mr-10  text-white text-lg ">
      {/* Mapping through the array of faqs */}
      {faqs.map((faq, index) => (
        <div key={index} className="border-b">
          <button
            className="flex justify-between items-center w-full p-4 text-left focus:outline-none"
            onClick={() => togglefaqs(index)} // When the button is clicked, it will call the togglefaqs function with the index of faqs
          >
            <span className="font-semibold ">{faq.question}</span>
            <span className="ml-3">{openIndex === index ? "v" : ">"}</span>{" "}
          </button>

          {/* Transition for opening and closing the accordion */}
          <div
            className={`
              overflow-hidden transition-all duration-200 
              ${
                openIndex === index
                  ? "max-h-auto opacity-100 p-4"
                  : "max-h-0 opacity-0 "
              }
            `}
          >
            <p className="text-white">{faq.answer}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Faq;
