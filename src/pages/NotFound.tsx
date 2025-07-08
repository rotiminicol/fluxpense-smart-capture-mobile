import { useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

const NotFound = () => {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    console.error("404 Error: User attempted to access:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-100 to-slate-300 px-4">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="text-center p-8 bg-white/80 backdrop-blur-xl shadow-2xl rounded-2xl max-w-md w-full"
      >
        <h1 className="text-7xl font-extrabold text-red-600 drop-shadow-md mb-4">404</h1>
        <p className="text-xl text-gray-700 font-medium mb-2">
          Oops! Page not found.
        </p>
        <p className="text-sm text-gray-500 mb-6">
          The page <code className="font-mono">{location.pathname}</code> doesn’t exist or was moved.
        </p>
        <Button
          onClick={() => navigate("/")}
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl text-sm font-semibold transition-all duration-200"
        >
          Return to Home
        </Button>
      </motion.div>
    </div>
  );
};

export default NotFound;
