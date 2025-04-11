import React from "react";
import blogData from "./BlogData";
import BlogCard from "./BlogCard/BlogCard";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const Blogs = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full px-4 sm:px-6 lg:px-10 pt-20 sm:pt-24 md:pt-28 pb-24 sm:pb-28"
    >
      {/* Header Section */}
      <div className="flex flex-col md:flex-row justify-between items-center mb-12 sm:mb-16 gap-6">
        <div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold text-gray-800 font-playfair tracking-wide text-center md:text-left">
            Recent Blogs
          </h2>
          <p className="text-gray-500 text-sm text-center md:text-left max-w-xl mt-5">
            Discover inspiring stories, food insights, and tips from our
            passionate community.
          </p>
        </div>

        <Link
          to="/add-blog"
          className="bg-orange-500 text-white px-5 py-2.5 rounded-full text-sm font-medium shadow hover:bg-white hover:text-orange-500 hover:border hover:border-orange-500 transition duration-300"
        >
          + Add Your Blog
        </Link>
      </div>

      {/* Blog Grid */}
      <div className="grid gap-10 sm:grid-cols-2 md:grid-cols-3 lg:gap-12 auto-rows-fr">
        {blogData.map((blog) => (
          <motion.div
            key={blog.id}
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            viewport={{ once: true }}
          >
            <BlogCard blog={blog} />
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default Blogs;
