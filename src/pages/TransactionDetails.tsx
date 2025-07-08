
import { useNavigate, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowLeft, MapPin, Clock, Tag, FileText, Edit, Trash2 } from "lucide-react";
import { useEffect, useState } from "react";
import { BadgeCheck, BadgeAlert, BadgeX, Download, AlertCircle, Clipboard } from "lucide-react";
import { Tooltip } from "@/components/ui/tooltip";

const TransactionDetails = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const transaction = location.state?.transaction;
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    document.body.classList.add("animate-fade-slide-in");
    return () => document.body.classList.remove("animate-fade-slide-in");
  }, []);

  if (!transaction) {
    navigate("/dashboard");
    return null;
  }

  const handleCopy = () => {
    navigator.clipboard.writeText(transaction.id.toString());
    setCopied(true);
    setTimeout(() => setCopied(false), 1200);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100/60 to-blue-200/80 flex flex-col items-center animate-fade-slide-up pb-24">
      <div className="w-full max-w-xl px-4 sm:px-0 py-12 overflow-y-auto" style={{ minHeight: '100vh' }}>
        {/* Header */}
        <div className="flex items-center gap-4 mb-14 animate-stagger-in" style={{ animationDelay: '100ms' }}>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => navigate("/transactions")}
            className="rounded-full bg-white/70 hover:bg-blue-100 shadow-md border border-blue-200 transition-all duration-200"
            aria-label="Back"
          >
            <ArrowLeft className="w-6 h-6 text-blue-600" />
          </Button>
          <h1 className="text-2xl font-bold text-blue-800 ml-2 tracking-tight flex-1">Transaction Details</h1>
        </div>
        {/* Amount Card */}
        <Card className="p-14 rounded-3xl glass-card shadow-2xl text-center animate-stagger-in mb-10" style={{ animationDelay: '200ms' }}>
          <div className={`text-5xl font-bold mb-4 ${transaction.amount > 0 ? "text-green-600" : "text-red-600"}`}>{transaction.amount > 0 ? "+" : "-"}${Math.abs(transaction.amount).toFixed(2)}</div>
          <div className="text-blue-900 text-xl font-semibold mb-4">{transaction.title}</div>
          <div className="flex justify-center gap-4 mt-4">
            {transaction.status === 'Completed' && <span className="inline-flex items-center gap-2 text-green-600 text-lg"><BadgeCheck className="w-5 h-5" /> Completed</span>}
            {transaction.status === 'Pending' && <span className="inline-flex items-center gap-2 text-yellow-500 text-lg"><BadgeAlert className="w-5 h-5" /> Pending</span>}
            {transaction.status === 'Failed' && <span className="inline-flex items-center gap-2 text-red-500 text-lg"><BadgeX className="w-5 h-5" /> Failed</span>}
          </div>
        </Card>
        {/* Info Card */}
        <Card className="p-10 rounded-3xl glass-card shadow-2xl animate-stagger-in mb-10" style={{ animationDelay: '300ms' }}>
          <div className="space-y-10">
            <div className="flex items-center gap-6">
              <Tag className="w-7 h-7 text-blue-400" />
              <div>
                <div className="text-sm text-blue-500 mb-1">Category</div>
                <div className="font-bold text-blue-900 text-lg">{transaction.category}</div>
              </div>
            </div>
            <div className="flex items-center gap-6">
              <Clock className="w-7 h-7 text-blue-400" />
              <div>
                <div className="text-sm text-blue-500 mb-1">Date & Time</div>
                <div className="font-bold text-blue-900 text-lg">{transaction.date} at {transaction.time}</div>
              </div>
            </div>
            <div className="flex items-center gap-6">
              <MapPin className="w-7 h-7 text-blue-400" />
              <div>
                <div className="text-sm text-blue-500 mb-1">Location</div>
                <div className="font-bold text-blue-900 text-lg">{transaction.location}</div>
              </div>
            </div>
            <div className="flex items-center gap-6">
              <FileText className="w-7 h-7 text-blue-400" />
              <div>
                <div className="text-sm text-blue-500 mb-1">Payment Method</div>
                <div className="font-bold text-blue-900 text-lg">Visa ****1234</div>
              </div>
            </div>
            {/* Reference ID with Tooltip */}
            <div className="flex items-center gap-6">
              <Clipboard className="w-7 h-7 text-blue-400 cursor-pointer" onClick={handleCopy} />
              <div>
                <div className="text-sm text-blue-500 mb-1">Reference ID</div>
                <div className="font-bold text-blue-900 text-lg flex items-center gap-3">
                  {transaction.id}
                  <Tooltip>
                    <span className={`text-xs px-3 py-1 rounded transition-all duration-200 ${copied ? 'bg-green-100 text-green-700' : 'bg-blue-100 text-blue-700'}`}>{copied ? 'Copied!' : 'Copy'}</span>
                  </Tooltip>
                </div>
              </div>
            </div>
          </div>
        </Card>
        {/* Notes Card */}
        <Card className="p-10 rounded-3xl glass-card shadow-2xl animate-stagger-in mb-10" style={{ animationDelay: '400ms' }}>
          <div className="flex items-center gap-6 mb-4">
            <FileText className="w-7 h-7 text-blue-400" />
            <div className="text-sm text-blue-500">Notes</div>
          </div>
          <div className="text-blue-900 text-lg font-medium">
            {transaction.amount < 0 ? "Regular grocery shopping for the week" : "Monthly salary deposit"}
          </div>
        </Card>
        {/* Actions */}
        <div className="space-y-6 mt-12 animate-stagger-in" style={{ animationDelay: '500ms' }}>
          <Button className="w-full h-16 rounded-2xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xl shadow-lg transition-all duration-150 animate-glow-on-press flex items-center gap-3">
            <AlertCircle className="w-6 h-6" /> Report Issue
          </Button>
          <Button className="w-full h-16 rounded-2xl bg-white/90 border-2 border-blue-200 text-blue-700 font-bold text-xl shadow-lg transition-all duration-150 animate-glow-on-press flex items-center gap-3">
            <Download className="w-6 h-6" /> Download Receipt
          </Button>
        </div>
      </div>
    </div>
  );
};

export default TransactionDetails;
