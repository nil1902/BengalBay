import React, { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";
import {
  User,
  Package,
  Calendar,
  CreditCard,
  LogOut,
  Edit2,
  Save,
} from "lucide-react";

const UserDashboard = () => {
  const { currentUser, logout, updateUserProfile } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("profile");
  const [isEditing, setIsEditing] = useState(false);
  const [displayName, setDisplayName] = useState(
    currentUser?.displayName || "",
  );
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  // Mock data for orders and bookings
  const orders = [
    {
      id: "ORD-001",
      date: "2023-06-15",
      total: 1250,
      status: "Delivered",
      items: 4,
    },
    {
      id: "ORD-002",
      date: "2023-07-22",
      total: 850,
      status: "Delivered",
      items: 2,
    },
    {
      id: "ORD-003",
      date: "2023-08-10",
      total: 1650,
      status: "Processing",
      items: 5,
    },
  ];

  const bookings = [
    {
      id: "BKG-001",
      date: "2023-06-20",
      time: "19:00",
      guests: 4,
      status: "Completed",
    },
    {
      id: "BKG-002",
      date: "2023-09-15",
      time: "20:30",
      guests: 2,
      status: "Upcoming",
    },
    {
      id: "BKG-003",
      date: "2023-10-05",
      time: "18:00",
      guests: 6,
      status: "Upcoming",
    },
  ];

  const handleLogout = async () => {
    try {
      await logout();
      navigate("/");
    } catch (error) {
      console.error("Failed to log out", error);
    }
  };

  const handleSaveProfile = async () => {
    if (!displayName.trim()) {
      setError("Name cannot be empty");
      return;
    }

    try {
      setError("");
      setLoading(true);
      await updateUserProfile(displayName);
      setSuccess("Profile updated successfully");
      setIsEditing(false);
    } catch (err: any) {
      setError(err.message || "Failed to update profile");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto py-10 px-4">
      <h1 className="text-3xl font-bold mb-6">My Account</h1>

      <Tabs
        defaultValue="profile"
        value={activeTab}
        onValueChange={setActiveTab}
      >
        <TabsList className="grid w-full grid-cols-4 mb-8">
          <TabsTrigger value="profile" className="flex items-center gap-2">
            <User className="h-4 w-4" />
            Profile
          </TabsTrigger>
          <TabsTrigger value="orders" className="flex items-center gap-2">
            <Package className="h-4 w-4" />
            Orders
          </TabsTrigger>
          <TabsTrigger value="bookings" className="flex items-center gap-2">
            <Calendar className="h-4 w-4" />
            Bookings
          </TabsTrigger>
          <TabsTrigger value="payment" className="flex items-center gap-2">
            <CreditCard className="h-4 w-4" />
            Payment Methods
          </TabsTrigger>
        </TabsList>

        <TabsContent value="profile">
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <div>
                  <CardTitle>Profile Information</CardTitle>
                  <CardDescription>
                    Manage your personal information
                  </CardDescription>
                </div>
                {!isEditing ? (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setIsEditing(true)}
                    className="flex items-center gap-2"
                  >
                    <Edit2 className="h-4 w-4" />
                    Edit Profile
                  </Button>
                ) : (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      setIsEditing(false);
                      setDisplayName(currentUser?.displayName || "");
                      setError("");
                      setSuccess("");
                    }}
                  >
                    Cancel
                  </Button>
                )}
              </div>
            </CardHeader>
            <CardContent>
              {error && (
                <Alert variant="destructive" className="mb-4">
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}
              {success && (
                <Alert className="mb-4 bg-green-50 text-green-800 border-green-200">
                  <AlertDescription>{success}</AlertDescription>
                </Alert>
              )}

              <div className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  {isEditing ? (
                    <Input
                      id="name"
                      value={displayName}
                      onChange={(e) => setDisplayName(e.target.value)}
                    />
                  ) : (
                    <div className="p-2 border rounded-md bg-gray-50">
                      {currentUser?.displayName || "Not set"}
                    </div>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>
                  <div className="p-2 border rounded-md bg-gray-50">
                    {currentUser?.email}
                  </div>
                </div>

                {isEditing && (
                  <Button
                    onClick={handleSaveProfile}
                    className="bg-amber-600 hover:bg-amber-700 text-white"
                    disabled={loading}
                  >
                    <Save className="mr-2 h-4 w-4" />
                    {loading ? "Saving..." : "Save Changes"}
                  </Button>
                )}

                <Separator className="my-6" />

                <Button
                  variant="outline"
                  className="w-full sm:w-auto text-red-600 hover:text-red-700 hover:bg-red-50"
                  onClick={handleLogout}
                >
                  <LogOut className="mr-2 h-4 w-4" />
                  Logout
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="orders">
          <Card>
            <CardHeader>
              <CardTitle>Order History</CardTitle>
              <CardDescription>
                View your past orders and their status
              </CardDescription>
            </CardHeader>
            <CardContent>
              {orders.length === 0 ? (
                <div className="text-center py-8">
                  <Package className="h-12 w-12 mx-auto text-gray-400 mb-4" />
                  <p className="text-gray-500">
                    You haven't placed any orders yet.
                  </p>
                  <Button
                    className="mt-4 bg-amber-600 hover:bg-amber-700 text-white"
                    onClick={() => navigate("/menu")}
                  >
                    Browse Menu
                  </Button>
                </div>
              ) : (
                <div className="space-y-4">
                  {orders.map((order) => (
                    <div
                      key={order.id}
                      className="border rounded-lg p-4 hover:shadow-md transition-shadow"
                    >
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <h3 className="font-medium">{order.id}</h3>
                          <p className="text-sm text-gray-500">
                            {new Date(order.date).toLocaleDateString()}
                          </p>
                        </div>
                        <div
                          className={`px-2 py-1 rounded-full text-xs font-medium ${
                            order.status === "Delivered"
                              ? "bg-green-100 text-green-800"
                              : "bg-blue-100 text-blue-800"
                          }`}
                        >
                          {order.status}
                        </div>
                      </div>
                      <div className="flex justify-between items-center mt-4">
                        <span className="text-sm">{order.items} items</span>
                        <div className="flex items-center gap-4">
                          <span className="font-medium">
                            ₹{order.total.toFixed(2)}
                          </span>
                          <Button variant="outline" size="sm">
                            View Details
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="bookings">
          <Card>
            <CardHeader>
              <CardTitle>Your Reservations</CardTitle>
              <CardDescription>Manage your table reservations</CardDescription>
            </CardHeader>
            <CardContent>
              {bookings.length === 0 ? (
                <div className="text-center py-8">
                  <Calendar className="h-12 w-12 mx-auto text-gray-400 mb-4" />
                  <p className="text-gray-500">
                    You don't have any reservations yet.
                  </p>
                  <Button
                    className="mt-4 bg-amber-600 hover:bg-amber-700 text-white"
                    onClick={() => navigate("/reservations")}
                  >
                    Book a Table
                  </Button>
                </div>
              ) : (
                <div className="space-y-4">
                  {bookings.map((booking) => (
                    <div
                      key={booking.id}
                      className="border rounded-lg p-4 hover:shadow-md transition-shadow"
                    >
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <h3 className="font-medium">{booking.id}</h3>
                          <p className="text-sm text-gray-500">
                            {new Date(booking.date).toLocaleDateString()} at{" "}
                            {booking.time}
                          </p>
                        </div>
                        <div
                          className={`px-2 py-1 rounded-full text-xs font-medium ${
                            booking.status === "Completed"
                              ? "bg-gray-100 text-gray-800"
                              : "bg-amber-100 text-amber-800"
                          }`}
                        >
                          {booking.status}
                        </div>
                      </div>
                      <div className="flex justify-between items-center mt-4">
                        <span className="text-sm">{booking.guests} guests</span>
                        <div className="flex items-center gap-2">
                          {booking.status === "Upcoming" && (
                            <>
                              <Button variant="outline" size="sm">
                                Modify
                              </Button>
                              <Button
                                variant="outline"
                                size="sm"
                                className="text-red-600"
                              >
                                Cancel
                              </Button>
                            </>
                          )}
                          {booking.status === "Completed" && (
                            <Button variant="outline" size="sm">
                              Book Again
                            </Button>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="payment">
          <Card>
            <CardHeader>
              <CardTitle>Payment Methods</CardTitle>
              <CardDescription>Manage your payment options</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8">
                <CreditCard className="h-12 w-12 mx-auto text-gray-400 mb-4" />
                <p className="text-gray-500">
                  You don't have any saved payment methods yet.
                </p>
                <Button className="mt-4 bg-amber-600 hover:bg-amber-700 text-white">
                  Add Payment Method
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default UserDashboard;
