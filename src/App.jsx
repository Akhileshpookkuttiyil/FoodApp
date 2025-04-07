import { BrowserRouter as Router } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";
import Home from "./Pages/Home/Home";
import { Routes, Route } from "react-router-dom";
import Menus from "./Pages/Menus/Menus";
import Locations from "./Pages/Locations/Locations";
import ScrollToTop from "./ScrolltoTop";
import Blogs from "./Pages/Blogs/Blogs";
import ContactSection from "./Pages/Contact/contact";

function App() {
  return (
    <>
      <Router>
        <div className="w-full min-h-screen bg-neutral-100/40 flex flex-col">
          <ScrollToTop /> {/* This ensures every page starts from the top */}
          {/* Navbar (sample) */}
          <Navbar />
          {/* Routes (sample) */}
          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route exact path="/menus" element={<Menus />} />
            <Route exact path="/location" element={<Locations />} />
            <Route exact path="/blogs" element={<Blogs />} />
            <Route exact path="/contact" element={<ContactSection />} />
          </Routes>
          {/* Footer (sample) */}
          <Footer />
        </div>
      </Router>
    </>
  );
}

export default App;
