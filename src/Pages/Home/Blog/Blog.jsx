import { FaCalendar } from "react-icons/fa";
import { FaCircleUser } from "react-icons/fa6";
import { Link } from "react-router-dom";
import blogData from "../../Blogs/BlogData";

const Blog = () => {
  return (
    <div className="w-full lg:px-11 md:px-10 sm:px-2 px-4 pb-6 space-y-6">
      {/* Top Section */}
      <div className="w-full flex items-center justify-between">
        <h5 className="text-2xl text-neutral-800 font-semibold">
          Explore Our Blog
        </h5>
        <Link
          to={"/blogs"}
          className="text-sm text-neutral-500 font-medium hover:text-orange-500 ease-in-out duration-300"
        >
          View All
        </Link>
      </div>
      {/*  */}
      <div className="grid md:grid-cols-3 grid-cols-1 gap-10">
        {blogData.map((blog) => (
          <Link key={blog.id} to={"/"} className="w-full space-y-3">
            <img
              src={blog.image}
              alt="blog image"
              className="w-full aspect-video object-center object-cover rounded-xl"
            />
            <div className="px-2 space-y-1.5">
              <div className="flex items-center gap-x-5">
                <div className="flex items-center gap-x-1.5 text-sm text-neutral-500/70">
                  <FaCircleUser />
                  <span className="text-neutral-500">{blog.author}</span>
                </div>
                <div className="flex items-center gap-x-1.5 text-sm text-neutral-500/70">
                  <FaCalendar />
                  <span className="text-neutral-500">{blog.publishdate}</span>
                </div>
              </div>
              <h5 className="text-xl-text-neutral-700 font-semibold line-clamp-2">
                {blog.title}
              </h5>
              <p className="text-sm text-neutral-500 line-clamp-2">
                {blog.desc}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Blog;
