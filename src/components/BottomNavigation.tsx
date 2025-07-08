
import { useNavigate, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Home, PlusCircle, BarChart3, User } from "lucide-react";

const BottomNavigation = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const navItems = [
    { icon: Home, label: "Home", path: "/dashboard" },
    { icon: PlusCircle, label: "Add", path: "/add-expense" },
    { icon: BarChart3, label: "Reports", path: "/reports" },
    { icon: User, label: "Profile", path: "/profile" },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-4 py-2">
      <div className="flex justify-around items-center max-w-md mx-auto">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.path;
          
          return (
            <Button
              key={item.path}
              variant="ghost"
              size="sm"
              onClick={() => navigate(item.path)}
              className={`flex flex-col items-center space-y-1 p-2 h-auto ${
                isActive 
                  ? "text-blue-600" 
                  : "text-gray-500 hover:text-blue-600"
              }`}
            >
              <Icon className={`w-5 h-5 ${isActive ? "text-blue-600" : ""}`} />
              <span className={`text-xs font-medium ${isActive ? "text-blue-600" : ""}`}>
                {item.label}
              </span>
            </Button>
          );
        })}
      </div>
    </div>
  );
};

export default BottomNavigation;
