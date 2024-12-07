import { BrowserRouter as Router } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";
import Home from "./Pages/Home/Home";
import { Routes, Route } from "react-router-dom";
import Menus from "./Pages/Menus/Menus";

function App() {
  return (
    <>
      <Router>
        <div className="w-full min-h-screen bg-neutral-100/40 flex flex-col">
          {/* Navbar (sample) */}
          <Navbar />
          {/* Routes (sample) */}
          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route exact path="/menus" element={<Menus />} />
          </Routes>
          {/* Footer (sample) */}
          <Footer />
        </div>
      </Router>
    </>
  );
}

export default App;
