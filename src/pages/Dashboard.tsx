import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import BottomNavigation from "@/components/BottomNavigation";
import { Bell, Plus, TrendingUp, TrendingDown, DollarSign, Calendar, ChevronDown } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { transactionService } from "@/services/transactionService";
import { categoryService } from "@/services/categoryService";
import { notificationService } from "@/services/notificationService";
import { Transaction, Category, Notification } from "@/types/api";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useToast } from "@/hooks/use-toast";

const Dashboard = () => {
  const navigate = useNavigate();
  const { user, loading } = useAuth();
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [selectedMonth, setSelectedMonth] = useState("February");

  // Debug log for user object and add critical user isolation debugging
  console.log("USER FROM useAuth", user);
  console.log("CRITICAL DEBUG: Current user ID for data isolation:", user?.id);

  // Force refresh queries when component mounts
  useEffect(() => {
    if (user) {
      console.log("Dashboard mounted for user:", user.id, user.email);
      // Invalidate and refetch all queries to ensure fresh data
      queryClient.invalidateQueries({ queryKey: ['transactions'] });
      queryClient.invalidateQueries({ queryKey: ['categories'] });
      queryClient.invalidateQueries({ queryKey: ['notifications'] });
    }
  }, [user, queryClient]);

  // Only render after loading is false
  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
        <div className="bg-white p-8 rounded-xl shadow-xl text-center">
          <h2 className="text-xl font-bold text-red-600 mb-4">User not loaded</h2>
          <p className="text-gray-700 mb-2">We could not load your user information. Please log in again.</p>
          <Button onClick={() => navigate("/login")}>Go to Login</Button>
        </div>
      </div>
    );
  }

  // Fetch transactions with proper error handling and user isolation debugging
  const { data: transactions = [], isLoading: transactionsLoading, error: transactionsError } = useQuery({
    queryKey: ['transactions', user.id], // Include user ID in query key for isolation
    queryFn: async () => {
      console.log("FETCHING TRANSACTIONS for user:", user.id, user.email);
      const data = await transactionService.getTransactions();
      console.log("RECEIVED TRANSACTIONS DATA:", data);
      
      // Critical debugging: Check if we're getting data for the wrong user
      if (Array.isArray(data)) {
        const userIds = [...new Set(data.map(t => t.user_id))];
        console.log("CRITICAL: Transaction data contains user_ids:", userIds);
        console.log("CRITICAL: Current user ID:", user.id);
        
        if (userIds.some(id => id !== 0 && id !== user.id)) {
          console.error("CRITICAL DATA ISOLATION ISSUE: Receiving transactions for other users!");
          toast({
            title: "Data Isolation Warning",
            description: "Detected data from other users. Please contact support.",
            variant: "destructive",
          });
        }
      }
      
      return data;
    },
    enabled: !!user,
    staleTime: 0, // Always refetch to ensure fresh data
    refetchOnMount: true,
    refetchOnWindowFocus: true,
  });

  // Fetch categories with user isolation debugging
  const { data: categories = [], isLoading: categoriesLoading } = useQuery({
    queryKey: ['categories', user.id], // Include user ID in query key for isolation
    queryFn: async () => {
      console.log("FETCHING CATEGORIES for user:", user.id, user.email);
      const data = await categoryService.getCategories();
      console.log("RECEIVED CATEGORIES DATA:", data);
      
      // Check for user isolation issues
      if (Array.isArray(data)) {
        const userIds = [...new Set(data.map(c => c.user_id))];
        console.log("CRITICAL: Category data contains user_ids:", userIds);
        
        if (userIds.some(id => id !== 0 && id !== user.id)) {
          console.error("CRITICAL DATA ISOLATION ISSUE: Receiving categories for other users!");
        }
      }
      
      return data;
    },
    enabled: !!user,
    staleTime: 0,
    refetchOnMount: true,
  });

  // Fetch notifications
  const { data: notifications = [], isLoading: notificationsLoading } = useQuery({
    queryKey: ['notifications', user.id], // Include user ID in query key for isolation
    queryFn: async () => {
      console.log("FETCHING NOTIFICATIONS for user:", user.id, user.email);
      return notificationService.getNotifications();
    },
    enabled: !!user,
    staleTime: 0,
    refetchOnMount: true,
  });

  // Show error state if there are critical errors
  if (transactionsError) {
    console.error("Transactions loading error:", transactionsError);
  }

  // Calculate summary data
  const currentMonthTransactions = transactions.filter(t => {
    const transactionDate = new Date(t.date);
    const currentDate = new Date();
    return transactionDate.getMonth() === currentDate.getMonth() && 
           transactionDate.getFullYear() === currentDate.getFullYear();
  });

  const totalIncome = currentMonthTransactions
    .filter(t => t.type === 'income')
    .reduce((sum, t) => sum + t.amount, 0);

  const totalExpenses = currentMonthTransactions
    .filter(t => t.type === 'expense')
    .reduce((sum, t) => sum + t.amount, 0);

  const balance = totalIncome - totalExpenses;

  // Recent transactions (last 5)
  const recentTransactions = transactions
    .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
    .slice(0, 5);

  // Category spending summary
  const categorySpending = categories.map(category => {
    const categoryTransactions = currentMonthTransactions.filter(t => t.category_id === category.id);
    const spent = categoryTransactions.reduce((sum, t) => sum + (t.type === 'expense' ? t.amount : 0), 0);
    
    return {
      ...category,
      spent,
      percentage: category.budget_limit > 0 ? (spent / category.budget_limit) * 100 : 0,
    };
  });

  const unreadNotifications = notifications.filter(n => !n.is_read);

  const handleNotificationClick = async (notification: Notification) => {
    if (!notification.is_read) {
      try {
        await notificationService.markAsRead(notification.id);
        // Refetch notifications to update the UI
        queryClient.invalidateQueries({ queryKey: ['notifications'] });
      } catch (error) {
        console.error('Failed to mark notification as read:', error);
      }
    }
  };

  const handleTransactionClick = (transaction: Transaction) => {
    const category = categories.find(c => c.id === transaction.category_id);
    navigate("/transaction-details", { 
      state: { 
        transaction: {
          ...transaction,
          category: category?.name || 'Unknown',
          color: category?.color || 'bg-gray-500'
        }
      } 
    });
  };

  const handleCategoryClick = (categoryData: any) => {
    navigate('/category-details', { 
      state: { 
        category: {
          ...categoryData,
          budget: categoryData.budget_limit || 0
        }, 
        month: selectedMonth 
      } 
    });
  };

  // Show loading state while any critical data is loading
  if (transactionsLoading || categoriesLoading || notificationsLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 pb-20">
        <div className="bg-white/90 backdrop-blur-lg px-6 py-6 rounded-b-3xl shadow-xl">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Loading...</h1>
              <p className="text-gray-600">Fetching your latest data</p>
            </div>
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
          </div>
        </div>
        <BottomNavigation />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 pb-20">
      {/* Header */}
      <div className="bg-white/90 backdrop-blur-lg px-6 py-6 rounded-b-3xl shadow-xl">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Welcome back!</h1>
            <p className="text-gray-600">
              {user?.email || user?.name || 'User'}
            </p>
            <p className="text-xs text-blue-600 mt-1">
              User ID: {user.id} | Transactions: {transactions.length}
            </p>
          </div>
          <div className="flex items-center space-x-4">
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="ghost" size="icon" className="relative">
                  <Bell className="w-6 h-6 text-gray-600" />
                  {unreadNotifications.length > 0 && (
                    <Badge className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-red-500 text-white text-xs flex items-center justify-center p-0">
                      {unreadNotifications.length}
                    </Badge>
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-80 p-0" align="end">
                <div className="p-4 border-b">
                  <h3 className="font-semibold">Notifications</h3>
                </div>
                <div className="max-h-64 overflow-y-auto">
                  {notifications.length === 0 ? (
                    <div className="p-4 text-center text-gray-500">
                      No notifications
                    </div>
                  ) : (
                    notifications.slice(0, 5).map((notification) => (
                      <div
                        key={notification.id}
                        className={`p-4 border-b cursor-pointer hover:bg-gray-50 ${
                          !notification.is_read ? 'bg-blue-50' : ''
                        }`}
                        onClick={() => handleNotificationClick(notification)}
                      >
                        <h4 className="font-medium text-sm">{notification.title}</h4>
                        <p className="text-xs text-gray-600 mt-1">{notification.message}</p>
                        <p className="text-xs text-gray-400 mt-2">
                          {new Date(notification.created_at).toLocaleDateString()}
                        </p>
                      </div>
                    ))
                  )}
                </div>
                {notifications.length > 5 && (
                  <div className="p-2 border-t">
                    <Button
                      variant="ghost"
                      size="sm"
                      className="w-full"
                      onClick={() => navigate("/notifications")}
                    >
                      View All
                    </Button>
                  </div>
                )}
              </PopoverContent>
            </Popover>
            <Button
              onClick={() => navigate("/profile")}
              className="w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center"
            >
              {user?.name?.[0]?.toUpperCase() || 'U'}
            </Button>
          </div>
        </div>

        {/* Balance Card */}
        <Card className="p-6 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-2xl shadow-lg">
          <div className="flex items-center justify-between mb-4">
            <div>
              <p className="text-blue-100 text-sm">Total Balance</p>
              <h2 className="text-3xl font-bold">${balance.toFixed(2)}</h2>
            </div>
            <div className="text-right">
              <p className="text-blue-100 text-sm">This Month</p>
              <div className="flex items-center">
                {balance >= 0 ? (
                  <TrendingUp className="w-4 h-4 mr-1" />
                ) : (
                  <TrendingDown className="w-4 h-4 mr-1" />
                )}
                <span className="text-sm">
                  {balance >= 0 ? '+' : ''}${Math.abs(balance).toFixed(2)}
                </span>
              </div>
            </div>
          </div>
          
          <div className="flex justify-between">
            <div>
              <p className="text-blue-100 text-xs">Income</p>
              <p className="text-lg font-semibold text-green-300">+${totalIncome.toFixed(2)}</p>
            </div>
            <div>
              <p className="text-blue-100 text-xs">Expenses</p>
              <p className="text-lg font-semibold text-red-300">-${totalExpenses.toFixed(2)}</p>
            </div>
          </div>
        </Card>
      </div>

      <div className="px-6 py-6 space-y-6">
        {/* Quick Actions */}
        <div className="grid grid-cols-2 gap-4">
          <Button
            onClick={() => navigate("/add-expense")}
            className="h-20 bg-red-500 hover:bg-red-600 text-white rounded-2xl flex flex-col items-center justify-center shadow-lg"
          >
            <Plus className="w-6 h-6 mb-1" />
            <span className="text-sm font-semibold">Add Expense</span>
          </Button>
          <Button
            onClick={() => navigate("/add-income")}
            className="h-20 bg-green-500 hover:bg-green-600 text-white rounded-2xl flex flex-col items-center justify-center shadow-lg"
          >
            <Plus className="w-6 h-6 mb-1" />
            <span className="text-sm font-semibold">Add Income</span>
          </Button>
        </div>

        {/* Spending This Month */}
        <Card className="p-6 rounded-2xl shadow-lg">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Spending This Month</h3>
            <Button
              variant="ghost"
              size="sm"
              className="text-blue-600"
              onClick={() => navigate("/categories")}
            >
              View All
            </Button>
          </div>
          <div className="space-y-4">
            {categorySpending.slice(0, 4).map((category) => (
              <div
                key={category.id}
                className="flex items-center justify-between cursor-pointer hover:bg-gray-50 p-2 rounded-xl transition-colors"
                onClick={() => handleCategoryClick(category)}
              >
                <div className="flex items-center space-x-3">
                  <div className={`w-10 h-10 rounded-full ${category.color} flex items-center justify-center text-white text-lg`}>
                    {category.icon || '💰'}
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">{category.name}</p>
                    <p className="text-sm text-gray-500">
                      ${category.spent.toFixed(2)} of ${category.budget_limit?.toFixed(2) || '0.00'}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-semibold text-gray-900">${category.spent.toFixed(2)}</p>
                  <div className="w-16 bg-gray-200 rounded-full h-2 mt-1">
                    <div
                      className={`${category.color} h-2 rounded-full transition-all duration-300`}
                      style={{ width: `${Math.min(category.percentage, 100)}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Recent Transactions */}
        <Card className="p-6 rounded-2xl shadow-lg">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Recent Transactions</h3>
            <Button
              variant="ghost"
              size="sm"
              className="text-blue-600"
              onClick={() => navigate("/transactions")}
            >
              View All
            </Button>
          </div>
          <div className="space-y-3">
            {recentTransactions.length === 0 ? (
              <div className="text-center py-8 text-gray-500">
                <DollarSign className="w-12 h-12 mx-auto mb-2 text-gray-300" />
                <p>No transactions yet</p>
                <p className="text-sm">Start by adding your first expense or income</p>
              </div>
            ) : (
              recentTransactions.map((transaction) => {
                const category = categories.find(c => c.id === transaction.category_id);
                return (
                  <div
                    key={transaction.id}
                    className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-xl cursor-pointer transition-colors"
                    onClick={() => handleTransactionClick(transaction)}
                  >
                    <div className="flex items-center space-x-3">
                      <div className={`w-10 h-10 rounded-full ${category?.color || 'bg-gray-500'} flex items-center justify-center text-white text-sm`}>
                        {category?.icon || (transaction.type === 'income' ? '💰' : '💸')}
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">{transaction.title}</p>
                        <p className="text-sm text-gray-500">
                          {new Date(transaction.date).toLocaleDateString()} • {category?.name || 'Unknown'}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className={`font-semibold ${
                        transaction.type === 'income' ? 'text-green-600' : 'text-red-600'
                      }`}>
                        {transaction.type === 'income' ? '+' : '-'}${transaction.amount.toFixed(2)}
                      </p>
                      <p className="text-xs text-gray-500 capitalize">{transaction.status}</p>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </Card>
      </div>

      <BottomNavigation />
    </div>
  );
};

export default Dashboard;
