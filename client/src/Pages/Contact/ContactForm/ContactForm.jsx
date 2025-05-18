import { useState } from "react";
import { motion } from "framer-motion";
import Input from "../Input/Input";
import Textarea from "../Textarea/Textarea";
import StaggeredInput from "../StaggeredInput/StaggeredInput";

const ContactForm = () => {
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
  );
};

export default ContactForm;
