
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowLeft, CreditCard, Plus, Settings } from "lucide-react";

const PaymentMethods = () => {
  const navigate = useNavigate();
  const [paymentMethods] = useState([
    {
      id: 1,
      type: "Credit Card",
      name: "Visa ****1234",
      expiry: "12/25",
      isDefault: true,
    },
    {
      id: 2,
      type: "Debit Card",
      name: "MasterCard ****5678",
      expiry: "08/26",
      isDefault: false,
    },
  ]);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white px-4 py-4 border-b border-gray-100">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => navigate("/profile")}
              className="text-gray-600 mr-3"
            >
              <ArrowLeft className="w-5 h-5" />
            </Button>
            <h1 className="text-lg font-semibold">Payment Methods</h1>
          </div>
          <Button
            className="bg-blue-600 hover:bg-blue-700 text-white text-sm px-4 py-2"
          >
            <Plus className="w-4 h-4 mr-2" />
            Add Card
          </Button>
        </div>
      </div>

      <div className="px-4 py-6 space-y-4">
        {paymentMethods.map((method) => (
          <Card key={method.id} className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                  <CreditCard className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <div className="font-medium text-gray-900">{method.name}</div>
                  <div className="text-sm text-gray-500">
                    {method.type} • Expires {method.expiry}
                  </div>
                  {method.isDefault && (
                    <div className="text-xs text-blue-600 font-medium mt-1">Default</div>
                  )}
                </div>
              </div>
              <Button variant="ghost" size="sm" className="text-gray-600">
                <Settings className="w-4 h-4" />
              </Button>
            </div>
          </Card>
        ))}

        {/* Add New Card */}
        <Card className="p-6 border-2 border-dashed border-gray-300">
          <div className="text-center">
            <div className="w-12 h-12 bg-gray-100 rounded-xl flex items-center justify-center mx-auto mb-4">
              <Plus className="w-6 h-6 text-gray-400" />
            </div>
            <h3 className="font-medium text-gray-900 mb-2">Add New Payment Method</h3>
            <p className="text-sm text-gray-500 mb-4">
              Add a credit or debit card to track your expenses automatically
            </p>
            <Button className="bg-blue-600 hover:bg-blue-700 text-white">
              Add Payment Method
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default PaymentMethods;
