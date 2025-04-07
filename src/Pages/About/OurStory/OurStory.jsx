const OurStory = () => {
  return (
    <section className="bg-gray-50 py-24 px-6 lg:px-24">
      <article
        className="flex flex-col lg:flex-row items-center gap-12"
        data-aos="fade-up"
      >
        <figure className="lg:w-1/2">
          <img
            src="https://images.unsplash.com/photo-1600891964599-f61ba0e24092?w=800&q=70"
            srcSet="https://images.unsplash.com/photo-1600891964599-f61ba0e24092?w=400&q=60 400w,
                       https://images.unsplash.com/photo-1600891964599-f61ba0e24092?w=800&q=70 800w"
            sizes="(max-width: 768px) 100vw, 50vw"
            alt="Chef preparing dish"
            loading="lazy"
            className="w-full rounded-xl shadow-md object-cover"
          />
        </figure>
        <div className="lg:w-1/2 bg-white p-10 rounded-xl shadow-sm border border-gray-200">
          <h2 className="text-4xl font-semibold text-gray-900 mb-4">
            Our Story
          </h2>
          <p className="text-base text-gray-700 leading-relaxed">
            We started FoodieMania to bring people closer through food. Our
            journey began with a simple idea: great food experiences should be
            accessible, convenient, and full of variety. We collaborate with
            local chefs and restaurants to ensure every bite feels like home.
          </p>
        </div>
      </article>
    </section>
  );
};

export default OurStory;
