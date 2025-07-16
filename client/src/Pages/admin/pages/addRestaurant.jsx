import { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import axios from "axios";
import {
  ArrowLeft,
  X,
  MapPin,
  Phone,
  Star,
  Tag,
  ChevronDown,
  Check,
  Search,
} from "lucide-react";

// === Reusable UI Components ===
export const Button = ({
  children,
  variant = "default",
  size = "default",
  className = "",
  disabled = false,
  ...props
}) => {
  const variants = {
    default: "bg-primary text-primary-foreground hover:bg-primary/90",
    outline:
      "border border-input bg-white hover:bg-accent hover:text-accent-foreground",
    ghost: "hover:bg-accent hover:text-accent-foreground",
  };

  const sizes = {
    default: "px-4 py-2 h-10",
    sm: "px-3 py-1 h-8 text-sm",
  };

  return (
    <button
      type="button"
      className={`inline-flex items-center justify-center gap-2 rounded-md font-medium transition-colors 
        focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none 
        disabled:opacity-50 ${variants[variant]} ${sizes[size]} ${className}`}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
};

Button.propTypes = {
  children: PropTypes.node.isRequired,
  variant: PropTypes.oneOf(["default", "outline", "ghost"]),
  size: PropTypes.oneOf(["default", "sm"]),
  className: PropTypes.string,
  disabled: PropTypes.bool,
};

export const Input = ({ className = "", ...props }) => (
  <input
    className={`w-full px-3 py-2 border border-input rounded-md bg-background text-foreground 
      focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 ${className}`}
    {...props}
  />
);

Input.propTypes = {
  className: PropTypes.string,
};

export const Label = ({ children, className = "", htmlFor, ...props }) => (
  <label
    htmlFor={htmlFor}
    className={`block text-sm font-medium text-foreground mb-1 ${className}`}
    {...props}
  >
    {children}
  </label>
);

Label.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  htmlFor: PropTypes.string,
};

export const Textarea = ({ className = "", ...props }) => (
  <textarea
    className={`w-full px-3 py-2 border border-input rounded-md bg-background text-foreground 
      focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 ${className}`}
    rows={3}
    {...props}
  />
);

Textarea.propTypes = {
  className: PropTypes.string,
};

export const Switch = ({ checked, onCheckedChange, className = "", id }) => (
  <button
    type="button"
    role="switch"
    aria-checked={checked}
    id={id}
    className={`relative inline-flex h-6 w-11 items-center bg-gray-300 rounded-full transition-colors 
      focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 
      ${checked ? "bg-blue-500" : "bg-input"} ${className}`}
    onClick={() => onCheckedChange?.(!checked)}
  >
    <span
      className={`inline-block h-4 w-4 transform rounded-full bg-white shadow-lg transition-transform 
        ${checked ? "translate-x-6" : "translate-x-1"}`}
    />
  </button>
);

Switch.propTypes = {
  checked: PropTypes.bool.isRequired,
  onCheckedChange: PropTypes.func.isRequired,
  className: PropTypes.string,
  id: PropTypes.string,
};

export const Card = ({ children, className = "" }) => (
  <div
    className={`bg-card text-card-foreground rounded-lg border border-border shadow-sm ${className}`}
  >
    {children}
  </div>
);

Card.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
};

export const CardHeader = ({ children }) => (
  <div className="p-6 border-b border-border">{children}</div>
);
CardHeader.propTypes = { children: PropTypes.node.isRequired };

export const CardContent = ({ children }) => (
  <div className="p-6">{children}</div>
);
CardContent.propTypes = { children: PropTypes.node.isRequired };

