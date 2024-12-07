const Hero = () => {
  return (
    <div className="w-full md:h-[calc(100vh-8ch)] h-auto bg-gradient-to-tr from-orange-700 via-amber-800 to-red-700 flex items-center justify-between mt-[8ch] lg:px-28 md:px-16 sm:px-7">
      <div className="flex-1 w-full flex items-center justify-between gap-x-8 gap-y-4 md:py-0 py-4 flex-wrap">
        <div className="md:w-[45%] w-full space-y-8">
          <div className="space-y-4">
            <h6 className="text-orange-200/70 text-base font-normal bg-neutral-900/40 w-fit px-3 py-0 5 rounded-lg">
              Try Healthy & Quality
            </h6>
            <h1 className="text-neutral-50 font-black md:text-[5rem] text-5xl leading-tight">
              Healthy Foods for Every Taste
            </h1>
            <p className="md:text-base text-sm text-neutral-300 font-normal">
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Culpa,
              voluptatum hic aspernatur veritatis deleniti quaerat minus quis
              doloremque a ratione ipsum tenetur consectetur ab, laboriosam
              quasi unde libero consequatur? Recusandae sint nihil ut ipsa iure.
            </p>
          </div>
          <button className="w-fit px-8 py-2 text-lg font-medium text-neutral-900 hover:text-neutral-100 hover:bg-neutral-100/10 border-2 border-neutral-100 hover:border-neutral-100 rounded-xl ease-in-out duration-300">
            Order Now
          </button>
        </div>

        <div className="md:w-[50%] w-full space-y-4"></div>
      </div>
    </div>
  );
};

export default Hero;
