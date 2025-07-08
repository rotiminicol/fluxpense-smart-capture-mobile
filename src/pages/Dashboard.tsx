
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import BottomNavigation from "@/components/BottomNavigation";
import { Bell, Plus, TrendingUp, TrendingDown, Calendar, Eye, EyeOff, User, LogOut, Settings } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

const Dashboard = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [showBalance, setShowBalance] = useState(true);
  const [selectedMonth, setSelectedMonth] = useState("February");
  const [profileOpen, setProfileOpen] = useState(false);

  // Add a placeholder for the user's email (replace with real user context in production)
  const userEmail = "user@email.com";

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

  const handleSignOut = () => {
    // Clear user session (customize as needed)
    localStorage.clear();
    sessionStorage.clear();
    toast({ title: "Signed out", description: "You have been signed out successfully." });
    navigate("/welcome");
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-20 animate-fade-in">
      {/* Header */}
      <div className="bg-white/70 backdrop-blur-lg px-4 py-6 border-b border-gray-100 shadow-sm">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-lg font-semibold text-gray-900">Good morning!</h1>
            <p className="text-gray-600">Welcome back, {userEmail}</p>
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
            {/* Profile Avatar Dropdown */}
            <Popover open={profileOpen} onOpenChange={setProfileOpen}>
              <PopoverTrigger asChild>
                <button className="w-10 h-10 rounded-full bg-gradient-to-tr from-blue-400 to-green-300 border-2 border-white shadow-lg flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-blue-300 transition-all">
                  <User className="w-6 h-6 text-white" />
                </button>
              </PopoverTrigger>
              <PopoverContent className="w-48 p-0 rounded-xl shadow-2xl border-0 bg-white/90 backdrop-blur-xl animate-dropdown-fade" align="end">
                <ul className="divide-y divide-gray-100">
                  <li>
                    <button className="w-full flex items-center gap-3 px-5 py-4 text-gray-800 hover:bg-blue-50 transition-all text-base" onClick={() => { setProfileOpen(false); navigate('/profile'); }}>
                      <User className="w-5 h-5 text-blue-500" /> Profile
                    </button>
                  </li>
                  <li>
                    <button className="w-full flex items-center gap-3 px-5 py-4 text-gray-800 hover:bg-blue-50 transition-all text-base" onClick={() => { setProfileOpen(false); navigate('/settings'); }}>
                      <Settings className="w-5 h-5 text-blue-500" /> Settings
                    </button>
                  </li>
                  <li>
                    <button className="w-full flex items-center gap-3 px-5 py-4 text-gray-800 hover:bg-blue-50 transition-all text-base" onClick={() => { setProfileOpen(false); handleSignOut(); }}>
                      <LogOut className="w-5 h-5 text-blue-500" /> Sign Out
                    </button>
                  </li>
                </ul>
              </PopoverContent>
            </Popover>
          </div>
        </div>

        {/* Balance Card */}
        <div className="relative mx-auto max-w-2xl">
          <div className="glass-balance border-2 border-blue-300/60 rounded-3xl shadow-xl p-6 flex flex-col gap-4 items-center justify-between transition-all duration-300">
            <div className="flex items-center justify-between w-full mb-2">
              <div>
                <p className="text-blue-100 text-sm">Total Balance</p>
                <div className="flex items-center space-x-2">
                  <h2 className="text-3xl font-bold text-white">
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
              <div className="flex flex-col items-end gap-2">
                <Button
                  onClick={() => navigate("/add-expense")}
                  className="bg-white text-blue-600 hover:bg-blue-50 rounded-full w-12 h-12 p-0 shadow-lg border-2 border-blue-200 transition-all duration-200"
                >
                  <Plus className="w-6 h-6" />
                </Button>
              </div>
            </div>
            <div className="flex items-center justify-between w-full">
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-1">
                  <TrendingUp className="w-4 h-4 text-green-300" />
                  <span className="text-sm text-white/90">$2,840 income</span>
                </div>
                <div className="flex items-center space-x-1">
                  <TrendingDown className="w-4 h-4 text-red-300" />
                  <span className="text-sm text-white/90">$1,425 expenses</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="px-4 py-6 space-y-8">
        {/* Quick Actions */}
        <div className="flex space-x-3">
          <Button
            onClick={() => navigate("/add-expense")}
            className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-5 rounded-2xl text-lg font-bold shadow-lg transition-all duration-200 active:scale-[0.98] flex items-center justify-center gap-2"
          >
            <Plus className="w-5 h-5" />
            Add Expense
          </Button>
          <Button
            onClick={() => navigate("/add-income")}
            variant="outline"
            className="flex-1 border-blue-600 text-blue-600 hover:bg-blue-50 py-5 rounded-2xl text-lg font-bold shadow-lg transition-all duration-200 active:scale-[0.98] flex items-center justify-center gap-2"
          >
            <TrendingUp className="w-5 h-5" />
            Add Income
          </Button>
        </div>

        {/* Spending Overview Table */}
        <div className="glass-table rounded-2xl overflow-hidden shadow-xl border border-blue-100/40 backdrop-blur-xl">
          <div className="flex items-center justify-between px-6 pt-6 pb-2">
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
          <table className="w-full text-left animate-table-fade">
            <tbody>
              {categories.map((category, idx) => (
                <tr
                  key={category.name}
                  className="group transition-all duration-200 hover:bg-blue-50/40 cursor-pointer"
                  onClick={() => handleCategoryClick(category)}
                  style={{ animationDelay: `${idx * 60}ms` }}
                >
                  <td className="px-6 py-6 align-middle w-1/4">
                    <div className="flex items-center gap-3">
                      <div className={`w-3 h-3 rounded-full ${category.color}`}></div>
                      <span className="font-medium text-gray-900 text-base">{category.name}</span>
                    </div>
                  </td>
                  <td className="px-6 py-6 align-middle w-1/3">
                    <div className="flex flex-col items-start gap-1">
                      <span className="text-gray-700 text-lg font-semibold">${category.spent}</span>
                      <span className="text-gray-400 text-sm">of ${category.budget}</span>
                      <span className="text-xs text-blue-500 font-medium mt-1">{category.transactions} transactions</span>
                    </div>
                  </td>
                  <td className="px-6 py-6 align-middle w-1/3">
                    <div className="flex flex-col gap-2 w-full">
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className={`h-2 rounded-full ${category.color}`}
                          style={{ width: `${(category.spent / category.budget) * 100}%` }}
                        ></div>
                      </div>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Recent Transactions Table */}
        <div className="glass-table rounded-2xl overflow-hidden shadow-xl border border-blue-100/40 backdrop-blur-xl">
          <div className="flex items-center justify-between px-6 pt-6 pb-2">
            <h3 className="text-lg font-semibold text-gray-900">Recent Transactions</h3>
            <Button variant="ghost" size="sm" className="text-blue-600" onClick={() => navigate("/transactions")}>View All</Button>
          </div>
          <table className="w-full text-left animate-table-fade">
            <tbody>
              {recentTransactions.map((transaction, idx) => (
                <tr
                  key={transaction.id}
                  className="group transition-all duration-200 hover:bg-blue-50/40 cursor-pointer"
                  onClick={() => handleTransactionClick(transaction)}
                  style={{ animationDelay: `${idx * 60}ms` }}
                >
                  <td className="px-6 py-5 align-middle">
                    <div className={`w-10 h-10 rounded-full ${transaction.color} flex items-center justify-center`}>
                      {transaction.amount > 0 ? (
                        <TrendingUp className="w-5 h-5" />
                      ) : (
                        <TrendingDown className="w-5 h-5" />
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-5 align-middle">
                    <p className="font-medium text-gray-900">{transaction.title}</p>
                    <p className="text-sm text-gray-500">{transaction.category} • {transaction.date}</p>
                  </td>
                  <td className="px-6 py-5 align-middle text-right">
                    <span className={`font-semibold ${transaction.amount > 0 ? "text-green-600" : "text-red-600"}`}>
                      {transaction.amount > 0 ? "+" : ""}${Math.abs(transaction.amount).toFixed(2)}
                    </span>
                    <p className="text-xs text-gray-500">{transaction.time}</p>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <BottomNavigation />
      {/* Custom Animations & Glass Styles */}
      <style>{`
        .glass-balance {
          background: linear-gradient(120deg, rgba(30,64,175,0.85) 0%, rgba(56,189,248,0.7) 100%);
          backdrop-filter: blur(18px) saturate(1.2);
        }
        .glass-table {
          background: linear-gradient(120deg, rgba(255,255,255,0.7) 0%, rgba(186,230,253,0.5) 100%);
          backdrop-filter: blur(16px) saturate(1.1);
        }
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(32px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in {
          animation: fade-in 0.7s cubic-bezier(.4,2,.6,1);
        }
        @keyframes table-fade {
          from { opacity: 0; transform: translateY(24px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-table-fade tr {
          animation: table-fade 0.5s cubic-bezier(.4,2,.6,1) both;
        }
        @keyframes dropdown-fade {
          from { opacity: 0; transform: translateY(-12px) scale(0.98); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }
        .animate-dropdown-fade {
          animation: dropdown-fade 0.25s cubic-bezier(.4,2,.6,1);
        }
      `}</style>
    </div>
  );
};

export default Dashboard;
