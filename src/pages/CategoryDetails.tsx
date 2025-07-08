
import { useNavigate, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowLeft, TrendingDown, Calendar } from "lucide-react";

const CategoryDetails = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { category, month } = location.state || {};

  if (!category) {
    navigate("/dashboard");
    return null;
  }

  const categoryTransactions = [
    { id: 1, title: "McDonald's", amount: 15.50, date: "Feb 8", time: "1:30 PM" },
    { id: 2, title: "Grocery Store", amount: 85.20, date: "Feb 7", time: "6:45 PM" },
    { id: 3, title: "Coffee Shop", amount: 4.80, date: "Feb 6", time: "8:15 AM" },
    { id: 4, title: "Restaurant", amount: 42.30, date: "Feb 5", time: "7:20 PM" },
    { id: 5, title: "Fast Food", amount: 12.90, date: "Feb 4", time: "12:30 PM" },
    { id: 6, title: "Bakery", amount: 18.75, date: "Feb 3", time: "9:00 AM" },
  ];

  const handleTransactionClick = (transaction: any) => {
    navigate("/transaction-details", { state: { transaction: { ...transaction, category: category.name, location: "Store", color: "bg-red-100 text-red-600" } } });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white px-4 py-4 border-b border-gray-100">
        <div className="flex items-center">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigate("/dashboard")}
            className="text-gray-600 mr-3"
          >
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <h1 className="text-lg font-semibold">{category.name} - {month}</h1>
        </div>
      </div>

      <div className="px-4 py-6 space-y-6">
        {/* Category Overview */}
        <Card className="p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-3">
              <div className={`w-4 h-4 rounded-full ${category.color}`}></div>
              <h3 className="text-lg font-semibold">{category.name}</h3>
            </div>
            <div className="flex items-center text-gray-500">
              <Calendar className="w-4 h-4 mr-1" />
              <span className="text-sm">{month} 2024</span>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4 mb-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-gray-900">${category.spent}</div>
              <div className="text-sm text-gray-500">Spent</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-gray-900">${category.budget}</div>
              <div className="text-sm text-gray-500">Budget</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-gray-900">${category.budget - category.spent}</div>
              <div className="text-sm text-gray-500">Remaining</div>
            </div>
          </div>

          <div className="w-full bg-gray-200 rounded-full h-3 mb-2">
            <div
              className={`h-3 rounded-full ${category.color}`}
              style={{ width: `${(category.spent / category.budget) * 100}%` }}
            ></div>
          </div>
          <div className="text-center text-sm text-gray-600">
            {Math.round((category.spent / category.budget) * 100)}% of budget used
          </div>
        </Card>

        {/* Transactions */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Transactions ({category.transactions})</h3>
            <Button variant="ghost" size="sm" className="text-blue-600">
              Filter
            </Button>
          </div>

          <div className="space-y-3">
            {categoryTransactions.map((transaction) => (
              <Card key={transaction.id} className="p-4 cursor-pointer hover:shadow-md transition-shadow" onClick={() => handleTransactionClick(transaction)}>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center">
                      <TrendingDown className="w-5 h-5 text-red-600" />
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">{transaction.title}</p>
                      <p className="text-sm text-gray-500">{transaction.date} • {transaction.time}</p>
                    </div>
                  </div>
                  <span className="font-semibold text-red-600">
                    -${transaction.amount.toFixed(2)}
                  </span>
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="space-y-3">
          <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white h-12 rounded-xl">
            Add {category.name} Expense
          </Button>
          <Button variant="outline" className="w-full h-12 rounded-xl">
            Set Budget Alert
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CategoryDetails;
