import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface CardPaymentFormProps {
  onSubmit: () => void;
  amount: number;
}

const CardPaymentForm: React.FC<CardPaymentFormProps> = ({
  onSubmit,
  amount,
}) => {
  const [cardNumber, setCardNumber] = useState("");
  const [cardName, setCardName] = useState("");
  const [expiryMonth, setExpiryMonth] = useState("");
  const [expiryYear, setExpiryYear] = useState("");
  const [cvv, setCvv] = useState("");
  const [saveCard, setSaveCard] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, this would validate and process the payment
    onSubmit();
  };

  // Format card number with spaces
  const formatCardNumber = (value: string) => {
    const v = value.replace(/\s+/g, "").replace(/[^0-9]/gi, "");
    const matches = v.match(/\d{4,16}/g);
    const match = (matches && matches[0]) || "";
    const parts = [];

    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4));
    }

    if (parts.length) {
      return parts.join(" ");
    } else {
      return value;
    }
  };

  const handleCardNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formattedValue = formatCardNumber(e.target.value);
    setCardNumber(formattedValue);
  };

  // Generate month options
  const months = Array.from({ length: 12 }, (_, i) => {
    const month = i + 1;
    return month < 10 ? `0${month}` : `${month}`;
  });

  // Generate year options (current year + 20 years)
  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 21 }, (_, i) =>
    `${currentYear + i}`.slice(-2),
  );

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="cardNumber">Card Number</Label>
        <Input
          id="cardNumber"
          value={cardNumber}
          onChange={handleCardNumberChange}
          placeholder="1234 5678 9012 3456"
          maxLength={19}
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="cardName">Name on Card</Label>
        <Input
          id="cardName"
          value={cardName}
          onChange={(e) => setCardName(e.target.value)}
          placeholder="John Doe"
          required
        />
      </div>

      <div className="grid grid-cols-3 gap-4">
        <div className="space-y-2">
          <Label htmlFor="expiryMonth">Month</Label>
          <Select value={expiryMonth} onValueChange={setExpiryMonth}>
            <SelectTrigger id="expiryMonth">
              <SelectValue placeholder="MM" />
            </SelectTrigger>
            <SelectContent>
              {months.map((month) => (
                <SelectItem key={month} value={month}>
                  {month}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="expiryYear">Year</Label>
          <Select value={expiryYear} onValueChange={setExpiryYear}>
            <SelectTrigger id="expiryYear">
              <SelectValue placeholder="YY" />
            </SelectTrigger>
            <SelectContent>
              {years.map((year) => (
                <SelectItem key={year} value={year}>
                  {year}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="cvv">CVV</Label>
          <Input
            id="cvv"
            value={cvv}
            onChange={(e) => setCvv(e.target.value.replace(/\D/g, ""))}
            placeholder="123"
            maxLength={3}
            required
            type="password"
          />
        </div>
      </div>

      <div className="flex items-center space-x-2 pt-2">
        <input
          type="checkbox"
          id="saveCard"
          checked={saveCard}
          onChange={(e) => setSaveCard(e.target.checked)}
          className="rounded border-gray-300"
        />
        <Label htmlFor="saveCard" className="text-sm text-gray-600">
          Save this card securely for future payments (as per RBI guidelines)
        </Label>
      </div>

      <div className="pt-4">
        <Button
          type="submit"
          className="w-full bg-amber-600 hover:bg-amber-700 text-white py-6 text-lg"
        >
          Pay ₹{amount.toFixed(2)}
        </Button>
      </div>

      <div className="text-xs text-gray-500 text-center pt-2">
        Your card details are secured with industry-standard encryption
      </div>
    </form>
  );
};

export default CardPaymentForm;
