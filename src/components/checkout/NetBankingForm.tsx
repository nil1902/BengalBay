import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface NetBankingFormProps {
  onSubmit: () => void;
  amount: number;
}

const POPULAR_BANKS = [
  {
    id: "hdfc",
    name: "HDFC Bank",
    logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/28/HDFC_Bank_Logo.svg/1200px-HDFC_Bank_Logo.svg.png",
  },
  {
    id: "icici",
    name: "ICICI Bank",
    logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/89/ICICI_Bank_Logo.svg/1200px-ICICI_Bank_Logo.svg.png",
  },
  {
    id: "sbi",
    name: "State Bank of India",
    logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/cc/State_Bank_of_India_logo.svg/1200px-State_Bank_of_India_logo.svg.png",
  },
  {
    id: "axis",
    name: "Axis Bank",
    logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1a/Axis_Bank_logo.svg/1200px-Axis_Bank_logo.svg.png",
  },
  {
    id: "kotak",
    name: "Kotak Mahindra Bank",
    logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/61/Kotak_Mahindra_Bank_logo.svg/1200px-Kotak_Mahindra_Bank_logo.svg.png",
  },
];

const OTHER_BANKS = [
  "Airtel Payments Bank",
  "AU Small Finance Bank",
  "Bassien Catholic Co-Operative Bank",
  "BNP Paribas",
  "Bank of Bahrain and Kuwait",
  "BOBCARD",
  "Bank of Baroda Corporate",
  "Bank of Baroda Retail",
  "Bank of India",
  "Bank of Maharashtra",
  "Canara Bank",
  "Catholic Syrian Bank",
  "Central Bank",
  "City Union Bank",
  "Corporation Bank",
  "Cosmos Co-op Bank",
  "DCB Bank",
  "Dena Bank",
  "Deutsche Bank",
  "Development Credit Bank",
  "Dhanlaxmi Bank",
  "Federal Bank",
  "IDBI Bank",
  "IDFC FIRST Bank",
  "Indian Bank",
  "Indian Overseas Bank",
  "IndusInd Bank",
  "Jammu and Kashmir Bank",
  "Karnataka Bank",
  "Karur Vysya Bank",
  "Lakshmi Vilas Bank",
  "Oriental Bank of Commerce",
  "Punjab & Maharashtra Co-operative Bank",
  "Punjab National Bank",
  "RBL Bank",
  "Saraswat Bank",
  "South Indian Bank",
  "Standard Chartered Bank",
  "Syndicate Bank",
  "UCO Bank",
  "Union Bank of India",
  "United Bank of India",
  "Vijaya Bank",
  "Yes Bank",
];

const NetBankingForm: React.FC<NetBankingFormProps> = ({
  onSubmit,
  amount,
}) => {
  const [selectedBank, setSelectedBank] = useState<string>("");
  const [otherBank, setOtherBank] = useState<string>("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, this would redirect to the bank's website
    onSubmit();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <h3 className="font-medium mb-4">Popular Banks</h3>
        <RadioGroup
          value={selectedBank}
          onValueChange={setSelectedBank}
          className="grid grid-cols-2 gap-4"
        >
          {POPULAR_BANKS.map((bank) => (
            <div key={bank.id} className="flex items-center gap-3">
              <RadioGroupItem value={bank.id} id={bank.id} />
              <Label
                htmlFor={bank.id}
                className="flex items-center gap-2 cursor-pointer"
              >
                <img
                  src={bank.logo}
                  alt={bank.name}
                  className="h-6 w-6 object-contain"
                />
                <span>{bank.name}</span>
              </Label>
            </div>
          ))}
        </RadioGroup>
      </div>

      <div>
        <h3 className="font-medium mb-4">Other Banks</h3>
        <Select
          value={otherBank}
          onValueChange={(value) => {
            setOtherBank(value);
            setSelectedBank(""); // Clear popular bank selection
          }}
        >
          <SelectTrigger>
            <SelectValue placeholder="---Select Bank---" />
          </SelectTrigger>
          <SelectContent className="max-h-[200px]">
            {OTHER_BANKS.map((bank) => (
              <SelectItem key={bank} value={bank}>
                {bank}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="pt-4">
        <Button
          type="submit"
          className="w-full bg-amber-600 hover:bg-amber-700 text-white py-6 text-lg"
          disabled={!selectedBank && !otherBank}
        >
          Pay ₹{amount.toFixed(2)}
        </Button>
      </div>

      <p className="text-sm text-gray-500 mt-2">
        This instrument has low success, use UPI or cards for better experience
      </p>
    </form>
  );
};

export default NetBankingForm;
