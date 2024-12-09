import Banner from "./Banner/Banner";
import Category from "./Category/Category";
import Hero from "./Hero/Hero";
// import Menu from "./Menu/Menu";
// import Offer from "./Offer/Offer";

const Home = () => {
  return (
    <div className="space-y-10">
      <Hero />
      <Banner />
      <Category />
      {/* <Offer />
      <Menu/> */}
    </div>
  );
};

export default Home;
