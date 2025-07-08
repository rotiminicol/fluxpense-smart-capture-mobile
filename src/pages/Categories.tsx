
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import BottomNavigation from "@/components/BottomNavigation";
import { ArrowLeft, Plus, Edit2, Trash2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Tooltip } from "@/components/ui/tooltip";

const categoryIcons = [
  "🍔", "🚗", "🛍️", "💡", "🎬", "💊", "🏠", "✈️"
];

const Categories = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [categories, setCategories] = useState([
    { id: 1, name: "Food & Dining", color: "bg-blue-500", budget: 500, spent: 320 },
    { id: 2, name: "Transportation", color: "bg-purple-500", budget: 300, spent: 180 },
    { id: 3, name: "Shopping", color: "bg-pink-500", budget: 400, spent: 245 },
    { id: 4, name: "Bills & Utilities", color: "bg-orange-500", budget: 800, spent: 680 },
    { id: 5, name: "Entertainment", color: "bg-green-500", budget: 200, spent: 120 },
    { id: 6, name: "Healthcare", color: "bg-red-500", budget: 150, spent: 85 },
  ]);
  
  const [newCategory, setNewCategory] = useState({ name: "", budget: "", color: "bg-blue-500" });
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const colors = [
    "bg-blue-500", "bg-purple-500", "bg-pink-500", "bg-orange-500", 
    "bg-green-500", "bg-red-500", "bg-yellow-500", "bg-indigo-500"
  ];

  const handleAddCategory = () => {
    if (!newCategory.name || !newCategory.budget) {
      toast({
        title: "Missing Information",
        description: "Please fill in category name and budget.",
        variant: "destructive",
      });
      return;
    }

    const category = {
      id: Date.now(),
      name: newCategory.name,
      color: newCategory.color,
      budget: parseInt(newCategory.budget),
      spent: 0,
    };

    setCategories(prev => [...prev, category]);
    setNewCategory({ name: "", budget: "", color: "bg-blue-500" });
    setIsDialogOpen(false);
    
    toast({
      title: "Category Added!",
      description: `${category.name} has been created successfully.`,
    });
  };

  const handleDeleteCategory = (id: number) => {
    setCategories(prev => prev.filter(cat => cat.id !== id));
    toast({
      title: "Category Deleted",
      description: "Category has been removed successfully.",
    });
  };

  useEffect(() => {
    document.body.classList.add("animate-fade-slide-in");
    return () => document.body.classList.remove("animate-fade-slide-in");
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100/60 to-blue-200/80 pb-24 flex flex-col items-center animate-fade-slide-up">
      <div className="w-full max-w-3xl px-4 sm:px-0 py-10">
        {/* Header */}
        <div className="flex items-center justify-between mb-8 animate-stagger-in" style={{animationDelay:'100ms'}}>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => navigate(-1)}
            className="rounded-full bg-white/70 hover:bg-blue-100 shadow-md border border-blue-200 transition-all duration-200"
            aria-label="Back"
          >
            <ArrowLeft className="w-6 h-6 text-blue-600" />
          </Button>
          <h1 className="text-2xl font-bold text-blue-800 ml-2 tracking-tight flex-1">Categories</h1>
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button size="icon" className="bg-blue-600 hover:bg-blue-700 text-white shadow-lg animate-ripple rounded-full w-12 h-12 flex items-center justify-center">
                <Plus className="w-6 h-6" />
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
              <DialogHeader>
                <DialogTitle>Add New Category</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Category Name</label>
                  <Input
                    placeholder="Enter category name"
                    value={newCategory.name}
                    onChange={(e) => setNewCategory(prev => ({ ...prev, name: e.target.value }))}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Monthly Budget</label>
                  <Input
                    type="number"
                    placeholder="Enter budget amount"
                    value={newCategory.budget}
                    onChange={(e) => setNewCategory(prev => ({ ...prev, budget: e.target.value }))}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Color</label>
                  <div className="flex space-x-2">
                    {colors.map((color, i) => (
                      <button
                        key={color}
                        onClick={() => setNewCategory(prev => ({ ...prev, color }))}
                        className={`w-8 h-8 rounded-full ${color} ${newCategory.color === color ? "ring-2 ring-gray-400" : ""}`}
                      >
                        <span className="text-lg">{categoryIcons[i % categoryIcons.length]}</span>
                      </button>
                    ))}
                  </div>
                </div>
                <Button onClick={handleAddCategory} className="w-full">
                  Add Category
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>
        {/* Category Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 animate-stagger-in" style={{animationDelay:'200ms'}}>
          {categories.map((category, i) => (
            <Card
              key={category.id}
              className={`relative p-8 rounded-2xl glass-card shadow-xl cursor-pointer transition-all duration-200 animate-stagger-in hover:scale-[1.04] hover:shadow-2xl group`} 
              style={{animationDelay:`${250+i*80}ms`} }
              onClick={() => navigate('/category-details', { state: { category, month: 'February' } })}
              tabIndex={0}
              aria-label={category.name}
            >
              <div className="flex flex-col items-center gap-4">
                <div className={`w-16 h-16 rounded-full flex items-center justify-center text-3xl ${category.color} shadow-lg mb-2 group-hover:scale-110 transition-transform duration-200`}>{categoryIcons[i % categoryIcons.length]}</div>
                <div className="font-bold text-blue-900 text-lg mb-1">{category.name}</div>
                <div className="text-blue-500 text-md mb-2">${category.spent} spent</div>
                <div className="w-full bg-blue-100/60 rounded-full h-2 mb-2">
                  <div
                    className={`h-2 rounded-full ${category.color}`}
                    style={{ width: `${Math.min((category.spent / category.budget) * 100, 100)}%` }}
                  ></div>
                </div>
                <div className="flex justify-between w-full text-xs">
                  <span className={`font-medium ${category.spent > category.budget ? "text-red-600" : "text-gray-600"}`}>{((category.spent / category.budget) * 100).toFixed(1)}% used</span>
                  <span className="text-gray-500">${category.budget - category.spent} left</span>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
      {/* Floating Add Button */}
      <Button
        size="icon"
        className="fixed bottom-24 right-8 z-30 bg-blue-600 hover:bg-blue-700 text-white shadow-2xl rounded-full w-16 h-16 flex items-center justify-center animate-ripple"
        onClick={() => setIsDialogOpen(true)}
        aria-label="Add Category"
      >
        <Plus className="w-8 h-8" />
      </Button>
      <BottomNavigation />
    </div>
  );
};

export default Categories;