// === Toast (temporary alert-based)
export const useToast = () => {
  const toast = ({ title, description, variant = "default" }) => {
    const icon = variant === "destructive" ? "❌" : "✅";
    alert(`${icon} ${title}\n${description}`);
  };
  return { toast };
};
const AddRestaurant = () => {
  // const navigate = useNavigate();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    image: null,
    categories: [],
    address: "",
    city: "",
    state: "",
    pincode: "",
    contactNumber: "",
    owner: "",
    initialRating: 0,
    totalReviews: 0,
    isActive: true,
  });

  const [errors, setErrors] = useState({});
  const [showCategoryDropdown, setShowCategoryDropdown] = useState(false);
  const [owners, setOwners] = useState([]);
  const [category, setCategory] = useState([]);
  const [ownerSearch, setOwnerSearch] = useState("");
  const [showOwnerDropdown, setShowOwnerDropdown] = useState(false);
  const [selectedOwnerName, setSelectedOwnerName] = useState("");

  useEffect(() => {
    const getCategories = async () => {
      try {
        const res = await axios.get("/api/category/categories/getcategories");
        if (res.data.success) {
          const transformed = res.data.categories.map((cat) => ({
            id: cat.name.toLowerCase().replace(/\s+/g, "-"),
            name: cat.name,
            image: cat.image,
          }));
          setCategory(transformed);
        } else {
          toast({
            title: "Error",
            description: res.data.message || "Failed to load categories",
            variant: "destructive",
          });
        }
      } catch (error) {
        toast({
          title: "Network Error",
          description: error.message || "Something went wrong",
          variant: "destructive",
        });
      }
    };

    getCategories();
  }, []);

  useEffect(() => {
    const fetchOwners = async () => {
      try {
        const res = await axios.get("/api/admin/sellers/getAllSellers");
        if (res.data.success) {
          setOwners(res.data.sellers);
        }
      } catch (error) {
        console.log(error.message);

        toast({
          title: "Error",
          description: "Failed to fetch owners",
          variant: "destructive",
        });
      }
    };

    fetchOwners();
  }, []);

  const updateField = (key, value) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
  };

  const validateForm = () => {
    const newErrors = {};
    const {
      name,
      image,
      categories,
      address,
      city,
      state,
      pincode,
      contactNumber,
      owner,
    } = formData;

    if (!name.trim()) newErrors.name = "Restaurant name is required";
    if (!image) newErrors.image = "Restaurant image is required";
    if (categories.length === 0)
      newErrors.categories = "Select at least one category";
    if (!address.trim()) newErrors.address = "Address is required";
    if (!city.trim()) newErrors.city = "City is required";
    if (!state.trim()) newErrors.state = "State is required";
    if (!/^\d{6}$/.test(pincode))
      newErrors.pincode = "Pincode must be 6 digits";
    if (!/^\d{10}$/.test(contactNumber))
      newErrors.contactNumber = "Contact number must be 10 digits";
    if (!owner) newErrors.owner = "Please select an owner";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // const handleKeyDown = (e) => {
  //   if (e.key === "Escape") {
  //     setShowCategoryDropdown(false);
  //     setShowOwnerDropdown(false);
  //     setOwnerSearch("");
  //   }
  // };

  const toggleCategory = (id) => {
    const selected = formData.categories.includes(id)
      ? formData.categories.filter((c) => c !== id)
      : [...formData.categories, id];
    updateField("categories", selected);
  };

  const removeCategory = (id) => {
    updateField(
      "categories",
      formData.categories.filter((c) => c !== id)
    );
  };

  const handleOwnerSearchChange = (e) => {
    const value = e.target.value;
    setOwnerSearch(value);
    // If user is typing, show dropdown and clear selection
    if (value && !showOwnerDropdown) setShowOwnerDropdown(true);
    // If search field is cleared, clear the selection
    if (!value) {
      updateField("owner", "");
      setSelectedOwnerName("");
    }
  };

  const handleOwnerSelect = (owner) => {
    updateField("owner", owner.id.toString());
    setSelectedOwnerName(owner.name);
    setShowOwnerDropdown(false);
    setOwnerSearch("");
    if (errors.owner) {
      setErrors((prev) => ({ ...prev, owner: "" }));
    }
  };

  const filteredOwners = owners.filter((owner) =>
    `${owner.name} ${owner.email}`
      .toLowerCase()
      .includes(ownerSearch.toLowerCase())
  );
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      updateField("image", file);
      if (errors.image) {
        setErrors((prev) => ({ ...prev, image: "" }));
      }
    }
  };

  const resetForm = () => {
    setFormData({
      name: "",
      description: "",
      image: null,
      categories: [],
      address: "",
      city: "",
      state: "",
      pincode: "",
      contactNumber: "",
      owner: "",
      isActive: true,
    });
    setErrors({});
    setSelectedOwnerName("");
    setOwnerSearch("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      setIsLoading(true);
      const data = new FormData();
      for (const key in formData) {
        if (key === "categories") {
          formData.categories.forEach((cat) => data.append("categories", cat));
        } else {
          data.append(key, formData[key]);
        }
      }

      const res = await axios.post("/api/admin/restaurants/add", data, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      if (res.data.success) {
        toast({
          title: "Success",
          description: "Restaurant added successfully",
        });
        resetForm();
      } else {
        toast({
          title: "Error",
          description: res.data.message || "Failed to add restaurant",
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: error.message || "Something went wrong",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };
  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.target?.closest(".dropdown-container")) {
        setShowCategoryDropdown(false);
        setShowOwnerDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="p-3 max-w-4xl mx-5">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-2xl font-semibold">Add Restaurant</h1>
        <Button
          variant="ghost"
          onClick={() => {
            // implement back navigation with useNavigate if needed
          }}
        >
          <ArrowLeft className="w-5 h-5 mr-2" />
          Back
        </Button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* === Basic Info === */}
        <Card>
          <CardHeader>
            <div className="flex items-center gap-3">
              <div className="p-2 bg-primary/10 rounded-lg">
                <Tag className="h-5 w-5 text-primary" />
              </div>
              <div>
                <h2 className="text-lg font-semibold">Basic Information</h2>
                <p className="text-sm text-muted-foreground">
                  Essential details about the restaurant
                </p>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="mb-2">
              <Label htmlFor="name">Restaurant Name</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => updateField("name", e.target.value)}
                placeholder="Enter restaurant name"
              />
              {errors.name && (
                <p className="text-sm text-red-500 mt-1">{errors.name}</p>
              )}
            </div>
            <div className="mb-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                value={formData.description}
                placeholder="Brief description ..."
                onChange={(e) => updateField("description", e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="image">Restaurant Image</Label>
              <Input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
              />
              {errors.image && (
                <p className="text-sm text-red-500 mt-1">{errors.image}</p>
              )}
              {formData.image && typeof formData.image !== "string" && (
                <div className="mt-4 relative w-32 h-32 border-2 border-border rounded-lg overflow-hidden">
                  <img
                    src={URL.createObjectURL(formData.image)}
                    alt="preview"
                    className="w-32 h-32 rounded-md object-cover mt-2 border"
                  />
                  <button
                    type="button"
                    onClick={() => updateField("image", null)}
                    className="absolute top-1 right-1 p-1 bg-destructive text-destructive-foreground rounded-full hover:bg-destructive/90"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
        {/* === Category Selection === */}
        <Card>
          <CardHeader>
            <div className="flex items-center gap-3">
              <Tag className="h-5 w-5 text-primary" />
              <div>
                <h2 className="text-lg font-semibold">Categories</h2>
                <p className="text-sm text-muted-foreground">
                  Choose one or more categories that apply to the restaurant.
                </p>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            {/* Categories */}
            <div className="md:col-span-2 dropdown-container">
              <Label htmlFor="categories">
                Categories <span className="text-destructive">*</span>
              </Label>

              <div className="relative">
                {/* Dropdown Trigger */}
                <div
                  className={`min-h-[40px] w-full rounded-md border px-3 py-2 cursor-pointer bg-white flex flex-wrap items-center gap-2 ${
                    errors.categories ? "border-destructive" : "border-input"
                  }`}
                  onClick={() => setShowCategoryDropdown(!showCategoryDropdown)}
                >
                  {/* Selected Categories */}
                  {formData.categories.length > 0 ? (
                    formData.categories.map((id) => {
                      const c = category.find((cat) => cat.id === id);
                      return (
                        <span
                          key={id}
                          className="inline-flex items-center gap-1 px-2 py-1 bg-primary/10 text-primary rounded-md text-xs"
                        >
                          <span className="flex items-center gap-1">
                            <img
                              src={c?.image}
                              alt={c?.name}
                              className="w-6 h-6 rounded-full object-cover"
                            />
                            <span>{c?.name}</span>
                          </span>
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              removeCategory(id);
                            }}
                            className="hover:bg-gray-100 rounded-full p-0.5"
                          >
                            <X className="h-4 w-3" />
                          </button>
                        </span>
                      );
                    })
                  ) : (
                    <span className="text-muted-foreground text-sm">
                      Select categories...
                    </span>
                  )}

                  <ChevronDown className="ml-auto h-4 w-4 text-muted-foreground" />
                </div>

                {/* Dropdown Menu */}
                {showCategoryDropdown && (
                  <div className="absolute z-50 w-full mt-1 bg-white border rounded-md shadow-lg max-h-60 overflow-auto">
                    {category.map((cat) => (
                      <div
                        key={cat.id}
                        className="flex items-center gap-3 px-3 py-2 hover:bg-accent cursor-pointer transition-colors"
                        onClick={() => toggleCategory(cat.id)}
                      >
                        <img
                          src={cat.image}
                          alt={cat.name}
                          className="w-8 h-8 rounded-md object-cover"
                        />
                        <span className="flex-1">{cat.name}</span>
                        {formData.categories.includes(cat.id) && (
                          <Check className="h-4 w-4 text-primary" />
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Validation Error */}
              {errors.categories && (
                <p className="text-destructive text-red-500 text-sm mt-1">
                  {errors.categories}
                </p>
              )}
            </div>
          </CardContent>
        </Card>

        {/* === Address & Location === */}
        <Card>
          <CardHeader>
            <div className="flex items-center gap-3">
              <MapPin className="h-5 w-5 text-primary" />
              <div>
                <h2 className="text-lg font-semibold">Location</h2>
                <p className="text-sm text-muted-foreground">
                  Enter the complete restaurant address.
                </p>
              </div>
            </div>
          </CardHeader>
          <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="address">Street Address</Label>
              <Input
                id="address"
                value={formData.address}
                placeholder="Street address"
                onChange={(e) => updateField("address", e.target.value)}
              />
              {errors.address && (
                <p className="text-sm text-red-500 mt-1">{errors.address}</p>
              )}
            </div>
            <div>
              <Label htmlFor="city">City</Label>
              <Input
                id="city"
                value={formData.city}
                placeholder="City name"
                onChange={(e) => updateField("city", e.target.value)}
              />
              {errors.city && (
                <p className="text-sm text-red-500 mt-1">{errors.city}</p>
              )}
            </div>
            <div>
              <Label htmlFor="state">State</Label>
              <Input
                id="state"
                value={formData.state}
                placeholder="State name"
                onChange={(e) => updateField("state", e.target.value)}
              />
              {errors.state && (
                <p className="text-sm text-red-500 mt-1">{errors.state}</p>
              )}
            </div>
            <div>
              <Label htmlFor="pincode">Pincode</Label>
              <Input
                id="pincode"
                value={formData.pincode}
                placeholder="6-digit pincode"
                onChange={(e) => updateField("pincode", e.target.value)}
              />
              {errors.pincode && (
                <p className="text-sm text-red-500 mt-1">{errors.pincode}</p>
              )}
            </div>
          </CardContent>
        </Card>

        {/* === Contact & Owner === */}
        <Card>
          <CardHeader>
            <div className="flex items-center gap-3">
              <Phone className="h-5 w-5 text-primary" />
              <div>
                <h2 className="text-lg font-semibold">Contact Details</h2>
              </div>
            </div>
          </CardHeader>
          <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="contactNumber">Contact Number</Label>
              <Input
                id="contactNumber"
                value={formData.contactNumber}
                placeholder="10-digit mobile number"
                onChange={(e) => updateField("contactNumber", e.target.value)}
              />
              {errors.contactNumber && (
                <p className="text-sm text-red-500 mt-1">
                  {errors.contactNumber}
                </p>
              )}
            </div>

            <div className="dropdown-container mt-2">
              <Label htmlFor="owner">
                Owner <span className="text-destructive">*</span>
              </Label>

              <div className="relative">
                {/* Input with search and clear */}
                <div className="relative">
                  <Input
                    id="owner"
                    value={selectedOwnerName || ownerSearch}
                    onChange={handleOwnerSearchChange}
                    onClick={() => setShowOwnerDropdown(true)}
                    placeholder="Search and select owner..."
                    className={`pr-10 ${
                      errors.owner ? "border-destructive" : ""
                    }`}
                  />

                  {/* Search icon */}
                  <Search className="absolute right-3 top-3 h-4 w-4 text-muted-foreground" />

                  {/* Clear button */}
                  {selectedOwnerName && (
                    <button
                      type="button"
                      onClick={() => {
                        updateField("owner", "");
                        setSelectedOwnerName("");
                        setOwnerSearch("");
                      }}
                      className="absolute right-8 top-3 h-4 w-4 text-muted-foreground hover:text-foreground"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  )}
                </div>

                {/* Dropdown List */}
                {showOwnerDropdown && (
                  <div className="absolute z-50 mt-1 w-full bg-white border shadow-lg rounded-md max-h-64 overflow-y-auto">
                    {filteredOwners.length > 0 ? (
                      filteredOwners.map((owner) => (
                        <div
                          key={owner.id}
                          onClick={() => handleOwnerSelect(owner)}
                          className="p-3 text-sm hover:bg-accent cursor-pointer flex items-center gap-3 transition-colors"
                        >
                          <img
                            src={owner.imgSrc}
                            alt={owner.name}
                            className="w-8 h-8 rounded-full object-cover border"
                          />
                          <div className="flex flex-col flex-1">
                            <span className="font-medium">{owner.name}</span>
                            <span className="text-xs text-muted-foreground">
                              {owner.email}
                            </span>
                          </div>
                          {String(formData.owner) === String(owner.id) && (
                            <Check className="h-4 w-4 text-primary" />
                          )}
                        </div>
                      ))
                    ) : (
                      <div className="p-3 text-sm text-muted-foreground text-center">
                        {ownerSearch
                          ? "No owners found matching your search."
                          : "No owners available."}
                      </div>
                    )}
                  </div>
                )}
              </div>

              {/* Error message */}
              {errors.owner && (
                <p className="text-destructive text-red-500 text-sm mt-1">
                  {errors.owner}
                </p>
              )}
            </div>
          </CardContent>
        </Card>

        {/* === Additional Settings === */}
        <Card>
          <CardHeader>
            <div className="flex items-center gap-3">
              <Star className="h-5 w-5 text-primary" />
              <div>
                <h2 className="text-lg font-semibold">Additional Settings</h2>
                <p className="text-sm text-muted-foreground">
                  Toggle restaurant visibility
                </p>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <Label htmlFor="isActive">Visible on Platform</Label>
              <Switch
                id="isActive"
                checked={formData.isActive}
                onCheckedChange={(value) => updateField("isActive", value)}
              />
            </div>
          </CardContent>
        </Card>
        {/* === Submit + Reset Buttons === */}
        <div className="flex justify-end gap-3 mt-6">
          <Button
            type="button"
            variant="outline"
            onClick={resetForm}
            disabled={isLoading}
          >
            Reset
          </Button>

          <Button type="submit" disabled={isLoading} variant="outline">
            {isLoading ? "Saving..." : "Add Restaurant"}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default AddRestaurant;
