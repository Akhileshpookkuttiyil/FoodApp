import { FaCalendar } from "react-icons/fa";
import { FaCircleUser } from "react-icons/fa6";
import { Link } from "react-router-dom";

const Blog = () => {
  //blog dummy data
  const blogData = [
    {
        id: 1,
        image: "https://images.unsplash.com/photo-1504754524776-8f4f37790ca0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400",
        title: "10 Quick and Easy Breakfast Recipes",
        publishdate: "2024-12-01",
        Author: "John Doe",
        desc: "Start your day with these delicious and time-saving breakfast recipes that everyone will love."
    },
    {
        id: 2,
        image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400",
        title: "Top 5 Vegan Dishes to Try This Winter",
        publishdate: "2024-11-28",
        Author: "Jane Smith",
        desc: "Warm up this winter with these flavorful and healthy vegan dishes perfect for the season."
    },
    {
        id: 3,
        image: "https://images.unsplash.com/photo-1589302168068-964664d93dc0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400",
        title: "The Secret to Perfect Pasta",
        publishdate: "2024-11-20",
        Author: "Chef Alex",
        desc: "Discover the tips and tricks professional chefs use to make the perfect pasta at home."
    },
    {
        id: 4,
        image: "https://images.unsplash.com/photo-1600891964599-f61ba0e24092?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400",
        title: "5 Desserts You Can Make in Under 15 Minutes",
        publishdate: "2024-12-05",
        Author: "Emily Turner",
        desc: "Satisfy your sweet tooth with these quick and easy dessert recipes that require minimal effort."
    },
    {
        id: 5,
        image: "https://images.unsplash.com/photo-1627308595229-7830a5c91f9f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400",
        title: "How to Create the Ultimate Cheese Board",
        publishdate: "2024-11-30",
        Author: "Sophia Lee",
        desc: "Impress your guests with a stunning cheese board using these simple tips and tricks."
    },
    {
        id: 6,
        image: "https://images.unsplash.com/photo-1543353071-873f17a7a088?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400",
        title: "The Best Street Foods Around the World",
        publishdate: "2024-12-08",
        Author: "Michael Carter",
        desc: "Take your taste buds on a global journey with these iconic and flavorful street foods."
    }
];

  return (
    <div className="w-full lg:px-11 md:px-10 sm:px-2 px-4 pb-6 space-y-6">
      {/* Top Section */}
      <div className="w-full flex items-center justify-between">
        <h5 className="text-2xl text-neutral-800 font-semibold">
          Explore Our Blog
        </h5>
        <Link
          to={"/menu"}
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
                  <span className="text-neutral-500">{blog.Author}</span>
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
