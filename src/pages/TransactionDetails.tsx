
import { useNavigate, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowLeft, MapPin, Clock, Tag, FileText, Edit, Trash2 } from "lucide-react";

const TransactionDetails = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const transaction = location.state?.transaction;

  if (!transaction) {
    navigate("/dashboard");
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white px-4 py-4 border-b border-gray-100">
        <div className="flex items-center justify-between">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigate("/dashboard")}
            className="text-gray-600"
          >
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <h1 className="text-lg font-semibold">Transaction Details</h1>
          <div className="flex space-x-2">
            <Button variant="ghost" size="sm" className="text-gray-600">
              <Edit className="w-5 h-5" />
            </Button>
            <Button variant="ghost" size="sm" className="text-red-600">
              <Trash2 className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </div>

      <div className="px-4 py-6 space-y-6">
        {/* Transaction Amount */}
        <Card className="p-6 text-center">
          <div className={`text-4xl font-bold mb-2 ${
            transaction.amount > 0 ? "text-green-600" : "text-red-600"
          }`}>
            {transaction.amount > 0 ? "+" : ""}${Math.abs(transaction.amount).toFixed(2)}
          </div>
          <div className="text-gray-600">{transaction.title}</div>
        </Card>

        {/* Transaction Info */}
        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4">Transaction Information</h3>
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <Tag className="w-5 h-5 text-gray-400" />
              <div>
                <p className="text-sm text-gray-500">Category</p>
                <p className="font-medium">{transaction.category}</p>
              </div>
            </div>

            <div className="flex items-center space-x-3">
              <Clock className="w-5 h-5 text-gray-400" />
              <div>
                <p className="text-sm text-gray-500">Date & Time</p>
                <p className="font-medium">{transaction.date} at {transaction.time}</p>
              </div>
            </div>

            <div className="flex items-center space-x-3">
              <MapPin className="w-5 h-5 text-gray-400" />
              <div>
                <p className="text-sm text-gray-500">Location</p>
                <p className="font-medium">{transaction.location}</p>
              </div>
            </div>

            <div className="flex items-center space-x-3">
              <FileText className="w-5 h-5 text-gray-400" />
              <div>
                <p className="text-sm text-gray-500">Payment Method</p>
                <p className="font-medium">Visa ****1234</p>
              </div>
            </div>
          </div>
        </Card>

        {/* Receipt */}
        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4">Receipt</h3>
          <div className="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center">
            <FileText className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-600 mb-4">No receipt attached</p>
            <Button variant="outline" className="border-blue-600 text-blue-600 hover:bg-blue-50">
              Add Receipt
            </Button>
          </div>
        </Card>

        {/* Notes */}
        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4">Notes</h3>
          <p className="text-gray-600">
            {transaction.amount < 0 ? "Regular grocery shopping for the week" : "Monthly salary deposit"}
          </p>
        </Card>

        {/* Actions */}
        <div className="space-y-3">
          <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white h-12 rounded-xl">
            Edit Transaction
          </Button>
          <Button variant="outline" className="w-full border-red-300 text-red-600 hover:bg-red-50 h-12 rounded-xl">
            Delete Transaction
          </Button>
        </div>
      </div>
    </div>
  );
};

export default TransactionDetails;
