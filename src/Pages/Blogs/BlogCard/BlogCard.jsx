import React from "react";
import { Link } from "react-router-dom";

const BlogCard = ({ blog }) => {
  return (
    <div className="bg-white rounded-xl shadow-sm hover:shadow-md transition duration-200 overflow-hidden">
      <img
        src={blog.image}
        alt={blog.title}
        className="w-full h-48 object-cover"
      />
      <div className="p-4">
        <div className="text-xs text-gray-400 mb-1">
          {new Date(blog.date).toDateString()}
        </div>
        <h3 className="text-lg font-semibold text-gray-800 mb-2 font-playfair hover:underline cursor-pointer">
          {blog.title}
        </h3>
        <p className="text-sm text-gray-600 mb-4">{blog.description}</p>
        <Link
          to={`/blogs/${blog.id}`}
          className="text-sm text-red-500 hover:underline"
        >
          Read more →
        </Link>
      </div>
    </div>
  );
};

export default BlogCard;
