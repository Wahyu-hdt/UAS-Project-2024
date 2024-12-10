import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Home from "./Pages/Home";
import About from "./Pages/About";
import Checkout from "./Pages/Checkout";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/UAS-Project-2024/" element={<Home />} />
        <Route path="/UAS-Project-2024/about" element={<About />} />
        <Route path="/UAS-Project-2024/checkout" element={<Checkout />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
