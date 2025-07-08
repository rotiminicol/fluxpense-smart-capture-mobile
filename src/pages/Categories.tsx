
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import BottomNavigation from "@/components/BottomNavigation";
import { ArrowLeft, Plus, Edit2, Trash2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

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
          <h1 className="text-lg font-semibold">Categories</h1>
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button size="sm" className="bg-blue-600 hover:bg-blue-700 text-white">
                <Plus className="w-4 h-4" />
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
                    {colors.map((color) => (
                      <button
                        key={color}
                        onClick={() => setNewCategory(prev => ({ ...prev, color }))}
                        className={`w-8 h-8 rounded-full ${color} ${
                          newCategory.color === color ? "ring-2 ring-gray-400" : ""
                        }`}
                      />
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
      </div>

      <div className="px-4 py-6 space-y-4">
        {categories.map((category) => (
          <Card key={category.id} className="p-4">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center space-x-3">
                <div className={`w-4 h-4 rounded-full ${category.color}`}></div>
                <h3 className="font-semibold text-gray-900">{category.name}</h3>
              </div>
              <div className="flex items-center space-x-2">
                <Button variant="ghost" size="sm" className="text-gray-500">
                  <Edit2 className="w-4 h-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleDeleteCategory(category.id)}
                  className="text-red-500 hover:text-red-600"
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            </div>
            
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Spent: ${category.spent}</span>
                <span className="text-gray-600">Budget: ${category.budget}</span>
              </div>
              
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className={`h-2 rounded-full ${category.color}`}
                  style={{ width: `${Math.min((category.spent / category.budget) * 100, 100)}%` }}
                ></div>
              </div>
              
              <div className="flex justify-between text-xs">
                <span className={`font-medium ${
                  category.spent > category.budget ? "text-red-600" : "text-gray-600"
                }`}>
                  {((category.spent / category.budget) * 100).toFixed(1)}% used
                </span>
                <span className="text-gray-500">
                  ${category.budget - category.spent} remaining
                </span>
              </div>
            </div>
          </Card>
        ))}
      </div>

      <BottomNavigation />
    </div>
  );
};

export default Categories;
