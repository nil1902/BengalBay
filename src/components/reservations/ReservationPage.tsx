import React, { useState } from "react";
import { format } from "date-fns";
import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  CalendarIcon,
  Clock,
  Users,
  UtensilsCrossed,
  CheckCircle2,
} from "lucide-react";
import { cn } from "@/lib/utils";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";

const timeSlots = [
  "11:00 AM",
  "11:30 AM",
  "12:00 PM",
  "12:30 PM",
  "1:00 PM",
  "1:30 PM",
  "2:00 PM",
  "2:30 PM",
  "5:00 PM",
  "5:30 PM",
  "6:00 PM",
  "6:30 PM",
  "7:00 PM",
  "7:30 PM",
  "8:00 PM",
  "8:30 PM",
  "9:00 PM",
];

const ReservationPage = () => {
  const [date, setDate] = useState<Date | undefined>(undefined);
  const [time, setTime] = useState<string>("");
  const [guests, setGuests] = useState<string>("2");
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  const [specialRequests, setSpecialRequests] = useState<string>("");
  const [isConfirmationOpen, setIsConfirmationOpen] = useState<boolean>(false);
  const [isFormValid, setIsFormValid] = useState<boolean>(false);

  // Check if form is valid whenever inputs change
  React.useEffect(() => {
    setIsFormValid(
      !!date && !!time && !!guests && !!name && !!email && !!phone,
    );
  }, [date, time, guests, name, email, phone]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isFormValid) {
      // In a real app, you would submit this data to your backend
      console.log({
        date,
        time,
        guests,
        name,
        email,
        phone,
        specialRequests,
      });
      setIsConfirmationOpen(true);
    }
  };

  return (
    <div className="w-full bg-white">
      {/* Hero Section */}
      <div className="relative h-[400px] bg-slate-900">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url(https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=1920&q=80)`,
          }}
        >
          <div className="absolute inset-0 bg-black/60"></div>
        </div>
        <div className="relative h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col justify-center items-center text-white text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
            Reserve Your Table
          </h1>
          <p className="text-lg md:text-xl max-w-2xl">
            Book your dining experience at Nil's Kitchen and enjoy our
            exceptional cuisine and service
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 gap-12">
          {/* Reservation Form */}
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-6">
              Make a Reservation
            </h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Date Selection */}
                <div className="space-y-2">
                  <Label htmlFor="date">Date</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant={"outline"}
                        className={cn(
                          "w-full justify-start text-left font-normal",
                          !date && "text-muted-foreground",
                        )}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {date ? format(date, "PPP") : <span>Select date</span>}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={date}
                        onSelect={setDate}
                        initialFocus
                        disabled={(date) => {
                          // Disable dates in the past
                          const today = new Date();
                          today.setHours(0, 0, 0, 0);
                          return date < today;
                        }}
                      />
                    </PopoverContent>
                  </Popover>
                </div>

                {/* Time Selection */}
                <div className="space-y-2">
                  <Label htmlFor="time">Time</Label>
                  <Select value={time} onValueChange={setTime}>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select time" />
                    </SelectTrigger>
                    <SelectContent>
                      {timeSlots.map((slot) => (
                        <SelectItem key={slot} value={slot}>
                          {slot}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Party Size */}
                <div className="space-y-2">
                  <Label htmlFor="guests">Number of Guests</Label>
                  <Select value={guests} onValueChange={setGuests}>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select guests" />
                    </SelectTrigger>
                    <SelectContent>
                      {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
                        <SelectItem key={num} value={num.toString()}>
                          {num} {num === 1 ? "Guest" : "Guests"}
                        </SelectItem>
                      ))}
                      <SelectItem value="more">
                        More than 10 (Call us)
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Name */}
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  <Input
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="John Doe"
                    required
                  />
                </div>

                {/* Email */}
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="john@example.com"
                    required
                  />
                </div>

                {/* Phone */}
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input
                    id="phone"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="(555) 123-4567"
                    required
                  />
                </div>
              </div>

              {/* Special Requests */}
              <div className="space-y-2">
                <Label htmlFor="specialRequests">
                  Special Requests (Optional)
                </Label>
                <Textarea
                  id="specialRequests"
                  value={specialRequests}
                  onChange={(e) => setSpecialRequests(e.target.value)}
                  placeholder="Any dietary restrictions, allergies, or special occasions?"
                  className="min-h-[100px]"
                />
              </div>

              <Button
                type="submit"
                className="w-full bg-amber-600 hover:bg-amber-700 text-white"
                disabled={!isFormValid}
              >
                Book Table
              </Button>
            </form>
          </div>

          {/* Information Cards */}
          <div className="space-y-6">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">
              Reservation Information
            </h2>

            <Card className="bg-amber-50 border-amber-100">
              <CardContent className="pt-6">
                <div className="flex items-start space-x-4">
                  <Clock className="h-6 w-6 text-amber-600 mt-1" />
                  <div>
                    <h3 className="text-xl font-semibold mb-2">
                      Opening Hours
                    </h3>
                    <div className="space-y-1 text-gray-600">
                      <p>Monday - Friday: 11:00 AM - 10:00 PM</p>
                      <p>Saturday - Sunday: 10:00 AM - 11:00 PM</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-amber-50 border-amber-100">
              <CardContent className="pt-6">
                <div className="flex items-start space-x-4">
                  <Users className="h-6 w-6 text-amber-600 mt-1" />
                  <div>
                    <h3 className="text-xl font-semibold mb-2">
                      Group Reservations
                    </h3>
                    <p className="text-gray-600">
                      For parties larger than 10 people, please call us directly
                      at (555) 123-4567 to arrange your reservation.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-amber-50 border-amber-100">
              <CardContent className="pt-6">
                <div className="flex items-start space-x-4">
                  <UtensilsCrossed className="h-6 w-6 text-amber-600 mt-1" />
                  <div>
                    <h3 className="text-xl font-semibold mb-2">
                      Private Dining
                    </h3>
                    <p className="text-gray-600">
                      We offer private dining rooms for special events. Contact
                      us for more information about hosting your next
                      celebration at Nil's Kitchen.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="p-6 bg-gray-100 rounded-lg border border-gray-200">
              <h3 className="text-xl font-semibold mb-2">Reservation Policy</h3>
              <ul className="list-disc pl-5 space-y-1 text-gray-600">
                <li>
                  Reservations are held for 15 minutes past the scheduled time.
                </li>
                <li>Please call if you're running late or need to cancel.</li>
                <li>A credit card is required for parties of 6 or more.</li>
                <li>Cancellations within 24 hours may incur a fee.</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Confirmation Dialog */}
      <Dialog open={isConfirmationOpen} onOpenChange={setIsConfirmationOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Reservation Confirmed!</DialogTitle>
            <DialogDescription>
              Your table has been successfully reserved.
            </DialogDescription>
          </DialogHeader>
          <div className="flex flex-col items-center py-4">
            <div className="rounded-full bg-green-100 p-3 mb-4">
              <CheckCircle2 className="h-8 w-8 text-green-600" />
            </div>
            <div className="text-center space-y-3">
              <p className="font-medium">
                Thank you, {name}! We look forward to serving you.
              </p>
              <div className="bg-gray-50 p-4 rounded-md">
                <p className="font-medium">Reservation Details:</p>
                <p>Date: {date ? format(date, "PPP") : ""}</p>
                <p>Time: {time}</p>
                <p>
                  Party Size: {guests}{" "}
                  {parseInt(guests) === 1 ? "Guest" : "Guests"}
                </p>
              </div>
              <p className="text-sm text-gray-500">
                A confirmation email has been sent to {email}. If you need to
                make any changes to your reservation, please call us at (555)
                123-4567.
              </p>
            </div>
          </div>
          <div className="flex justify-center">
            <Button
              onClick={() => setIsConfirmationOpen(false)}
              className="bg-amber-600 hover:bg-amber-700 text-white"
            >
              Close
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ReservationPage;
