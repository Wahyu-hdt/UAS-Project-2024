import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Home from "./Pages/Home";
import About from "./Pages/About";
import Checkout from "./Pages/Checkout";
import Notfound from "./Pages/Notfound";
import ConfirmOrder from "./Pages/ConfirmOrder";
import Payment from "./Pages/Payment";
import { CartProvider } from "./CartContext";

function App() {
  return (
    <CartProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/UAS-Project-2024/" element={<Home />} />
          <Route path="/UAS-Project-2024/about" element={<About />} />
          <Route path="/UAS-Project-2024/checkout" element={<Checkout />} />
          <Route path="/UAS-Project-2024/confirm" element={<ConfirmOrder />} />
          <Route path="/UAS-Project-2024/payment" element={<Payment />} />
          <Route path="*" element={<Notfound />} />
        </Routes>
      </BrowserRouter>
    </CartProvider>
  );
}

export default App;
