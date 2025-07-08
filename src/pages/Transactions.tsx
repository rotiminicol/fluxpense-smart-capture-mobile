
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowLeft, Search, Filter, TrendingUp, TrendingDown } from "lucide-react";
import { transactionService } from "@/services/transactionService";
import { categoryService } from "@/services/categoryService";
import { BadgeCheck, BadgeAlert } from "lucide-react";

type Transaction = {
  id: number;
  title: string;
  category: string;
  amount: number;
  date: string;
  time: string;
  location: string;
  status: string;
};

const Transactions = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [filterCategory, setFilterCategory] = useState("all");
  const [activeGroup, setActiveGroup] = useState<string | null>(null);
  const [allTransactions, setAllTransactions] = useState<any[]>([]);
  const [categories, setCategories] = useState<string[]>([]);

  useEffect(() => {
    transactionService.getTransactions().then(setAllTransactions);
    categoryService.getCategories().then(cats => setCategories(["all", ...cats.map((c: any) => c.name)]));
    document.body.classList.add("animate-fade-slide-in");
    return () => document.body.classList.remove("animate-fade-slide-in");
  }, []);

  const filteredTransactions = allTransactions.filter(transaction => {
    const matchesSearch = transaction.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = filterCategory === "all" || transaction.category === filterCategory;
    return matchesSearch && matchesCategory;
  });

  // Group by date
  const groups = Array.from(new Set(filteredTransactions.map(t => t.date)));
  const grouped = groups.map(date => ({
    date,
    items: filteredTransactions.filter(t => t.date === date)
  }));

  const handleTransactionClick = (transaction: Transaction) => {
    navigate("/transaction-details", { state: { transaction } });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100/60 to-blue-200/80 flex flex-col items-center animate-fade-slide-up pb-24">
      <div className="w-full max-w-2xl px-4 sm:px-0 py-8 overflow-y-auto" style={{ minHeight: '100vh' }}>
        {/* Header */}
        <div className="flex items-center gap-2 mb-8 animate-stagger-in" style={{ animationDelay: '100ms' }}>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => navigate("/dashboard")}
            className="rounded-full bg-white/70 hover:bg-blue-100 shadow-md border border-blue-200 transition-all duration-200"
            aria-label="Back"
          >
            <ArrowLeft className="w-6 h-6 text-blue-600" />
          </Button>
          <h1 className="text-2xl font-bold text-blue-800 ml-2 tracking-tight flex-1">All Transactions</h1>
        </div>
        {/* Search and Filter */}
        <div className="flex space-x-3 mb-8 animate-stagger-in" style={{ animationDelay: '150ms' }}>
          <div className="flex-1 relative">
            <Search className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <Input
              placeholder="Search transactions..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 h-14 rounded-xl bg-white/80 focus:bg-white/90 border-2 border-transparent focus:border-blue-400 shadow-sm focus:shadow-md transition-all duration-200 animate-glow-on-press"
            />
          </div>
          <Select value={filterCategory} onValueChange={setFilterCategory}>
            <SelectTrigger className="w-40 h-14 rounded-xl bg-white/80 animate-glow-on-press">
              <Filter className="w-4 h-4 mr-2" />
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {categories.map((category) => (
                <SelectItem key={category} value={category} className="text-lg">
                  {category === "all" ? "All" : category}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        {/* Transaction Groups */}
        <div className="space-y-10">
          {grouped.map((group, gi) => (
            <div key={group.date} className="">
              <div className="sticky top-0 z-10 bg-blue-100/80 backdrop-blur-md px-2 py-2 rounded-xl font-bold text-blue-700 text-lg shadow animate-stagger-in" style={{animationDelay:`${200+gi*50}ms`}}>
                {group.date}
              </div>
              <div className="space-y-4 mt-4">
                {group.items.map((transaction, ti) => (
                  <Card
                    key={transaction.id}
                    className={`relative p-6 rounded-2xl glass-card shadow-xl cursor-pointer transition-all duration-200 animate-stagger-in hover:scale-[1.025] hover:shadow-2xl ${transaction.amount > 0 ? 'border-green-200' : 'border-red-200'}`}
                    style={{animationDelay:`${250+ti*80}ms`} }
                    onClick={() => handleTransactionClick(transaction)}
                    tabIndex={0}
                    aria-label={transaction.title + ': $' + transaction.amount}
                  >
                    <div className="flex items-center gap-4">
                      <div className={`w-12 h-12 rounded-full flex items-center justify-center text-2xl ${transaction.amount > 0 ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'}`}>
                        {transaction.amount > 0 ? '💰' : '💸'}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="font-bold text-blue-900 truncate text-lg">{transaction.title}</div>
                        <div className="text-blue-500 text-sm truncate">{transaction.category}  b {transaction.time}</div>
                      </div>
                      <div className="flex flex-col items-end">
                        <span className={`font-bold text-xl ${transaction.amount > 0 ? "text-green-600" : "text-red-600"}`}>{transaction.amount > 0 ? "+" : "-"}${Math.abs(transaction.amount).toFixed(2)}</span>
                        <span className="text-xs mt-1">
                          {transaction.status === 'Completed' && <span className="inline-flex items-center gap-1 text-green-600"><BadgeCheck className="w-4 h-4" /> Completed</span>}
                          {transaction.status === 'Pending' && <span className="inline-flex items-center gap-1 text-yellow-500"><BadgeAlert className="w-4 h-4" /> Pending</span>}
                          {transaction.status === 'Failed' && <span className="inline-flex items-center gap-1 text-red-500"><BadgeAlert className="w-4 h-4" /> Failed</span>}
                        </span>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          ))}
        </div>
        {filteredTransactions.length === 0 && (
          <div className="text-center py-12">
            <p className="text-blue-500">No transactions found</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Transactions;
