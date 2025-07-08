
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import BottomNavigation from "@/components/BottomNavigation";
import { ArrowLeft, Bell, Lock, Globe, Moon, Smartphone } from "lucide-react";

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

  const updateSetting = (key: string, value: any) => {
    setSettings(prev => ({ ...prev, [key]: value }));
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Header */}
      <div className="bg-white px-4 py-4 border-b border-gray-100">
        <div className="flex items-center justify-between">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigate(-1)}
            className="text-gray-600"
          >
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <h1 className="text-lg font-semibold">Settings</h1>
          <div className="w-10"></div>
        </div>
      </div>

      <div className="px-4 py-6 space-y-6">
        {/* Notifications */}
        <Card className="p-6">
          <div className="flex items-center space-x-3 mb-4">
            <Bell className="w-5 h-5 text-gray-600" />
            <h3 className="text-lg font-semibold text-gray-900">Notifications</h3>
          </div>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <Label className="text-gray-900 font-medium">Push Notifications</Label>
                <p className="text-sm text-gray-600">Receive alerts for transactions and budgets</p>
              </div>
              <Switch
                checked={settings.notifications}
                onCheckedChange={(checked) => updateSetting("notifications", checked)}
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
              />
            </div>
          </div>
        </Card>

        {/* Security */}
        <Card className="p-6">
          <div className="flex items-center space-x-3 mb-4">
            <Lock className="w-5 h-5 text-gray-600" />
            <h3 className="text-lg font-semibold text-gray-900">Security</h3>
          </div>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <Label className="text-gray-900 font-medium">Biometric Authentication</Label>
                <p className="text-sm text-gray-600">Use fingerprint or face ID to unlock</p>
              </div>
              <Switch
                checked={settings.biometric}
                onCheckedChange={(checked) => updateSetting("biometric", checked)}
              />
            </div>
            
            <Button variant="outline" className="w-full justify-start text-gray-700">
              Change PIN
            </Button>
          </div>
        </Card>

        {/* Appearance */}
        <Card className="p-6">
          <div className="flex items-center space-x-3 mb-4">
            <Moon className="w-5 h-5 text-gray-600" />
            <h3 className="text-lg font-semibold text-gray-900">Appearance</h3>
          </div>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <Label className="text-gray-900 font-medium">Dark Mode</Label>
                <p className="text-sm text-gray-600">Switch to dark theme</p>
              </div>
              <Switch
                checked={settings.darkMode}
                onCheckedChange={(checked) => updateSetting("darkMode", checked)}
              />
            </div>
          </div>
        </Card>

        {/* Preferences */}
        <Card className="p-6">
          <div className="flex items-center space-x-3 mb-4">
            <Globe className="w-5 h-5 text-gray-600" />
            <h3 className="text-lg font-semibold text-gray-900">Preferences</h3>
          </div>
          
          <div className="space-y-4">
            <div className="space-y-2">
              <Label className="text-gray-900 font-medium">Currency</Label>
              <Select value={settings.currency} onValueChange={(value) => updateSetting("currency", value)}>
                <SelectTrigger className="h-12 rounded-xl">
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
                <SelectTrigger className="h-12 rounded-xl">
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
        </Card>

        {/* App Info */}
        <Card className="p-6">
          <div className="flex items-center space-x-3 mb-4">
            <Smartphone className="w-5 h-5 text-gray-600" />
            <h3 className="text-lg font-semibold text-gray-900">About</h3>
          </div>
          
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
        </Card>
      </div>

      <BottomNavigation />
    </div>
  );
};

export default Settings;
