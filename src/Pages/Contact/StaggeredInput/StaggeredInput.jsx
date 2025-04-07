import { motion } from "framer-motion";

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

export default StaggeredInput;
