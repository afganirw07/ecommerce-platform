import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import LandingPages from "./pages/landingPages";
import LoginUser from "./components/LoginAndRegist/LoginUser";
import RegisterUser from "./components/LoginAndRegist/RegisterUser";
import Home from "./pages/home";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPages />} />
      <Route path="/login" element={<LoginUser />} />
      <Route path="/register" element={<RegisterUser />} />
      <Route
        path="/home"
        element={
          <ProtectedRoute>
            <Home />
          </ProtectedRoute>
        }
      />
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
}

export default App;
