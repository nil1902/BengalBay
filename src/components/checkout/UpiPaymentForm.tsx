import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

interface UpiPaymentFormProps {
  onSubmit: () => void;
  amount: number;
}

const UPI_APPS = [
  {
    id: "phonepe",
    name: "PhonePe",
    logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/71/PhonePe_Logo.svg/1200px-PhonePe_Logo.svg.png",
  },
  {
    id: "gpay",
    name: "Google Pay",
    logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f2/Google_Pay_Logo.svg/512px-Google_Pay_Logo.svg.png",
  },
  {
    id: "paytm",
    name: "Paytm",
    logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/24/Paytm_Logo_%28standalone%29.svg/2560px-Paytm_Logo_%28standalone%29.svg.png",
  },
  {
    id: "amazonpay",
    name: "Amazon Pay",
    logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/99/Amazon_Pay_logo.svg/1200px-Amazon_Pay_logo.svg.png",
  },
  {
    id: "bhim",
    name: "BHIM",
    logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/ec/BHIM_logo.svg/1200px-BHIM_logo.svg.png",
  },
  {
    id: "upi_id",
    name: "Your UPI ID",
    logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e1/UPI-Logo-vector.svg/1200px-UPI-Logo-vector.svg.png",
  },
];

const UpiPaymentForm: React.FC<UpiPaymentFormProps> = ({
  onSubmit,
  amount,
}) => {
  const [selectedApp, setSelectedApp] = useState<string>("phonepe");
  const [upiId, setUpiId] = useState<string>("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, this would initiate the UPI payment
    onSubmit();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <p className="text-sm mb-4">Choose an option</p>

      <RadioGroup
        value={selectedApp}
        onValueChange={setSelectedApp}
        className="space-y-4"
      >
        {UPI_APPS.map((app) => (
          <div key={app.id} className="flex items-center gap-3">
            <RadioGroupItem value={app.id} id={app.id} />
            <Label
              htmlFor={app.id}
              className="flex items-center gap-2 cursor-pointer"
            >
              <img
                src={app.logo}
                alt={app.name}
                className="h-6 w-6 object-contain"
              />
              <span>{app.name}</span>
            </Label>
          </div>
        ))}
      </RadioGroup>

      {selectedApp === "upi_id" && (
        <div className="pl-8 pt-2">
          <Label htmlFor="upi_id_input" className="text-sm mb-1 block">
            Enter UPI ID
          </Label>
          <Input
            id="upi_id_input"
            placeholder="username@upi"
            value={upiId}
            onChange={(e) => setUpiId(e.target.value)}
            className="max-w-xs"
            required={selectedApp === "upi_id"}
          />
          <p className="text-xs text-gray-500 mt-1">Pay by any UPI app</p>
        </div>
      )}

      <div className="pt-4">
        <Button
          type="submit"
          className="w-full bg-amber-600 hover:bg-amber-700 text-white py-6 text-lg"
          disabled={selectedApp === "upi_id" && !upiId}
        >
          Pay ₹{amount.toFixed(2)}
        </Button>
      </div>
    </form>
  );
};

export default UpiPaymentForm;
