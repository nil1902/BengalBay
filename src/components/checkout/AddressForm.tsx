import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { MapPin } from "lucide-react";

interface AddressFormProps {
  onSave: (address: AddressData) => void;
  onCancel: () => void;
  initialAddress?: AddressData;
}

export interface AddressData {
  name: string;
  phone: string;
  alternatePhone?: string;
  pincode: string;
  locality: string;
  address: string;
  city: string;
  state: string;
  landmark?: string;
  addressType: "home" | "work";
}

const COUNTRY_CODES = [
  { code: "+91", country: "India" },
  { code: "+1", country: "USA" },
  { code: "+44", country: "UK" },
  { code: "+61", country: "Australia" },
  { code: "+86", country: "China" },
  { code: "+81", country: "Japan" },
  { code: "+49", country: "Germany" },
  { code: "+33", country: "France" },
  { code: "+7", country: "Russia" },
  { code: "+971", country: "UAE" },
];

const INDIAN_STATES = [
  "Andhra Pradesh",
  "Arunachal Pradesh",
  "Assam",
  "Bihar",
  "Chhattisgarh",
  "Goa",
  "Gujarat",
  "Haryana",
  "Himachal Pradesh",
  "Jharkhand",
  "Karnataka",
  "Kerala",
  "Madhya Pradesh",
  "Maharashtra",
  "Manipur",
  "Meghalaya",
  "Mizoram",
  "Nagaland",
  "Odisha",
  "Punjab",
  "Rajasthan",
  "Sikkim",
  "Tamil Nadu",
  "Telangana",
  "Tripura",
  "Uttar Pradesh",
  "Uttarakhand",
  "West Bengal",
];

const AddressForm: React.FC<AddressFormProps> = ({
  onSave,
  onCancel,
  initialAddress,
}) => {
  const [countryCode, setCountryCode] = useState<string>("+91");
  const [formData, setFormData] = useState<AddressData>(
    initialAddress || {
      name: "",
      phone: "",
      alternatePhone: "",
      pincode: "",
      locality: "",
      address: "",
      city: "",
      state: "Maharashtra",
      landmark: "",
      addressType: "home",
    },
  );

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  const handleUseCurrentLocation = () => {
    // In a real app, this would use the Geolocation API
    // For demo purposes, we'll just set some mock data
    setFormData({
      ...formData,
      locality: "Current Location Area",
      address: "123 Current Street",
      city: "Mumbai",
      state: "Maharashtra",
      pincode: "400001",
    });
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-semibold mb-4">Edit Address</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Name */}
          <div className="space-y-2">
            <Label htmlFor="name">Name</Label>
            <Input
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Full Name"
              required
            />
          </div>

          {/* Phone Number with Country Code */}
          <div className="space-y-2">
            <Label htmlFor="phone">Phone Number</Label>
            <div className="flex">
              <Select value={countryCode} onValueChange={setCountryCode}>
                <SelectTrigger className="w-24">
                  <SelectValue placeholder="+91" />
                </SelectTrigger>
                <SelectContent>
                  {COUNTRY_CODES.map((country) => (
                    <SelectItem key={country.code} value={country.code}>
                      {country.code} {country.country}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Input
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="flex-1 ml-2"
                placeholder="10-digit mobile number"
                required
                pattern="[0-9]{10}"
                maxLength={10}
              />
            </div>
          </div>

          {/* Alternate Phone */}
          <div className="space-y-2">
            <Label htmlFor="alternatePhone">Alternate Phone (Optional)</Label>
            <div className="flex">
              <Select value={countryCode} onValueChange={setCountryCode}>
                <SelectTrigger className="w-24">
                  <SelectValue placeholder="+91" />
                </SelectTrigger>
                <SelectContent>
                  {COUNTRY_CODES.map((country) => (
                    <SelectItem key={country.code} value={country.code}>
                      {country.code} {country.country}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Input
                id="alternatePhone"
                name="alternatePhone"
                value={formData.alternatePhone}
                onChange={handleChange}
                className="flex-1 ml-2"
                placeholder="Alternate phone number"
                pattern="[0-9]{10}"
                maxLength={10}
              />
            </div>
          </div>

          {/* Pincode */}
          <div className="space-y-2">
            <Label htmlFor="pincode">Pincode</Label>
            <Input
              id="pincode"
              name="pincode"
              value={formData.pincode}
              onChange={handleChange}
              placeholder="6-digit pincode"
              required
              pattern="[0-9]{6}"
              maxLength={6}
            />
          </div>

          {/* Locality */}
          <div className="space-y-2 md:col-span-2">
            <Label htmlFor="locality">Locality/Area/Street</Label>
            <Input
              id="locality"
              name="locality"
              value={formData.locality}
              onChange={handleChange}
              placeholder="Locality, Area, Street"
              required
            />
          </div>

          {/* Address */}
          <div className="space-y-2 md:col-span-2">
            <Label htmlFor="address">Address (Area and Street)</Label>
            <Input
              id="address"
              name="address"
              value={formData.address}
              onChange={handleChange}
              placeholder="House No., Building Name, Street Name"
              required
            />
          </div>

          {/* City */}
          <div className="space-y-2">
            <Label htmlFor="city">City/District/Town</Label>
            <Input
              id="city"
              name="city"
              value={formData.city}
              onChange={handleChange}
              placeholder="City"
              required
            />
          </div>

          {/* State */}
          <div className="space-y-2">
            <Label htmlFor="state">State</Label>
            <Select
              value={formData.state}
              onValueChange={(value) =>
                setFormData((prev) => ({ ...prev, state: value }))
              }
            >
              <SelectTrigger id="state">
                <SelectValue placeholder="Select state" />
              </SelectTrigger>
              <SelectContent>
                {INDIAN_STATES.map((state) => (
                  <SelectItem key={state} value={state}>
                    {state}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Landmark */}
          <div className="space-y-2 md:col-span-2">
            <Label htmlFor="landmark">Landmark (Optional)</Label>
            <Input
              id="landmark"
              name="landmark"
              value={formData.landmark}
              onChange={handleChange}
              placeholder="Nearby landmark for easier navigation"
            />
          </div>
        </div>

        {/* Address Type */}
        <div className="space-y-2">
          <Label>Address Type</Label>
          <RadioGroup
            value={formData.addressType}
            onValueChange={(value: "home" | "work") =>
              setFormData((prev) => ({ ...prev, addressType: value }))
            }
            className="flex space-x-4"
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="home" id="home" />
              <Label htmlFor="home">Home (All day delivery)</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="work" id="work" />
              <Label htmlFor="work">Work (Delivery between 10 AM - 5 PM)</Label>
            </div>
          </RadioGroup>
        </div>

        {/* Use Current Location Button */}
        <Button
          type="button"
          variant="outline"
          className="w-full"
          onClick={handleUseCurrentLocation}
        >
          <MapPin className="mr-2 h-4 w-4" />
          Use my current location
        </Button>

        <div className="flex justify-end space-x-4 pt-4">
          <Button type="button" variant="outline" onClick={onCancel}>
            Cancel
          </Button>
          <Button
            type="submit"
            className="bg-amber-600 hover:bg-amber-700 text-white"
          >
            Save and Deliver Here
          </Button>
        </div>
      </form>
    </div>
  );
};

export default AddressForm;
