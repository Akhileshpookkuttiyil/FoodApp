import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppContext } from "../../Context/AppContext";
import toast from "react-hot-toast";
import addressIllustration from "../../assets/img/location.jpg";

const initialFormState = {
  fullName: "",
  mobile: "",
  houseNumber: "",
  street: "",
  landmark: "",
  city: "",
  state: "",
  pincode: "",
  addressType: "Home",
  isDefault: false,
};

const AddAddressPage = () => {
  const navigate = useNavigate();
  const { axios } = useAppContext();
  const [formData, setFormData] = useState(initialFormState);
  const [loading, setLoading] = useState(false);

  // Validate mobile (10 digits)
  const isValidMobile = (mobile) => /^\d{10}$/.test(mobile);

  // Validate pincode (6 digits)
  const isValidPincode = (pincode) => /^\d{6}$/.test(pincode);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Basic empty validation
    for (const key of [
      "fullName",
      "mobile",
      "houseNumber",
      "street",
      "city",
      "state",
      "pincode",
    ]) {
      if (!formData[key].trim()) {
        toast.error(`Please fill in the ${key} field.`);
        return;
      }
    }

    if (!isValidMobile(formData.mobile)) {
      toast.error("Please enter a valid 10-digit mobile number.");
      return;
    }

    if (!isValidPincode(formData.pincode)) {
      toast.error("Please enter a valid 6-digit pincode.");
      return;
    }

    setLoading(true);
    try {
      const { data } = await axios.post("/api/address/add", formData);
      if (data.success) {
        toast.success("Address added successfully!");
        navigate("/cart");
      } else {
        toast.error(data.message || "Something went wrong.");
      }
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Failed to add address. Try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col lg:flex-row max-w-6xl mt-20 mx-auto bg-white rounded-lg overflow-hidden  mb-20">
      {/* Left: Form */}
      <div className="w-full lg:w-1/2 p-10">
        <h2 className="text-2xl font-bold mb-6 text-gray-800">
          Add New Address
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Full Name */}
          <input
            type="text"
            name="fullName"
            placeholder="Full Name"
            value={formData.fullName}
            onChange={handleChange}
            className="border px-4 py-2 rounded w-full"
            maxLength={100}
          />

          {/* Mobile */}
          <input
            type="tel"
            name="mobile"
            placeholder="Mobile Number (10 digits)"
            value={formData.mobile}
            onChange={handleChange}
            className="border px-4 py-2 rounded w-full"
            maxLength={10}
            pattern="\d{10}"
          />

          {/* House Number */}
          <input
            type="text"
            name="houseNumber"
            placeholder="House Number / Flat / Building"
            value={formData.houseNumber}
            onChange={handleChange}
            className="border px-4 py-2 rounded w-full"
          />

          {/* Street */}
          <input
            type="text"
            name="street"
            placeholder="Street / Area"
            value={formData.street}
            onChange={handleChange}
            className="border px-4 py-2 rounded w-full"
          />

          {/* Landmark (optional) */}
          <input
            type="text"
            name="landmark"
            placeholder="Landmark (optional)"
            value={formData.landmark}
            onChange={handleChange}
            className="border px-4 py-2 rounded w-full"
          />

          {/* City & State */}
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

          {/* Pincode */}
          <input
            type="text"
            name="pincode"
            placeholder="Pincode (6 digits)"
            value={formData.pincode}
            onChange={handleChange}
            className="border px-4 py-2 rounded w-full"
            maxLength={6}
            pattern="\d{6}"
          />

          {/* Address Type */}
          <select
            name="addressType"
            value={formData.addressType}
            onChange={handleChange}
            className="border px-4 py-2 rounded w-full text-gray-400"
          >
            <option value="Home">Home</option>
            <option value="Work">Work</option>
            <option value="Other">Other</option>
          </select>

          {/* Default Address Checkbox */}
          <label className="inline-flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              name="isDefault"
              checked={formData.isDefault}
              onChange={handleChange}
              className="form-checkbox h-5 w-4 "
            />
            <span className="text-gray-400">Set as default address</span>
          </label>

          {/* Buttons */}
          <div className="flex justify-end gap-4 pt-4">
            <button
              type="submit"
              disabled={loading}
              className={`px-6 py-2 text-white rounded ${
                loading
                  ? "bg-orange-300 cursor-not-allowed"
                  : "bg-orange-500 hover:bg-orange-600"
              }`}
            >
              {loading ? "Saving..." : "Save Address"}
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
