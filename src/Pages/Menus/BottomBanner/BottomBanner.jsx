import appImage from "../../../assets/img/QR.png"; // Main image
import smallImg1 from "../../../assets/img/small1.png"; // Small images
import smallImg2 from "../../../assets/img/small2.png";
import smallImg3 from "../../../assets/img/small3.png";
import smallImg4 from "../../../assets/img/small4.png";
import smallImg5 from "../../../assets/img/small5.png";
import smallImg6 from "../../../assets/img/small6.png";

const BottomBanner = () => {
  return (
    <div className="relative w-full flex flex-col-reverse lg:flex-row items-center justify-between bg-gradient-to-r from-black via-gray-900 to-gray-800 shadow-lg overflow-hidden px-6 py-10 sm:px-12 lg:px-20 mt-10">
      {/* Left Side: FoodieMania Title & App Promotion */}
      <div className="text-white text-center lg:text-left max-w-lg">
        <h2 className="text-3xl md:text-4xl font-bold">
          <span className="text-orange-400">F</span>oodie
          <span className="text-orange-400">M</span>ania
        </h2>
        <p className="text-lg mt-3 font-medium">
          Get the <span className="text-orange-400">FoodieMania</span> app now
          and enjoy exclusive deals!
        </p>
        <button className="mt-4 px-6 py-2 bg-orange-500 text-white rounded-full text-lg font-medium hover:bg-orange-600 transition">
          Download Now
        </button>
      </div>

      {/* Right Side: Main Image with Small Images Around */}
      <div className="relative flex justify-center w-auto">
        {/* Main Image */}
        <img
          src={appImage}
          alt="FoodieMania App Preview"
          className="w-auto max-w-[180px] sm:max-w-[220px] md:max-w-[260px] lg:max-w-[280px] h-auto object-contain relative z-10"
        />

        {/* Small Images (Fully Responsive) */}
        <img
          src={smallImg1}
          alt="Feature 1"
          className="absolute top-4 -left-4 w-10 sm:w-14 md:w-16 lg:w-20 opacity-80 rotate-6"
        />
        <img
          src={smallImg2}
          alt="Feature 2"
          className="absolute -top-10 left-24 w-8 sm:w-14 md:w-16 lg:w-20 opacity-85 rotate-12"
        />
        <img
          src={smallImg3}
          alt="Feature 3"
          className="absolute top-6 -right-2 w-10 sm:w-14 md:w-16 lg:w-20 opacity-85 -rotate-6"
        />
        <img
          src={smallImg4}
          alt="Feature 4"
          className="absolute bottom-8 -right-2 w-8 sm:w-12 md:w-14 lg:w-18 opacity-90 rotate-3"
        />
        <img
          src={smallImg6}
          alt="Feature 6"
          className="absolute bottom-10 -left-2 w-8 sm:w-14 md:w-16 lg:w-20 opacity-85 rotate-9"
        />
      </div>
    </div>
  );
};

export default BottomBanner;
