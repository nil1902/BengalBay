import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Separator } from "@/components/ui/separator";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useCart } from "../cart/CartContext";
import { useAuth } from "@/contexts/AuthContext";
import UpiPaymentForm from "./UpiPaymentForm";
import CardPaymentForm from "./CardPaymentForm";
import NetBankingForm from "./NetBankingForm";
import EmiPaymentForm from "./EmiPaymentForm";
import CodPaymentForm from "./CodPaymentForm";

interface PaymentOptionsProps {
  onPaymentComplete: () => void;
}

const PaymentOptions: React.FC<PaymentOptionsProps> = ({
  onPaymentComplete,
}) => {
  const [paymentMethod, setPaymentMethod] = useState<string>("upi");
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const { cartTotal, cartItems } = useCart();
  const { currentUser } = useAuth();

  // Mock countdown timer
  const [countdown, setCountdown] = useState<{
    minutes: number;
    seconds: number;
  }>({
    minutes: 15,
    seconds: 0,
  });

  // Countdown timer effect
  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { minutes: prev.minutes - 1, seconds: 59 };
        } else {
          clearInterval(timer);
          return prev;
        }
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const handlePaymentSubmit = () => {
    setIsProcessing(true);

    // Simulate payment processing
    setTimeout(() => {
      setIsProcessing(false);
      onPaymentComplete();
    }, 2000);
  };

  const formatPrice = (price: number) => {
    return `₹${price.toFixed(2)}`;
  };

  // Calculate tax and total
  const tax = cartTotal * 0.05;
  const totalPayable = cartTotal + tax;
  const protectFee = 9;
  const grandTotal = totalPayable + protectFee;

  // Render the appropriate payment form based on selected method
  const renderPaymentForm = () => {
    switch (paymentMethod) {
      case "upi":
        return (
          <UpiPaymentForm onSubmit={handlePaymentSubmit} amount={grandTotal} />
        );
      case "card":
        return (
          <CardPaymentForm onSubmit={handlePaymentSubmit} amount={grandTotal} />
        );
      case "netbanking":
        return (
          <NetBankingForm onSubmit={handlePaymentSubmit} amount={grandTotal} />
        );
      case "emi":
        return (
          <EmiPaymentForm onSubmit={handlePaymentSubmit} amount={grandTotal} />
        );
      case "cod":
        return (
          <CodPaymentForm onSubmit={handlePaymentSubmit} amount={grandTotal} />
        );
      default:
        return (
          <div className="p-4 text-center">
            <p>Please select a payment method</p>
          </div>
        );
    }
  };

  return (
    <div className="grid md:grid-cols-3 gap-6">
      <div className="md:col-span-2 space-y-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span>Payment Options</span>
              <div className="text-sm font-normal text-amber-600 bg-amber-50 px-3 py-1 rounded-full">
                Complete payment in {countdown.minutes}:
                {countdown.seconds < 10
                  ? `0${countdown.seconds}`
                  : countdown.seconds}
              </div>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <RadioGroup
              value={paymentMethod}
              onValueChange={setPaymentMethod}
              className="space-y-4 mb-6"
            >
              {/* UPI Payment Option */}
              <div
                className={`border rounded-lg p-4 ${paymentMethod === "upi" ? "border-amber-500 bg-amber-50" : ""}`}
              >
                <div className="flex items-start gap-3">
                  <RadioGroupItem value="upi" id="upi" />
                  <div className="flex-1">
                    <label
                      htmlFor="upi"
                      className="flex items-center gap-2 cursor-pointer"
                    >
                      <div className="bg-purple-100 p-1 rounded-full">
                        <img
                          src="https://upload.wikimedia.org/wikipedia/commons/thumb/e/e1/UPI-Logo-vector.svg/1200px-UPI-Logo-vector.svg.png"
                          alt="UPI"
                          className="h-6 w-6 object-contain"
                        />
                      </div>
                      <span className="font-medium">UPI</span>
                    </label>
                    <p className="text-xs text-gray-500 mt-1 ml-8">
                      Pay by any UPI app
                    </p>
                  </div>
                </div>
              </div>

              {/* Wallets Option */}
              <div
                className={`border rounded-lg p-4 ${paymentMethod === "wallets" ? "border-amber-500 bg-amber-50" : ""}`}
              >
                <div className="flex items-start gap-3">
                  <RadioGroupItem value="wallets" id="wallets" />
                  <div>
                    <label
                      htmlFor="wallets"
                      className="flex items-center gap-2 cursor-pointer"
                    >
                      <div className="bg-purple-100 p-1 rounded-full">
                        <img
                          src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/24/Paytm_Logo_%28standalone%29.svg/2560px-Paytm_Logo_%28standalone%29.svg.png"
                          alt="Wallets"
                          className="h-6 w-6 object-contain"
                        />
                      </div>
                      <span className="font-medium">Wallets</span>
                    </label>
                  </div>
                </div>
              </div>

              {/* Credit/Debit Card Option */}
              <div
                className={`border rounded-lg p-4 ${paymentMethod === "card" ? "border-amber-500 bg-amber-50" : ""}`}
              >
                <div className="flex items-start gap-3">
                  <RadioGroupItem value="card" id="card" />
                  <div>
                    <label
                      htmlFor="card"
                      className="flex items-center gap-2 cursor-pointer"
                    >
                      <div className="bg-blue-100 p-1 rounded-full">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="text-blue-600"
                        >
                          <rect width="20" height="14" x="2" y="5" rx="2" />
                          <line x1="2" x2="22" y1="10" y2="10" />
                        </svg>
                      </div>
                      <span className="font-medium">
                        Credit / Debit / ATM Card
                      </span>
                    </label>
                    <p className="text-xs text-gray-500 mt-1 ml-8">
                      Add and secure cards as per RBI guidelines
                    </p>
                  </div>
                </div>
              </div>

              {/* Net Banking Option */}
              <div
                className={`border rounded-lg p-4 ${paymentMethod === "netbanking" ? "border-amber-500 bg-amber-50" : ""}`}
              >
                <div className="flex items-start gap-3">
                  <RadioGroupItem value="netbanking" id="netbanking" />
                  <div>
                    <label
                      htmlFor="netbanking"
                      className="flex items-center gap-2 cursor-pointer"
                    >
                      <div className="bg-green-100 p-1 rounded-full">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="text-green-600"
                        >
                          <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                          <polyline points="9 22 9 12 15 12 15 22" />
                        </svg>
                      </div>
                      <span className="font-medium">Net Banking</span>
                    </label>
                    <p className="text-xs text-gray-500 mt-1 ml-8">
                      This instrument has low success, use UPI or cards for
                      better experience
                    </p>
                  </div>
                </div>
              </div>

              {/* EMI Option */}
              <div
                className={`border rounded-lg p-4 ${paymentMethod === "emi" ? "border-amber-500 bg-amber-50" : ""}`}
              >
                <div className="flex items-start gap-3">
                  <RadioGroupItem value="emi" id="emi" />
                  <div>
                    <label
                      htmlFor="emi"
                      className="flex items-center gap-2 cursor-pointer"
                    >
                      <div className="bg-orange-100 p-1 rounded-full">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="text-orange-600"
                        >
                          <path d="M2 17a5 5 0 0 0 10 0c0-2.5-2.5-5-5-5a5 5 0 0 0-5 5" />
                          <path d="M12 17a5 5 0 0 0 10 0c0-2.5-2.5-5-5-5a5 5 0 0 0-5 5" />
                        </svg>
                      </div>
                      <span className="font-medium">
                        EMI (Easy Installments)
                      </span>
                    </label>
                  </div>
                </div>
              </div>

              {/* Cash on Delivery Option */}
              <div
                className={`border rounded-lg p-4 ${paymentMethod === "cod" ? "border-amber-500 bg-amber-50" : ""}`}
              >
                <div className="flex items-start gap-3">
                  <RadioGroupItem value="cod" id="cod" />
                  <div>
                    <label
                      htmlFor="cod"
                      className="flex items-center gap-2 cursor-pointer"
                    >
                      <div className="bg-yellow-100 p-1 rounded-full">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="text-yellow-600"
                        >
                          <rect width="20" height="16" x="2" y="4" rx="2" />
                          <path d="M12 4v16" />
                        </svg>
                      </div>
                      <span className="font-medium">Cash on Delivery</span>
                    </label>
                  </div>
                </div>
              </div>
            </RadioGroup>

            {/* Render the appropriate payment form */}
            <div className="border-t pt-6">{renderPaymentForm()}</div>
          </CardContent>
        </Card>

        <div className="bg-gray-50 p-4 rounded-lg border">
          <div className="flex items-center gap-2 text-sm text-gray-600">
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
              className="text-green-600"
            >
              <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
              <polyline points="22 4 12 14.01 9 11.01" />
            </svg>
            <span>
              Safe and Secure Payments. Easy returns. 100% Authentic products.
            </span>
          </div>
        </div>
      </div>

      <div className="md:col-span-1">
        <Card>
          <CardHeader>
            <CardTitle>Price Details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <div className="flex justify-between">
                <span>Price ({cartItems.length} items)</span>
                <span>{formatPrice(cartTotal)}</span>
              </div>
              <div className="flex justify-between">
                <span>Delivery Charges</span>
                <span className="text-green-600">FREE</span>
              </div>
              <div className="flex justify-between">
                <span>Tax (5%)</span>
                <span>{formatPrice(tax)}</span>
              </div>
              <div className="flex justify-between">
                <span>Protect Promise Fee</span>
                <span>₹{protectFee}</span>
              </div>
            </div>

            <Separator />

            <div className="flex justify-between font-bold text-lg">
              <span>Amount Payable</span>
              <span>{formatPrice(grandTotal)}</span>
            </div>

            <div className="text-green-600 font-medium">
              Your Total Savings on this order ₹{(cartTotal * 0.1).toFixed(2)}
            </div>

            <div className="pt-4 space-y-3">
              <div className="flex items-center gap-2 p-3 border rounded-lg">
                <div className="bg-blue-100 p-1 rounded-full">
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
                    className="text-blue-600"
                  >
                    <rect width="20" height="14" x="2" y="5" rx="2" />
                    <line x1="2" x2="22" y1="10" y2="10" />
                  </svg>
                </div>
                <span className="text-sm">
                  No Cost EMI on cart value above ₹2999
                </span>
              </div>

              <div className="flex items-center gap-2 p-3 border rounded-lg">
                <div className="bg-red-100 p-1 rounded-full">
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
                    className="text-red-600"
                  >
                    <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
                  </svg>
                </div>
                <span className="text-sm">
                  5% Unlimited Cashback on Credit Card
                </span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default PaymentOptions;
