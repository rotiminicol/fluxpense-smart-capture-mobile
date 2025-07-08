
import { useState, useEffect } from "react";
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
import { motion } from "framer-motion";
import { Info, Camera } from "lucide-react";
import { Tooltip } from "@/components/ui/tooltip";
import { transactionService } from "@/services/transactionService";
import { categoryService } from "@/services/categoryService";

const AddIncome = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    amount: "",
    source: "",
    description: "",
    date: new Date().toISOString().split('T')[0],
  });
  const [loading, setLoading] = useState(false);
  const [incomeSources, setIncomeSources] = useState<string[]>([]);

  useEffect(() => {
    // Try to fetch income sources from backend (as categories of type 'income' or similar)
    categoryService.getCategories().then(categories => {
      // If categories have a type or can be filtered for income sources, do so
      // Otherwise, fallback to all categories or a static list
      const sources = categories
        .filter((cat: any) => cat.type === 'income' || cat.is_income_source)
        .map((cat: any) => cat.name);
      setIncomeSources(sources.length ? sources : [
        "Salary", "Freelance", "Business", "Investment", "Gift", "Bonus", "Refund", "Other"
      ]);
    }).catch(() => {
      setIncomeSources(["Salary", "Freelance", "Business", "Investment", "Gift", "Bonus", "Refund", "Other"]);
    });
  }, []);

  const handleSave = async () => {
    if (!formData.amount || !formData.source) {
      toast({
        title: "Missing Information",
        description: "Please fill in amount and source.",
        variant: "destructive",
      });
      return;
    }
    setLoading(true);
    try {
      await transactionService.createTransaction({
        title: formData.source,
        description: formData.description,
        amount: parseFloat(formData.amount),
        type: 'income',
        date: formData.date,
        // Add more fields as needed (category_id, etc.)
      });
      toast({
        title: "Income Added!",
        description: `$${formData.amount} income saved successfully.`,
      });
      navigate("/dashboard");
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to add income. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="min-h-screen bg-gradient-to-br from-blue-100/60 to-blue-200/80 pb-20 flex flex-col items-center"
    >
      {/* Header */}
      <div className="w-full max-w-xl px-4 sm:px-0 py-8">
        <div className="flex items-center justify-between mb-8">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => navigate(-1)}
            className="rounded-full bg-white/70 hover:bg-blue-100 shadow-md border border-blue-200 transition-all duration-200 group"
            aria-label="Back"
          >
            <ArrowLeft className="w-6 h-6 text-blue-600 group-hover:-translate-x-1 transition-transform duration-200" />
          </Button>
          <h1 className="text-2xl font-bold text-blue-800 ml-2 tracking-tight flex-1">Add Income</h1>
          <Button
            onClick={handleSave}
            disabled={!formData.amount || !formData.source || loading}
            className="bg-green-600 hover:bg-green-700 text-white text-md px-6 py-3 rounded-xl shadow-lg relative overflow-hidden animate-ripple flex items-center justify-center"
          >
            {loading ? (
              <span className="loader mr-2"></span>
            ) : null}
            Save
          </Button>
        </div>
        {/* Income Details Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.97, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <Card className="p-8 rounded-3xl glass-card shadow-2xl mb-10">
            <h3 className="text-lg font-semibold mb-6 flex items-center gap-2"><Info className="w-5 h-5 text-blue-400" /> Income Details</h3>
            <div className="space-y-6">
              {/* Amount */}
              <div className="relative group">
                <Label className="text-gray-700 font-medium flex items-center gap-1">
                  Amount *
                  <Tooltip>
                    <Info className="w-4 h-4 text-blue-400 ml-1" />
                    <span className="text-xs px-2 py-1 rounded bg-blue-100 text-blue-700 ml-2">Enter amount in USD (e.g., 100.00)</span>
                  </Tooltip>
                </Label>
                <div className="relative mt-2">
                  <motion.span
                    animate={formData.amount ? { y: [0, -4, 0], scale: [1, 1.2, 1] } : {}}
                    transition={{ duration: 0.5, repeat: formData.amount ? Infinity : 0, repeatType: "reverse" }}
                    className={`absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 text-lg pointer-events-none ${formData.amount ? 'text-blue-500' : ''}`}
                  >$
                  </motion.span>
                  <Input
                    type="number"
                    placeholder="0.00"
                    value={formData.amount}
                    onChange={(e) => setFormData(prev => ({ ...prev, amount: e.target.value }))}
                    className="h-14 rounded-xl pl-8 text-lg font-semibold focus:scale-[1.03] focus:shadow-[0_0_0_3px_rgba(34,197,94,0.2)] transition-all duration-200 border-2 border-transparent focus:border-green-400 bg-white/80"
                    step="0.01"
                  />
                </div>
              </div>
              {/* Source */}
              <div className="relative group">
                <Label className="text-gray-700 font-medium flex items-center gap-1">
                  Source *
                  <Tooltip>
                    <Info className="w-4 h-4 text-blue-400 ml-1" />
                    <span className="text-xs px-2 py-1 rounded bg-blue-100 text-blue-700 ml-2">Select where this income is from</span>
                  </Tooltip>
                </Label>
                <Select value={formData.source} onValueChange={(value) => setFormData(prev => ({ ...prev, source: value }))}>
                  <SelectTrigger className="h-14 rounded-xl focus:scale-[1.03] focus:shadow-[0_0_0_3px_rgba(34,197,94,0.2)] transition-all duration-200 border-2 border-transparent focus:border-green-400 bg-white/80">
                    <SelectValue placeholder="Select income source" />
                  </SelectTrigger>
                  <SelectContent>
                    {incomeSources.map((source) => (
                      <SelectItem key={source} value={source} className="text-lg">
                        {source}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              {/* Description */}
              <div className="relative group">
                <Label className="text-gray-700 font-medium flex items-center gap-1">
                  Description
                  <Tooltip>
                    <Info className="w-4 h-4 text-blue-400 ml-1" />
                    <span className="text-xs px-2 py-1 rounded bg-blue-100 text-blue-700 ml-2">Add any notes or details</span>
                  </Tooltip>
                </Label>
                <Textarea
                  placeholder="Add a note about this income..."
                  value={formData.description}
                  onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                  className="rounded-xl resize-none focus:scale-[1.03] focus:shadow-[0_0_0_3px_rgba(34,197,94,0.2)] transition-all duration-200 border-2 border-transparent focus:border-green-400 bg-white/80"
                  rows={3}
                />
                {/* Optional: Camera icon for future proof upload */}
                <Button size="icon" className="absolute right-2 bottom-2 bg-blue-100 hover:bg-blue-200 text-blue-600 rounded-full shadow transition-all duration-200" aria-label="Attach Proof">
                  <Camera className="w-5 h-5" />
                </Button>
              </div>
              {/* Date */}
              <div className="relative group">
                <Label className="text-gray-700 font-medium flex items-center gap-1">
                  Date
                  <Tooltip>
                    <Info className="w-4 h-4 text-blue-400 ml-1" />
                    <span className="text-xs px-2 py-1 rounded bg-blue-100 text-blue-700 ml-2">When did you receive this income?</span>
                  </Tooltip>
                </Label>
                <Input
                  type="date"
                  value={formData.date}
                  onChange={(e) => setFormData(prev => ({ ...prev, date: e.target.value }))}
                  className="h-14 rounded-xl focus:scale-[1.03] focus:shadow-[0_0_0_3px_rgba(34,197,94,0.2)] transition-all duration-200 border-2 border-transparent focus:border-green-400 bg-white/80"
                />
              </div>
            </div>
          </Card>
        </motion.div>
        {/* Quick Amounts Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.97, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <Card className="p-8 rounded-3xl glass-card shadow-2xl mb-10">
            <h3 className="text-lg font-semibold mb-6 flex items-center gap-2"><Info className="w-5 h-5 text-blue-400" /> Quick Amounts</h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              {["100", "500", "1000", "2000", "3000", "5000"].map((amount) => (
                <motion.div
                  key={amount}
                  whileHover={{ scale: 1.07 }}
                  whileTap={{ scale: 0.97 }}
                  className="w-full"
                >
                  <Button
                    variant={formData.amount === amount ? "default" : "outline"}
                    onClick={() => setFormData(prev => ({ ...prev, amount }))}
                    className={`h-14 rounded-xl text-lg font-semibold w-full transition-all duration-200 relative overflow-hidden ${formData.amount === amount ? 'border-2 border-green-400 shadow-green-200 animate-glow-on-press' : ''}`}
                  >
                    ${amount}
                    {formData.amount === amount && (
                      <motion.span
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ type: "spring", stiffness: 300 }}
                        className="absolute top-2 right-2 text-green-500"
                      >
                        ✓
                      </motion.span>
                    )}
                  </Button>
                </motion.div>
              ))}
            </div>
          </Card>
        </motion.div>
      </div>
      <BottomNavigation />
    </motion.div>
  );
};

export default AddIncome;
