import muttonBiriyani from "../../../assets/img/muttonBiriyani.png";
import bannerBg from "../../../assets/img/fire.png"; // Update the path to your background image

const BannerAd = () => {
  return (
    <div
      className="relative bg-orange-200 text-black p-5 w-full h-72 flex items-center justify-between shadow-lg mt-10 overflow-hidden"
      style={{
        backgroundImage: `url(${bannerBg})`, // Background image URL
        backgroundSize: "cover", // Ensures the background image covers the div fully
        backgroundPosition: "center", // Centers the image
      }}
    >
      {/* Semi-Transparent Overlay for Better Text Contrast */}
      <div
        className="absolute top-0 left-0 w-full h-full z-0 bg-black opacity-40"
        style={{ backgroundColor: 'rgba(0, 0, 0, 0.4)' }} // Black overlay with opacity for better contrast
      ></div>

      {/* Stylish Orange Bubbles - Spread Across the Div */}
      <div className="absolute top-0 left-0 w-full h-full z-0 pointer-events-none">
        {/* Top Left Bubbles */}
        <div className="absolute top-5 left-5 bg-orange-500 rounded-full w-16 h-16 opacity-60"></div>
        <div className="absolute top-16 left-16 bg-orange-500 rounded-full w-20 h-20 opacity-50"></div>

        {/* Floating Left Side Bubbles */}
        <div className="absolute top-1/4 left-2 bg-orange-500 rounded-full w-18 h-18 opacity-50"></div>
        <div className="absolute top-1/3 left-4 bg-orange-500 rounded-full w-24 h-24 opacity-40"></div>

        {/* Bottom Left Bubbles */}
        <div className="absolute bottom-8 left-6 bg-orange-500 rounded-full w-24 h-24 opacity-50"></div>
        <div className="absolute bottom-20 left-18 bg-orange-500 rounded-full w-16 h-16 opacity-60"></div>

        {/* Top Right Bubbles */}
        <div className="absolute top-10 right-6 bg-orange-500 rounded-full w-16 h-16 opacity-60"></div>
        <div className="absolute top-20 right-1/4 bg-orange-500 rounded-full w-20 h-20 opacity-50"></div>

        {/* Floating Right Side Bubbles */}
        <div className="absolute top-1/4 right-4 bg-orange-500 rounded-full w-16 h-16 opacity-50"></div>
        <div className="absolute top-1/3 right-2 bg-orange-500 rounded-full w-18 h-18 opacity-40"></div>

        {/* Bottom Right Bubbles */}
        <div className="absolute bottom-10 right-8 bg-orange-500 rounded-full w-20 h-20 opacity-50"></div>
        <div className="absolute bottom-22 right-16 bg-orange-500 rounded-full w-16 h-16 opacity-60"></div>

        {/* Center Bubbles - Well Spaced */}
        <div className="absolute top-1/2 left-1/3 transform -translate-x-1/2 -translate-y-1/2 bg-orange-500 rounded-full w-20 h-20 opacity-50"></div>
        <div className="absolute top-1/3 left-1/4 bg-orange-500 rounded-full w-18 h-18 opacity-40"></div>
        <div className="absolute bottom-1/4 right-1/3 bg-orange-500 rounded-full w-24 h-24 opacity-50"></div>
        <div className="absolute top-1/4 left-1/2 bg-orange-500 rounded-full w-16 h-16 opacity-45"></div>
      </div>

      {/* Text Section */}
      <div className="relative z-10 flex-1 pl-5 pr-5">
        <h2 className="text-4xl font-bold mb-3 font-poppins text-transparent bg-clip-text bg-gradient-to-r from-yellow-200 via-orange-400 to-red-400 drop-shadow-lg">
          50% OFF on Delicious Mutton Biriyani!
        </h2>
        <p className="text-lg mb-3 font-medium font-poppins text-transparent bg-clip-text bg-gradient-to-r from-yellow-200 via-orange-400 to-red-400 drop-shadow-lg">
          Today only! Taste the authentic flavor of Mutton Biriyani, made with
          rich spices and tender mutton. Perfect for biriyani lovers!
        </p>
      </div>

      {/* Image Section - Positioned to the Right */}
      <div className="relative z-10 w-1/3 h-full overflow-hidden flex-shrink-0">
        <img
          src={muttonBiriyani}
          alt="Mutton Biriyani"
          className="object-cover w-60 h-60 opacity-80"
        />
      </div>
    </div>
  );
};

export default BannerAd;
