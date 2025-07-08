
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card } from "@/components/ui/card";
import BottomNavigation from "@/components/BottomNavigation";
import { ArrowLeft, Camera, Upload, Scan } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const AddExpense = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isScanning, setIsScanning] = useState(false);
  const [formData, setFormData] = useState({
    amount: "",
    category: "",
    description: "",
    date: new Date().toISOString().split('T')[0],
    receipt: null as File | null,
  });

  const categories = [
    "Food & Dining",
    "Transportation",
    "Shopping",
    "Entertainment",
    "Bills & Utilities",
    "Healthcare",
    "Travel",
    "Education",
    "Other"
  ];

  const handleReceiptUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setFormData(prev => ({ ...prev, receipt: file }));
      setIsScanning(true);
      
      // Simulate AI processing
      setTimeout(() => {
        setFormData(prev => ({
          ...prev,
          amount: "47.83",
          category: "Food & Dining",
          description: "Grocery Store - Walmart",
        }));
        setIsScanning(false);
        toast({
          title: "Receipt Scanned!",
          description: "Details extracted successfully. Please review and save.",
        });
      }, 2000);
    }
  };

  const handleSave = () => {
    if (!formData.amount || !formData.category) {
      toast({
        title: "Missing Information",
        description: "Please fill in amount and category.",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Expense Added!",
      description: `$${formData.amount} expense saved successfully.`,
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
          <h1 className="text-lg font-semibold">Add Expense</h1>
          <Button
            onClick={handleSave}
            disabled={!formData.amount || !formData.category}
            className="bg-blue-600 hover:bg-blue-700 text-white text-sm px-4 py-2"
          >
            Save
          </Button>
        </div>
      </div>

      <div className="px-4 py-6 space-y-6">
        {/* Receipt Scanner */}
        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4">Smart Receipt Scanner</h3>
          <div className="space-y-4">
            <div className="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center">
              {isScanning ? (
                <div className="space-y-4">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
                  <p className="text-gray-600">Scanning receipt...</p>
                  <p className="text-sm text-gray-500">AI is extracting expense details</p>
                </div>
              ) : formData.receipt ? (
                <div className="space-y-4">
                  <div className="bg-green-100 text-green-600 rounded-full w-12 h-12 flex items-center justify-center mx-auto">
                    <Scan className="w-6 h-6" />
                  </div>
                  <p className="text-gray-900 font-medium">Receipt scanned successfully!</p>
                  <p className="text-sm text-gray-500">Details have been extracted automatically</p>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="text-gray-400">
                    <Camera className="w-12 h-12 mx-auto mb-2" />
                  </div>
                  <div>
                    <p className="text-gray-900 font-medium mb-2">Scan your receipt</p>
                    <p className="text-sm text-gray-500 mb-4">
                      Take a photo or upload an image and we'll extract the details automatically
                    </p>
                  </div>
                </div>
              )}
            </div>

            <div className="flex space-x-3">
              <label className="flex-1">
                <input
                  type="file"
                  accept="image/*"
                  capture="environment"
                  onChange={handleReceiptUpload}
                  className="hidden"
                  id="camera-input"
                />
                <Button
                  type="button"
                  variant="outline"
                  className="w-full border-blue-600 text-blue-600 hover:bg-blue-50"
                  onClick={() => (document.getElementById('camera-input') as HTMLInputElement)?.click()}
                >
                  <Camera className="w-4 h-4 mr-2" />
                  Take Photo
                </Button>
              </label>
              
              <label className="flex-1">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleReceiptUpload}
                  className="hidden"
                  id="upload-input"
                />
                <Button
                  type="button"
                  variant="outline"
                  className="w-full border-blue-600 text-blue-600 hover:bg-blue-50"
                  onClick={() => (document.getElementById('upload-input') as HTMLInputElement)?.click()}
                >
                  <Upload className="w-4 h-4 mr-2" />
                  Upload
                </Button>
              </label>
            </div>
          </div>
        </Card>

        {/* Manual Entry Form */}
        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4">Expense Details</h3>
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
              <Label className="text-gray-700 font-medium">Category *</Label>
              <Select value={formData.category} onValueChange={(value) => setFormData(prev => ({ ...prev, category: value }))}>
                <SelectTrigger className="h-14 rounded-xl">
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((category) => (
                    <SelectItem key={category} value={category}>
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label className="text-gray-700 font-medium">Description</Label>
              <Textarea
                placeholder="Add a note about this expense..."
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
            {["5", "10", "25", "50", "100", "200"].map((amount) => (
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

export default AddExpense;
