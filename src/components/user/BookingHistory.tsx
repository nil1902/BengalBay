import React, { useState, useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar, Users, Clock, MapPin, ExternalLink } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { collection, query, where, getDocs, orderBy } from "firebase/firestore";
import { db } from "@/lib/firebase";

interface Booking {
  id: string;
  date: string;
  time: string;
  guests: number;
  specialRequests?: string;
  status: "Upcoming" | "Completed" | "Cancelled";
  userId?: string;
  userEmail?: string;
  name?: string;
  phone?: string;
}

const BookingHistory = () => {
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);

  // Fetch bookings from Firestore based on current user
  useEffect(() => {
    const fetchBookings = async () => {
      if (!currentUser) {
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        // Query bookings collection for the current user
        const bookingsRef = collection(db, "bookings");
        const q = query(
          bookingsRef,
          where("userId", "==", currentUser.uid),
          orderBy("date", "desc"),
        );

        const querySnapshot = await getDocs(q);
        const userBookings: Booking[] = [];

        querySnapshot.forEach((doc) => {
          userBookings.push({ id: doc.id, ...doc.data() } as Booking);
        });

        setBookings(userBookings);
      } catch (error) {
        console.error("Error fetching bookings:", error);
        // Fallback to localStorage if Firestore fails
        const storedBookings = localStorage.getItem(
          `bookings_${currentUser.uid}`,
        );
        if (storedBookings) {
          try {
            const parsedBookings = JSON.parse(storedBookings);
            setBookings(parsedBookings);
          } catch (err) {
            console.error("Failed to parse bookings from localStorage", err);
          }
        }
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, [currentUser]);

  const getStatusColor = (status: Booking["status"]) => {
    switch (status) {
      case "Upcoming":
        return "bg-amber-100 text-amber-800";
      case "Completed":
        return "bg-green-100 text-green-800";
      case "Cancelled":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const handleModifyBooking = (id: string) => {
    // Navigate to booking modification page
    navigate(`/reservations?modify=${id}`);
  };

  const handleCancelBooking = async (id: string) => {
    try {
      // Update booking status in Firestore (in a real app)
      // For now, just update the local state
      setBookings(
        bookings.map((booking) =>
          booking.id === id
            ? { ...booking, status: "Cancelled" as const }
            : booking,
        ),
      );

      // Also update in localStorage as fallback
      if (currentUser) {
        const updatedBookings = bookings.map((booking) =>
          booking.id === id
            ? { ...booking, status: "Cancelled" as const }
            : booking,
        );
        localStorage.setItem(
          `bookings_${currentUser.uid}`,
          JSON.stringify(updatedBookings),
        );
      }
    } catch (error) {
      console.error("Error cancelling booking:", error);
    }
  };

  const handleBookAgain = (booking: Booking) => {
    // Pre-fill the reservation form
    navigate(`/reservations?guests=${booking.guests}&time=${booking.time}`);
  };

  if (loading) {
    return (
      <div className="container mx-auto py-10 px-4 text-center">
        <p>Loading your bookings...</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-10 px-4">
      <h1 className="text-3xl font-bold mb-6">My Bookings</h1>

      {bookings.length === 0 ? (
        <div className="text-center py-8">
          <Calendar className="h-12 w-12 mx-auto text-gray-400 mb-4" />
          <p className="text-gray-500">You don't have any reservations yet.</p>
          <Button
            className="mt-4 bg-amber-600 hover:bg-amber-700 text-white"
            onClick={() => navigate("/reservations")}
          >
            Book a Table
          </Button>
        </div>
      ) : (
        <div className="space-y-6">
          {bookings.map((booking) => (
            <Card key={booking.id} className="overflow-hidden">
              <CardHeader className="bg-gray-50">
                <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
                  <div>
                    <CardTitle className="text-lg">
                      Reservation #{booking.id}
                    </CardTitle>
                    <p className="text-sm text-gray-500">
                      {new Date(booking.date).toLocaleDateString()} at{" "}
                      {booking.time}
                    </p>
                  </div>
                  <Badge
                    className={`${getStatusColor(booking.status)} px-3 py-1`}
                  >
                    {booking.status}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="pt-6">
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="flex items-center gap-2">
                      <Users className="h-5 w-5 text-gray-500" />
                      <span>
                        {booking.guests}{" "}
                        {booking.guests === 1 ? "Guest" : "Guests"}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="h-5 w-5 text-gray-500" />
                      <span>{booking.time}</span>
                    </div>
                    <div className="flex items-center gap-2 md:col-span-2">
                      <MapPin className="h-5 w-5 text-gray-500" />
                      <span>Nil's Kitchen, Shantipur, Station Rd, 741404</span>
                    </div>
                  </div>

                  {booking.specialRequests && (
                    <div className="pt-2">
                      <p className="text-sm font-medium">Special Requests:</p>
                      <p className="text-sm text-gray-600">
                        {booking.specialRequests}
                      </p>
                    </div>
                  )}

                  <div className="flex justify-end pt-4 gap-2">
                    {booking.status === "Upcoming" && (
                      <>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleModifyBooking(booking.id)}
                        >
                          Modify
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          className="text-red-600 border-red-600 hover:bg-red-50"
                          onClick={() => handleCancelBooking(booking.id)}
                        >
                          Cancel
                        </Button>
                      </>
                    )}
                    {booking.status === "Completed" && (
                      <Button
                        variant="outline"
                        size="sm"
                        className="text-amber-600 border-amber-600 hover:bg-amber-50"
                        onClick={() => handleBookAgain(booking)}
                      >
                        Book Again
                      </Button>
                    )}
                    <Button
                      variant="outline"
                      size="sm"
                      className="text-amber-600 border-amber-600 hover:bg-amber-50"
                      onClick={() => navigate(`/booking/${booking.id}`)}
                    >
                      <ExternalLink className="mr-2 h-4 w-4" />
                      View Details
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default BookingHistory;
