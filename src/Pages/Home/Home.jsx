import Banner from "./Banner/Banner";
// import Blog from "./Blog/Blog";
import Category from "./Category/Category";
import Hero from "./Hero/Hero";
import Menu from "./Menu/Menu";
import Offer from "./Offer/Offer";
import BookTable from "./Table/BookTable";

const Home = () => {
  return (
    <div className="space-y-10">
      <Hero />
      <Banner />
      <Category />
      <Offer />
      <Menu/>
      <BookTable/>
      {/* <Blog/> */}
    </div>
  );
};

export default Home;
