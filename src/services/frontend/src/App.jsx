import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import { default as Navbar } from "./components/Navbar";
import Metamizer from "./pages/Metamizer";
import Footer from "./components/Footer";
import Rng from "./pages/Rng";

function App() {

  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <div className="pt-[64px]">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/services/metamizer" element={<Metamizer />} />
            <Route path="/services/rng" element={<Rng />} />
          </Routes>
        </div>
        {/* <Footer /> */}
      </div>
    </Router>
  );
}

export default App;
