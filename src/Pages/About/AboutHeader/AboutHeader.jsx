const AboutHeader = () => {
  return (
    <section
      className="bg-white py-24 px-6 lg:px-32 text-center"
      data-aos="fade-up"
    >
      <div className="bg-gray-50 px-6 py-16 rounded-2xl shadow-sm border border-gray-100 max-w-6xl mx-auto">
        <h2 className="text-2xl md:text-3xl lg:text-4xl font-light text-gray-800 leading-relaxed max-w-4xl mx-auto">
          Curating dishes with love — delivered fresh from top restaurants to
          your table with trust and technology.
        </h2>
        <p className="mt-6 text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">
          At FoodieMania, we blend passion, flavor, and innovation to redefine
          your dining experience.
        </p>
      </div>
    </section>
  );
};

export default AboutHeader;
