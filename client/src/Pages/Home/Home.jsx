import { useEffect, useState } from "react";
import Hero from "./Hero/Hero";
import Banner from "./Banner/Banner";
import Category from "./Category/Category";
import Offer from "./Offer/Offer";
import Menu from "./Menu/Menu";
import BookTable from "./Table/BookTable";
import Blog from "./Blog/Blog";

const Home = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    document.title = "FoodieMania | Delicious Food at Your Fingertips";

    // Scroll to top smoothly
    window.scrollTo({ top: 0, behavior: "smooth" });

    // Simulate a delay (you can replace this with actual data loading if needed)
    const timer = setTimeout(() => setLoading(false), 1500); // 1.5 seconds

    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <dotlottie-player
          src="https://lottie.host/b6062add-37e0-465f-a1e3-6ae48065cd76/KVkNjiNVxl.lottie"
          background="transparent"
          speed="1"
          style={{ width: "230px", height: "250px" }}
          loop
          autoplay
        ></dotlottie-player>
      </div>
    );
  }

  return (
    <div className="space-y-10">
      <Hero />
      <Banner />
      <Category />
      <Offer />
      <Menu />
      <BookTable />
      <Blog />
    </div>
  );
};

export default Home;
