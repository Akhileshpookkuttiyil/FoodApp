import { motion } from "framer-motion";

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

export default ContactInfo;
