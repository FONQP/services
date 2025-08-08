import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import { default as Navbar } from "./components/Navbar";

import Main from "./pages/Main";
import Team from "./pages/Team";
import Contact from "./pages/Contact";

import Home from "./service_pages/Home";
import Metamizer from "./service_pages/Metamizer";
import Rng from "./service_pages/Rng";

function App() {
  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <Navbar />
          <Routes>
            <Route path="/" element={<Main />} />
            <Route path="/about" element={<Main />} />
            <Route path="/team" element={<Team />} />
            <Route path="/publications" element={<Main />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/services" element={<Home />} />
            <Route path="/services/metamizer" element={<Metamizer />} />
            <Route path="/services/rng" element={<Rng />} />
          </Routes>
      </div>
    </Router>
  );
}

export default App;
