import { FaCarSide, FaUserShield, FaLeaf, FaPhoneAlt } from "react-icons/fa";

const Banner = () => {
  const features = [
    {
      icon: <FaCarSide />,
      title: "Free Shipping",
      description: "Free on orders over $300",
      ariaLabel: "Free Shipping Icon",
    },
    {
      icon: <FaUserShield />,
      title: "Secure Payment",
      description: "100% secure payment",
      ariaLabel: "Secure Payment Icon",
    },
    {
      icon: <FaLeaf />,
      title: "Fresh & Safe Delivery",
      description: "We ensure the freshness and quality.",
      ariaLabel: "Fresh and Safe Delivery Icon",
    },
    {
      icon: <FaPhoneAlt />,
      title: "24/7 Support",
      description: "Support available anytime",
      ariaLabel: "24/7 Support Icon",
    },
  ];

  return (
    <div className="bg-gray-100 py-10 lg:py-14">
      <div className="w-full px-4 sm:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-x-10 xl:gap-x-20 2xl:gap-x-28 gap-y-10">
          {features.map((feature, index) => (
            <article
              key={index}
              className="text-center bg-white p-6 xl:p-8 rounded-xl shadow-md hover:shadow-xl transition-all duration-300"
            >
              <div
                className="w-20 sm:w-24 xl:w-28 h-20 sm:h-24 xl:h-28 rounded-full bg-orange-500 mb-5 xl:mb-6 mx-auto flex items-center justify-center text-3xl xl:text-4xl text-white transition-transform transform hover:scale-110 hover:rotate-6 duration-300"
                aria-label={feature.ariaLabel}
              >
                {feature.icon}
              </div>
              <h5 className="text-lg xl:text-xl font-semibold text-gray-700">
                {feature.title}
              </h5>
              <p className="text-gray-500 text-sm xl:text-base">
                {feature.description}
              </p>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Banner;
