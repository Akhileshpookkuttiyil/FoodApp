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
    <div className="container-fluid py-5 bg-gray-200">
      <div className="flex justify-center">
        {/* Added max-w-7xl and px-4 for responsiveness */}
        <div className="container max-w-7xl px-4 sm:px-6 lg:px-8 py-2">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-8 md:gap-6 lg:gap-4">
            {features.map((feature, index) => (
              <article
                key={index}
                className="featurs-item text-center rounded-lg bg-white p-4 shadow-lg transition-shadow hover:shadow-xl duration-300"
              >
                <div
                  className="featurs-icon w-20 sm:w-24 md:w-28 lg:w-32 h-20 sm:h-24 md:h-28 lg:h-32 rounded-full bg-orange-500 mb-5 mx-auto flex items-center justify-center text-3xl text-white transition-transform transform hover:scale-110 hover:rotate-6 duration-300 ease-in-out"
                  aria-label={feature.ariaLabel}
                >
                  {feature.icon}
                </div>
                <div className="featurs-content text-center">
                  <h5 className="text-lg font-semibold text-gray-700">
                    {feature.title}
                  </h5>
                  <p className="mb-0 text-gray-500">{feature.description}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Banner;
