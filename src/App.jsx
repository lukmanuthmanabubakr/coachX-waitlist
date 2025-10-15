import React, { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useLocation,
} from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import Waitlist from "./pages/Waitlist/Waitlist";
import WelcomeLogo from "./pages/WelcomeLogo/WelcomeLogo";

const AnimatedRoutes = () => {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        {/* HOME PAGE */}
        <Route
          path="/"
          element={
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -50 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
            >
              <Waitlist />
            </motion.div>
          }
        />

        {/* CATCH-ALL — REDIRECT UNKNOWN ROUTES TO HOME */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </AnimatePresence>
  );
};

const App = () => {
  const [showWelcome, setShowWelcome] = useState(true);

  // Hide welcome logo after 3 seconds
  useEffect(() => {
    const timer = setTimeout(() => setShowWelcome(false), 3000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <Router>
      {showWelcome ? (
        <WelcomeLogo />
      ) : (
        <div>
          <AnimatedRoutes />
        </div>
      )}
    </Router>
  );
};

export default App;
