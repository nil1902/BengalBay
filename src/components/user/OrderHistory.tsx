import React from "react";
import { useAuth } from "@/contexts/AuthContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Package, ExternalLink } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface OrderItem {
  id: string;
  name: string;
  quantity: number;
  price: number;
  image: string;
}

interface Order {
  id: string;
  date: string;
  items: OrderItem[];
  total: number;
  status: "Delivered" | "Processing" | "Shipped" | "Cancelled";
}

// Mock orders data - in a real app, this would come from a database
const mockOrders: Order[] = [
  {
    id: "ORD-123456",
    date: "2023-06-15T10:30:00",
    items: [
      {
        id: "v2",
        name: "Vegetable Biryani",
        quantity: 1,
        price: 399,
        image:
          "https://images.unsplash.com/photo-1589302168068-964664d93dc0?w=500&q=80",
      },
      {
        id: "br1",
        name: "Garlic Naan",
        quantity: 2,
        price: 99,
        image:
          "https://images.unsplash.com/photo-1600628421055-4d30de868b8f?w=500&q=80",
      },
    ],
    total: 597,
    status: "Delivered",
  },
  {
    id: "ORD-789012",
    date: "2023-06-10T19:45:00",
    items: [
      {
        id: "nv1",
        name: "Butter Chicken",
        quantity: 1,
        price: 549,
        image:
          "https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?w=500&q=80",
      },
      {
        id: "d1",
        name: "Mango Lassi",
        quantity: 2,
        price: 149,
        image:
          "https://images.unsplash.com/photo-1527661591475-527312dd65f5?w=500&q=80",
      },
    ],
    total: 847,
    status: "Delivered",
  },
  {
    id: "ORD-345678",
    date: "2023-06-05T13:15:00",
    items: [
      {
        id: "ds1",
        name: "Gulab Jamun",
        quantity: 1,
        price: 149,
        image:
          "https://images.unsplash.com/photo-1601303516361-9e7a1e01a7ea?w=500&q=80",
      },
    ],
    total: 149,
    status: "Processing",
  },
];

const OrderHistory = () => {
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  const [orders, setOrders] = React.useState<Order[]>(mockOrders);

  // Get orders from localStorage if available
  React.useEffect(() => {
    const storedOrders = localStorage.getItem("nilsKitchenOrders");
    if (storedOrders) {
      try {
        const parsedOrders = JSON.parse(storedOrders);
        setOrders([...parsedOrders, ...orders]);
      } catch (error) {
        console.error("Failed to parse orders from localStorage", error);
      }
    }
  }, []);

  const getStatusColor = (status: Order["status"]) => {
    switch (status) {
      case "Delivered":
        return "bg-green-100 text-green-800";
      case "Processing":
        return "bg-blue-100 text-blue-800";
      case "Shipped":
        return "bg-purple-100 text-purple-800";
      case "Cancelled":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="container mx-auto py-10 px-4">
      <h1 className="text-3xl font-bold mb-6">My Orders</h1>

      {orders.length === 0 ? (
        <div className="text-center py-8">
          <Package className="h-12 w-12 mx-auto text-gray-400 mb-4" />
          <p className="text-gray-500">You haven't placed any orders yet.</p>
          <Button
            className="mt-4 bg-amber-600 hover:bg-amber-700 text-white"
            onClick={() => navigate("/menu")}
          >
            Browse Menu
          </Button>
        </div>
      ) : (
        <div className="space-y-6">
          {orders.map((order) => (
            <Card key={order.id} className="overflow-hidden">
              <CardHeader className="bg-gray-50">
                <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
                  <div>
                    <CardTitle className="text-lg">Order #{order.id}</CardTitle>
                    <p className="text-sm text-gray-500">
                      Placed on {new Date(order.date).toLocaleDateString()} at{" "}
                      {new Date(order.date).toLocaleTimeString()}
                    </p>
                  </div>
                  <Badge
                    className={`${getStatusColor(order.status)} px-3 py-1`}
                  >
                    {order.status}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="pt-6">
                <div className="space-y-4">
                  {order.items.map((item) => (
                    <div
                      key={`${order.id}-${item.id}`}
                      className="flex items-center gap-4 border-b pb-4"
                    >
                      <div className="h-16 w-16 rounded-md overflow-hidden bg-gray-100">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="h-full w-full object-cover"
                        />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-medium">{item.name}</h3>
                        <div className="flex justify-between mt-1">
                          <p className="text-sm text-gray-500">
                            Qty: {item.quantity}
                          </p>
                          <p className="font-medium">
                            ₹{(item.price * item.quantity).toFixed(2)}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}

                  <div className="flex justify-between pt-4">
                    <span className="font-medium">Total</span>
                    <span className="font-bold">₹{order.total.toFixed(2)}</span>
                  </div>

                  <div className="flex justify-end pt-2">
                    <Button
                      variant="outline"
                      size="sm"
                      className="text-amber-600 border-amber-600 hover:bg-amber-50"
                      onClick={() => navigate(`/order/${order.id}`)}
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

export default OrderHistory;
