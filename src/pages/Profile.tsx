
import { useState, useRef } from "react";
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
  Camera,
  Upload
} from "lucide-react";

const Profile = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState({
    name: "John Doe",
    email: "john.doe@example.com",
    avatar: "",
    memberSince: "January 2024"
  });
  const [editing, setEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: user.name,
    email: user.email,
    phone: "",
  });
  const [avatarUrl, setAvatarUrl] = useState(user.avatar);
  const [showSuccess, setShowSuccess] = useState(false);
  const [inputFocus, setInputFocus] = useState<string | null>(null);
  const cameraInputRef = useRef<HTMLInputElement>(null);
  const uploadInputRef = useRef<HTMLInputElement>(null);

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

  // Remove handleCameraCapture and camera logic
  const handleAvatarUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setAvatarUrl(URL.createObjectURL(file));
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 1500);
    }
  };

  const handleSave = () => {
    setUser({ ...user, name: formData.name, email: formData.email, avatar: avatarUrl });
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 1500);
    setEditing(false);
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-20 animate-profile-fade-in">
      {/* Header/Profile Image */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-700 px-4 py-10 rounded-b-3xl shadow-xl animate-profile-section" style={{ animationDelay: '100ms' }}>
        <div className="text-center">
          <div className="relative inline-block mb-4 animate-profile-section" style={{ animationDelay: '200ms' }}>
            <Avatar className="w-28 h-28 border-4 border-white shadow-xl">
              <AvatarImage src={avatarUrl} />
              <AvatarFallback className="bg-white text-blue-600 text-2xl font-bold">
                {user.name.charAt(0)}
              </AvatarFallback>
            </Avatar>
            <input
              type="file"
              accept="image/*"
              className="hidden"
              ref={uploadInputRef}
              onChange={handleAvatarUpload}
            />
            <div className="absolute -bottom-2 -right-2 flex gap-2">
              <Button
                size="icon"
                className="w-10 h-10 rounded-full bg-white/90 text-blue-600 shadow-lg border border-blue-100 hover:bg-blue-50 flex items-center justify-center transition-all duration-200"
                onClick={() => uploadInputRef.current?.click()}
                aria-label="Add/Change Photo"
              >
                <Upload className="w-5 h-5" />
              </Button>
            </div>
            {avatarUrl && (
              <img
                src={avatarUrl}
                alt="Profile Preview"
                className="absolute left-1/2 -translate-x-1/2 top-0 w-28 h-28 rounded-full object-cover shadow-xl border-4 border-white animate-profile-img-fade"
                style={{ zIndex: 1, pointerEvents: 'none' }}
              />
            )}
          </div>
          <h1 className="text-2xl font-bold text-white mb-1 animate-profile-section" style={{ animationDelay: '300ms' }}>{user.name}</h1>
          <p className="text-blue-100 mb-2 animate-profile-section" style={{ animationDelay: '350ms' }}>{user.email}</p>
          <p className="text-blue-200 text-sm animate-profile-section" style={{ animationDelay: '400ms' }}>Member since {user.memberSince}</p>
        </div>
      </div>
      <div className="px-4 py-6 space-y-6">
        {/* Editable Info */}
        <Card className="p-6 glass-card rounded-2xl shadow-xl animate-profile-section" style={{ animationDelay: '500ms' }}>
          <h3 className="text-lg font-semibold mb-4">Personal Information</h3>
          <div className="space-y-6">
            <div className="space-y-2">
              <label htmlFor="name" className="text-gray-700 font-medium block mb-1 ml-2">Name</label>
              <input
                id="name"
                value={formData.name}
                onChange={e => setFormData(f => ({ ...f, name: e.target.value }))}
                onFocus={() => setInputFocus('name')}
                onBlur={() => setInputFocus(null)}
                className={`h-12 rounded-xl px-4 w-full text-lg font-semibold transition-all duration-150 bg-white/80 border border-gray-200 focus:ring-2 focus:ring-blue-300 focus:border-blue-400 shadow-sm ${inputFocus === 'name' ? 'ring-2 ring-blue-300 shadow-md' : ''}`}
                disabled={!editing}
                aria-label="Name"
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="email" className="text-gray-700 font-medium block mb-1 ml-2">Email</label>
              <input
                id="email"
                type="email"
                value={formData.email}
                onChange={e => setFormData(f => ({ ...f, email: e.target.value }))}
                onFocus={() => setInputFocus('email')}
                onBlur={() => setInputFocus(null)}
                className={`h-12 rounded-xl px-4 w-full text-lg font-semibold transition-all duration-150 bg-white/80 border border-gray-200 focus:ring-2 focus:ring-blue-300 focus:border-blue-400 shadow-sm ${inputFocus === 'email' ? 'ring-2 ring-blue-300 shadow-md' : ''}`}
                disabled={!editing}
                aria-label="Email"
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="phone" className="text-gray-700 font-medium block mb-1 ml-2">Phone</label>
              <input
                id="phone"
                value={formData.phone}
                onChange={e => setFormData(f => ({ ...f, phone: e.target.value }))}
                onFocus={() => setInputFocus('phone')}
                onBlur={() => setInputFocus(null)}
                className={`h-12 rounded-xl px-4 w-full text-lg font-semibold transition-all duration-150 bg-white/80 border border-gray-200 focus:ring-2 focus:ring-blue-300 focus:border-blue-400 shadow-sm ${inputFocus === 'phone' ? 'ring-2 ring-blue-300 shadow-md' : ''}`}
                disabled={!editing}
                aria-label="Phone"
              />
            </div>
            <div className="flex gap-3 mt-4">
              {editing ? (
                <Button
                  onClick={handleSave}
                  className="flex-1 bg-blue-600 hover:bg-blue-700 text-white text-base py-3 rounded-xl font-bold shadow-lg transition-all duration-150 animate-pulse-on-press"
                >
                  Save Changes
                </Button>
              ) : (
                <Button
                  onClick={() => setEditing(true)}
                  className="flex-1 bg-blue-600 hover:bg-blue-700 text-white text-base py-3 rounded-xl font-bold shadow-lg transition-all duration-150 animate-pulse-on-press"
                >
                  Edit Profile
                </Button>
              )}
              <Button
                variant="outline"
                className="flex-1 border-blue-300 text-blue-600 hover:bg-blue-50 text-base py-3 rounded-xl font-bold shadow-lg transition-all duration-150"
                onClick={() => navigate('/dashboard')}
              >
                Back to Dashboard
              </Button>
            </div>
            {showSuccess && (
              <div className="text-green-600 text-center font-semibold mt-2 animate-profile-success">Profile updated!</div>
            )}
          </div>
        </Card>
        {/* Stats Cards */}
        <div className="grid grid-cols-2 gap-4 animate-profile-section" style={{ animationDelay: '700ms' }}>
          <Card className="p-4 text-center glass-card rounded-2xl shadow-xl">
            <div className="text-2xl font-bold text-gray-900 mb-1">127</div>
            <div className="text-sm text-gray-600">Transactions</div>
          </Card>
          <Card className="p-4 text-center glass-card rounded-2xl shadow-xl">
            <div className="text-2xl font-bold text-gray-900 mb-1">$2,840</div>
            <div className="text-sm text-gray-600">This Month</div>
          </Card>
        </div>
        {/* Menu Items */}
        <Card className="overflow-hidden glass-card rounded-2xl shadow-xl animate-profile-section" style={{ animationDelay: '900ms' }}>
          {menuItems.map((item, index) => {
            const Icon = item.icon;
            return (
              <div key={item.label}>
                <Button
                  variant="ghost"
                  onClick={() => navigate(item.path)}
                  className="w-full justify-between h-14 px-4 rounded-none hover:bg-gray-50 transition-all duration-150"
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
        <Card className="p-4 glass-card rounded-2xl shadow-xl text-center animate-profile-section" style={{ animationDelay: '1100ms' }}>
          <div className="text-lg font-semibold text-gray-900">Fluxpense</div>
          <div className="text-sm text-gray-600">Version 1.0.0</div>
          <div className="text-xs text-gray-500">Smart Expense Manager</div>
        </Card>
        {/* Logout Button */}
        <Button
          onClick={handleLogout}
          variant="outline"
          className="w-full border-red-300 text-red-600 hover:bg-red-50 hover:border-red-400 h-14 rounded-xl shadow-lg animate-profile-section"
          style={{ animationDelay: '1300ms' }}
        >
          <LogOut className="w-5 h-5 mr-2" />
          Sign Out
        </Button>
      </div>
      <BottomNavigation />
      {/* Custom Animations & Glass Styles */}
      <style>{`
        .glass-card {
          background: linear-gradient(120deg, rgba(255,255,255,0.7) 0%, rgba(186,230,253,0.5) 100%);
          backdrop-filter: blur(16px) saturate(1.1);
        }
        @keyframes profile-fade-in {
          from { opacity: 0; transform: scale(0.98) translateY(32px); }
          to { opacity: 1; transform: scale(1) translateY(0); }
        }
        .animate-profile-fade-in {
          animation: profile-fade-in 0.7s cubic-bezier(.4,2,.6,1);
        }
        @keyframes profile-section {
          from { opacity: 0; transform: translateY(32px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-profile-section {
          animation: profile-section 0.7s cubic-bezier(.4,2,.6,1) both;
        }
        @keyframes profile-img-fade {
          from { opacity: 0; transform: scale(0.92); }
          to { opacity: 1; transform: scale(1); }
        }
        .animate-profile-img-fade {
          animation: profile-img-fade 0.5s cubic-bezier(.4,2,.6,1);
        }
        @keyframes profile-success {
          from { opacity: 0; transform: translateY(12px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-profile-success {
          animation: profile-success 0.5s cubic-bezier(.4,2,.6,1);
        }
        @keyframes pulse-on-press {
          0% { box-shadow: 0 0 0 0 rgba(59,130,246,0.4); }
          70% { box-shadow: 0 0 0 8px rgba(59,130,246,0); }
          100% { box-shadow: 0 0 0 0 rgba(59,130,246,0); }
        }
        .animate-pulse-on-press:active {
          animation: pulse-on-press 0.4s;
        }
      `}</style>
    </div>
  );
};

export default Profile;
