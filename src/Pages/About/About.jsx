import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import Mission from "../../assets/img/our-mission.jpg";
import Why_us from "../../assets/img/why-us.jpg";

const teamMembers = [
  {
    name: "Ananya Sharma",
    position: "Operations Lead",
    image: "https://randomuser.me/api/portraits/women/44.jpg",
  },
  {
    name: "Rohit Mehta",
    position: "Head of Logistics",
    image: "https://randomuser.me/api/portraits/men/45.jpg",
  },
  {
    name: "Priya Patel",
    position: "Creative Strategist",
    image: "https://randomuser.me/api/portraits/women/68.jpg",
  },
  {
    name: "Karan Singh",
    position: "Product Manager",
    image: "https://randomuser.me/api/portraits/men/32.jpg",
  },
];

const About = () => {
  useEffect(() => {
    AOS.init({ duration: 800, once: true });
  }, []);

  return (
    <section className="mt-24">
      {/* Header Section */}
      <div
        className="bg-white py-20 px-6 lg:px-24 text-center"
        data-aos="fade-up"
      >
        <h1 className="text-5xl font-bold text-gray-900 mb-6">
          Discover FoodieMania
        </h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
          Curating dishes with love — delivered fresh from top restaurants to
          your table with trust and technology.
        </p>
      </div>

      {/* Our Story */}
      <div className="bg-gray-50 py-24 px-6 lg:px-24">
        <div
          className="flex flex-col lg:flex-row items-center gap-12"
          data-aos="fade-up"
        >
          <div className="lg:w-1/2">
            <img
              src="https://images.unsplash.com/photo-1600891964599-f61ba0e24092?w=800&q=70"
              alt="Our Story"
              loading="lazy"
              className="w-full rounded-xl shadow-md object-cover"
            />
          </div>
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
        </div>
      </div>

      {/* Our Mission */}
      <div className="bg-white py-24 px-6 lg:px-24">
        <div
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
          <div className="lg:w-1/2">
            <img
              src={Mission}
              alt="Our Mission"
              loading="lazy"
              className="w-full rounded-xl shadow-md object-cover"
            />
          </div>
        </div>
      </div>

      {/* Why Choose Us */}
      <div className="bg-gray-50 py-24 px-6 lg:px-24">
        <div
          className="flex flex-col lg:flex-row items-center gap-12"
          data-aos="fade-up"
        >
          <div className="lg:w-1/2">
            <img
              src={Why_us}
              alt="Why Choose Us"
              loading="lazy"
              className="w-full rounded-xl shadow-md object-cover"
            />
          </div>
          <div className="lg:w-1/2 bg-white p-10 rounded-xl shadow-sm border border-gray-200">
            <h2 className="text-4xl font-semibold text-gray-900 mb-4">
              Why Choose Us
            </h2>
            <p className="text-base text-gray-700 leading-relaxed">
              From intuitive ordering to real-time delivery tracking, our
              platform is designed to give you control, trust, and personalized
              experiences. We prioritize quality, efficiency, and customer
              delight in everything we serve.
            </p>
          </div>
        </div>
      </div>

      {/* Meet Our Team */}
      <div className="bg-white py-24 px-6 lg:px-24" data-aos="fade-up">
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
                alt={member.name}
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
      </div>
    </section>
  );
};

export default About;
