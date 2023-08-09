import React from "react";
import { Navigate } from "react-router-dom";

function PrivateRoute({ children }) {
  if (localStorage.getItem("user")) {
    if (JSON.parse(localStorage.getItem("user")).userType === "@adm!n") {
      return children;
    } else {
      return <Navigate to="/login" />;
    }
  } else {
    return <Navigate to="/login" />;
  }
}

export default PrivateRoute;
