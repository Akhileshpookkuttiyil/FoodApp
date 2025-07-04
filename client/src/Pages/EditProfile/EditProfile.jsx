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
  const [loading, setLoading] = useState(false);
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
    setLoading(true);

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
    } finally {
      setLoading(false);
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
    <div className="min-h-screen bg-slate-50 px-4 lg:px-16 py-28 font-sans text-[#0d141c]">
      {/* Back Button */}
      <div className="mb-10">
        <button
          className="flex items-center gap-2 px-3 py-2 rounded-md text-sm text-[#0d141c] hover:bg-gray-100 transition focus:outline-none focus:ring-2 focus:ring-orange-400"
          aria-label="Go back"
        >
          <svg
            width="16"
            height="16"
            fill="currentColor"
            viewBox="0 0 256 256"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M224,128a8,8,0,0,1-8,8H59.3l58.3,58.3a8,8,0,0,1-11.3,11.3l-72-72a8,8,0,0,1,0-11.3l72-72a8,8,0,0,1,11.3,11.3L59.3,120H216A8,8,0,0,1,224,128Z" />
          </svg>
          <span>Back</span>
        </button>
      </div>

      {/* Profile Picture & Name */}
      <div className="flex flex-col items-center gap-4 mb-12">
        <div
          onClick={handleImageClick}
          className="rounded-full w-36 h-36 cursor-pointer ring-2 ring-orange-400/30 hover:ring-orange-500 transition bg-cover bg-center shadow-md"
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
          <p className="text-2xl font-semibold">
            {user?.firstName} {user?.lastName}
          </p>
          <p className="text-sm text-orange-500 font-mono">
            @{user?.username || "username"}
          </p>
        </div>
      </div>

      {/* Form */}
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-2xl mx-auto bg-white shadow-md rounded-xl p-8 border border-gray-200 flex flex-col gap-6"
      >
        {[
          { label: "First Name", name: "firstName" },
          { label: "Last Name", name: "lastName" },
          { label: "Email", name: "email", type: "email" },
          { label: "Phone Number", name: "phoneNumber", type: "tel" },
        ].map(({ label, name, type = "text" }) => (
          <div key={name}>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {label}
            </label>
            <input
              type={type}
              name={name}
              value={formData[name]}
              onChange={handleChange}
              placeholder={`Enter ${label}`}
              className="w-full h-12 px-4 rounded-lg bg-gray-100 text-[#0d141c] placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-orange-400 transition"
            />
          </div>
        ))}

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 mt-8">
          <button
            type="submit"
            disabled={loading}
            className={`h-12 px-6 rounded-lg font-bold transition text-white ${
              loading
                ? "bg-orange-400 cursor-not-allowed"
                : "bg-orange-500 hover:bg-orange-600"
            }`}
          >
            {loading ? "Saving..." : "Save Changes"}
          </button>
          <button
            type="button"
            onClick={handleReset}
            disabled={loading}
            className="bg-gray-300 hover:bg-gray-400 text-gray-800 h-12 px-6 rounded-lg font-bold transition"
          >
            Reset
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditProfile;
