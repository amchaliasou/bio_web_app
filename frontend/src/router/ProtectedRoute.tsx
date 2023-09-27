import React from "react";
import { Navigate, Route, useNavigate } from "react-router-dom";

interface IProtectedRouteProps {
  isAuthenticated: boolean;
  path: string;
  component: React.FC;
}

const ProtectedRoute: React.FC<IProtectedRouteProps> = ({
  isAuthenticated,
  path,
  component: Component,
}) => {
  const navigate = useNavigate();


  
  if (isAuthenticated) {
    return <Route path={path} element={<Component />} />;
  } else {
    navigate("/");
    return <Navigate to="/" />;
  }
};

export default ProtectedRoute;
