import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useContext, useState } from "react";

import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";
import Home from "./Pages/Home/Home";
import Menus from "./Pages/Menus/Menus";
import Locations from "./Pages/Locations/Locations";
import ScrollToTop from "./ScrolltoTop";
import Blogs from "./Pages/Blogs/Blogs";
import ContactSection from "./Pages/Contact/contact";
import About from "./Pages/About/About";
import AuthPage from "./Pages/Auth/AuthPage";
import { StoreContext } from "./context/StoreContext";

function App() {
  const { url, setToken } = useContext(StoreContext);
  const [showLogin, setShowLogin] = useState(false);

  return (
    <Router>
      <div className="w-full min-h-screen bg-neutral-100/40 flex flex-col">
        <ScrollToTop />
        <Navbar setShowLogin={setShowLogin} />

        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/menus" element={<Menus />} />
          <Route exact path="/location" element={<Locations />} />
          <Route exact path="/blogs" element={<Blogs />} />
          <Route exact path="/contact" element={<ContactSection />} />
          <Route exact path="/about" element={<About />} />
          {/* Removed routed login */}
        </Routes>

        <Footer />

        {/* Popup Login Modal */}
        {showLogin && (
          <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[100] flex items-center justify-center">
            <AuthPage
              setShowLogin={setShowLogin}
              setToken={setToken}
              url={url}
            />
          </div>
        )}
      </div>
    </Router>
  );
}

export default App;
