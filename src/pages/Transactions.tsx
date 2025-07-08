
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowLeft, Search, Filter, TrendingUp, TrendingDown } from "lucide-react";

const Transactions = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [filterCategory, setFilterCategory] = useState("all");

  const allTransactions = [
    { id: 1, title: "Grocery Shopping", category: "Food", amount: -85.50, date: "Today", time: "2:30 PM", location: "Walmart", color: "bg-red-100 text-red-600" },
    { id: 2, title: "Salary Deposit", category: "Income", amount: 3500.00, date: "Yesterday", time: "9:00 AM", location: "Direct Deposit", color: "bg-green-100 text-green-600" },
    { id: 3, title: "Gas Station", category: "Transport", amount: -45.20, date: "2 days ago", time: "6:15 PM", location: "Shell", color: "bg-red-100 text-red-600" },
    { id: 4, title: "Coffee Shop", category: "Food", amount: -12.80, date: "3 days ago", time: "8:30 AM", location: "Starbucks", color: "bg-red-100 text-red-600" },
    { id: 5, title: "Online Shopping", category: "Shopping", amount: -156.99, date: "4 days ago", time: "3:45 PM", location: "Amazon", color: "bg-red-100 text-red-600" },
    { id: 6, title: "Restaurant", category: "Food", amount: -42.30, date: "5 days ago", time: "7:20 PM", location: "Local Restaurant", color: "bg-red-100 text-red-600" },
  ];

  const categories = ["all", "Food", "Transport", "Shopping", "Entertainment", "Bills", "Income"];

  const filteredTransactions = allTransactions.filter(transaction => {
    const matchesSearch = transaction.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = filterCategory === "all" || transaction.category === filterCategory;
    return matchesSearch && matchesCategory;
  });

  const handleTransactionClick = (transaction: any) => {
    navigate("/transaction-details", { state: { transaction } });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white px-4 py-4 border-b border-gray-100">
        <div className="flex items-center mb-4">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigate("/dashboard")}
            className="text-gray-600 mr-3"
          >
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <h1 className="text-lg font-semibold">All Transactions</h1>
        </div>

        {/* Search and Filter */}
        <div className="flex space-x-3">
          <div className="flex-1 relative">
            <Search className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <Input
              placeholder="Search transactions..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 h-12 rounded-xl"
            />
          </div>
          <Select value={filterCategory} onValueChange={setFilterCategory}>
            <SelectTrigger className="w-32 h-12 rounded-xl">
              <Filter className="w-4 h-4 mr-2" />
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {categories.map((category) => (
                <SelectItem key={category} value={category}>
                  {category === "all" ? "All" : category}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="px-4 py-6">
        {/* Transaction List */}
        <div className="space-y-3">
          {filteredTransactions.map((transaction) => (
            <Card key={transaction.id} className="p-4 cursor-pointer hover:shadow-md transition-shadow" onClick={() => handleTransactionClick(transaction)}>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className={`w-10 h-10 rounded-full ${transaction.color} flex items-center justify-center`}>
                    {transaction.amount > 0 ? (
                      <TrendingUp className="w-5 h-5" />
                    ) : (
                      <TrendingDown className="w-5 h-5" />
                    )}
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">{transaction.title}</p>
                    <p className="text-sm text-gray-500">{transaction.category} • {transaction.date}</p>
                  </div>
                </div>
                <div className="text-right">
                  <span className={`font-semibold ${
                    transaction.amount > 0 ? "text-green-600" : "text-red-600"
                  }`}>
                    {transaction.amount > 0 ? "+" : ""}${Math.abs(transaction.amount).toFixed(2)}
                  </span>
                  <p className="text-xs text-gray-500">{transaction.time}</p>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {filteredTransactions.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500">No transactions found</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Transactions;
