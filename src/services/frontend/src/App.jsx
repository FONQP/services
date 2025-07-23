import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Login from "./components/Login";
import { default as Navbar } from "./components/Navbar";
// import Dashboard from "./pages/Dashboard";
// import NotFound from "./pages/NotFound";
import Metamizer from "./pages/Metamizer";
import Footer from "./components/Footer";
import Rng from "./pages/Rng";

function App() {
  return (
    // <Navbar />
    <Router>
      {/* <div className="min-h-screen bg-gray-50 text-gray-900"> */}
        <Navbar />
        {/* <div className="p-4"> */}
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/services/metamizer" element={<Metamizer />} />
            <Route path="/services/rng" element={<Rng />} />
            {/* <Route path="/dashboard" element={<Dashboard />} />
            <Route path="*" element={<NotFound />} /> */}
          </Routes>
        {/* </div> */}
      {/* </div> */}
      {/* <Footer /> */}
      {/* </div> */}
    </Router>
  );
}

export default App;
