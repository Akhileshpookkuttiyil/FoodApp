import React from "react";
import { useParams, useNavigate } from "react-router-dom";

const BlogDetail = () => {
  const { id } = useParams();
  const blog = blogData.find((item) => item.id === parseInt(id));
  const navigate = useNavigate();

  if (!blog) {
    return (
      <div className="text-center mt-20">
        <h2 className="text-xl font-semibold">Blog not found</h2>
        <button
          onClick={() => navigate(-1)}
          className="mt-4 text-red-500 underline text-sm"
        >
          Go back
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto py-10 px-4">
      <button
        onClick={() => navigate(-1)}
        className="mb-6 text-sm text-gray-500 hover:underline"
      >
        ← Back to Blogs
      </button>
      <img
        src={blog.image}
        alt={blog.title}
        className="w-full h-60 object-cover rounded-xl mb-6"
      />
      <div className="text-xs text-gray-400 mb-1">
        {new Date(blog.date).toDateString()}
      </div>
      <h1 className="text-2xl font-bold text-gray-800 mb-4">{blog.title}</h1>
      <p className="text-gray-700 mb-6">{blog.description}</p>

      <div className="text-sm text-gray-500 flex gap-6 border-t pt-4">
        <span>By @{blog.username}</span>
        <span>{blog.location}</span>
        <span>❤️ {blog.likes} likes</span>
        <span>💬 {blog.comments} comments</span>
      </div>
    </div>
  );
};

export default BlogDetail;
