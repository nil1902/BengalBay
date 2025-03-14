import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface CodPaymentFormProps {
  onSubmit: () => void;
  amount: number;
}

const CodPaymentForm: React.FC<CodPaymentFormProps> = ({
  onSubmit,
  amount,
}) => {
  const [captcha, setCaptcha] = useState("");
  const [captchaImage] = useState("898"); // In a real app, this would be generated

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, this would validate the captcha
    if (captcha === captchaImage) {
      onSubmit();
    } else {
      alert("Invalid captcha. Please try again.");
    }
  };

  const handlingFee = 10;
  const totalAmount = amount + handlingFee;

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="bg-amber-50 p-4 rounded-md border border-amber-200">
        <p className="text-amber-800">
          Due to handling costs, a nominal fee of ₹{handlingFee} will be charged
        </p>
      </div>

      <div className="flex items-center gap-4">
        <div className="bg-green-100 p-2 rounded-md text-2xl font-bold text-green-800">
          {captchaImage}
        </div>
        <Input
          value={captcha}
          onChange={(e) => setCaptcha(e.target.value)}
          placeholder="Enter the characters"
          required
          className="flex-1"
        />
      </div>

      <div className="pt-4">
        <Button
          type="submit"
          className="w-full bg-amber-600 hover:bg-amber-700 text-white py-6 text-lg"
        >
          Confirm Order
        </Button>
      </div>

      <div className="text-xs text-gray-500 text-center pt-2">
        Pay ₹{totalAmount.toFixed(2)} by cash when your order is delivered
      </div>
    </form>
  );
};

export default CodPaymentForm;
