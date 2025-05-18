import { FaMapMarkerAlt, FaEnvelope, FaPhone } from "react-icons/fa";
import { motion } from "framer-motion";
import ContactForm from "../ContactForm/ContactForm";
import ContactInfo from "../ContactInfo/ContactInfo";

const ContactSection = () => {
  return (
    <section className="relative w-full bg-white dark:bg-[#0f172a] py-24 px-4 sm:px-6 lg:px-10 font-sans transition duration-500">
      <div className="w-full">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white tracking-tight">
            Contact Us
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 mt-4 max-w-2xl mx-auto">
            Have a question, feedback, or a business inquiry? We'd love to hear
            from you.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-14 lg:gap-20 xl:gap-28 2xl:gap-32">
          <motion.div
            className="space-y-10"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
          >
            <ContactInfo
              icon={<FaMapMarkerAlt className="text-white text-lg" />}
              title="Visit Us"
              content={
                <>
                  23, 2nd Floor, Indira Nagar 1st Stage
                  <br />
                  CMH Road, Bangalore - 560038
                  <br />
                  Karnataka, India
                </>
              }
            />
            <ContactInfo
              icon={<FaEnvelope className="text-white text-lg" />}
              title="Email"
              content="support@foodiemania.com"
            />
            <ContactInfo
              icon={<FaPhone className="text-white text-lg" />}
              title="Phone"
              content="+91 98765 43210"
            />
          </motion.div>

          <ContactForm />
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
