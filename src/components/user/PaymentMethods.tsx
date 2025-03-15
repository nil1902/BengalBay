import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CreditCard, Plus, User, Package, Calendar } from "lucide-react";
import { useNavigate } from "react-router-dom";

const PaymentMethods = () => {
  const navigate = useNavigate();
  return (
    <div className="container mx-auto py-10 px-4">
      <h1 className="text-3xl font-bold mb-6">Payment Methods</h1>

      {/* User Navigation Menu */}
      <div className="mb-6 flex flex-wrap gap-2">
        <Button
          variant="outline"
          className="flex items-center gap-2 bg-gray-100"
          onClick={() => navigate("/profile?tab=payment")}
        >
          <CreditCard className="h-4 w-4" />
          Payment Methods
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Manage your payment options</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col items-center justify-center py-12">
            <CreditCard className="h-16 w-16 text-gray-300 mb-4" />
            <p className="text-gray-500 mb-6">
              Price is what you pay, Value is what you get.
            </p>

            <div className="w-full max-w-md">
              <div className="bg-amber-50 p-6 rounded-lg border border-amber-200 mb-8">
                <h3 className="text-xl font-semibold text-center mb-6">
                  We Accept
                </h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="flex flex-col items-center">
                    <img
                      src="https://upload.wikimedia.org/wikipedia/commons/thumb/e/e1/UPI-Logo-vector.svg/1200px-UPI-Logo-vector.svg.png"
                      alt="UPI"
                      className="h-10 object-contain mb-2"
                    />
                    <span className="text-xs text-gray-600">UPI</span>
                  </div>
                  <div className="flex flex-col items-center">
                    <img
                      src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/24/Paytm_Logo_%28standalone%29.svg/2560px-Paytm_Logo_%28standalone%29.svg.png"
                      alt="Paytm"
                      className="h-10 object-contain mb-2"
                    />
                    <span className="text-xs text-gray-600">Paytm</span>
                  </div>
                  <div className="flex flex-col items-center">
                    <img
                      src="https://upload.wikimedia.org/wikipedia/commons/thumb/f/f2/Google_Pay_Logo.svg/512px-Google_Pay_Logo.svg.png"
                      alt="Google Pay"
                      className="h-10 object-contain mb-2"
                    />
                    <span className="text-xs text-gray-600">Google Pay</span>
                  </div>
                  <div className="flex flex-col items-center">
                    <img
                      src="https://upload.wikimedia.org/wikipedia/commons/thumb/7/71/PhonePe_Logo.svg/1200px-PhonePe_Logo.svg.png"
                      alt="PhonePe"
                      className="h-10 object-contain mb-2"
                    />
                    <span className="text-xs text-gray-600">PhonePe</span>
                  </div>
                  <div className="flex flex-col items-center">
                    <img
                      src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/0c/MasterCard_logo.png/640px-MasterCard_logo.png"
                      alt="MasterCard"
                      className="h-10 object-contain mb-2"
                    />
                    <span className="text-xs text-gray-600">MasterCard</span>
                  </div>
                  <div className="flex flex-col items-center">
                    <img
                      src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/5e/Visa_Inc._logo.svg/1200px-Visa_Inc._logo.svg.png"
                      alt="Visa"
                      className="h-10 object-contain mb-2"
                    />
                    <span className="text-xs text-gray-600">Visa</span>
                  </div>
                  <div className="flex flex-col items-center">
                    <img
                      src="https://upload.wikimedia.org/wikipedia/commons/thumb/f/fa/American_Express_logo_%282018%29.svg/1200px-American_Express_logo_%282018%29.svg.png"
                      alt="American Express"
                      className="h-10 object-contain mb-2"
                    />
                    <span className="text-xs text-gray-600">Amex</span>
                  </div>
                  <div className="flex flex-col items-center">
                    <img
                      src="https://upload.wikimedia.org/wikipedia/commons/thumb/d/d1/RuPay.svg/1200px-RuPay.svg.png"
                      alt="RuPay"
                      className="h-10 object-contain mb-2"
                    />
                    <span className="text-xs text-gray-600">RuPay</span>
                  </div>
                </div>
              </div>

              <div className="text-center">
                <Button
                  className="bg-amber-600 hover:bg-amber-700 text-white"
                  onClick={() => navigate("/checkout")}
                >
                  <Plus className="mr-2 h-4 w-4" />
                  Make Payment
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PaymentMethods;
