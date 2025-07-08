
import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import BottomNavigation from "@/components/BottomNavigation";
import { Calendar, TrendingUp, TrendingDown, DollarSign, PieChart } from "lucide-react";

const Reports = () => {
  const [selectedPeriod, setSelectedPeriod] = useState("month");

  const periods = [
    { key: "week", label: "Week" },
    { key: "month", label: "Month" },
    { key: "year", label: "Year" },
  ];

  const summaryStats = [
    { title: "Total Income", amount: "$4,250.00", change: "+12.5%", isPositive: true, icon: TrendingUp },
    { title: "Total Expenses", amount: "$2,840.50", change: "-8.2%", isPositive: true, icon: TrendingDown },
    { title: "Net Savings", amount: "$1,409.50", change: "+18.3%", isPositive: true, icon: DollarSign },
  ];

  const expensesByCategory = [
    { category: "Food & Dining", amount: 680, percentage: 24, color: "bg-blue-500" },
    { category: "Transportation", amount: 420, percentage: 15, color: "bg-purple-500" },
    { category: "Shopping", amount: 350, percentage: 12, color: "bg-pink-500" },
    { category: "Bills & Utilities", amount: 580, percentage: 20, color: "bg-orange-500" },
    { category: "Entertainment", amount: 280, percentage: 10, color: "bg-green-500" },
    { category: "Healthcare", amount: 240, percentage: 8, color: "bg-red-500" },
    { category: "Other", amount: 290, percentage: 11, color: "bg-gray-500" },
  ];

  const monthlyTrend = [
    { month: "Oct", income: 3800, expenses: 2200 },
    { month: "Nov", income: 4100, expenses: 2600 },
    { month: "Dec", income: 3900, expenses: 2400 },
    { month: "Jan", income: 4200, expenses: 2800 },
    { month: "Feb", income: 4250, expenses: 2840 },
  ];

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Header */}
      <div className="bg-white px-4 py-6 border-b border-gray-100">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Reports</h1>
            <p className="text-gray-600">Analyze your spending patterns</p>
          </div>
          <Button variant="outline" size="sm" className="text-blue-600 border-blue-600">
            <Calendar className="w-4 h-4 mr-2" />
            Export
          </Button>
        </div>

        {/* Period Selector */}
        <div className="flex space-x-2">
          {periods.map((period) => (
            <Button
              key={period.key}
              variant={selectedPeriod === period.key ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedPeriod(period.key)}
              className={selectedPeriod === period.key ? "bg-blue-600 text-white" : "text-gray-600"}
            >
              {period.label}
            </Button>
          ))}
        </div>
      </div>

      <div className="px-4 py-6 space-y-6">
        {/* Summary Cards */}
        <div className="grid grid-cols-1 gap-4">
          {summaryStats.map((stat) => {
            const Icon = stat.icon;
            return (
              <Card key={stat.title} className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className={`w-10 h-10 rounded-full ${
                      stat.isPositive ? "bg-green-100 text-green-600" : "bg-red-100 text-red-600"
                    } flex items-center justify-center`}>
                      <Icon className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">{stat.title}</p>
                      <p className="text-xl font-bold text-gray-900">{stat.amount}</p>
                    </div>
                  </div>
                  <div className={`text-sm font-medium ${
                    stat.isPositive ? "text-green-600" : "text-red-600"
                  }`}>
                    {stat.change}
                  </div>
                </div>
              </Card>
            );
          })}
        </div>

        {/* Expenses by Category */}
        <Card className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Expenses by Category</h3>
            <PieChart className="w-5 h-5 text-gray-400" />
          </div>
          
          <div className="space-y-4">
            {expensesByCategory.map((item) => (
              <div key={item.category} className="space-y-2">
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
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className={`h-2 rounded-full ${item.color}`}
                    style={{ width: `${item.percentage}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Monthly Trend */}
        <Card className="p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Monthly Trend</h3>
          <div className="space-y-4">
            {monthlyTrend.map((month) => (
              <div key={month.month} className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-gray-700 font-medium">{month.month}</span>
                  <div className="text-right">
                    <p className="text-green-600 font-semibold">+${month.income}</p>
                    <p className="text-red-600 font-semibold">-${month.expenses}</p>
                  </div>
                </div>
                <div className="flex space-x-1 h-4">
                  <div
                    className="bg-green-500 rounded"
                    style={{ width: `${(month.income / 5000) * 100}%` }}
                  ></div>
                  <div
                    className="bg-red-500 rounded"
                    style={{ width: `${(month.expenses / 5000) * 100}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Insights */}
        <Card className="p-6 bg-blue-50 border-blue-200">
          <h3 className="text-lg font-semibold text-blue-900 mb-3">💡 Smart Insights</h3>
          <div className="space-y-3">
            <p className="text-blue-800">• You're spending 24% of your budget on Food & Dining</p>
            <p className="text-blue-800">• Your savings rate increased by 18.3% this month</p>
            <p className="text-blue-800">• Consider setting a budget limit for Shopping category</p>
          </div>
        </Card>
      </div>

      <BottomNavigation />
    </div>
  );
};

export default Reports;
