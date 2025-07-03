import { useState, useRef, useEffect } from "react";
import toast from "react-hot-toast";
import { useAppContext } from "../../Context/AppContext";

const EditProfile = () => {
  const { axios, setUser, user } = useAppContext();

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
  });

  const [previewImage, setPreviewImage] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const fileInputRef = useRef(null);

  const fallbackImage =
    "https://lh3.googleusercontent.com/a-/default-user-profile.png";

  useEffect(() => {
    if (user) {
      setFormData({
        firstName: user.firstName || "",
        lastName: user.lastName || "",
        email: user.email || "",
        phoneNumber: user.phoneNumber || "",
      });

      setPreviewImage(
        user.profileImage?.startsWith("http")
          ? user.profileImage
          : fallbackImage
      );
    }
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageClick = () => fileInputRef.current?.click();

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith("image/")) {
      setSelectedFile(file);
      setPreviewImage(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const form = new FormData();
      Object.entries(formData).forEach(([key, value]) =>
        form.append(key, value)
      );
      if (selectedFile) form.append("profileImage", selectedFile);
      else form.append("profileImage", previewImage);

      const { data } = await axios.put("/api/user/update", form, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      if (data.success) {
        setUser(data.user);
        toast.success("Profile updated successfully!");
      } else {
        toast.error(data.message || "Update failed.");
      }
    } catch (error) {
      const msg = error.response?.data?.message || "Update failed.";
      toast.error(msg);
    }
  };

  const handleReset = () => {
    setFormData({
      firstName: "",
      lastName: "",
      email: "",
      phoneNumber: "",
    });

    setPreviewImage(
      user?.profileImage?.startsWith("http") ? user.profileImage : fallbackImage
    );

    setSelectedFile(null);
    if (fileInputRef.current) fileInputRef.current.value = null;
  };

  return (
    <div className="min-h-screen bg-slate-50 py-28 px-4 lg:px-16 font-sans">
      <div className="flex items-center mb-10">
        <button className="text-[#0d141c] mr-4">
          <svg width="20" height="20" fill="currentColor" viewBox="0 0 256 256">
            <path d="M224,128a8,8,0,0,1-8,8H59.3l58.3,58.3a8,8,0,0,1-11.3,11.3l-72-72a8,8,0,0,1,0-11.3l72-72a8,8,0,0,1,11.3,11.3L59.3,120H216A8,8,0,0,1,224,128Z" />
          </svg>
        </button>
        <h2 className="text-xl text-[#0d141c]">Back</h2>
      </div>

      <div className="flex flex-col items-center gap-4 mb-12">
        <div
          onClick={handleImageClick}
          className="rounded-full bg-cover bg-center w-32 h-32 sm:w-36 sm:h-36 cursor-pointer ring-2 ring-[#49709c]/30 hover:ring-orange-400 transition"
          style={{ backgroundImage: `url(${previewImage})` }}
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

      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-6 w-full max-w-2xl mx-auto"
      >
        {[
          { label: "First Name", name: "firstName" },
          { label: "Last Name", name: "lastName" },
          { label: "Email", name: "email", type: "email" },
          { label: "Phone Number", name: "phoneNumber", type: "tel" },
        ].map(({ label, name, type = "text" }) => (
          <div key={name}>
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
