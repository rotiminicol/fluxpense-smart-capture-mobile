
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/hooks/useAuth";
import SplashScreen from "./pages/SplashScreen";
import WelcomeScreen from "./pages/WelcomeScreen";
import LoginScreen from "./pages/LoginScreen";
import SignUpScreen from "./pages/SignUpScreen";
import OnboardingScreen from "./pages/OnboardingScreen";
import Dashboard from "./pages/Dashboard";
import AddExpense from "./pages/AddExpense";
import AddIncome from "./pages/AddIncome";
import Profile from "./pages/Profile";
import Settings from "./pages/Settings";
import Reports from "./pages/Reports";
import Categories from "./pages/Categories";
import EditProfile from "./pages/EditProfile";
import Notifications from "./pages/Notifications";
import PaymentMethods from "./pages/PaymentMethods";
import PrivacySecurity from "./pages/PrivacySecurity";
import HelpSupport from "./pages/HelpSupport";
import TransactionDetails from "./pages/TransactionDetails";
import CategoryDetails from "./pages/CategoryDetails";
import Transactions from "./pages/Transactions";
import NotFound from "./pages/NotFound";
import ForgotPassword from "./pages/ForgotPassword";
import { AnimatePresence, motion } from "framer-motion";
import { Outlet, useLocation } from "react-router-dom";
import BottomNavigation from "@/components/BottomNavigation";

const queryClient = new QueryClient();

const LayoutWithBottomNav = () => {
  const location = useLocation();
  return (
    <>
      <AnimatePresence mode="wait">
        <motion.div
          key={location.pathname}
          initial={{ x: 100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: -100, opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          <Outlet />
        </motion.div>
      </AnimatePresence>
      <BottomNavigation />
    </>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <div className="min-h-screen bg-gray-50">
            <Routes>
              <Route path="/" element={<SplashScreen />} />
              <Route path="/welcome" element={<WelcomeScreen />} />
              <Route path="/login" element={<LoginScreen />} />
              <Route path="/signup" element={<SignUpScreen />} />
              <Route path="/onboarding" element={<OnboardingScreen />} />
              {/* Tabbed pages with persistent bottom nav and slide transitions */}
              <Route element={<LayoutWithBottomNav />}>
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/reports" element={<Reports />} />
                <Route path="/categories" element={<Categories />} />
                <Route path="/add-expense" element={<AddExpense />} />
                <Route path="/add-income" element={<AddIncome />} />
              </Route>
              {/* All other pages (no bottom nav) */}
              <Route path="/profile" element={<Profile />} />
              <Route path="/profile/edit" element={<EditProfile />} />
              <Route path="/notifications" element={<Notifications />} />
              <Route path="/payment-methods" element={<PaymentMethods />} />
              <Route path="/privacy" element={<PrivacySecurity />} />
              <Route path="/help" element={<HelpSupport />} />
              <Route path="/settings" element={<Settings />} />
              <Route path="/transactions" element={<Transactions />} />
              <Route path="/transaction-details" element={<TransactionDetails />} />
              <Route path="/category-details" element={<CategoryDetails />} />
              <Route path="/forgot-password" element={<ForgotPassword />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </div>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
