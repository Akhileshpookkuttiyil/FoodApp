import { FaCarSide, FaUserShield, FaLeaf, FaPhoneAlt } from "react-icons/fa";

const Banner = () => {
  return (
    <div className="container-fluid py-5 bg-gray-200">
      <div className="flex justify-center">
        <div className="container py-5">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-8 md:gap-6 lg:gap-4">
            {/* Free Shipping Section */}
            <div className="featurs-item text-center rounded-lg bg-white p-4 shadow-lg">
              <div className="featurs-icon w-20 sm:w-24 md:w-28 lg:w-32 h-20 sm:h-24 md:h-28 lg:h-32 rounded-full bg-orange-500 mb-5 mx-auto flex items-center justify-center text-3xl text-white transition-transform transform hover:scale-110 hover:rotate-6 duration-300 ease-in-out">
                <FaCarSide />
              </div>
              <div className="featurs-content text-center">
                <h5 className="text-lg font-semibold text-gray-700">
                  Free Shipping
                </h5>
                <p className="mb-0 text-gray-500">Free on orders over $300</p>
              </div>
            </div>

            {/* Secure Payment Section */}
            <div className="featurs-item text-center rounded-lg bg-white p-4 shadow-lg">
              <div className="featurs-icon w-20 sm:w-24 md:w-28 lg:w-32 h-20 sm:h-24 md:h-28 lg:h-32 rounded-full bg-orange-500 mb-5 mx-auto flex items-center justify-center text-3xl text-white transition-transform transform hover:scale-110 hover:rotate-6 duration-300 ease-in-out">
                <FaUserShield />
              </div>
              <div className="featurs-content text-center">
                <h5 className="text-lg font-semibold text-gray-700">
                  Secure Payment
                </h5>
                <p className="mb-0 text-gray-500">100% secure payment</p>
              </div>
            </div>

            {/* Fresh & Safe Delivery Section */}
            <div className="featurs-item text-center rounded-lg bg-white p-4 shadow-lg">
              <div className="featurs-icon w-20 sm:w-24 md:w-28 lg:w-32 h-20 sm:h-24 md:h-28 lg:h-32 rounded-full bg-orange-500 mb-5 mx-auto flex items-center justify-center text-3xl text-white transition-transform transform hover:scale-110 hover:rotate-6 duration-300 ease-in-out">
                <FaLeaf />
              </div>
              <div className="featurs-content text-center">
                <h5 className="text-lg font-semibold text-gray-700">
                  Fresh & Safe Delivery
                </h5>
                <p className="mb-0 text-gray-500">
                  We ensure the freshness and quality.
                </p>
              </div>
            </div>

            {/* 24/7 Support Section */}
            <div className="featurs-item text-center rounded-lg bg-white p-4 shadow-lg">
              <div className="featurs-icon w-20 sm:w-24 md:w-28 lg:w-32 h-20 sm:h-24 md:h-28 lg:h-32 rounded-full bg-orange-500 mb-5 mx-auto flex items-center justify-center text-3xl text-white transition-transform transform hover:scale-110 hover:rotate-6 duration-300 ease-in-out">
                <FaPhoneAlt />
              </div>
              <div className="featurs-content text-center">
                <h5 className="text-lg font-semibold text-gray-700">
                  24/7 Support
                </h5>
                <p className="mb-0 text-gray-500">Support available anytime</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Banner;
