const HeroBanner = ({ image }) => {
    return (
      <div
        className="relative w-full h-48 md:h-60 bg-cover bg-center flex items-center justify-center text-white"
        style={{ backgroundImage: `url(${image})` }}
      ></div>
    );
  };
  
  export default HeroBanner;
  