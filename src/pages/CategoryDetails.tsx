
import { useNavigate, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowLeft, TrendingDown, Calendar, PieChart } from "lucide-react";
import { useEffect, useState } from "react";
import { Tooltip } from "@/components/ui/tooltip";

type Transaction = {
  id: number;
  title: string;
  amount: number;
  date: string;
  time: string;
  status: string;
};

const CategoryDetails = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { category, month } = location.state || {};
  const [filter, setFilter] = useState('This Month');
  useEffect(() => {
    document.body.classList.add("animate-fade-slide-in");
    return () => document.body.classList.remove("animate-fade-slide-in");
  }, []);
  if (!category) {
    navigate("/dashboard");
    return null;
  }
  const categoryTransactions = [
    { id: 1, title: "McDonald's", amount: 15.50, date: "Feb 8", time: "1:30 PM", status: 'Completed' },
    { id: 2, title: "Grocery Store", amount: 85.20, date: "Feb 7", time: "6:45 PM", status: 'Completed' },
    { id: 3, title: "Coffee Shop", amount: 4.80, date: "Feb 6", time: "8:15 AM", status: 'Pending' },
    { id: 4, title: "Restaurant", amount: 42.30, date: "Feb 5", time: "7:20 PM", status: 'Completed' },
    { id: 5, title: "Fast Food", amount: 12.90, date: "Feb 4", time: "12:30 PM", status: 'Completed' },
    { id: 6, title: "Bakery", amount: 18.75, date: "Feb 3", time: "9:00 AM", status: 'Failed' },
  ];
  const handleTransactionClick = (transaction: Transaction) => {
    navigate("/transaction-details", { state: { transaction: { ...transaction, category: category.name, location: "Store", color: category.color } } });
  };
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100/60 to-blue-200/80 flex flex-col items-center animate-fade-slide-up pb-24">
      <div className="w-full max-w-2xl px-4 sm:px-0 py-10">
        {/* Header */}
        <div className="flex items-center gap-4 mb-10 animate-stagger-in" style={{animationDelay:'100ms'}}>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => navigate("/categories")}
            className="rounded-full bg-white/70 hover:bg-blue-100 shadow-md border border-blue-200 transition-all duration-200"
            aria-label="Back"
          >
            <ArrowLeft className="w-6 h-6 text-blue-600" />
          </Button>
          <div className={`w-14 h-14 rounded-full flex items-center justify-center text-3xl ${category.color} shadow-lg mr-2`}>🍔</div>
          <div className="flex-1">
            <h1 className="text-2xl font-bold text-blue-800 tracking-tight">{category.name}</h1>
            <div className="text-blue-500 text-md">${category.spent} spent</div>
          </div>
          <Tooltip>
            <Button size="icon" className="bg-white/80 hover:bg-blue-100 shadow border border-blue-200 ml-2" aria-label="Edit Category">
              <PieChart className="w-6 h-6 text-blue-600" />
            </Button>
          </Tooltip>
        </div>
        {/* Summary & Filter */}
        <Card className="p-10 rounded-3xl glass-card shadow-2xl mb-10 animate-stagger-in" style={{animationDelay:'200ms'}}>
          <div className="flex flex-col sm:flex-row items-center justify-between gap-8 mb-6">
            <div className="flex flex-col items-center sm:items-start gap-2">
              <div className="text-2xl font-bold text-blue-900">${category.spent}</div>
              <div className="text-sm text-blue-500">Spent</div>
            </div>
            <div className="flex flex-col items-center sm:items-start gap-2">
              <div className="text-2xl font-bold text-blue-900">${category.budget}</div>
              <div className="text-sm text-blue-500">Budget</div>
            </div>
            <div className="flex flex-col items-center sm:items-start gap-2">
              <div className="text-2xl font-bold text-blue-900">${category.budget - category.spent}</div>
              <div className="text-sm text-blue-500">Remaining</div>
            </div>
            <div className="flex flex-col items-center sm:items-start gap-2">
              <select value={filter} onChange={e => setFilter(e.target.value)} className="rounded-xl border border-blue-200 px-4 py-2 bg-white/80 text-blue-700 shadow focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all">
                <option>This Month</option>
                <option>Last Month</option>
                <option>Custom Range</option>
              </select>
            </div>
          </div>
          <div className="w-full bg-blue-100/60 rounded-full h-3 mb-2">
            <div
              className={`h-3 rounded-full ${category.color}`}
              style={{ width: `${(category.spent / category.budget) * 100}%` }}
            ></div>
          </div>
          <div className="text-center text-sm text-blue-600">
            {Math.round((category.spent / category.budget) * 100)}% of budget used
          </div>
        </Card>
        {/* Chart Placeholder */}
        <Card className="p-8 rounded-3xl glass-card shadow-2xl mb-10 animate-stagger-in flex flex-col items-center justify-center" style={{animationDelay:'300ms', minHeight:'200px'}}>
          <div className="text-blue-400 mb-2"><PieChart className="w-12 h-12 mx-auto animate-pulse" /></div>
          <div className="text-blue-700 font-semibold">(Animated Chart Coming Soon)</div>
        </Card>
        {/* Transactions */}
        <div className="space-y-6">
          {categoryTransactions.map((transaction, i) => (
            <Card
              key={transaction.id}
              className={`relative p-8 rounded-2xl glass-card shadow-xl cursor-pointer transition-all duration-200 animate-stagger-in hover:scale-[1.03] hover:shadow-2xl flex items-center gap-6`} 
              style={{animationDelay:`${350+i*80}ms`} }
              onClick={() => handleTransactionClick(transaction)}
              tabIndex={0}
              aria-label={transaction.title + ': $' + transaction.amount}
            >
              <div className={`w-12 h-12 rounded-full flex items-center justify-center text-2xl ${transaction.status === 'Completed' ? 'bg-green-100 text-green-600' : transaction.status === 'Pending' ? 'bg-yellow-100 text-yellow-600' : 'bg-red-100 text-red-600'}`}>
                {transaction.status === 'Completed' ? '✅' : transaction.status === 'Pending' ? '⏳' : '❌'}
              </div>
              <div className="flex-1 min-w-0">
                <div className="font-bold text-blue-900 truncate text-lg">{transaction.title}</div>
                <div className="text-blue-500 text-sm truncate">{transaction.date} • {transaction.time}</div>
              </div>
              <div className="flex flex-col items-end">
                <span className={`font-bold text-xl ${transaction.status === 'Completed' ? 'text-green-600' : transaction.status === 'Pending' ? 'text-yellow-600' : 'text-red-600'}`}>{transaction.status === 'Completed' ? '-' : ''}${transaction.amount.toFixed(2)}</span>
                <span className="text-xs mt-1">
                  {transaction.status}
                </span>
              </div>
            </Card>
          ))}
        </div>
        {/* Quick Actions */}
        <div className="space-y-6 mt-10 animate-stagger-in" style={{animationDelay:'800ms'}}>
          <Button className="w-full h-14 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-lg shadow-lg transition-all duration-150 animate-glow-on-press flex items-center gap-2">
            Add {category.name} Expense
          </Button>
          <Button variant="outline" className="w-full h-14 rounded-xl border-blue-200 text-blue-700 font-bold text-lg shadow-lg transition-all duration-150 animate-glow-on-press flex items-center gap-2">
            Set Budget Alert
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CategoryDetails;
