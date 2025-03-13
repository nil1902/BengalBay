import React from "react";
import UserDashboard from "@/components/user/UserDashboard";
import { useAuth } from "@/contexts/AuthContext";
import { Navigate } from "react-router-dom";

function Profile() {
  const { currentUser } = useAuth();

  // Redirect to login if not authenticated
  if (!currentUser) {
    return <Navigate to="/login" />;
  }

  return <UserDashboard />;
}

export default Profile;
