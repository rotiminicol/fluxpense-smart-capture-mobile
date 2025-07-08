
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import BottomNavigation from "@/components/BottomNavigation";
import { 
  Settings, 
  Bell, 
  CreditCard, 
  Shield, 
  HelpCircle, 
  LogOut, 
  ChevronRight,
  User,
  Camera
} from "lucide-react";

const Profile = () => {
  const navigate = useNavigate();
  const [user] = useState({
    name: "John Doe",
    email: "john.doe@example.com",
    avatar: "",
    memberSince: "January 2024"
  });

  const menuItems = [
    { icon: User, label: "Edit Profile", path: "/profile/edit" },
    { icon: Bell, label: "Notifications", path: "/notifications" },
    { icon: CreditCard, label: "Payment Methods", path: "/payment-methods" },
    { icon: Settings, label: "Settings", path: "/settings" },
    { icon: Shield, label: "Privacy & Security", path: "/privacy" },
    { icon: HelpCircle, label: "Help & Support", path: "/help" },
  ];

  const handleLogout = () => {
    navigate("/welcome");
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-700 px-4 py-8">
        <div className="text-center">
          <div className="relative inline-block mb-4">
            <Avatar className="w-24 h-24 border-4 border-white">
              <AvatarImage src={user.avatar} />
              <AvatarFallback className="bg-white text-blue-600 text-2xl font-bold">
                {user.name.charAt(0)}
              </AvatarFallback>
            </Avatar>
            <Button
              size="sm"
              className="absolute -bottom-2 -right-2 w-8 h-8 rounded-full bg-white text-blue-600 hover:bg-blue-50 p-0"
            >
              <Camera className="w-4 h-4" />
            </Button>
          </div>
          <h1 className="text-2xl font-bold text-white mb-1">{user.name}</h1>
          <p className="text-blue-100 mb-2">{user.email}</p>
          <p className="text-blue-200 text-sm">Member since {user.memberSince}</p>
        </div>
      </div>

      <div className="px-4 py-6 space-y-6">
        {/* Stats Cards */}
        <div className="grid grid-cols-2 gap-4">
          <Card className="p-4 text-center">
            <div className="text-2xl font-bold text-gray-900 mb-1">127</div>
            <div className="text-sm text-gray-600">Transactions</div>
          </Card>
          <Card className="p-4 text-center">
            <div className="text-2xl font-bold text-gray-900 mb-1">$2,840</div>
            <div className="text-sm text-gray-600">This Month</div>
          </Card>
        </div>

        {/* Menu Items */}
        <Card className="overflow-hidden">
          {menuItems.map((item, index) => {
            const Icon = item.icon;
            return (
              <div key={item.label}>
                <Button
                  variant="ghost"
                  onClick={() => navigate(item.path)}
                  className="w-full justify-between h-14 px-4 rounded-none hover:bg-gray-50"
                >
                  <div className="flex items-center space-x-3">
                    <Icon className="w-5 h-5 text-gray-600" />
                    <span className="text-gray-900 font-medium">{item.label}</span>
                  </div>
                  <ChevronRight className="w-5 h-5 text-gray-400" />
                </Button>
                {index < menuItems.length - 1 && <div className="border-b border-gray-100 mx-4" />}
              </div>
            );
          })}
        </Card>

        {/* App Info */}
        <Card className="p-4">
          <div className="text-center space-y-2">
            <div className="text-lg font-semibold text-gray-900">Fluxpense</div>
            <div className="text-sm text-gray-600">Version 1.0.0</div>
            <div className="text-xs text-gray-500">Smart Expense Manager</div>
          </div>
        </Card>

        {/* Logout Button */}
        <Button
          onClick={handleLogout}
          variant="outline"
          className="w-full border-red-300 text-red-600 hover:bg-red-50 hover:border-red-400 h-14 rounded-xl"
        >
          <LogOut className="w-5 h-5 mr-2" />
          Sign Out
        </Button>
      </div>

      <BottomNavigation />
    </div>
  );
};

export default Profile;
