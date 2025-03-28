import appImage from "../../../assets/img/QR.png"; // Replace with actual image path

const BottomBanner = () => {
  return (
    <div className="relative w-full flex flex-col-reverse lg:flex-row items-center justify-between lg:gap-x-10 bg-gradient-to-r from-black via-gray-900 to-gray-800 shadow-lg overflow-hidden px-6 py-10 sm:px-10 sm:py-12 mt-10">
      {/* Left Side: FoodieMania Title & App Promotion */}
      <div className="text-white text-center lg:text-left max-w-lg">
        {/* FoodieMania Header (Same as Navbar) */}
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

      {/* Right Side: App Image */}
      <div className="w-auto flex justify-center">
        <img
          src={appImage}
          alt="FoodieMania App Preview"
          className="w-auto max-w-[180px] sm:max-w-[220px] md:max-w-[260px] lg:max-w-[280px] h-auto object-contain"
        />
      </div>
    </div>
  );
};

export default BottomBanner;
