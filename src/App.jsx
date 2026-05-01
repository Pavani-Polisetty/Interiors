import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { useEffect } from "react";

import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Home from "./pages/Home";
import About from "./pages/About";
import Services from "./pages/Services";
import Contact from "./pages/Contact";
import Booking from "./pages/Booking";
import BookingSuccess from "./pages/BookingSuccess";
import Projects from "./pages/Projects";
import Profile from "./pages/Profile";

// ⭐ IMPORT SERVICE PAGES (MISSING IN YOUR CODE)
import HomeInterior from "./pages/services/HomeInterior";
import ModularKitchen from "./pages/services/ModularKitchen";
import OfficeInterior from "./pages/services/OfficeInterior";
import CustomFurniture from "./pages/services/CustomFurniture";

import ProtectedRoute from "./ProtectedRoute";
import ScrollToTop from "./components/ScrollToTop";

/* Scroll to top logic */
function AppRoutes() {
  const location = useLocation();

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />

      <Route path="/home" element={<Home />} />

      <Route path="/about" element={<About />} />

      <Route path="/services" element={<Services />} />

      <Route
        path="/profile"
        element={
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>
        }
      />

      <Route
        path="/booking"
        element={
          <ProtectedRoute>
            <Booking />
          </ProtectedRoute>
        }
      />

      <Route path="/booking-success" element={<BookingSuccess />} />

      {/* ⭐ Service Detail Pages */}
      <Route path="/services/home-interior" element={<HomeInterior />} />
      <Route path="/services/modular-kitchen" element={<ModularKitchen />} />
      <Route path="/services/office-interior" element={<OfficeInterior />} />
      <Route path="/services/custom-furniture" element={<CustomFurniture />} />
      <Route path="/projects" element={<Projects />} />
      {/* Make contact/booking page publicly accessible */}
      <Route path="/contact" element={<Contact />} />
    </Routes>
  );
}

function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <AppRoutes />
    </BrowserRouter>
  );
}

export default App;
