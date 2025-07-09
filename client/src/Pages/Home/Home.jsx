import { useEffect, useState } from "react";
import Hero from "./Hero/Hero";
import Banner from "./Banner/Banner";
import Category from "./Category/Category";
import Offer from "./Offer/Offer";
import Menu from "./Menu/Menu";
import BookTable from "./Table/BookTable";
import Blog from "./Blog/Blog";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";

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
        <DotLottieReact
          src="https://lottie.host/4af2faac-0722-4717-8098-b7f94ef00f9b/p7nyoKCZk4.lottie"
          loop
          autoplay
          style={{ width: "230px", height: "250px" }}
        />
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
