
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ChevronLeft, ChevronRight } from "lucide-react";

const OnboardingScreen = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(0);
  const [userData, setUserData] = useState({
    monthlyIncome: "",
    currency: "USD",
    budgetGoal: "",
    categories: [] as string[],
  });

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
                <SelectItem value="USD">USD ($)</SelectItem>
                <SelectItem value="EUR">EUR (€)</SelectItem>
                <SelectItem value="GBP">GBP (£)</SelectItem>
                <SelectItem value="JPY">JPY (¥)</SelectItem>
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
    <div className="min-h-screen bg-white flex flex-col">
      <div className="flex items-center justify-between p-4 border-b">
        <Button
          variant="ghost"
          size="sm"
          onClick={handlePrevious}
          disabled={currentStep === 0}
          className="text-gray-600"
        >
          <ChevronLeft className="w-5 h-5" />
        </Button>
        <div className="flex space-x-2">
          {steps.map((_, index) => (
            <div
              key={index}
              className={`w-2 h-2 rounded-full ${
                index === currentStep ? "bg-blue-600" : "bg-gray-200"
              }`}
            />
          ))}
        </div>
        <div className="w-10"></div>
      </div>

      <div className="flex-1 px-6 py-8 flex flex-col">
        <div className="flex-1">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              {steps[currentStep].title}
            </h2>
            <p className="text-gray-600">{steps[currentStep].subtitle}</p>
          </div>

          <div className="max-w-md mx-auto">
            {steps[currentStep].content}
          </div>
        </div>

        <div className="pt-8">
          <Button
            onClick={handleNext}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-4 rounded-xl text-lg flex items-center justify-center"
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
