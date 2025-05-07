import { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import addressIllustration from "../../assets/img/location.jpg";

const AddAddressPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    street: "",
    city: "",
    state: "",
    zip: "",
    country: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const hasEmptyField = Object.values(formData).some(
      (val) => val.trim() === ""
    );
    if (hasEmptyField) {
      toast.error("Please fill in all fields.");
      return;
    }

    toast.success("Address added successfully!");
    navigate(-1);
  };

  return (
    <div className="flex flex-col lg:flex-row max-w-6xl mx-auto mt-24 bg-white rounded-lg overflow-hidden">
      {/* Left: Form */}
      <div className="w-full lg:w-1/2 p-10">
        <h2 className="text-2xl font-bold mb-6 text-gray-800">
          Add New Address
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              type="text"
              name="firstName"
              placeholder="First Name"
              value={formData.firstName}
              onChange={handleChange}
              className="border px-4 py-2 rounded w-full"
            />
            <input
              type="text"
              name="lastName"
              placeholder="Last Name"
              value={formData.lastName}
              onChange={handleChange}
              className="border px-4 py-2 rounded w-full"
            />
          </div>

          <input
            type="tel"
            name="phone"
            placeholder="Phone Number"
            value={formData.phone}
            onChange={handleChange}
            className="border px-4 py-2 rounded w-full"
          />

          <input
            type="text"
            name="street"
            placeholder="Street Address"
            value={formData.street}
            onChange={handleChange}
            className="border px-4 py-2 rounded w-full"
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              type="text"
              name="city"
              placeholder="City"
              value={formData.city}
              onChange={handleChange}
              className="border px-4 py-2 rounded w-full"
            />
            <input
              type="text"
              name="state"
              placeholder="State"
              value={formData.state}
              onChange={handleChange}
              className="border px-4 py-2 rounded w-full"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              type="text"
              name="zip"
              placeholder="ZIP / Postal Code"
              value={formData.zip}
              onChange={handleChange}
              className="border px-4 py-2 rounded w-full"
            />
            <input
              type="text"
              name="country"
              placeholder="Country"
              value={formData.country}
              onChange={handleChange}
              className="border px-4 py-2 rounded w-full"
            />
          </div>

          <div className="flex justify-end gap-4 pt-4">
            <button
              type="submit"
              className="px-6 py-2 bg-orange-500 text-white rounded hover:bg-orange-600"
            >
              Save Address
            </button>
            <button
              type="button"
              onClick={() => navigate(-1)}
              className="px-4 py-2 border rounded text-gray-600 hover:bg-gray-100"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>

      {/* Right: Illustration */}
      <div className="hidden lg:block lg:w-1/2">
        <img
          src={addressIllustration}
          alt="Address Illustration"
          className="w-full h-full object-contain"
        />
      </div>
    </div>
  );
};

export default AddAddressPage;
