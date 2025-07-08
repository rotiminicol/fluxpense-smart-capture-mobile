
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const SplashScreen = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate("/welcome");
    }, 2500);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-600 to-blue-800 flex items-center justify-center">
      <div className="text-center animate-fade-in">
        <div className="mb-8">
          <div className="w-24 h-24 mx-auto mb-6 bg-white rounded-2xl flex items-center justify-center shadow-lg">
            <div className="text-blue-600 text-3xl font-bold">F</div>
          </div>
          <h1 className="text-4xl font-bold text-white mb-2">Fluxpense</h1>
          <p className="text-blue-100 text-lg">Smart Expense Manager</p>
        </div>
        
        <div className="flex justify-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white"></div>
        </div>
      </div>
    </div>
  );
};

export default SplashScreen;
