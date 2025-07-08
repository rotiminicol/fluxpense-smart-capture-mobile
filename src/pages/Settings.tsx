
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import BottomNavigation from "@/components/BottomNavigation";
import { ChevronDown, ChevronRight, User, LogOut, Trash2, Bell, Lock, Globe, Smartphone } from "lucide-react";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { useEffect } from "react";

const user = {
  name: "John Doe",
  email: "john.doe@example.com",
  avatar: "",
};

const Settings = () => {
  const navigate = useNavigate();
  const [settings, setSettings] = useState({
    notifications: true,
    biometric: false,
    darkMode: false,
    currency: "USD",
    language: "en",
    autoScan: true,
  });

  const sectionData = [
    {
      key: "account",
      icon: <User className="w-5 h-5 text-blue-600" />,
      title: "Account Settings",
      content: (
        <div className="space-y-4">
          <Button className="w-full h-12 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold shadow transition-all duration-150 animate-glow-on-press" onClick={() => navigate('/profile/edit')}>
            Edit Profile
          </Button>
        </div>
      ),
    },
    {
      key: "notifications",
      icon: <Bell className="w-5 h-5 text-blue-600" />,
      title: "Notifications",
      content: (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <Label className="text-gray-900 font-medium">Push Notifications</Label>
              <p className="text-sm text-gray-600">Receive alerts for transactions and budgets</p>
            </div>
            <Switch
              checked={settings.notifications}
              onCheckedChange={(checked) => updateSetting("notifications", checked)}
              className="animate-toggle"
            />
          </div>
          <div className="flex items-center justify-between">
            <div>
              <Label className="text-gray-900 font-medium">Auto Receipt Scanning</Label>
              <p className="text-sm text-gray-600">Automatically scan receipts from emails</p>
            </div>
            <Switch
              checked={settings.autoScan}
              onCheckedChange={(checked) => updateSetting("autoScan", checked)}
              className="animate-toggle"
            />
          </div>
        </div>
      ),
    },
    {
      key: "security",
      icon: <Lock className="w-5 h-5 text-blue-600" />,
      title: "Privacy & Security",
      content: (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <Label className="text-gray-900 font-medium">Biometric Authentication</Label>
              <p className="text-sm text-gray-600">Use fingerprint or face ID to unlock</p>
            </div>
            <Switch
              checked={settings.biometric}
              onCheckedChange={(checked) => updateSetting("biometric", checked)}
              className="animate-toggle"
            />
          </div>
          <Button variant="outline" className="w-full h-12 rounded-xl justify-start text-gray-700 animate-bounce-on-press">
            Change PIN
          </Button>
        </div>
      ),
    },
    {
      key: "preferences",
      icon: <Globe className="w-5 h-5 text-blue-600" />,
      title: "App Preferences",
      content: (
        <div className="space-y-4">
          <div className="space-y-2">
            <Label className="text-gray-900 font-medium">Currency</Label>
            <Select value={settings.currency} onValueChange={(value) => updateSetting("currency", value)}>
              <SelectTrigger className="h-12 rounded-xl animate-glow-on-press">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="USD">USD ($)</SelectItem>
                <SelectItem value="EUR">EUR (€)</SelectItem>
                <SelectItem value="GBP">GBP (£)</SelectItem>
                <SelectItem value="JPY">JPY (¥)</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label className="text-gray-900 font-medium">Language</Label>
            <Select value={settings.language} onValueChange={(value) => updateSetting("language", value)}>
              <SelectTrigger className="h-12 rounded-xl animate-glow-on-press">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="en">English</SelectItem>
                <SelectItem value="es">Spanish</SelectItem>
                <SelectItem value="fr">French</SelectItem>
                <SelectItem value="de">German</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      ),
    },
    {
      key: "about",
      icon: <Smartphone className="w-5 h-5 text-blue-600" />,
      title: "Support & About",
      content: (
        <div className="space-y-3 text-sm text-gray-600">
          <div className="flex justify-between">
            <span>Version</span>
            <span>1.0.0</span>
          </div>
          <div className="flex justify-between">
            <span>Build</span>
            <span>2024.02.01</span>
          </div>
          <div className="flex justify-between">
            <span>Platform</span>
            <span>Mobile Web</span>
          </div>
        </div>
      ),
    },
  ];

  useEffect(() => {
    document.body.classList.add("animate-fade-slide-in");
    return () => document.body.classList.remove("animate-fade-slide-in");
  }, []);

  const [openSections, setOpenSections] = useState<string[]>(sectionData.map(s => s.key));
  const toggleSection = (key: string) => {
    setOpenSections(openSections => openSections.includes(key)
      ? openSections.filter(k => k !== key)
      : [...openSections, key]);
  };

  const updateSetting = (key: string, value: boolean | string) => {
    setSettings(prev => ({ ...prev, [key]: value }));
  };

  return (
  <div className="min-h-screen bg-gradient-to-br from-blue-100/60 to-blue-200/80 flex flex-col items-center justify-start animate-fade-slide-up pb-24">
    <div className="w-full max-w-xl px-4 sm:px-0 py-8 overflow-y-auto" style={{ minHeight: '100vh' }}>
      {/* Profile Summary */}
      <Card className="p-6 mb-10 rounded-3xl glass-card shadow-2xl flex items-center gap-6 animate-stagger-in" style={{ animationDelay: '100ms' }}>
        <div className="cursor-pointer" onClick={() => navigate('/profile/edit')}>
          <Avatar className="w-16 h-16 border-4 border-white shadow-xl">
            <AvatarImage src={user.avatar} />
            <AvatarFallback className="bg-white text-blue-600 text-2xl font-bold">
              {user.name.charAt(0)}
            </AvatarFallback>
          </Avatar>
        </div>
        <div className="flex-1 min-w-0">
          <div className="text-xl font-bold text-blue-900 truncate">{user.name}</div>
          <div className="text-blue-500 text-base truncate">{user.email}</div>
        </div>
        <Button
          className="h-12 px-6 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold shadow-lg transition-all duration-150 animate-glow-on-press"
          onClick={() => navigate('/profile/edit')}
        >
          Edit Profile
        </Button>
      </Card>
      {/* Settings Sections */}
      <div className="space-y-8">
        {sectionData.map((section, i) => (
          <Card key={section.key} className="p-0 rounded-3xl glass-card shadow-xl transition-all duration-300 animate-stagger-in overflow-hidden" style={{ animationDelay: `${200 + i * 80}ms` }}>
            <button
              className="w-full flex items-center justify-between px-6 py-6 focus:outline-none group"
              onClick={() => toggleSection(section.key)}
              aria-expanded={openSections.includes(section.key)}
            >
              <div className="flex items-center gap-3">
                {section.icon}
                <span className="text-lg font-semibold text-blue-900">{section.title}</span>
              </div>
              <span className="transition-transform duration-300 group-aria-expanded:rotate-180">
                {openSections.includes(section.key) ? <ChevronDown className="w-5 h-5 text-blue-400" /> : <ChevronRight className="w-5 h-5 text-blue-400" />}
              </span>
            </button>
            <div className={`transition-all duration-300 px-6 pb-6 ${openSections.includes(section.key) ? 'max-h-[1000px] opacity-100' : 'max-h-0 opacity-0 pointer-events-none'}`}
              aria-hidden={!openSections.includes(section.key)}>
              {section.content}
            </div>
          </Card>
        ))}
      </div>
      {/* Danger Zone */}
      <Card className="p-8 mt-12 rounded-3xl glass-card shadow-xl animate-stagger-in border-2 border-red-200 bg-red-50/60">
        <div className="text-lg font-bold text-red-700 mb-4 flex items-center gap-2">
          <Trash2 className="w-5 h-5 text-red-400" /> Danger Zone
        </div>
        <div className="flex flex-col gap-4">
          <Button
            className="h-12 rounded-xl bg-red-600 hover:bg-red-700 text-white font-bold shadow-lg transition-all duration-150 animate-glow-on-press"
            onClick={() => alert('Logged out!')}
          >
            <LogOut className="w-5 h-5 mr-2" /> Logout
          </Button>
          <Button
            variant="outline"
            className="h-12 rounded-xl border-red-300 text-red-600 bg-white/80 hover:bg-red-50 font-bold shadow transition-all duration-150 animate-bounce-on-press"
            onClick={() => alert('Account deleted!')}
          >
            <Trash2 className="w-5 h-5 mr-2" /> Delete Account
          </Button>
        </div>
      </Card>
    </div>
    <BottomNavigation />
  </div>
);
};

export default Settings;
