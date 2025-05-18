import MissionImg from "../../../assets/img/our-mission.jpg";

const OurMission = () => {
  return (
    <section className="bg-white py-24 px-6 lg:px-24">
      <article
        className="flex flex-col-reverse lg:flex-row items-center gap-12"
        data-aos="fade-up"
      >
        <div className="lg:w-1/2 bg-gray-50 p-10 rounded-xl shadow-sm border border-gray-200">
          <h2 className="text-4xl font-semibold text-gray-900 mb-4">
            Our Mission
          </h2>
          <p className="text-base text-gray-700 leading-relaxed">
            Our mission is to serve happiness on every table by making
            high-quality meals accessible to everyone. Whether it's lunch for
            one or dinner for a family, we aim to deliver unity through food,
            support local kitchens, and innovate every step of the journey.
          </p>
        </div>
        <figure className="lg:w-1/2">
          <img
            src={MissionImg}
            alt="Our Mission"
            loading="lazy"
            className="w-full rounded-xl shadow-md object-cover"
          />
        </figure>
      </article>
    </section>
  );
};

export default OurMission;
