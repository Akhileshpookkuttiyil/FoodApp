import { FaTruckFast } from "react-icons/fa6";
import { MdPayment, MdPayments } from "react-icons/md";
import { PiHeadsetBold } from "react-icons/pi";

const Banner = () => {
  return (
    <div className="w-full lg:px-28 md:px-16 sm:px-7 px-4 lg:py-10 md:py-8 sm:py-6 py-4">
      <div className="bg-zinc-700 grid md:grid-cols-3 sm:grid-cols-2 grid-cols-1 lg:gap-14 md:gap-12 sm:gap-8 gap-6 items-center rounded-md px-4 py-8">
        {/* Free Shipping Section */}
        <div className="flex items-center justify-center gap-x-3">
          <div className="w-11 h-11 rounded-xl bg-orange-800/60 flex items-center justify-center text-2xl text-neutral-100 transition-transform duration-300 hover:scale-110 hover:rotate-6 ease-in-out">
            <FaTruckFast />
          </div>
          <h5 className="text-lg text-neutral-200 font-medium">
            Free Shipping Upto ₨500
          </h5>
        </div>
        {/* Secure Payment Section */}
        <div className="flex items-center justify-center gap-x-3">
          <div className="w-11 h-11 rounded-xl bg-orange-800/60 flex items-center justify-center text-2xl text-neutral-100 transition-transform duration-300 hover:scale-110 hover:rotate-6 ease-in-out">
            <MdPayment />
          </div>
          <h5 className="text-lg text-neutral-200 font-medium">
            Secure Payment Method
          </h5>
        </div>
        {/* Customer Support Section */}
        <div className="flex items-center justify-center gap-x-3">
          <div className="w-11 h-11 rounded-xl bg-orange-800/60 flex items-center justify-center text-2xl text-neutral-100 transition-transform duration-300 hover:scale-110 hover:rotate-6 ease-in-out">
            <PiHeadsetBold />
          </div>
          <h5 className="text-lg text-neutral-200 font-medium">
            24/7 Customer Support
          </h5>
        </div>
      </div>
    </div>
  );
};

export default Banner;
