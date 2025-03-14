import React from "react";
import { useAuth } from "@/contexts/AuthContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar, Users, Clock, MapPin, ExternalLink } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface Booking {
  id: string;
  date: string;
  time: string;
  guests: number;
  specialRequests?: string;
  status: "Upcoming" | "Completed" | "Cancelled";
}

// Mock bookings data - in a real app, this would come from a database
const mockBookings: Booking[] = [
  {
    id: "BKG-123456",
    date: "2023-06-20",
    time: "19:30",
    guests: 4,
    specialRequests: "Window seating preferred",
    status: "Upcoming",
  },
  {
    id: "BKG-789012",
    date: "2023-06-15",
    time: "20:00",
    guests: 2,
    status: "Completed",
  },
  {
    id: "BKG-345678",
    date: "2023-06-10",
    time: "18:30",
    guests: 6,
    specialRequests: "Birthday celebration",
    status: "Completed",
  },
];

const BookingHistory = () => {
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  const [bookings, setBookings] = React.useState<Booking[]>(mockBookings);

  // Get bookings from localStorage if available
  React.useEffect(() => {
    const storedBookings = localStorage.getItem("nilsKitchenBookings");
    if (storedBookings) {
      try {
        const parsedBookings = JSON.parse(storedBookings);
        setBookings([...parsedBookings, ...bookings]);
      } catch (error) {
        console.error("Failed to parse bookings from localStorage", error);
      }
    }
  }, []);

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
    // In a real app, this would navigate to a booking modification page
    navigate(`/reservations?modify=${id}`);
  };

  const handleCancelBooking = (id: string) => {
    // In a real app, this would call an API to cancel the booking
    setBookings(
      bookings.map((booking) =>
        booking.id === id
          ? { ...booking, status: "Cancelled" as const }
          : booking,
      ),
    );
  };

  const handleBookAgain = (booking: Booking) => {
    // In a real app, this would pre-fill the reservation form
    navigate(`/reservations?guests=${booking.guests}&time=${booking.time}`);
  };

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
