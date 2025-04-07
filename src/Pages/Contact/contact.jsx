import { useState } from "react";
import { FaMapMarkerAlt, FaEnvelope, FaPhone } from "react-icons/fa";
import { motion } from "framer-motion";

const ContactSection = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Thank you for reaching out! We'll get back to you soon.");
    setFormData({ name: "", email: "", message: "" });
  };

  return (
    <section className="relative bg-white dark:bg-[#0f172a] py-24 px-4 sm:px-6 md:px-16 font-sans transition duration-500">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
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
            Have a question, feedback, or a business inquiry? We'd love to hear from you.
          </p>
        </motion.div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-14">
          {/* Info Panel */}
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

          {/* Form Panel */}
          <motion.form
            onSubmit={handleSubmit}
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
            className="relative bg-white dark:bg-[#1e293b] bg-opacity-90 backdrop-blur-lg shadow-[0_8px_32px_0_rgba(31,38,135,0.1)] border border-gray-200 dark:border-gray-700 rounded-3xl p-10 space-y-6 transition duration-500"
          >
            <StaggeredInput>
              <Input
                label="Full Name"
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="John Doe"
              />
            </StaggeredInput>
            <StaggeredInput delay={0.1}>
              <Input
                label="Email Address"
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="john@example.com"
              />
            </StaggeredInput>
            <StaggeredInput delay={0.2}>
              <Textarea
                label="Message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder="Tell us how we can help..."
              />
            </StaggeredInput>
            <motion.button
              type="submit"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="w-full bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-semibold py-3 rounded-xl shadow-lg transition duration-300"
            >
              Send Message
            </motion.button>
          </motion.form>
        </div>
      </div>
    </section>
  );
};

// Animation Wrapper for staggered input reveal
const StaggeredInput = ({ children, delay = 0 }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.4, delay }}
  >
    {children}
  </motion.div>
);

const ContactInfo = ({ icon, title, content }) => (
  <motion.div
    whileHover={{ scale: 1.02 }}
    transition={{ type: "spring", stiffness: 100 }}
    className="flex items-start gap-5"
  >
    <div className="bg-orange-500 p-3 rounded-full shadow-md">{icon}</div>
    <div>
      <h4 className="text-lg font-semibold text-gray-800 dark:text-white mb-1">
        {title}
      </h4>
      <p className="text-gray-600 dark:text-gray-400">{content}</p>
    </div>
  </motion.div>
);

const Input = ({ label, type, name, value, onChange, placeholder }) => (
  <div>
    <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">
      {label}
    </label>
    <input
      type={type}
      name={name}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      required
      className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-[#334155] text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent transition duration-200"
    />
  </div>
);

const Textarea = ({ label, name, value, onChange, placeholder }) => (
  <div>
    <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">
      {label}
    </label>
    <textarea
      name={name}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      rows="5"
      required
      className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-[#334155] text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent transition duration-200"
    ></textarea>
  </div>
);

export default ContactSection;
