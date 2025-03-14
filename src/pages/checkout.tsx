import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { useCart } from "@/components/cart/CartContext";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  CheckCircle2,
  ShoppingCart,
  MapPin,
  CreditCard,
  Edit,
} from "lucide-react";
import PaymentOptions from "@/components/checkout/PaymentOptions";
import AddressForm, { AddressData } from "@/components/checkout/AddressForm";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from "@/lib/firebase";

const CheckoutPage = () => {
  const { currentUser } = useAuth();
  const { cartItems, cartTotal, clearCart } = useCart();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("payment");
  const [isOrderComplete, setIsOrderComplete] = useState(false);
  const [orderId, setOrderId] = useState("");
  const [isAddressFormOpen, setIsAddressFormOpen] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  // Address data with user info if available
  const [address, setAddress] = useState<AddressData>({
    name: currentUser?.displayName || "Guest User",
    phone: "9876543210",
    pincode: "400001",
    locality: "Main Area",
    address: "123 Main Street",
    city: "Mumbai",
    state: "Maharashtra",
    landmark: "",
    addressType: "home",
  });

  // Redirect to login if not authenticated
  useEffect(() => {
    if (!currentUser) {
      navigate("/login");
    }
  }, [currentUser, navigate]);

  // If cart is empty, redirect to menu
  useEffect(() => {
    if (cartItems.length === 0) {
      navigate("/menu");
    }
  }, [cartItems, navigate]);

  const handlePaymentComplete = async () => {
    if (isProcessing) return;
    setIsProcessing(true);

    try {
      // Generate a random order ID
      const randomOrderId = `ORD-${Math.floor(Math.random() * 1000000)}`;
      const orderDate = new Date().toISOString();
      const totalAmount = cartTotal + cartTotal * 0.05;

      // Create order object
      const orderData = {
        id: randomOrderId,
        date: orderDate,
        items: cartItems,
        total: totalAmount,
        status: "Processing",
        userId: currentUser?.uid,
        userEmail: currentUser?.email,
        userName: currentUser?.displayName || address.name,
        shippingAddress: address,
        timestamp: serverTimestamp(),
      };

      // Save to Firestore
      if (currentUser) {
        const docRef = await addDoc(collection(db, "orders"), orderData);
        console.log("Order saved with ID: ", docRef.id);
        setOrderId(randomOrderId);

        // Also save to user-specific localStorage as backup
        const userOrdersKey = `orders_${currentUser.uid}`;
        const existingOrders = localStorage.getItem(userOrdersKey);
        const orders = existingOrders ? JSON.parse(existingOrders) : [];
        orders.unshift(orderData);
        localStorage.setItem(userOrdersKey, JSON.stringify(orders));

        // Send confirmation email (mock)
        console.log(
          `Sending confirmation email to ${currentUser.email} and nilimeshpal4@gmail.com`,
        );

        // Show confirmation dialog
        setIsOrderComplete(true);
      }
    } catch (error) {
      console.error("Failed to process order:", error);
      alert("There was an error processing your order. Please try again.");
    } finally {
      setIsProcessing(false);
    }
  };

  const handleAddressChange = (newAddress: AddressData) => {
    setAddress(newAddress);
    setIsAddressFormOpen(false);
  };

  return (
    <div className="container mx-auto py-10 px-4">
      <h1 className="text-3xl font-bold mb-6">Checkout</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <div className="md:col-span-2">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <MapPin className="h-5 w-5 text-gray-500" />
              <h2 className="text-xl font-semibold">Delivery Address</h2>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setIsAddressFormOpen(true)}
              className="flex items-center gap-2"
            >
              <Edit className="h-4 w-4" />
              Edit
            </Button>
          </div>

          <div className="bg-white p-4 rounded-lg border mb-6">
            <div className="flex flex-col">
              <div className="flex items-center gap-2">
                <span className="font-semibold">{address.name}</span>
                <span className="bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded">
                  {address.addressType.toUpperCase()}
                </span>
              </div>
              <p className="text-gray-600">{address.address}</p>
              <p className="text-gray-600">
                {address.locality}, {address.city}, {address.state} -{" "}
                {address.pincode}
              </p>
              <p className="text-gray-600">Phone: {address.phone}</p>
            </div>
          </div>
        </div>

        <div>
          <div className="bg-white p-4 rounded-lg border mb-6">
            <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
            <div className="space-y-4">
              <div className="flex justify-between text-sm">
                <span>Items ({cartItems.length})</span>
                <span>₹{cartTotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Delivery</span>
                <span className="text-green-600">FREE</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Tax (5%)</span>
                <span>₹{(cartTotal * 0.05).toFixed(2)}</span>
              </div>
              <Separator />
              <div className="flex justify-between font-semibold">
                <span>Total</span>
                <span>₹{(cartTotal + cartTotal * 0.05).toFixed(2)}</span>
              </div>
              <div className="text-green-600 text-sm mt-2">
                Your Total Savings: ₹{(cartTotal * 0.1).toFixed(2)}
              </div>
            </div>
          </div>
        </div>
      </div>

      {cartItems.length > 0 ? (
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-1 mb-8">
            <TabsTrigger value="payment" className="flex items-center gap-2">
              <CreditCard className="h-4 w-4" />
              Payment Options
            </TabsTrigger>
          </TabsList>

          <TabsContent value="payment">
            <PaymentOptions onPaymentComplete={handlePaymentComplete} />
          </TabsContent>
        </Tabs>
      ) : (
        <div className="text-center py-8">
          <ShoppingCart className="h-12 w-12 mx-auto text-gray-400 mb-4" />
          <p className="text-gray-500">Your cart is empty</p>
          <Button
            className="mt-4 bg-amber-600 hover:bg-amber-700 text-white"
            onClick={() => navigate("/menu")}
          >
            Browse Menu
          </Button>
        </div>
      )}

      {/* Address Form Dialog */}
      <Dialog open={isAddressFormOpen} onOpenChange={setIsAddressFormOpen}>
        <DialogContent className="sm:max-w-2xl">
          <AddressForm
            initialAddress={address}
            onSave={handleAddressChange}
            onCancel={() => setIsAddressFormOpen(false)}
          />
        </DialogContent>
      </Dialog>

      {/* Order Confirmation Dialog */}
      <Dialog open={isOrderComplete} onOpenChange={setIsOrderComplete}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Order Confirmed!</DialogTitle>
            <DialogDescription>
              Your order has been successfully placed.
            </DialogDescription>
          </DialogHeader>
          <div className="flex flex-col items-center py-4">
            <div className="rounded-full bg-green-100 p-3 mb-4">
              <CheckCircle2 className="h-8 w-8 text-green-600" />
            </div>
            <div className="text-center space-y-3">
              <p className="font-medium">
                Thank you for your order,{" "}
                {currentUser?.displayName || address.name}!
              </p>
              <div className="bg-gray-50 p-4 rounded-md">
                <p className="font-medium">Order Details:</p>
                <p>Order ID: {orderId}</p>
                <p>Items: {cartItems.length}</p>
                <p>Total: ₹{(cartTotal + cartTotal * 0.05).toFixed(2)}</p>
              </div>
              <p className="text-sm text-gray-500">
                A confirmation email has been sent to {currentUser?.email} and
                nilimeshpal4@gmail.com. You can track your order in the My
                Orders section of your profile.
              </p>
            </div>
          </div>
          <div className="flex justify-center">
            <Button
              onClick={() => {
                setIsOrderComplete(false);
                clearCart();
                navigate("/");
              }}
              className="bg-amber-600 hover:bg-amber-700 text-white"
            >
              Continue Shopping
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default CheckoutPage;
