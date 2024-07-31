import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAppSelector } from "../hook";

const ProtectedRoute: React.FC = () => {
  const { token } = useAppSelector((state) => state.auth);
  console.log("Token in ProtectedRoute:", token);

  return token ? <Outlet /> : <Navigate to="/login" />;
};

export default ProtectedRoute;
