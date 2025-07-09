
import { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import BottomNavigation from "@/components/BottomNavigation";
import { Calendar, TrendingUp, TrendingDown, DollarSign, PieChart } from "lucide-react";
import { transactionService } from "@/services/transactionService";
import { categoryService } from "@/services/categoryService";
import { useQuery } from "@tanstack/react-query";
import { useAuth } from "@/hooks/useAuth";

const Reports = () => {
  const { user } = useAuth();
  const [selectedPeriod, setSelectedPeriod] = useState("month");
  const periods = [
    { key: "week", label: "Week" },
    { key: "month", label: "Month" },
    { key: "year", label: "Year" },
  ];

  // Fetch transactions
  const { data: transactions = [], isLoading: transactionsLoading } = useQuery({
    queryKey: ['transactions', user?.id],
    queryFn: transactionService.getTransactions,
    enabled: !!user,
  });

  // Fetch categories
  const { data: categories = [] } = useQuery({
    queryKey: ['categories', user?.id],
    queryFn: categoryService.getCategories,
    enabled: !!user,
  });

  console.log('Reports - Transactions:', transactions);
  console.log('Reports - Categories:', categories);

  // Filter transactions based on selected period
  const getFilteredTransactions = () => {
    const now = new Date();
    const filtered = transactions.filter(transaction => {
      const transactionDate = new Date(transaction.date);
      
      switch (selectedPeriod) {
        case 'week':
          const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
          return transactionDate >= weekAgo;
        case 'month':
          return transactionDate.getMonth() === now.getMonth() && 
                 transactionDate.getFullYear() === now.getFullYear();
        case 'year':
          return transactionDate.getFullYear() === now.getFullYear();
        default:
          return true;
      }
    });
    
    console.log(`Filtered transactions for ${selectedPeriod}:`, filtered);
    return filtered;
  };

  const filteredTransactions = getFilteredTransactions();
  const isEmpty = filteredTransactions.length === 0;

  // Calculate summary statistics
  const totalIncome = filteredTransactions
    .filter(t => t.type === 'income')
    .reduce((sum, t) => sum + t.amount, 0);

  const totalExpenses = filteredTransactions
    .filter(t => t.type === 'expense')
    .reduce((sum, t) => sum + t.amount, 0);

  const balance = totalIncome - totalExpenses;

  // Calculate category spending
  const categorySpending = categories.map(category => {
    const categoryTransactions = filteredTransactions.filter(t => 
      t.category_id === category.id && t.type === 'expense'
    );
    const spent = categoryTransactions.reduce((sum, t) => sum + t.amount, 0);
    const totalSpent = filteredTransactions
      .filter(t => t.type === 'expense')
      .reduce((sum, t) => sum + t.amount, 0);
    
    return {
      category: category.name,
      amount: spent.toFixed(2),
      percentage: totalSpent > 0 ? Math.round((spent / totalSpent) * 100) : 0,
      color: category.color || 'bg-blue-500',
      icon: category.icon || '💰'
    };
  }).filter(item => parseFloat(item.amount) > 0);

  // Create summary stats
  const summaryStats = [
    {
      title: "Total Income",
      amount: `$${totalIncome.toFixed(2)}`,
      change: "+12.5%",
      isPositive: true,
      icon: TrendingUp
    },
    {
      title: "Total Expenses", 
      amount: `$${totalExpenses.toFixed(2)}`,
      change: "-8.2%",
      isPositive: false,
      icon: TrendingDown
    },
    {
      title: "Net Balance",
      amount: `$${balance.toFixed(2)}`,
      change: balance >= 0 ? "+4.3%" : "-4.3%",
      isPositive: balance >= 0,
      icon: DollarSign
    }
  ];

  // Monthly trend data (simplified)
  const monthlyTrend = [
    { month: "Jan", income: 3500, expenses: 2800 },
    { month: "Feb", income: 4200, expenses: 3100 },
    { month: "Mar", income: totalIncome || 0, expenses: totalExpenses || 0 }
  ];

  if (transactionsLoading) {
    return (
      <div className="min-h-screen bg-gray-50 pb-20">
        <div className="bg-white/80 backdrop-blur-lg px-4 py-6 border-b border-gray-100 shadow-xl rounded-b-2xl">
          <h1 className="text-2xl font-bold text-gray-900">Reports</h1>
          <p className="text-gray-600">Loading your data...</p>
        </div>
        <div className="flex items-center justify-center min-h-[50vh]">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        </div>
        <BottomNavigation />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pb-20 animate-reports-fade-in">
      {/* Header */}
      <div className="bg-white/80 backdrop-blur-lg px-4 py-6 border-b border-gray-100 shadow-xl rounded-b-2xl">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Reports</h1>
            <p className="text-gray-600">Analyze your spending patterns</p>
          </div>
          <Button variant="outline" size="sm" className="text-blue-600 border-blue-600 transition-all duration-150 hover:scale-105">
            <Calendar className="w-4 h-4 mr-2" />
            Export
          </Button>
        </div>
        {/* Period Selector */}
        <div className="flex space-x-2">
          {periods.map((period, idx) => (
            <Button
              key={period.key}
              variant={selectedPeriod === period.key ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedPeriod(period.key)}
              className={`transition-all duration-200 ${selectedPeriod === period.key ? "bg-blue-600 text-white shadow-lg scale-105" : "text-gray-600 hover:bg-blue-50"} animate-staggered-section`}
              style={{ animationDelay: `${idx * 80 + 100}ms` }}
            >
              {period.label}
            </Button>
          ))}
        </div>
      </div>
      <div className="px-4 py-6 space-y-6">
        {isEmpty ? (
          <div className="flex flex-col items-center justify-center min-h-[40vh] animate-staggered-section" style={{ animationDelay: '120ms' }}>
            <div className="w-32 h-32 mb-6">
              <svg viewBox="0 0 128 128" fill="none" className="w-full h-full animate-empty-bounce">
                <circle cx="64" cy="64" r="60" fill="#e0e7ef" />
                <rect x="36" y="60" width="56" height="28" rx="8" fill="#c7d2fe" />
                <rect x="48" y="72" width="32" height="8" rx="4" fill="#a5b4fc" />
                <circle cx="64" cy="52" r="12" fill="#60a5fa" />
              </svg>
            </div>
            <h2 className="text-xl font-bold text-gray-700 mb-2">No Reports Yet</h2>
            <p className="text-gray-500 mb-4">Start tracking your expenses to see insightful reports here.</p>
            <Button className="bg-blue-600 text-white px-6 py-3 rounded-xl font-bold shadow-lg hover:bg-blue-700 transition-all duration-150">Add Your First Expense</Button>
          </div>
        ) : (
          <>
            {/* Summary Cards */}
            <div className="grid grid-cols-1 gap-4">
              {summaryStats.map((stat, idx) => {
                const Icon = stat.icon;
                return (
                  <Card
                    key={stat.title}
                    className="p-4 glass-card rounded-2xl shadow-xl transition-all duration-200 hover:scale-[1.03] hover:shadow-2xl animate-staggered-section"
                    style={{ animationDelay: `${idx * 120 + 200}ms` }}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className={`w-10 h-10 rounded-full ${stat.isPositive ? "bg-green-100 text-green-600" : "bg-red-100 text-red-600"} flex items-center justify-center`}>
                          <Icon className="w-5 h-5" />
                        </div>
                        <div>
                          <p className="text-sm text-gray-600">{stat.title}</p>
                          <p className="text-xl font-bold text-gray-900">{stat.amount}</p>
                        </div>
                      </div>
                      <div className={`text-sm font-medium ${stat.isPositive ? "text-green-600" : "text-red-600"}`}>{stat.change}</div>
                    </div>
                  </Card>
                );
              })}
            </div>
            {/* Expenses by Category */}
            {categorySpending.length > 0 && (
              <Card className="p-6 glass-card rounded-2xl shadow-xl transition-all duration-200 hover:scale-[1.02] hover:shadow-2xl animate-staggered-section" style={{ animationDelay: '600ms' }}>
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-gray-900">Expenses by Category</h3>
                  <PieChart className="w-5 h-5 text-gray-400" />
                </div>
                <div className="space-y-4">
                  {categorySpending.map((item, idx) => (
                    <div key={item.category} className="space-y-2 animate-bar-grow" style={{ animationDelay: `${idx * 80 + 700}ms` }}>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <div className={`w-3 h-3 rounded-full ${item.color}`}></div>
                          <span className="text-gray-900 font-medium">{item.category}</span>
                        </div>
                        <div className="text-right">
                          <p className="font-semibold text-gray-900">${item.amount}</p>
                          <p className="text-sm text-gray-500">{item.percentage}%</p>
                        </div>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
                        <div
                          className={`h-2 rounded-full ${item.color} animate-bar-grow-inner`}
                          style={{ width: `${item.percentage}%`, animationDelay: `${idx * 80 + 800}ms` }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            )}
            {/* Monthly Trend */}
            <Card className="p-6 glass-card rounded-2xl shadow-xl transition-all duration-200 hover:scale-[1.02] hover:shadow-2xl animate-staggered-section" style={{ animationDelay: '900ms' }}>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Monthly Trend</h3>
              <div className="space-y-4">
                {monthlyTrend.map((month, idx) => (
                  <div key={month.month} className="space-y-2 animate-bar-grow" style={{ animationDelay: `${idx * 80 + 1000}ms` }}>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-700 font-medium">{month.month}</span>
                      <div className="text-right">
                        <p className="text-green-600 font-semibold">+${month.income}</p>
                        <p className="text-red-600 font-semibold">-${month.expenses}</p>
                      </div>
                    </div>
                    <div className="flex space-x-1 h-4">
                      <div
                        className="bg-green-500 rounded animate-bar-grow-inner"
                        style={{ width: `${(month.income / 5000) * 100}%`, animationDelay: `${idx * 80 + 1100}ms` }}
                      ></div>
                      <div
                        className="bg-red-500 rounded animate-bar-grow-inner"
                        style={{ width: `${(month.expenses / 5000) * 100}%`, animationDelay: `${idx * 80 + 1200}ms` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
            {/* Insights */}
            <Card className="p-6 glass-card rounded-2xl shadow-xl transition-all duration-200 hover:scale-[1.02] hover:shadow-2xl animate-staggered-section" style={{ animationDelay: '1200ms' }}>
              <h3 className="text-lg font-semibold text-blue-900 mb-3">💡 Smart Insights</h3>
              <div className="space-y-3">
                {categorySpending.length > 0 && (
                  <p className="text-blue-800">• You're spending {categorySpending[0]?.percentage}% of your budget on {categorySpending[0]?.category}</p>
                )}
                {balance > 0 && (
                  <p className="text-blue-800">• Your savings rate is positive this period</p>
                )}
                <p className="text-blue-800">• Consider setting budget limits for better expense tracking</p>
              </div>
            </Card>
          </>
        )}
      </div>
      <BottomNavigation />
      {/* Custom Animations & Glass Styles */}
      <style>{`
        .glass-card {
          background: linear-gradient(120deg, rgba(255,255,255,0.7) 0%, rgba(186,230,253,0.5) 100%);
          backdrop-filter: blur(16px) saturate(1.1);
        }
        @keyframes reports-fade-in {
          from { opacity: 0; transform: scale(0.98) translateY(32px); }
          to { opacity: 1; transform: scale(1) translateY(0); }
        }
        .animate-reports-fade-in {
          animation: reports-fade-in 0.7s cubic-bezier(.4,2,.6,1);
        }
        @keyframes staggered-section {
          from { opacity: 0; transform: translateY(32px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-staggered-section {
          animation: staggered-section 0.7s cubic-bezier(.4,2,.6,1) both;
        }
        @keyframes bar-grow {
          from { opacity: 0; transform: scaleX(0.7); }
          to { opacity: 1; transform: scaleX(1); }
        }
        .animate-bar-grow {
          animation: bar-grow 0.7s cubic-bezier(.4,2,.6,1) both;
        }
        .animate-bar-grow-inner {
          animation: bar-grow 0.9s cubic-bezier(.4,2,.6,1) both;
        }
        @keyframes empty-bounce {
          0% { transform: scale(0.95) translateY(16px); opacity: 0.7; }
          60% { transform: scale(1.05) translateY(-8px); opacity: 1; }
          100% { transform: scale(1) translateY(0); opacity: 1; }
        }
        .animate-empty-bounce {
          animation: empty-bounce 1.1s cubic-bezier(.4,2,.6,1);
        }
      `}</style>
    </div>
  );
};

export default Reports;
