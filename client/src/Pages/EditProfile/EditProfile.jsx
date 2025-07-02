import { useState, useRef, useEffect } from "react";
import toast from "react-hot-toast";
import { useAppContext } from "../../Context/AppContext";

const EditProfile = () => {
  const { axios, setUser, user } = useAppContext();

  const initialProfileImage =
    "https://lh3.googleusercontent.com/aida-public/AB6AXuCQ7QZvbNpLc3owUDhYLpPXR2ijXhab_fU5hIYQ0pHKaBYsW2hGBNOaaIF_ds0xd9uqPvMg9aUqESwiENJDGASykdocFzNryABCOZAzpmdaS7b8PP7f_VmlKS7Er-n8WdL8ispV_g27ZYn_3Pvfz9AaDN-hfJiJIVwxjkEqM64Salh4sXCgh6nLMESvnUUb0ss7-WDRaXCKqaqufeBjzByDP-5AFb5vVQYHbWFBmbiJtnTaBNJmPZkkjvYXC5zUoeor3BTzo8SXzQ";

  const [formData, setFormData] = useState({
    firstName: user?.firstName || "",
    lastName: user?.lastName || "",
    email: user?.email || "",
    phoneNumber: user?.phoneNumber || "",
  });

  const [profileImage, setProfileImage] = useState(
    user?.profileImage || initialProfileImage
  );

  const fileInputRef = useRef(null);

  // Sync form data with user when user data changes
  useEffect(() => {
    if (user) {
      setFormData({
        firstName: user.firstName || "",
        lastName: user.lastName || "",
        email: user.email || "",
        phoneNumber: user.phoneNumber || "",
      });
      setProfileImage(user.profileImage || initialProfileImage);
    }
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const updatedUser = {
        ...formData,
        profileImage,
      };

      const { data } = await axios.put("/api/user/update", updatedUser);

      if (data.success) {
        setUser(data.user);
        toast.success("Profile updated successfully!");
      } else {
        toast.error(data.message || "Failed to update profile.");
      }
    } catch (error) {
      const message =
        error.response?.data?.message || "Failed to update profile.";
      toast.error(message);
      console.error("Update error:", error);
    }
  };

  const handleImageClick = () => {
    fileInputRef.current.click();
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setProfileImage(url);
    }
  };

  const handleReset = () => {
    setFormData({
      firstName: user?.firstName || "",
      lastName: user?.lastName || "",
      email: user?.email || "",
      phoneNumber: user?.phoneNumber || "",
    });
    setProfileImage(user?.profileImage || initialProfileImage);
    if (fileInputRef.current) {
      fileInputRef.current.value = null;
    }
  };

  return (
    <div
      className="min-h-screen bg-slate-50 py-28 px-4 sm:px-6 lg:px-16"
      style={{ fontFamily: 'Inter, "Noto Sans", sans-serif' }}
    >
      {/* Header */}
      <div className="flex items-center mb-10">
        <button className="text-[#0d141c] mr-4">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            fill="currentColor"
            viewBox="0 0 256 256"
          >
            <path d="M224,128a8,8,0,0,1-8,8H59.31l58.35,58.34a8,8,0,0,1-11.32,11.32l-72-72a8,8,0,0,1,0-11.32l72-72a8,8,0,0,1,11.32,11.32L59.31,120H216A8,8,0,0,1,224,128Z" />
          </svg>
        </button>
        <h2 className="text-xl text-[#0d141c]">Back</h2>
      </div>

      {/* Profile Image */}
      <div className="flex flex-col items-center gap-4 mb-12">
        <div
          onClick={handleImageClick}
          className="rounded-full bg-cover bg-center w-32 h-32 sm:w-36 sm:h-36 cursor-pointer ring-2 ring-[#49709c]/30 hover:ring-orange-400 transition"
          style={{ backgroundImage: `url(${profileImage})` }}
        />
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={handleImageChange}
        />
        <div className="text-center">
          <p className="text-xl sm:text-2xl font-bold text-[#0d141c]">
            {user?.firstName} {user?.lastName}
          </p>
          <p className="text-sm text-[#49709c]">
            @{user?.username || "username"}
          </p>
        </div>
      </div>

      {/* Form */}
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-6 w-full max-w-md sm:max-w-lg md:max-w-xl lg:max-w-2xl xl:max-w-3xl 2xl:max-w-4xl mx-auto"
      >
        {[
          { label: "First Name", name: "firstName" },
          { label: "Last Name", name: "lastName" },
          { label: "Email", name: "email", type: "email" },
          { label: "Phone Number", name: "phoneNumber", type: "tel" },
        ].map(({ label, name, type = "text" }) => (
          <div key={name} className="w-full">
            <label className="block text-sm font-medium text-[#0d141c] mb-2">
              {label}
            </label>
            <input
              type={type}
              name={name}
              value={formData[name]}
              onChange={handleChange}
              placeholder={`Enter ${label}`}
              className="w-full h-12 rounded-lg bg-[#e7edf4] text-[#0d141c] placeholder-[#49709c] px-4 focus:outline-none focus:ring-2 focus:ring-orange-400 transition"
            />
          </div>
        ))}

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 mt-10">
          <button
            type="submit"
            className="bg-orange-500 text-white h-12 px-6 rounded-lg font-bold hover:bg-orange-600 transition"
          >
            Save Changes
          </button>
          <button
            type="button"
            onClick={handleReset}
            className="bg-gray-300 text-gray-800 h-12 px-6 rounded-lg font-bold hover:bg-gray-400 transition"
          >
            Reset
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditProfile;
