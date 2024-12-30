import supabase from "../Config/supabaseClient";
import { useEffect, useState } from "react";
import { useCart } from "../CartContext";

const ProductList = () => {
  const [products, setProducts] = useState([]);
  // Import addToCart from context
  const { addToCart } = useCart();
  // Initialize added Products to an empty array
  const [addedProducts, setAddedProducts] = useState(new Set());

  // Fetch data from supabase tabel paket-rental
  useEffect(() => {
    const fetchProducts = async () => {
      const { data, error } = await supabase.from("paket-rental").select("*");

      if (error) {
        console.log(
          "Terjadi Error Saat Fetching Data Dari Tabel paket-rental",
          error
        );
      } else {
        setProducts(data);
      }
    };
    fetchProducts(); // Call the function to fetch data from paket-rental tabel
  }, []); // Empty dependency array to run only once

  // Function to handle adding product to cart
  const handleAddToCart = (product) => {
    if (!addedProducts.has(product.id)) {
      addToCart(product);
      setAddedProducts((prev) => new Set(prev).add(product.id)); // Add product ID to the set
    }
  };

  return (
    <div className="flex flex-wrap font-Poppins text-white mt-10 justify-center ">
      {/* Rendering the data from tabel paket-rental */}
      {/* Condition to check if fetching is done/success */}
      {products.length > 0 ? (
        // Sorting and mapping through product
        products
          .sort((a, b) => a.id - b.id)
          .map((product) => (
            <div
              key={product.id}
              className=" w-1/4 bg-gray-800 flex flex-col items-center p-4 m-2 mt-4 rounded-lg shadow-lg"
            >
              <img
                src={product.images}
                alt={product.name}
                className="w-[300px] h-[300px] "
              />
              <h2 className="text-lg font-bold mt-2">{product.name}</h2>
              <p className="text-base">Harga : RP. {product.price}</p>
              {/* When Button is Clicked , Add Product to Cart */}
              <button
                className={`bg-green-600 px-2 py-1 mt-4 rounded-md hover:bg-green-700 ${
                  addedProducts.has(product.id)
                    ? "opacity-50 cursor-not-allowed"
                    : ""
                }`}
                onClick={() => handleAddToCart(product)}
                disabled={addedProducts.has(product.id)} // Disable button if product is already added
              >
                {addedProducts.has(product.id)
                  ? "Sudah Ditambahkan"
                  : "Tambahkan Kedalam Keranjang"}
              </button>
            </div>
          ))
      ) : (
        <p>List Produk Tidak Tersedia</p>
      )}
    </div>
  );
};

export default ProductList;
