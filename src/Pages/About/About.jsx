import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import AboutHeader from "./AboutHeader/AboutHeader";
import OurStory from "./OurStory/OurStory";
import OurMission from "./OurMission/OurMission";
import WhyChooseUs from "./WhyUs/WhyUs";
import TeamSection from "./Team/TeamSection";

const About = () => {
  useEffect(() => {
    AOS.init({ duration: 800, once: true });
  }, []);

  return (
    <main className="mt-24">
      <AboutHeader />
      <OurStory />
      <OurMission />
      <WhyChooseUs />
      <TeamSection />
    </main>
  );
};

export default About;
