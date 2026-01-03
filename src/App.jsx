import { Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import Home from "./components/Home";
import Destinations from "./components/Destinations";
import DestinationDetails from "./components/DestinationDetails";
import Booking from "./components/Booking";
import Dashboard from "./components/Dashboard";
import Contact from "./components/Contact";
import Login from "./components/Login";
import Signup from "./components/Signup";
import PrivateRoute from "./components/PrivateRoute";

function App() {
  return (
    <>
      <Navbar />

      <div className="p-4">
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/contact" element={<Contact />} />

          {/* Protected Routes */}
          <Route
            path="/destinations"
            element={
              <PrivateRoute>
                <Destinations />
              </PrivateRoute>
            }
          />

          <Route
            path="/destinations/:id"
            element={
              <PrivateRoute>
                <DestinationDetails />
              </PrivateRoute>
            }
          />

          <Route
            path="/booking/:id"
            element={
              <PrivateRoute>
                <Booking />
              </PrivateRoute>
            }
          />

          <Route
            path="/dashboard"
            element={
              <PrivateRoute>
                <Dashboard />
              </PrivateRoute>
            }
          />
        </Routes>
      </div>
    </>
  );
}

export default App;
