import { FaFacebook, FaInstagram, FaYoutube } from "react-icons/fa";
import { FaMapPin, FaTwitter } from "react-icons/fa6";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <>
      <footer className="w-full bg-neutral-700 lg:px-28 md:px-16 sm:px-7 px-4 py-12 mt-[3ch]">
        <div className="grid md:grid-cols-6 sm:grid-cols-4 grid-cols-1 gap-14">
          <div className="col-span-2 space-y-7">
            <div className="space-y-3">
              <Link to={"/"} className="text-4xl text-neutral-800 font-bold">
                <span className="text-orange-400">F</span>oodie
                <span className="text-orange-400">M</span>ania
              </Link>
              <p className="text-base text-neutral-400 font-normal line-clamb-3">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Magni
                architecto culpa, quas eveniet illo veniam, velit minima a
                expedita perspiciatis unde nemo cupiditate voluptatibus ullam.
              </p>
            </div>
            <div className="flex items-center gap-x-3">
              <Link
                to={"/"}
                className="w-11 h-11 rounded-lg bg-neutral-100/20 flex items-center justify-center text-xl text-neutral-200 group ease-in-out duration-300"
              >
                <FaInstagram className="w-6 h-8 group-hover:text-orange-400 ease-in-out"></FaInstagram>
              </Link>
              <Link
                to={"/"}
                className="w-11 h-11 rounded-lg bg-neutral-100/20 flex items-center justify-center text-xl text-neutral-200 group ease-in-out duration-300"
              >
                <FaFacebook className="w-6 h-8 group-hover:text-orange-400 ease-in-out"></FaFacebook>
              </Link>
              <Link
                to={"/"}
                className="w-11 h-11 rounded-lg bg-neutral-100/20 flex items-center justify-center text-xl text-neutral-200 group ease-in-out duration-300"
              >
                <FaYoutube className="w-6 h-8 group-hover:text-orange-400 ease-in-out"></FaYoutube>
              </Link>
              <Link
                to={"/"}
                className="w-11 h-11 rounded-lg bg-neutral-100/20 flex items-center justify-center text-xl text-neutral-200 group ease-in-out duration-300"
              >
                <FaTwitter className="w-6 h-8 group-hover:text-orange-400 ease-in-out"></FaTwitter>
              </Link>
            </div>
          </div>

          <div className="col-span-1 space-y-5">
            <h2 className="text-xl text-neutral-100 font-medium">
              Quick Links
            </h2>
            <div className="space-y-3 flex flex-col">
              <Link
                to={"/"}
                className="text-base text-neutral-400 hover:text-orange-400 font-normal ease-in-out duration-300"
              >
                About Us
              </Link>
              <Link
                to={"/"}
                className="text-base text-neutral-400 hover:text-orange-400 font-normal ease-in-out duration-300"
              >
                Popular Menus
              </Link>
              <Link
                to={"/"}
                className="text-base text-neutral-400 hover:text-orange-400 font-normal ease-in-out duration-300"
              >
                Our Gallery
              </Link>
              <Link
                to={"/"}
                className="text-base text-neutral-400 hover:text-orange-400 font-normal ease-in-out duration-300"
              >
                Contact Us
              </Link>
            </div>
          </div>

          <div className="col-span-1 space-y-5">
            <h2 className="text-xl text-neutral-100 font-medium whitespace-nowrap">
              Top Food Menus
            </h2>
            <div className="space-y-3 flex flex-col">
              <Link
                to={"/"}
                className="text-base text-neutral-400 hover:text-orange-400 font-normal ease-in-out duration-300"
              >
                Crispy Chicken
              </Link>
              <Link
                to={"/"}
                className="text-base text-neutral-400 hover:text-orange-400 font-normal ease-in-out duration-300"
              >
                Fresh Burger
              </Link>
              <Link
                to={"/"}
                className="text-base text-neutral-400 hover:text-orange-400 font-normal ease-in-out duration-300"
              >
                Breakfast Platter
              </Link>
              <Link
                to={"/"}
                className="text-base text-neutral-400 hover:text-orange-400 font-normal ease-in-out duration-300"
              >
                LocalFood Items
              </Link>
            </div>
          </div>
          <div className="col-span-2 space-y-7">
            <h2 className="text-xl text-neutral-100 font-medium">
              Get In Touch
            </h2>
            <div className="space-y-5">
              <div className="space y-1">
                <h6 className="text-lg text-neutral-300 font-medium">
                  Our Address
                </h6>
                <div className="flex items-center gap-x-2">
                  <div className="w-8 h-8 rounded-lg bg-orange-600/40 text-neutral-300 flex items-center justify-center">
                    <FaMapPin />
                  </div>
                  <p className="text-base text-neutral-400 font-normal flex-1">
                    1234 Elmwood Drive, Suite 567,Springtown Newville,United
                    States
                  </p>
                </div>
              </div>
              <div className="space y-1">
                <h6 className="text-lg text-neutral-300 font-medium">
                  Our PhoneNumber
                </h6>
                <div className="flex items-center gap-x-2">
                  <div className="w-8 h-8 rounded-lg bg-orange-600/40 text-neutral-300 flex items-center justify-center">
                    <FaMapPin />
                  </div>
                  <p className="text-base text-neutral-400 font-normal flex-1">
                    +1 (555) 123-4567
                  </p>
                </div>
              </div>
              <div className="space y-1">
                <h6 className="text-lg text-neutral-300 font-medium">
                  Our Email
                </h6>
                <div className="flex items-center gap-x-2">
                  <div className="w-8 h-8 rounded-lg bg-orange-600/40 text-neutral-300 flex items-center justify-center">
                    <FaMapPin />
                  </div>
                  <p className="text-base text-neutral-400 font-normal flex-1">
                    contact@foodiemania.com
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
