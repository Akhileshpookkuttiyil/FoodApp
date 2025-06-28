import { Link } from "react-router-dom";
import { motion } from "framer-motion";

//eslint
const BlogCard = ({ blog }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.3 }}
      className="relative bg-white rounded-2xl shadow-md hover:shadow-xl transition-shadow duration-300 overflow-hidden group"
    >
      {/* Make entire card clickable */}
      <Link
        to={`/blogs/${blog.id}`}
        aria-label={`Read more about ${blog.title}`}
        className="absolute inset-0 z-10"
      ></Link>

      <img
        src={blog.image}
        alt={blog.title}
        className="w-full h-48 object-cover group-hover:brightness-95 transition duration-300"
        loading="lazy"
      />

      <div className="p-5 flex flex-col gap-2 relative z-20">
        <div className="text-xs text-gray-400 flex justify-between items-center">
          <span>{new Date(blog.publishdate).toDateString()}</span>
          {blog.author && (
            <span className="text-[11px] text-gray-500 italic">
              by {blog.author}
            </span>
          )}
        </div>

        <h3 className="text-lg font-semibold text-gray-800 font-playfair leading-snug group-hover:text-orange-500 transition-colors duration-200">
          {blog.title}
        </h3>

        <p className="text-sm text-gray-600 line-clamp-3">{blog.description}</p>

        {/* Optional Tags */}
        {blog.tags && blog.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-2">
            {blog.tags.map((tag, idx) => (
              <span
                key={idx}
                className="text-xs text-orange-500 bg-orange-100 px-2 py-0.5 rounded-full"
              >
                #{tag}
              </span>
            ))}
          </div>
        )}

        <span className="mt-2 text-sm font-medium text-orange-500 underline hidden group-hover:inline">
          Read more →
        </span>
      </div>
    </motion.div>
  );
};

export default BlogCard;
