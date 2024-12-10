import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Home from "./Pages/Home";
import About from "./Pages/About";
import Checkout from "./Pages/Checkout";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/react-gh-pages/" element={<Home />} />
        <Route path="/react-gh-pages/about" element={<About />} />
        <Route path="/react-gh-pages/checkout" element={<Checkout />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
