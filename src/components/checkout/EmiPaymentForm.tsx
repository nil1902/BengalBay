import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";

interface EmiPaymentFormProps {
  onSubmit: () => void;
  amount: number;
}

const EMI_OPTIONS = [
  {
    id: "credit_card_emi",
    name: "Credit Card EMI",
    banks: [
      { name: "HDFC Bank", tenures: [3, 6, 9, 12, 18, 24] },
      { name: "ICICI Bank", tenures: [3, 6, 9, 12] },
      { name: "SBI Card", tenures: [3, 6, 9, 12, 18] },
      { name: "Axis Bank", tenures: [3, 6, 9, 12] },
      { name: "Kotak Mahindra Bank", tenures: [3, 6, 9, 12] },
    ],
  },
  {
    id: "no_cost_emi",
    name: "No Cost EMI",
    banks: [
      { name: "HDFC Bank", tenures: [3, 6] },
      { name: "ICICI Bank", tenures: [3, 6] },
      { name: "Axis Bank", tenures: [3, 6] },
    ],
  },
];

const EmiPaymentForm: React.FC<EmiPaymentFormProps> = ({
  onSubmit,
  amount,
}) => {
  const [selectedEmiOption, setSelectedEmiOption] =
    useState<string>("credit_card_emi");
  const [selectedBank, setSelectedBank] = useState<string>("");
  const [selectedTenure, setSelectedTenure] = useState<number | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, this would process the EMI selection
    onSubmit();
  };

  // Calculate EMI amount
  const calculateEmi = (
    principal: number,
    tenure: number,
    interestRate = 15,
  ) => {
    // Monthly interest rate
    const monthlyRate = interestRate / 12 / 100;
    // EMI calculation formula
    const emi =
      (principal * monthlyRate * Math.pow(1 + monthlyRate, tenure)) /
      (Math.pow(1 + monthlyRate, tenure) - 1);
    return emi.toFixed(2);
  };

  // Get selected EMI option details
  const selectedOption = EMI_OPTIONS.find(
    (option) => option.id === selectedEmiOption,
  );
  const selectedBankDetails = selectedOption?.banks.find(
    (bank) => bank.name === selectedBank,
  );

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="flex items-center gap-2 bg-amber-50 p-3 rounded-md border border-amber-200">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="text-amber-600"
        >
          <circle cx="12" cy="12" r="10"></circle>
          <line x1="12" y1="8" x2="12" y2="12"></line>
          <line x1="12" y1="16" x2="12.01" y2="16"></line>
        </svg>
        <p className="text-sm text-amber-800">
          Pay in easy monthly installments from any of the options below.
        </p>
      </div>

      <Accordion type="single" collapsible className="w-full">
        {EMI_OPTIONS.map((option) => (
          <AccordionItem key={option.id} value={option.id}>
            <div className="flex items-start gap-3 py-2">
              <RadioGroupItem
                value={option.id}
                id={option.id}
                checked={selectedEmiOption === option.id}
                onClick={() => setSelectedEmiOption(option.id)}
              />
              <div className="flex-1">
                <AccordionTrigger className="py-0 hover:no-underline">
                  <Label
                    htmlFor={option.id}
                    className="font-medium cursor-pointer"
                  >
                    {option.name}
                  </Label>
                </AccordionTrigger>
                <AccordionContent>
                  <div className="pl-2 pt-4 space-y-4">
                    <RadioGroup
                      value={selectedBank}
                      onValueChange={setSelectedBank}
                      className="space-y-3"
                    >
                      {option.banks.map((bank) => (
                        <div key={bank.name} className="space-y-2">
                          <div className="flex items-center gap-3">
                            <RadioGroupItem
                              value={bank.name}
                              id={`${option.id}-${bank.name}`}
                            />
                            <Label htmlFor={`${option.id}-${bank.name}`}>
                              {bank.name}
                            </Label>
                          </div>

                          {selectedBank === bank.name && (
                            <div className="pl-8 grid grid-cols-2 sm:grid-cols-3 gap-3">
                              {bank.tenures.map((tenure) => {
                                const emiAmount = calculateEmi(amount, tenure);
                                return (
                                  <div
                                    key={tenure}
                                    className={`border rounded-md p-3 cursor-pointer hover:border-amber-500 ${selectedTenure === tenure ? "border-amber-500 bg-amber-50" : ""}`}
                                    onClick={() => setSelectedTenure(tenure)}
                                  >
                                    <p className="font-medium">
                                      {tenure} Months
                                    </p>
                                    <p className="text-sm text-gray-600">
                                      ₹{emiAmount}/mo
                                    </p>
                                  </div>
                                );
                              })}
                            </div>
                          )}
                        </div>
                      ))}
                    </RadioGroup>
                  </div>
                </AccordionContent>
              </div>
            </div>
          </AccordionItem>
        ))}
      </Accordion>

      <div className="pt-4">
        <Button
          type="submit"
          className="w-full bg-amber-600 hover:bg-amber-700 text-white py-6 text-lg"
          disabled={!selectedBank || !selectedTenure}
        >
          Pay ₹{amount.toFixed(2)}
        </Button>
      </div>

      <p className="text-xs text-gray-500 text-center">
        *EMI is calculated based on the product price. Additional charges like
        shipping fee, gift wrap fee, etc. are excluded from EMI.
      </p>
    </form>
  );
};

export default EmiPaymentForm;
