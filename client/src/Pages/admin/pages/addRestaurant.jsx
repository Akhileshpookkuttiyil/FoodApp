import { useState } from "react";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import {
  ArrowLeft,
  Upload,
  X,
  MapPin,
  Phone,
  User,
  Star,
  Tag,
  ChevronRight,
  ChevronDown,
  Check,
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
    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors 
      focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 
      ${checked ? "bg-primary" : "bg-input"} ${className}`}
    onClick={() => onCheckedChange?.(!checked)}
  >
    <span
      className={`inline-block h-4 w-4 transform rounded-full bg-background shadow-lg transition-transform 
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

CardHeader.propTypes = {
  children: PropTypes.node.isRequired,
};

export const CardContent = ({ children }) => (
  <div className="p-6">{children}</div>
);

CardContent.propTypes = {
  children: PropTypes.node.isRequired,
};

// === Toast ===
export const useToast = () => {
  const toast = ({ title, description, variant = "default" }) => {
    const icon = variant === "destructive" ? "❌" : "✅";
    alert(`${icon} ${title}\n${description}`);
  };
  return { toast };
};

const AddRestaurant = () => {
  const navigate = useNavigate();
  const { toast } = useToast();

  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    image: "",
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
  const [showOwnerDropdown, setShowOwnerDropdown] = useState(false);
  const [ownerSearch, setOwnerSearch] = useState("");

  const categories = [
    { id: "italian", name: "Italian", icon: "🍝" },
    { id: "chinese", name: "Chinese", icon: "🥢" },
    { id: "indian", name: "Indian", icon: "🍛" },
    { id: "mexican", name: "Mexican", icon: "🌮" },
    { id: "american", name: "American", icon: "🍔" },
    { id: "japanese", name: "Japanese", icon: "🍣" },
    { id: "thai", name: "Thai", icon: "🍜" },
    { id: "mediterranean", name: "Mediterranean", icon: "🥗" },
  ];

  const owners = [
    { id: "1", name: "John Doe", email: "john@example.com" },
    { id: "2", name: "Jane Smith", email: "jane@example.com" },
    { id: "3", name: "Mike Johnson", email: "mike@example.com" },
    { id: "4", name: "Sarah Wilson", email: "sarah@example.com" },
    { id: "5", name: "David Brown", email: "david@example.com" },
  ];

  const updateField = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: null }));
    }
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
    if (!image.trim()) newErrors.image = "Restaurant image is required";
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

  const handleKeyDown = (e) => {
    if (e.key === "Escape") {
      setShowCategoryDropdown(false);
      setShowOwnerDropdown(false);
    }
  };

  const filteredOwners = owners.filter(
    (owner) =>
      owner.name.toLowerCase().includes(ownerSearch.toLowerCase()) ||
      owner.email.toLowerCase().includes(ownerSearch.toLowerCase())
  );
  const selectedOwner = owners.find((owner) => owner.id === formData.owner);

  const handleSubmit = async (saveAndAddAnother = false) => {
    if (!validateForm()) {
      toast({
        title: "Validation Error",
        description: "Please fix the errors below",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500));

      toast({
        title: "Success!",
        description: `Restaurant "${formData.name}" has been added successfully.`,
      });

      if (saveAndAddAnother) {
        setFormData({
          name: "",
          description: "",
          image: "",
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
        setErrors({});
      } else {
        navigate("/restaurants");
      }
    } catch (error) {
      console.error("Add restaurant failed:", error);
      toast({
        title: "Error",
        description: "Failed to add restaurant. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen" onKeyDown={handleKeyDown}>
      <div className="max-w-4xl mx-5">
        {/* === Breadcrumb & Page Header === */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <nav
              className="flex items-center text-sm text-muted-foreground mb-2"
              aria-label="Breadcrumb"
            >
              <button
                onClick={() => navigate("/")}
                className="hover:text-foreground transition-colors"
              >
                Dashboard
              </button>
              <ChevronRight className="h-4 w-4 mx-2" />
              <button
                onClick={() => navigate("/restaurants")}
                className="hover:text-foreground transition-colors"
              >
                Restaurants
              </button>
              <ChevronRight className="h-4 w-4 mx-2" />
              <span className="text-foreground font-medium">Add New</span>
            </nav>
            <h1 className="text-3xl font-bold text-foreground">
              Add New Restaurant
            </h1>
          </div>
          <Button variant="outline" onClick={() => navigate("/restaurants")}>
            <ArrowLeft className="h-4 w-4" />
            Back to Restaurants
          </Button>
        </div>

        {/* === Form Start === */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSubmit(false);
          }}
          className="space-y-8"
        >
          {/* === Basic Info Card === */}
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
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Name */}
                <div className="md:col-span-2">
                  <Label htmlFor="name">
                    Restaurant Name <span className="text-destructive">*</span>
                  </Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => updateField("name", e.target.value)}
                    placeholder="Enter restaurant name"
                    className={errors.name ? "border-destructive" : ""}
                  />
                  {errors.name && (
                    <p className="text-destructive text-sm mt-1">
                      {errors.name}
                    </p>
                  )}
                </div>

                {/* Description */}
                <div className="md:col-span-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    value={formData.description}
                    onChange={(e) => updateField("description", e.target.value)}
                    placeholder="Brief description..."
                  />
                </div>

                {/* Image */}
                <div className="md:col-span-2">
                  <Label htmlFor="image">
                    Restaurant Image <span className="text-destructive">*</span>
                  </Label>
                  <div className="flex items-center gap-4">
                    <Input
                      id="image"
                      value={formData.image}
                      onChange={(e) => updateField("image", e.target.value)}
                      placeholder="Image URL"
                      className={errors.image ? "border-destructive" : ""}
                    />
                    <Button type="button" variant="outline">
                      <Upload className="h-4 w-4" /> Upload
                    </Button>
                  </div>
                  {formData.image && (
                    <div className="mt-4 relative w-32 h-32 border-2 border-border rounded-lg overflow-hidden">
                      <img
                        src={formData.image}
                        alt="Preview"
                        className="w-full h-full object-cover"
                      />
                      <button
                        type="button"
                        onClick={() => updateField("image", "")}
                        className="absolute top-1 right-1 p-1 bg-destructive text-destructive-foreground rounded-full"
                      >
                        <X className="h-3 w-3" />
                      </button>
                    </div>
                  )}
                  {errors.image && (
                    <p className="text-destructive text-sm mt-1">
                      {errors.image}
                    </p>
                  )}
                </div>

                {/* Categories */}
                <div className="md:col-span-2">
                  <Label>
                    Categories <span className="text-destructive">*</span>
                  </Label>
                  <div className="relative">
                    <div
                      className={`min-h-[40px] w-full rounded-md border px-3 py-2 cursor-pointer 
                        ${
                          errors.categories
                            ? "border-destructive"
                            : "border-input"
                        }`}
                      onClick={() =>
                        setShowCategoryDropdown(!showCategoryDropdown)
                      }
                    >
                      <div className="flex flex-wrap gap-2">
                        {formData.categories.map((id) => {
                          const c = categories.find((cat) => cat.id === id);
                          return (
                            <span
                              key={id}
                              className="inline-flex items-center gap-1 px-2 py-1 bg-primary/10 text-primary rounded-md text-xs"
                            >
                              <span role="img" aria-label={c.name}>
                                {c.icon}
                              </span>
                              <span>{c.name}</span>
                              <button
                                type="button"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  removeCategory(id);
                                }}
                              >
                                <X className="h-3 w-3" />
                              </button>
                            </span>
                          );
                        })}
                        {formData.categories.length === 0 && (
                          <span className="text-muted-foreground">
                            Select categories...
                          </span>
                        )}
                      </div>
                      <ChevronDown className="absolute right-3 top-3 h-4 w-4 text-muted-foreground" />
                    </div>

                    {showCategoryDropdown && (
                      <div className="absolute z-50 w-full mt-1 bg-white border rounded-md shadow-lg max-h-60 overflow-auto">
                        {categories.map((cat) => (
                          <div
                            key={cat.id}
                            className="flex items-center gap-3 px-3 py-2 hover:bg-accent cursor-pointer"
                            onClick={() => toggleCategory(cat.id)}
                          >
                            <span role="img">{cat.icon}</span>
                            <span>{cat.name}</span>
                            {formData.categories.includes(cat.id) && (
                              <Check className="h-4 w-4 text-primary ml-auto" />
                            )}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                  {errors.categories && (
                    <p className="text-destructive text-sm mt-1">
                      {errors.categories}
                    </p>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
          {/* === Location Card === */}
          <Card>
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="p-2 bg-primary/10 rounded-lg">
                  <MapPin className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h2 className="text-lg font-semibold">Location Details</h2>
                  <p className="text-sm text-muted-foreground">
                    Restaurant address
                  </p>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="md:col-span-2">
                  <Label htmlFor="address">
                    Address <span className="text-destructive">*</span>
                  </Label>
                  <Input
                    id="address"
                    value={formData.address}
                    onChange={(e) => updateField("address", e.target.value)}
                    placeholder="Street address"
                    className={errors.address ? "border-destructive" : ""}
                  />
                  {errors.address && (
                    <p className="text-destructive text-sm mt-1">
                      {errors.address}
                    </p>
                  )}
                </div>
                <div>
                  <Label htmlFor="city">
                    City <span className="text-destructive">*</span>
                  </Label>
                  <Input
                    id="city"
                    value={formData.city}
                    onChange={(e) => updateField("city", e.target.value)}
                    className={errors.city ? "border-destructive" : ""}
                  />
                  {errors.city && (
                    <p className="text-destructive text-sm mt-1">
                      {errors.city}
                    </p>
                  )}
                </div>
                <div>
                  <Label htmlFor="state">
                    State <span className="text-destructive">*</span>
                  </Label>
                  <Input
                    id="state"
                    value={formData.state}
                    onChange={(e) => updateField("state", e.target.value)}
                    className={errors.state ? "border-destructive" : ""}
                  />
                  {errors.state && (
                    <p className="text-destructive text-sm mt-1">
                      {errors.state}
                    </p>
                  )}
                </div>
                <div>
                  <Label htmlFor="pincode">
                    Pincode <span className="text-destructive">*</span>
                  </Label>
                  <Input
                    id="pincode"
                    maxLength={6}
                    value={formData.pincode}
                    onChange={(e) => updateField("pincode", e.target.value)}
                    className={errors.pincode ? "border-destructive" : ""}
                  />
                  {errors.pincode && (
                    <p className="text-destructive text-sm mt-1">
                      {errors.pincode}
                    </p>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* === Contact & Owner Card === */}
          <Card>
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="p-2 bg-primary/10 rounded-lg">
                  <Phone className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h2 className="text-lg font-semibold">Contact & Owner</h2>
                  <p className="text-sm text-muted-foreground">
                    Communication and ownership
                  </p>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="contactNumber">
                    Contact Number <span className="text-destructive">*</span>
                  </Label>
                  <Input
                    id="contactNumber"
                    maxLength={10}
                    value={formData.contactNumber}
                    onChange={(e) =>
                      updateField("contactNumber", e.target.value)
                    }
                    className={errors.contactNumber ? "border-destructive" : ""}
                  />
                  {errors.contactNumber && (
                    <p className="text-destructive text-sm mt-1">
                      {errors.contactNumber}
                    </p>
                  )}
                </div>
                <div>
                  <Label>
                    Owner <span className="text-destructive">*</span>
                  </Label>
                  <div className="relative">
                    <div
                      className={`min-h-[40px] w-full rounded-md border px-3 py-2 cursor-pointer flex items-center justify-between 
                        ${
                          errors.owner ? "border-destructive" : "border-input"
                        }`}
                      onClick={() => setShowOwnerDropdown(!showOwnerDropdown)}
                    >
                      <span
                        className={
                          selectedOwner
                            ? "text-foreground"
                            : "text-muted-foreground"
                        }
                      >
                        {selectedOwner
                          ? `${selectedOwner.name} (${selectedOwner.email})`
                          : "Select an owner..."}
                      </span>
                      <ChevronDown className="h-4 w-4 text-muted-foreground" />
                    </div>
                    {showOwnerDropdown && (
                      <div className="absolute z-50 w-full mt-1 bg-white border rounded-md shadow-lg">
                        <div className="p-2 border-b">
                          <Input
                            placeholder="Search owners..."
                            value={ownerSearch}
                            onChange={(e) => setOwnerSearch(e.target.value)}
                            className="h-8"
                          />
                        </div>
                        <div className="max-h-40 overflow-auto">
                          {filteredOwners.map((owner) => (
                            <div
                              key={owner.id}
                              className="flex items-center gap-3 px-3 py-2 hover:bg-accent cursor-pointer"
                              onClick={() => {
                                updateField("owner", owner.id);
                                setShowOwnerDropdown(false);
                                setOwnerSearch("");
                              }}
                            >
                              <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                                <User className="h-4 w-4 text-primary" />
                              </div>
                              <div className="flex-1">
                                <div className="font-medium text-sm">
                                  {owner.name}
                                </div>
                                <div className="text-xs text-muted-foreground">
                                  {owner.email}
                                </div>
                              </div>
                              {formData.owner === owner.id && (
                                <Check className="h-4 w-4 text-primary" />
                              )}
                            </div>
                          ))}
                          {filteredOwners.length === 0 && (
                            <div className="px-3 py-2 text-sm text-muted-foreground">
                              No owners found
                            </div>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                  {errors.owner && (
                    <p className="text-destructive text-sm mt-1">
                      {errors.owner}
                    </p>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* === Additional Settings Card === */}
          <Card>
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="p-2 bg-primary/10 rounded-lg">
                  <Star className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h2 className="text-lg font-semibold">Additional Settings</h2>
                  <p className="text-sm text-muted-foreground">
                    Optional configuration
                  </p>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <Label htmlFor="initialRating">Initial Rating (0–5)</Label>
                  <Input
                    id="initialRating"
                    type="number"
                    min="0"
                    max="5"
                    step="0.1"
                    value={formData.initialRating}
                    onChange={(e) =>
                      updateField(
                        "initialRating",
                        parseFloat(e.target.value) || 0
                      )
                    }
                  />
                </div>
                <div>
                  <Label htmlFor="totalReviews">Total Reviews</Label>
                  <Input
                    id="totalReviews"
                    type="number"
                    min="0"
                    value={formData.totalReviews}
                    onChange={(e) =>
                      updateField("totalReviews", parseInt(e.target.value) || 0)
                    }
                  />
                </div>
                <div className="flex items-center space-x-3 pt-6">
                  <Switch
                    id="isActive"
                    checked={formData.isActive}
                    onCheckedChange={(checked) =>
                      updateField("isActive", checked)
                    }
                  />
                  <Label htmlFor="isActive">Restaurant Active</Label>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* === Action Buttons === */}
          <Card>
            <CardContent>
              <div className="flex flex-col sm:flex-row gap-4 justify-end">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => navigate("/restaurants")}
                  disabled={isLoading}
                >
                  Cancel
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => handleSubmit(true)}
                  disabled={isLoading}
                >
                  {isLoading ? "Saving..." : "Save & Add Another"}
                </Button>
                <Button type="submit" disabled={isLoading}>
                  {isLoading ? "Saving..." : "Save Restaurant"}
                </Button>
              </div>
            </CardContent>
          </Card>
        </form>
      </div>

      {/* === Backdrop for dropdowns === */}
      {(showCategoryDropdown || showOwnerDropdown) && (
        <div
          className="fixed inset-0 z-40 bg-black/20"
          onClick={() => {
            setShowCategoryDropdown(false);
            setShowOwnerDropdown(false);
          }}
        />
      )}
    </div>
  );
};

export default AddRestaurant;
