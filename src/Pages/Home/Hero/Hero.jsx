import Slider from "./Slider/Slider";

const Hero = () => {
  return (
    <div className="w-full bg-gradient-to-tr from-orange-700 via-amber-800 to-red-700 mt-[8ch]">
      <div className="flex flex-col-reverse md:flex-row items-center justify-between px-4 sm:px-7 md:px-16 lg:px-28 py-8 md:py-0 md:h-[calc(100vh-8ch)]">
        {/* Left Content */}
        <div className="w-full md:w-[45%] space-y-6 text-center md:text-left">
          <div className="space-y-4">
            <h6 className="text-orange-200/70 text-sm md:text-base font-normal bg-neutral-900/40 w-fit mx-auto md:mx-0 px-3 py-1 rounded-lg">
              Try Healthy & Quality
            </h6>
            <h1 className="text-neutral-50 font-black text-4xl sm:text-5xl lg:text-[4.5rem] leading-tight">
              Healthy Foods for Every Taste
            </h1>
            <p className="text-sm sm:text-base text-neutral-300 font-normal max-w-lg mx-auto md:mx-0">
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Culpa,
              voluptatum hic aspernatur veritatis deleniti quaerat minus quis
              doloremque a ratione ipsum tenetur consectetur ab, laboriosam
              quasi unde libero consequatur? Recusandae sint nihil ut ipsa iure.
            </p>
          </div>
          <div className="flex justify-center md:justify-start">
            <button className="px-8 py-2 text-base sm:text-lg font-medium text-neutral-900 bg-orange-500 hover:bg-orange-600 border-2 border-orange-500 rounded-xl transition duration-300">
              Order Now
            </button>
          </div>
        </div>

        {/* Right Content - Slider */}
        <div className="w-full md:w-[50%] mb-6 md:mb-0">
          <Slider />
        </div>
      </div>
    </div>
  );
};

export default Hero;
