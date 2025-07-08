
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import BottomNavigation from "@/components/BottomNavigation";
import { Bell, Settings, Plus, TrendingUp, TrendingDown, Calendar, Eye, EyeOff } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const navigate = useNavigate();
  const [showBalance, setShowBalance] = useState(true);
  const [selectedMonth, setSelectedMonth] = useState("February");

  const notifications = [
    { id: 1, title: "Budget Alert", message: "You've spent 80% of your food budget", time: "2 hours ago", unread: true },
    { id: 2, title: "Receipt Reminder", message: "Don't forget to scan your receipts", time: "1 day ago", unread: true },
    { id: 3, title: "Weekly Report", message: "Your weekly spending report is ready", time: "2 days ago", unread: false },
  ];

  const recentTransactions = [
    { id: 1, title: "Grocery Shopping", category: "Food", amount: -85.50, date: "Today", time: "2:30 PM", location: "Walmart", color: "bg-red-100 text-red-600" },
    { id: 2, title: "Salary Deposit", category: "Income", amount: 3500.00, date: "Yesterday", time: "9:00 AM", location: "Direct Deposit", color: "bg-green-100 text-green-600" },
    { id: 3, title: "Gas Station", category: "Transport", amount: -45.20, date: "2 days ago", time: "6:15 PM", location: "Shell", color: "bg-red-100 text-red-600" },
    { id: 4, title: "Coffee Shop", category: "Food", amount: -12.80, date: "3 days ago", time: "8:30 AM", location: "Starbucks", color: "bg-red-100 text-red-600" },
  ];

  const categories = [
    { name: "Food", spent: 320, budget: 500, color: "bg-blue-500", transactions: 12 },
    { name: "Transport", spent: 180, budget: 300, color: "bg-purple-500", transactions: 8 },
    { name: "Shopping", spent: 245, budget: 400, color: "bg-pink-500", transactions: 5 },
    { name: "Bills", spent: 680, budget: 800, color: "bg-orange-500", transactions: 4 },
  ];

  const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

  const handleTransactionClick = (transaction: typeof recentTransactions[0]) => {
    navigate("/transaction-details", { state: { transaction } });
  };

  const handleCategoryClick = (category: typeof categories[0]) => {
    navigate("/category-details", { state: { category, month: selectedMonth } });
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Header */}
      <div className="bg-white px-4 py-6 border-b border-gray-100">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-lg font-semibold text-gray-900">Good morning!</h1>
            <p className="text-gray-600">Welcome back to Fluxpense</p>
          </div>
          <div className="flex items-center space-x-3">
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="ghost" size="sm" className="text-gray-600 relative">
                  <Bell className="w-5 h-5" />
                  {notifications.some(n => n.unread) && (
                    <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></div>
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-80 p-0" align="end">
                <div className="p-4 border-b">
                  <h3 className="font-semibold">Notifications</h3>
                </div>
                <div className="max-h-80 overflow-y-auto">
                  {notifications.map((notification) => (
                    <div key={notification.id} className={`p-4 border-b hover:bg-gray-50 ${notification.unread ? 'bg-blue-50' : ''}`}>
                      <div className="flex justify-between items-start mb-1">
                        <h4 className="font-medium text-sm">{notification.title}</h4>
                        <span className="text-xs text-gray-500">{notification.time}</span>
                      </div>
                      <p className="text-sm text-gray-600">{notification.message}</p>
                    </div>
                  ))}
                </div>
              </PopoverContent>
            </Popover>
            <Button variant="ghost" size="sm" onClick={() => navigate("/settings")} className="text-gray-600">
              <Settings className="w-5 h-5" />
            </Button>
          </div>
        </div>

        {/* Balance Card */}
        <Card className="bg-gradient-to-r from-blue-600 to-blue-700 p-6 text-white border-0">
          <div className="flex items-center justify-between mb-4">
            <div>
              <p className="text-blue-100 text-sm">Total Balance</p>
              <div className="flex items-center space-x-2">
                <h2 className="text-3xl font-bold">
                  {showBalance ? "$4,250.80" : "••••••"}
                </h2>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowBalance(!showBalance)}
                  className="text-white hover:bg-blue-800"
                >
                  {showBalance ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </Button>
              </div>
            </div>
            <Button
              onClick={() => navigate("/add-expense")}
              className="bg-white text-blue-600 hover:bg-blue-50 rounded-full w-12 h-12 p-0"
            >
              <Plus className="w-6 h-6" />
            </Button>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-1">
                <TrendingUp className="w-4 h-4 text-green-300" />
                <span className="text-sm">$2,840 income</span>
              </div>
              <div className="flex items-center space-x-1">
                <TrendingDown className="w-4 h-4 text-red-300" />
                <span className="text-sm">$1,425 expenses</span>
              </div>
            </div>
          </div>
        </Card>
      </div>

      <div className="px-4 py-6 space-y-6">
        {/* Quick Actions */}
        <div className="flex space-x-3">
          <Button
            onClick={() => navigate("/add-expense")}
            className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-4 rounded-xl"
          >
            <Plus className="w-5 h-5 mr-2" />
            Add Expense
          </Button>
          <Button
            onClick={() => navigate("/add-income")}
            variant="outline"
            className="flex-1 border-blue-600 text-blue-600 hover:bg-blue-50 py-4 rounded-xl"
          >
            <TrendingUp className="w-5 h-5 mr-2" />
            Add Income
          </Button>
        </div>

        {/* Spending Overview */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Spending This Month</h3>
            <Select value={selectedMonth} onValueChange={setSelectedMonth}>
              <SelectTrigger className="w-32">
                <Calendar className="w-4 h-4 mr-1" />
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {months.map((month) => (
                  <SelectItem key={month} value={month}>
                    {month}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-3">
            {categories.map((category) => (
              <Card key={category.name} className="p-4 cursor-pointer hover:shadow-md transition-shadow" onClick={() => handleCategoryClick(category)}>
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center space-x-3">
                    <div className={`w-3 h-3 rounded-full ${category.color}`}></div>
                    <span className="font-medium text-gray-900">{category.name}</span>
                  </div>
                  <div className="text-right">
                    <span className="text-gray-600">
                      ${category.spent} / ${category.budget}
                    </span>
                    <p className="text-xs text-gray-500">{category.transactions} transactions</p>
                  </div>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className={`h-2 rounded-full ${category.color}`}
                    style={{ width: `${(category.spent / category.budget) * 100}%` }}
                  ></div>
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* Recent Transactions */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Recent Transactions</h3>
            <Button variant="ghost" size="sm" className="text-blue-600" onClick={() => navigate("/transactions")}>
              View All
            </Button>
          </div>

          <div className="space-y-3">
            {recentTransactions.map((transaction) => (
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
        </div>
      </div>

      <BottomNavigation />
    </div>
  );
};

export default Dashboard;
