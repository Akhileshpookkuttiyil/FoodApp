import Slider from "./Slider/Slider";
const Hero = () => {
  return (
    <div className="w-full md:h-[calc(100vh-8ch)] h-auto bg-gradient-to-tr from-orange-700 via-amber-800 to-red-700 flex items-center justify-between mt-[8ch] px-4 sm:px-7 md:px-16 lg:px-28">
      <div className="flex-1 w-full flex items-center justify-between gap-x-8 gap-y-4 md:py-0 py-4 flex-wrap">
        <div className="md:w-[45%] w-full space-y-6">
          <div className="space-y-4">
            <h6 className="text-orange-200/70 text-base font-normal bg-neutral-900/40 w-fit px-3 py-0 5 rounded-lg">
              Try Healthy & Quality
            </h6>
            <h1 className="text-neutral-50 font-black md:text-[5rem] text-5xl">
              Healthy Foods for Every Taste
            </h1>
            <p className="md:text-base text-sm text-neutral-300 font-normal">
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Culpa,
              voluptatum hic aspernatur veritatis deleniti quaerat minus quis
              doloremque a ratione ipsum tenetur consectetur ab, laboriosam
              quasi unde libero consequatur? Recusandae sint nihil ut ipsa iure.
            </p>
          </div>
          <button className="w-fit px-8 py-2 text-lg font-medium text-neutral-900 bg-orange-500 hover:bg-orange-600 border-2 border-orange-500 rounded-xl ease-in-out duration-300">
            Order Now
          </button>
        </div>

        <div className="md:w-[50%] w-full space-y-4">
          {/* Add your slider or image here */}
          <Slider />
        </div>
      </div>
    </div>
  );
};

export default Hero;
