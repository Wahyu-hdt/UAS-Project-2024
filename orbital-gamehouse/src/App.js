import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Home from "./Pages/Home";
import About from "./Pages/About";
import Checkout from "./Pages/Checkout";
import Notfound from "./Pages/Notfound";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/UAS-Project-2024/" element={<Home />} />
        <Route path="/UAS-Project-2024/about" element={<About />} />
        <Route path="/UAS-Project-2024/checkout" element={<Checkout />} />
        <Route path="*" element={<Notfound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
