import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const OnboardingScreen = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(0);
  const [userData, setUserData] = useState({
    monthlyIncome: "",
    currency: "USD",
    budgetGoal: "",
    categories: [] as string[],
    savingsGoal: "",
    trackingMethod: "",
  });

  const currencies = [
    { value: "USD", label: "USD ($)" },
    { value: "EUR", label: "EUR (€)" },
    { value: "GBP", label: "GBP (£)" },
    { value: "NGN", label: "NGN (₦)" },
    { value: "JPY", label: "JPY (¥)" },
    { value: "CAD", label: "CAD (C$)" },
    { value: "AUD", label: "AUD (A$)" },
    { value: "INR", label: "INR (₹)" },
    { value: "ZAR", label: "ZAR (R)" },
    { value: "KES", label: "KES (KSh)" },
    { value: "GHS", label: "GHS (₵)" },
  ];

  const bgImages = [
    "/2.jpg",
    "/3.jpg",
    "/5.jpg",
    "/9.jpg",
    "/11.jpg",
    "/8.jpg"
  ];

  const steps = [
    {
      title: "What's your monthly income?",
      subtitle: "This helps us provide better spending insights",
      content: (
        <div className="space-y-4">
          <div className="space-y-2">
            <Label className="text-gray-700">Monthly Income</Label>
            <Input
              type="number"
              placeholder="Enter amount"
              value={userData.monthlyIncome}
              onChange={(e) => setUserData(prev => ({ ...prev, monthlyIncome: e.target.value }))}
              className="h-14 rounded-xl text-lg"
            />
          </div>
          <div className="space-y-2">
            <Label className="text-gray-700">Currency</Label>
            <Select value={userData.currency} onValueChange={(value) => setUserData(prev => ({ ...prev, currency: value }))}>
              <SelectTrigger className="h-14 rounded-xl">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {currencies.map((currency) => (
                  <SelectItem key={currency.value} value={currency.value}>
                    {currency.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      )
    },
    {
      title: "Set your monthly budget goal",
      subtitle: "We'll help you stay on track with your spending",
      content: (
        <div className="space-y-4">
          <div className="space-y-2">
            <Label className="text-gray-700">Monthly Budget Goal</Label>
            <Input
              type="number"
              placeholder="Enter your target budget"
              value={userData.budgetGoal}
              onChange={(e) => setUserData(prev => ({ ...prev, budgetGoal: e.target.value }))}
              className="h-14 rounded-xl text-lg"
            />
          </div>
          <p className="text-sm text-gray-500">
            Recommended: 70% of your monthly income for optimal savings
          </p>
        </div>
      )
    },
    {
      title: "Choose your expense categories",
      subtitle: "Select the categories you spend on most frequently",
      content: (
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-3">
            {["Food & Dining", "Transportation", "Shopping", "Entertainment", "Bills & Utilities", "Healthcare", "Travel", "Education"].map((category) => (
              <Button
                key={category}
                variant={userData.categories.includes(category) ? "default" : "outline"}
                onClick={() => {
                  setUserData(prev => ({
                    ...prev,
                    categories: prev.categories.includes(category)
                      ? prev.categories.filter(c => c !== category)
                      : [...prev.categories, category]
                  }));
                }}
                className="h-12 rounded-xl text-sm"
              >
                {category}
              </Button>
            ))}
          </div>
        </div>
      )
    },
    {
      title: "Set a savings goal",
      subtitle: "How much would you like to save each month?",
      content: (
        <div className="space-y-4">
          <div className="space-y-2">
            <Label className="text-gray-700">Monthly Savings Goal</Label>
            <Input
              type="number"
              placeholder="Enter savings goal"
              value={userData.savingsGoal || ""}
              onChange={(e) => setUserData(prev => ({ ...prev, savingsGoal: e.target.value }))}
              className="h-14 rounded-xl text-lg"
            />
          </div>
          <p className="text-sm text-gray-500">
            Setting a savings goal helps you build financial security.
          </p>
        </div>
      )
    },
    {
      title: "How do you prefer to track expenses?",
      subtitle: "Choose your preferred tracking method",
      content: (
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-3">
            {["Manual Entry", "Photo Receipts", "Bank Sync", "Other"].map((method) => (
              <Button
                key={method}
                variant={userData.trackingMethod === method ? "default" : "outline"}
                onClick={() => setUserData(prev => ({ ...prev, trackingMethod: method }))}
                className="h-12 rounded-xl text-sm"
              >
                {method}
              </Button>
            ))}
          </div>
        </div>
      )
    },
    {
      title: "Ready to get started?",
      subtitle: "You're all set! Let's begin your journey with Fluxpense.",
      content: (
        <div className="flex flex-col items-center gap-4">
          <span className="text-5xl">��</span>
          <p className="text-lg text-blue-700 font-semibold">Welcome to a smarter way to manage your money!</p>
        </div>
      )
    }
  ];

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      navigate("/dashboard");
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  return (
    <div className="relative w-full min-h-screen flex flex-col justify-center items-center">
      {/* Background image */}
      <img
        src={bgImages[currentStep]}
        className="absolute inset-0 w-full h-full object-cover opacity-30 blur-[2px] z-0 transition-all duration-500"
        alt=""
      />
      {/* Overlay for glass effect */}
      <div className="absolute inset-0 w-full h-full bg-white/20 backdrop-blur-[2px] z-0" />
      {/* Onboarding content */}
      <div className="relative z-10 w-full max-w-lg mx-auto min-h-screen flex flex-col">
        <div className="flex items-center justify-between p-4">
          <button
            onClick={handlePrevious}
            disabled={currentStep === 0}
            aria-label="Back"
            className={`transition-all duration-200 rounded-full bg-white/70 shadow-lg border border-blue-100 p-2 flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-blue-400
            ${currentStep === 0 ? 'opacity-50 cursor-not-allowed' : 'hover:bg-blue-100 active:scale-95'}`}
          >
            <ChevronLeft className="w-7 h-7 text-blue-600" />
          </button>
          <div className="flex space-x-2 items-center">
            <span className="text-xs text-blue-700 font-semibold">Step {currentStep + 1}/6</span>
            <div className="flex gap-1">
              {steps.map((_, index) => (
                <div
                  key={index}
                  className={`transition-all duration-300 ${
                    index === currentStep
                      ? "w-6 h-2 bg-blue-600 shadow-lg"
                      : "w-2 h-2 bg-gray-200"
                  } rounded-full`}
                />
              ))}
            </div>
          </div>
          <div className="w-10"></div>
        </div>
        <div className="flex-1 flex items-center justify-center px-2">
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={currentStep}
              initial={{ x: 50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: -50, opacity: 0 }}
              transition={{ duration: 0.4, ease: "easeInOut" }}
              className="w-full"
            >
              <div className="flex flex-col items-center justify-center">
                <div className="text-center mb-8">
                  <h2 className="text-3xl font-extrabold text-blue-900 mb-2 drop-shadow-lg">
                    {steps[currentStep].title}
                  </h2>
                  <p className="text-blue-700/80 text-lg font-medium mb-2">{steps[currentStep].subtitle}</p>
                </div>
                <div className="w-full max-w-md mx-auto">
                  <div className="rounded-3xl glass-card bg-white/70 shadow-2xl p-8 mb-4 border border-blue-100 backdrop-blur-xl animate-fade-slide-up">
                    {steps[currentStep].content}
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
        <div className="pt-8 px-4 mb-8">
          <Button
            onClick={() => {
              if (currentStep === steps.length - 1) {
                // Show sign up success toast/message here
                window.setTimeout(() => {
                  window.dispatchEvent(new CustomEvent('onboarding-success'));
                }, 100);
                handleNext();
              } else {
                handleNext();
              }
            }}
            className="w-full h-16 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-2xl text-lg flex items-center justify-center shadow-xl backdrop-blur-md"
          >
            {currentStep === steps.length - 1 ? "Get Started" : "Continue"}
            <ChevronRight className="w-5 h-5 ml-2" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default OnboardingScreen;
