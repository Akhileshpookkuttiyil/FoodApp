import hotel from "../../../assets/img/restaurant.jpg";

const Banner = () => {
  return (
    <div
      className="relative w-full h-60 bg-cover bg-center"
      style={{ backgroundImage: `url(${hotel})` }}
    >
      {/* Overlay for better text visibility */}
      <div className="absolute inset-0 bg-black/50"></div>

      {/* Perfectly Centered Text (X & Y) */}
      <div className="absolute inset-0 flex items-center justify-center mt-10">
        <h1 className="text-white text-3xl font-bold text-center">
          Find the Best Restaurants Near You
        </h1>
      </div>
    </div>
  );
};

export default Banner;
