import muttonBiriyani from "../../../assets/img/muttonBiriyani.png";
import bannerBg from "../../../assets/img/fire.png"; // Background image

const BannerAd = () => {
  return (
    <div
      className="relative bg-orange-200 text-black p-4 sm:p-6 lg:p-10 w-full 
      h-auto sm:h-[400px] lg:h-72 flex flex-col sm:flex-row items-center 
      justify-between shadow-lg mt-10 overflow-hidden"
      style={{
        backgroundImage: `url(${bannerBg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Semi-Transparent Overlay */}
      <div className="absolute top-0 left-0 w-full h-full z-0 bg-black opacity-40"></div>

      {/* 🎨 Bubbles - Splattered Across */}
      <div className="absolute top-0 left-0 w-full h-full z-0 pointer-events-none">
        <div className="absolute top-5 left-10 bg-orange-500 rounded-full w-12 h-12 opacity-50"></div>
        <div className="absolute top-20 left-28 bg-orange-500 rounded-full w-16 h-16 opacity-40"></div>
        <div className="absolute top-40 left-6 bg-orange-500 rounded-full w-14 h-14 opacity-60"></div>

        <div className="absolute top-16 right-10 bg-orange-500 rounded-full w-14 h-14 opacity-50"></div>
        <div className="absolute top-32 right-24 bg-orange-500 rounded-full w-16 h-16 opacity-40"></div>

        <div className="absolute bottom-10 left-16 bg-orange-500 rounded-full w-18 h-18 opacity-45"></div>
        <div className="absolute bottom-28 left-40 bg-orange-500 rounded-full w-14 h-14 opacity-50"></div>

        <div className="absolute bottom-14 right-8 bg-orange-500 rounded-full w-20 h-20 opacity-40"></div>
        <div className="absolute bottom-32 right-24 bg-orange-500 rounded-full w-16 h-16 opacity-50"></div>
      </div>

      {/* 📌 Content Section */}
      <div
        className="relative z-10 flex flex-col sm:flex-row items-center justify-between 
      w-full px-5 sm:px-10 text-center sm:text-left"
      >
        {/* ✍️ Text Section - Moves to Top on Small Screens */}
        <div className="w-full sm:w-1/2 mb-6 sm:mb-0">
          <h2
            className="text-3xl sm:text-4xl font-bold mb-3 font-poppins 
          text-transparent bg-clip-text bg-gradient-to-r from-yellow-200 via-orange-400 to-red-400 drop-shadow-lg"
          >
            50% OFF on Delicious Mutton Biriyani!
          </h2>
          <p
            className="text-lg sm:text-xl mb-3 font-medium font-poppins 
          text-transparent bg-clip-text bg-gradient-to-r from-yellow-200 via-orange-400 to-red-400 drop-shadow-lg"
          >
            Today only! Taste the authentic flavor of Mutton Biriyani, made with
            rich spices and tender mutton. Perfect for biriyani lovers!
          </p>

          {/* ⚡ Order Now Button */}
          <button
            className="mt-4 bg-gradient-to-r from-red-500 via-orange-500 to-yellow-400 
          text-white text-lg font-semibold py-2 px-6 rounded-full shadow-md 
          hover:shadow-lg hover:scale-105 transition-transform duration-300 ease-in-out"
          >
            Order Now
          </button>
        </div>

        {/* 🖼️ Image Section - Moves Below on Small Screens */}
        <div className="w-full sm:w-1/2 flex justify-center sm:justify-end">
          <img
            src={muttonBiriyani}
            alt="Mutton Biriyani"
            className="object-contain w-[70%] sm:w-52 sm:h-52 md:w-64 md:h-64 opacity-80"
          />
        </div>
      </div>
    </div>
  );
};

export default BannerAd;
