
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";

const WelcomeScreen = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 flex flex-col">
      <div className="flex-1 flex flex-col items-center justify-center px-6 py-12">
        <div className="text-center mb-12 animate-fade-in">
          <div className="w-32 h-32 mx-auto mb-8 bg-white rounded-3xl flex items-center justify-center shadow-xl">
            <div className="text-blue-600 text-5xl font-bold">F</div>
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Welcome to Fluxpense</h1>
          <p className="text-gray-600 text-lg leading-relaxed max-w-sm mx-auto">
            Take control of your finances with smart expense tracking and insightful reports
          </p>
        </div>

        <div className="w-full max-w-md space-y-4 animate-slide-up">
          <Button 
            onClick={() => navigate("/signup")}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-4 rounded-2xl text-lg"
          >
            Get Started
          </Button>
          
          <Button 
            onClick={() => navigate("/login")}
            variant="outline"
            className="w-full border-2 border-blue-600 text-blue-600 hover:bg-blue-50 font-semibold py-4 rounded-2xl text-lg"
          >
            I Already Have an Account
          </Button>
        </div>
      </div>

      <div className="px-6 pb-8 text-center">
        <p className="text-gray-500 text-sm">
          By continuing, you agree to our Terms of Service and Privacy Policy
        </p>
      </div>
    </div>
  );
};

export default WelcomeScreen;
