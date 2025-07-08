
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card } from "@/components/ui/card";
import BottomNavigation from "@/components/BottomNavigation";
import { ArrowLeft } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const AddIncome = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    amount: "",
    source: "",
    description: "",
    date: new Date().toISOString().split('T')[0],
  });

  const incomeSources = [
    "Salary",
    "Freelance",
    "Business",
    "Investment",
    "Gift",
    "Bonus",
    "Refund",
    "Other"
  ];

  const handleSave = () => {
    if (!formData.amount || !formData.source) {
      toast({
        title: "Missing Information",
        description: "Please fill in amount and source.",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Income Added!",
      description: `$${formData.amount} income saved successfully.`,
    });
    navigate("/dashboard");
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Header */}
      <div className="bg-white px-4 py-4 border-b border-gray-100">
        <div className="flex items-center justify-between">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigate(-1)}
            className="text-gray-600"
          >
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <h1 className="text-lg font-semibold">Add Income</h1>
          <Button
            onClick={handleSave}
            disabled={!formData.amount || !formData.source}
            className="bg-green-600 hover:bg-green-700 text-white text-sm px-4 py-2"
          >
            Save
          </Button>
        </div>
      </div>

      <div className="px-4 py-6 space-y-6">
        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4">Income Details</h3>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label className="text-gray-700 font-medium">Amount *</Label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 text-lg">$</span>
                <Input
                  type="number"
                  placeholder="0.00"
                  value={formData.amount}
                  onChange={(e) => setFormData(prev => ({ ...prev, amount: e.target.value }))}
                  className="h-14 rounded-xl pl-8 text-lg font-semibold"
                  step="0.01"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label className="text-gray-700 font-medium">Source *</Label>
              <Select value={formData.source} onValueChange={(value) => setFormData(prev => ({ ...prev, source: value }))}>
                <SelectTrigger className="h-14 rounded-xl">
                  <SelectValue placeholder="Select income source" />
                </SelectTrigger>
                <SelectContent>
                  {incomeSources.map((source) => (
                    <SelectItem key={source} value={source}>
                      {source}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label className="text-gray-700 font-medium">Description</Label>
              <Textarea
                placeholder="Add a note about this income..."
                value={formData.description}
                onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                className="rounded-xl resize-none"
                rows={3}
              />
            </div>

            <div className="space-y-2">
              <Label className="text-gray-700 font-medium">Date</Label>
              <Input
                type="date"
                value={formData.date}
                onChange={(e) => setFormData(prev => ({ ...prev, date: e.target.value }))}
                className="h-14 rounded-xl"
              />
            </div>
          </div>
        </Card>

        {/* Quick Amounts */}
        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4">Quick Amounts</h3>
          <div className="grid grid-cols-3 gap-3">
            {["100", "500", "1000", "2000", "3000", "5000"].map((amount) => (
              <Button
                key={amount}
                variant="outline"
                onClick={() => setFormData(prev => ({ ...prev, amount }))}
                className="h-12 rounded-xl text-lg font-semibold"
              >
                ${amount}
              </Button>
            ))}
          </div>
        </Card>
      </div>

      <BottomNavigation />
    </div>
  );
};

export default AddIncome;
