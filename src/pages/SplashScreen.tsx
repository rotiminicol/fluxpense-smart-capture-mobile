
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";

const SplashScreen = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-600 to-blue-800 flex items-center justify-center">
      <div className="text-center animate-fade-in">
        <div className="mb-8">
          <div className="w-24 h-24 mx-auto mb-6 bg-white rounded-2xl flex items-center justify-center shadow-lg">
            <div className="text-blue-600 text-3xl font-bold">F</div>
          </div>
          <h1 className="text-4xl font-bold text-white mb-2">Fluxpense</h1>
          <p className="text-blue-100 text-lg mb-8">Smart Expense Manager</p>
        </div>
        
        <Button
          onClick={() => navigate("/welcome")}
          className="bg-white text-blue-600 hover:bg-blue-50 font-semibold py-3 px-8 rounded-xl text-lg"
        >
          Continue
        </Button>
      </div>
    </div>
  );
};

export default SplashScreen;
