import WhyUsImg from "../../../assets/img/why-us.jpg";

const WhyChooseUs = () => {
  return (
    <section className="bg-gray-50 py-24 px-6 lg:px-24">
      <article
        className="flex flex-col lg:flex-row items-center gap-12"
        data-aos="fade-up"
      >
        <figure className="lg:w-1/2">
          <img
            src={WhyUsImg}
            alt="Why choose FoodieMania"
            loading="lazy"
            className="w-full rounded-xl shadow-md object-cover"
          />
        </figure>
        <div className="lg:w-1/2 bg-white p-10 rounded-xl shadow-sm border border-gray-200">
          <h2 className="text-4xl font-semibold text-gray-900 mb-4">Why Choose Us</h2>
          <p className="text-base text-gray-700 leading-relaxed">
            From intuitive ordering to real-time delivery tracking, our
            platform is designed to give you control, trust, and personalized
            experiences. We prioritize quality, efficiency, and customer delight
            in everything we serve.
          </p>
        </div>
      </article>
    </section>
  );
};

export default WhyChooseUs;
