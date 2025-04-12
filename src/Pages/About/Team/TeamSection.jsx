const TeamSection = () => {
  return (
    <section
      className="bg-white py-24 px-6 lg:px-24 xl:px-32 2xl:px-48"
      data-aos="fade-up"
    >
      <h2 className="text-5xl font-bold text-center text-gray-900 mb-14">
        Meet Our Team
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10 max-w-7xl mx-auto">
        {teamMembers.map((member, index) => (
          <div
            key={index}
            className="bg-gray-50 p-6 rounded-xl shadow-sm text-center border border-gray-200 hover:shadow-md hover:-translate-y-1 transition-all duration-300"
            data-aos="zoom-in"
            data-aos-delay={index * 100}
          >
            <img
              src={member.image}
              alt={`Photo of ${member.name}`}
              loading="lazy"
              className="w-24 h-24 mx-auto rounded-full mb-4 object-cover border-2 border-primary shadow"
            />
            <h4 className="text-lg font-semibold text-gray-800">
              {member.name}
            </h4>
            <p className="text-sm text-gray-600">{member.position}</p>
          </div>
        ))}
      </div>
    </section>
  );
};
