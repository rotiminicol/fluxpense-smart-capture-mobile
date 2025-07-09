
import { useState, useRef } from "react";
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
import { useAuth } from "@/hooks/useAuth";
import { transactionService } from "@/services/transactionService";
import { categoryService } from "@/services/categoryService";
import { paymentMethodService } from "@/services/paymentMethodService";
import { receiptService } from "@/services/receiptService";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

const AddExpense = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { user } = useAuth();
  const queryClient = useQueryClient();
  const [isScanning, setIsScanning] = useState(false);
  const [formData, setFormData] = useState({
    amount: "",
    category_id: "",
    payment_method_id: "",
    title: "",
    description: "",
    date: new Date().toISOString().split('T')[0],
    receipt: null as File | null,
    receiptUrl: ""
  });
  const [inputFocus, setInputFocus] = useState<string | null>(null);
  const cameraInputRef = useRef<HTMLInputElement>(null);
  const uploadInputRef = useRef<HTMLInputElement>(null);

  // Fetch categories
  const { data: categories = [] } = useQuery({
    queryKey: ['categories'],
    queryFn: categoryService.getCategories,
    enabled: !!user,
  });

  // Fetch payment methods
  const { data: paymentMethods = [] } = useQuery({
    queryKey: ['paymentMethods'],
    queryFn: paymentMethodService.getPaymentMethods,
    enabled: !!user,
  });

  // Create transaction mutation
  const createTransactionMutation = useMutation({
    mutationFn: transactionService.createTransaction,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['transactions'] });
      toast({
        title: "Expense Added!",
        description: `$${formData.amount} expense saved successfully.`,
      });
      navigate("/dashboard");
    },
    onError: (error: any) => {
      toast({
        title: "Error",
        description: error.message || "Failed to save expense. Please try again.",
        variant: "destructive",
      });
    },
  });

  const handleReceiptUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setFormData(prev => ({ ...prev, receipt: file, receiptUrl: URL.createObjectURL(file) }));
      setIsScanning(true);
      try {
        const result = await receiptService.processReceiptWithOCR(file);
        console.log('OCR Result:', result);
        // Improved auto-fill logic
        if (result.parsed) {
          setFormData(prev => ({
            ...prev,
            amount: result.parsed.total || prev.amount,
            title: result.parsed.merchant || prev.title || 'Receipt',
            description: result.parsed.merchant ? `Receipt from ${result.parsed.merchant}` : prev.description,
            date: result.parsed.date || prev.date,
          }));
        }
        toast({
          title: "Scan Successful!",
          description: "Receipt processed successfully. Form auto-filled with extracted data.",
        });
      } catch (error: any) {
        console.error('Receipt processing failed:', error);
        toast({
          title: "Scan Failed",
          description: error?.message || (typeof error === 'string' ? error : JSON.stringify(error)) || "Could not process receipt. Please enter details manually.",
          variant: "destructive",
        });
      } finally {
        setIsScanning(false);
      }
    }
  };

  const handleCameraCapture = () => {
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      navigator.mediaDevices.getUserMedia({ video: true })
        .then(() => {
          cameraInputRef.current?.click();
        })
        .catch(() => {
          toast({
            title: "Camera Access Denied",
            description: "Please allow camera access to take photos of receipts.",
            variant: "destructive",
          });
        });
    } else {
      cameraInputRef.current?.click();
    }
  };

  const handleSave = () => {
    if (!formData.amount || !formData.category_id) {
      toast({
        title: "Missing Information",
        description: "Please fill in amount and category.",
        variant: "destructive",
      });
      return;
    }

    const transactionData = {
      title: formData.title || "Expense",
      description: formData.description,
      amount: parseFloat(formData.amount),
      type: 'expense' as const,
      date: formData.date,
      time: new Date().toTimeString().split(' ')[0],
      category_id: parseInt(formData.category_id),
      payment_method_id: formData.payment_method_id ? parseInt(formData.payment_method_id) : undefined,
      status: 'completed' as const,
      location: "",
      notes: formData.description,
      receipt_image_url: formData.receiptUrl,
    };

    createTransactionMutation.mutate(transactionData);
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-20 animate-fade-in-up">
      {/* Header */}
      <div className="bg-white/80 backdrop-blur-lg px-4 py-4 border-b border-gray-100 shadow-xl rounded-b-2xl">
        <div className="flex items-center justify-between">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => {
              if (window.history.length > 2) {
                navigate(-1);
              } else {
                navigate('/dashboard');
              }
            }}
            className="w-11 h-11 rounded-full bg-white/80 shadow-lg border border-blue-100 hover:bg-blue-50 text-blue-600 flex items-center justify-center transition-all duration-200"
            aria-label="Back"
          >
            <ArrowLeft className="w-6 h-6" />
          </Button>
          <h1 className="text-lg font-semibold">Add Expense</h1>
          <Button
            onClick={handleSave}
            disabled={!formData.amount || !formData.category_id || createTransactionMutation.isPending}
            className="bg-blue-600 hover:bg-blue-700 active:scale-[0.98] text-white text-base px-6 py-3 rounded-2xl font-bold shadow-lg transition-all duration-150 animate-pulse-on-press"
          >
            {createTransactionMutation.isPending ? "Saving..." : "Save"}
          </Button>
        </div>
      </div>

      <div className="px-4 py-6 space-y-6">
        {/* Receipt Scanner */}
        <Card className="p-6 glass-card rounded-2xl shadow-xl">
          <h3 className="text-lg font-semibold mb-4">Smart Receipt Scanner</h3>
          <div className="space-y-4">
            <div className="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center bg-white/60 backdrop-blur-md transition-all duration-200">
              {isScanning ? (
                <div className="space-y-4">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
                  <p className="text-gray-600">Scanning receipt...</p>
                  <p className="text-sm text-gray-500">AI is extracting expense details</p>
                </div>
              ) : formData.receipt ? (
                <div className="space-y-4">
                  <div className="bg-green-100 text-green-600 rounded-full w-12 h-12 flex items-center justify-center mx-auto animate-zoom-in">
                    <Scan className="w-6 h-6" />
                  </div>
                  <p className="text-gray-900 font-medium">Receipt scanned successfully!</p>
                  <p className="text-sm text-gray-500">Details have been extracted automatically</p>
                  {formData.receiptUrl && (
                    <img
                      src={formData.receiptUrl}
                      alt="Receipt Preview"
                      className="mx-auto mt-2 rounded-xl shadow-md w-32 h-32 object-cover animate-zoom-in"
                    />
                  )}
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
              <div className="flex-1">
                <input
                  type="file"
                  accept="image/*"
                  capture="environment"
                  onChange={handleReceiptUpload}
                  className="hidden"
                  id="camera-input"
                  ref={cameraInputRef}
                />
                <Button
                  type="button"
                  variant="outline"
                  className="w-full border-blue-600 text-blue-600 hover:bg-blue-50 transition-all duration-150 focus:ring-2 focus:ring-blue-200"
                  onClick={handleCameraCapture}
                >
                  <Camera className="w-4 h-4 mr-2" />
                  Take Photo
                </Button>
              </div>
              <div className="flex-1">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleReceiptUpload}
                  className="hidden"
                  id="upload-input"
                  ref={uploadInputRef}
                />
                <Button
                  type="button"
                  variant="outline"
                  className="w-full border-blue-600 text-blue-600 hover:bg-blue-50 transition-all duration-150 focus:ring-2 focus:ring-blue-200"
                  onClick={() => uploadInputRef.current?.click()}
                >
                  <Upload className="w-4 h-4 mr-2" />
                  Upload
                </Button>
              </div>
            </div>
          </div>
        </Card>

        {/* Manual Entry Form */}
        <Card className="p-6 glass-card rounded-2xl shadow-xl">
          <h3 className="text-lg font-semibold mb-4">Expense Details</h3>
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="amount" className="text-gray-700 font-medium">Amount *</Label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 text-lg">$</span>
                  <Input
                    id="amount"
                    type="number"
                    placeholder="0.00"
                    value={formData.amount}
                    onChange={(e) => setFormData(prev => ({ ...prev, amount: e.target.value }))}
                    onFocus={() => setInputFocus('amount')}
                    onBlur={() => setInputFocus(null)}
                    className={`h-14 rounded-xl pl-8 text-lg font-semibold transition-all duration-150 ${inputFocus === 'amount' ? 'ring-2 ring-blue-300 shadow-md' : ''}`}
                    step="0.01"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="title" className="text-gray-700 font-medium">Title</Label>
                <Input
                  id="title"
                  placeholder="What did you buy?"
                  value={formData.title}
                  onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                  className="h-14 rounded-xl"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="category" className="text-gray-700 font-medium">Category *</Label>
                <Select value={formData.category_id} onValueChange={(value) => setFormData(prev => ({ ...prev, category_id: value }))}>
                  <SelectTrigger className="h-14 rounded-xl">
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((category) => (
                      <SelectItem key={category.id} value={category.id.toString()}>
                        <div className="flex items-center space-x-2">
                          <span>{category.icon || '💰'}</span>
                          <span>{category.name}</span>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="payment_method" className="text-gray-700 font-medium">Payment Method</Label>
                <Select value={formData.payment_method_id} onValueChange={(value) => setFormData(prev => ({ ...prev, payment_method_id: value }))}>
                  <SelectTrigger className="h-14 rounded-xl">
                    <SelectValue placeholder="Select payment method" />
                  </SelectTrigger>
                  <SelectContent>
                    {paymentMethods.map((method) => (
                      <SelectItem key={method.id} value={method.id.toString()}>
                        {method.name} {method.last_four_digits && `****${method.last_four_digits}`}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="description" className="text-gray-700 font-medium">Description</Label>
                <Textarea
                  id="description"
                  placeholder="Add a note about this expense..."
                  value={formData.description}
                  onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                  className="rounded-xl resize-none"
                  rows={3}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="date" className="text-gray-700 font-medium">Date</Label>
                <Input
                  id="date"
                  type="date"
                  value={formData.date}
                  onChange={(e) => setFormData(prev => ({ ...prev, date: e.target.value }))}
                  className="h-14 rounded-xl"
                />
              </div>
            </div>
          </div>
        </Card>

        {/* Quick Amounts */}
        <Card className="p-6 glass-card rounded-2xl shadow-xl">
          <h3 className="text-lg font-semibold mb-4">Quick Amounts</h3>
          <div className="grid grid-cols-3 gap-3">
            {["5", "10", "25", "50", "100", "200"].map((amount) => (
              <Button
                key={amount}
                variant="outline"
                onClick={() => setFormData(prev => ({ ...prev, amount }))}
                className="h-12 rounded-xl text-lg font-semibold transition-all duration-150 hover:bg-blue-50 focus:ring-2 focus:ring-blue-200"
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
