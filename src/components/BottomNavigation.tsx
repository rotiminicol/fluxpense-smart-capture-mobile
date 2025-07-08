
import { useNavigate, useLocation } from "react-router-dom";
import { useState } from "react";
import { Home, List, Plus, BarChart3, MoreHorizontal, User, Bell, Settings, Lock, HelpCircle, CreditCard, FolderPlus, FolderMinus, UserCog } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Dialog, DialogContent } from "@/components/ui/dialog";

const navTabs = [
  { icon: Home, label: "Dashboard", path: "/dashboard" },
  { icon: List, label: "Transactions", path: "/transactions" },
  { icon: Plus, label: "Add", path: null }, // Center FAB
  { icon: BarChart3, label: "Reports", path: "/reports" },
  { icon: MoreHorizontal, label: "More", path: null },
];

const moreMenu = [
  { icon: User, label: "Profile", path: "/profile" },
  { icon: UserCog, label: "Edit Profile", path: "/edit-profile" },
  { icon: Lock, label: "Privacy & Security", path: "/privacy-security" },
  { icon: Settings, label: "Settings", path: "/settings" },
  { icon: HelpCircle, label: "Help & Support", path: "/help-support" },
  { icon: Bell, label: "Notifications", path: "/notifications" },
  { icon: CreditCard, label: "Payment Methods", path: "/payment-methods" },
  { icon: FolderPlus, label: "Categories", path: "/categories" },
  { icon: BarChart3, label: "Reports", path: "/reports" },
  { icon: FolderPlus, label: "Add Income", path: "/add-income" },
  { icon: FolderMinus, label: "Add Expense", path: "/add-expense" },
];

const BottomNavigation = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [addOpen, setAddOpen] = useState(false);
  const [moreOpen, setMoreOpen] = useState(false);

  return (
    <div className="fixed bottom-0 left-0 right-0 z-40">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="relative max-w-md mx-auto flex items-end justify-between px-2 pb-2"
      >
        {/* Glass Nav Bar */}
        <div className="absolute inset-0 h-20 bg-white rounded-t-3xl shadow-2xl border-t border-blue-200" />
        <div className="relative w-full flex items-center justify-between z-10 h-20">
          {navTabs.map((tab, i) => {
            if (i === 2) {
              // Center Add FAB
              return (
                <div key="add-fab" className="flex-1 flex justify-center items-end relative z-20" style={{ marginTop: '-32px' }}>
                  <motion.button
                    aria-label="Add"
                    className="w-16 h-16 rounded-full bg-blue-600 shadow-2xl border-4 border-white flex items-center justify-center text-white text-3xl focus:outline-none focus:ring-2 focus:ring-blue-400"
                    style={{ marginBottom: 8 }}
                    whileTap={{ scale: 0.9 }}
                    animate={{ y: [0, -6, 0] }}
                    transition={{ repeat: Infinity, duration: 1.5 }}
                    onClick={() => setAddOpen(true)}
                  >
                    <Plus className="w-9 h-9 animate-pulse" />
                  </motion.button>
                </div>
              );
            }
            // Other tabs
            const isActive = (i === 0 && location.pathname === "/dashboard") ||
              (i === 1 && location.pathname.startsWith("/transactions")) ||
              (i === 3 && location.pathname.startsWith("/reports"));
            return (
              <motion.button
                key={tab.label}
                aria-label={tab.label}
                className={`flex flex-col items-center justify-center flex-1 h-20 px-2 focus:outline-none group ${isActive ? 'text-blue-600' : 'text-gray-500 hover:text-blue-600'}`}
                whileTap={{ scale: 0.9 }}
                onClick={() => {
                  if (tab.label === "More") setMoreOpen(true);
                  else if (tab.path) navigate(tab.path);
                }}
              >
                <motion.div
                  animate={isActive ? { scale: 1.2, y: -4, filter: "drop-shadow(0_0_8px_#3b82f6)" } : { scale: 1, y: 0, filter: "none" }}
                  transition={{ type: "spring", stiffness: 300 }}
                  className="relative flex flex-col items-center justify-center"
                >
                  <tab.icon className={`w-7 h-7 mb-1 ${isActive ? 'text-blue-600' : ''}`} />
                </motion.div>
                <span className={`text-xs font-semibold relative flex flex-col items-center ${isActive ? 'text-blue-600' : ''}`}>
                  {tab.label}
                  {isActive && (
                    <motion.div
                      layoutId="nav-underline"
                      className="mt-1 w-8 h-1 rounded-full bg-blue-400 shadow animate-pulse"
                      style={{ zIndex: 1 }}
                    />
                  )}
                </span>
              </motion.button>
            );
          })}
        </div>
      </motion.div>
      {/* Add Modal/Sheet */}
      <AnimatePresence>
        {addOpen && (
          <motion.div
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-50 flex items-end justify-center bg-black/30"
            onClick={() => setAddOpen(false)}
          >
            <motion.div
              initial={{ y: 80, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 80, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="w-full max-w-md bg-white/90 rounded-t-3xl p-8 pb-12 shadow-2xl flex flex-col gap-6 items-center"
              onClick={e => e.stopPropagation()}
            >
              <button
                className="w-full flex items-center gap-4 p-4 rounded-xl bg-blue-100 hover:bg-blue-200 text-blue-700 font-bold text-lg shadow focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all animate-glow-on-press"
                onClick={() => { setAddOpen(false); navigate('/add-income'); }}
              >
                <FolderPlus className="w-7 h-7" /> ➕ Add Income
              </button>
              <button
                className="w-full flex items-center gap-4 p-4 rounded-xl bg-red-100 hover:bg-red-200 text-red-700 font-bold text-lg shadow focus:outline-none focus:ring-2 focus:ring-red-400 transition-all animate-glow-on-press"
                onClick={() => { setAddOpen(false); navigate('/add-expense'); }}
              >
                <FolderMinus className="w-7 h-7" /> ➖ Add Expense
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      {/* More Sheet */}
      <AnimatePresence>
        {moreOpen && (
          <motion.div
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-50 flex items-end justify-center bg-white"
            onClick={() => setMoreOpen(false)}
          >
            <motion.div
              initial={{ y: 80, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 80, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="w-full max-w-md bg-white/90 rounded-t-3xl p-0 pb-12 shadow-2xl flex flex-col"
              style={{ maxHeight: '80vh' }}
              onClick={e => e.stopPropagation()}
            >
              {/* Close handle */}
              <div className="w-full flex flex-col items-center pt-4 pb-2 bg-transparent sticky top-0 z-10">
                <button
                  aria-label="Close More Menu"
                  className="w-12 h-2 rounded-full bg-blue-200 mb-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                  onClick={() => setMoreOpen(false)}
                  tabIndex={0}
                />
              </div>
              {/* Scrollable content */}
              <div className="overflow-y-auto px-8 pb-8" style={{ maxHeight: 'calc(80vh - 40px)' }}>
                {moreMenu.map(item => (
                  <button
                    key={item.path}
                    className="flex items-center gap-4 p-4 rounded-xl glass-card shadow hover:scale-[1.03] transition-all duration-150 focus:outline-none focus:ring-2 focus:ring-blue-400 animate-glow-on-press w-full mb-2"
                    onClick={() => { setMoreOpen(false); navigate(item.path); }}
                    aria-label={item.label}
                  >
                    <item.icon className="w-6 h-6 text-blue-500" />
                    <span className="font-semibold text-blue-900 text-lg">{item.label}</span>
                  </button>
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default BottomNavigation;
