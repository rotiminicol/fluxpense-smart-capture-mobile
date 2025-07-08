
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { ArrowLeft, Shield, Lock, Eye, Smartphone } from "lucide-react";
import { ChevronDown, ChevronRight, Info, Download, Trash2, CheckCircle } from "lucide-react";
import { useEffect } from "react";

const PrivacySecurity = () => {
  const navigate = useNavigate();
  const [settings, setSettings] = useState({
    biometricLogin: true,
    pinCodeLogin: false,
    autoLock: true,
    hideBalance: false,
    dataSharing: false,
    analytics: true,
    marketingEmails: false,
  });
  const [openDetails, setOpenDetails] = useState<string[]>([]);
  const [openTransparency, setOpenTransparency] = useState(false);

  useEffect(() => {
    document.body.classList.add("animate-fade-slide-in");
    return () => document.body.classList.remove("animate-fade-slide-in");
  }, []);

  const updateSetting = (key: keyof typeof settings) => {
    setSettings(prev => ({ ...prev, [key]: !prev[key] }));
  };
  const toggleDetail = (key: string) => {
    setOpenDetails(open => open.includes(key) ? open.filter(k => k !== key) : [...open, key]);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100/60 to-blue-200/80 flex flex-col items-center justify-start animate-fade-slide-up pb-24">
      <div className="w-full max-w-xl px-4 sm:px-0 py-8 overflow-y-auto" style={{ minHeight: '100vh' }}>
        {/* Header */}
        <div className="flex items-center gap-2 mb-10 animate-stagger-in" style={{ animationDelay: '100ms' }}>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => navigate('/settings')}
            className="rounded-full bg-white/70 hover:bg-blue-100 shadow-md border border-blue-200 transition-all duration-200"
            aria-label="Back"
          >
            <ArrowLeft className="w-6 h-6 text-blue-600" />
          </Button>
          <h1 className="text-2xl font-bold text-blue-800 ml-2 tracking-tight flex-1">Privacy & Security</h1>
        </div>
        {/* Security Settings */}
        <Card className="p-8 mb-8 rounded-3xl glass-card shadow-2xl animate-stagger-in" style={{ animationDelay: '200ms' }}>
          <div className="flex items-center gap-3 mb-6">
            <Shield className="w-6 h-6 text-blue-600" />
            <h3 className="text-lg font-bold text-blue-900">Security Settings</h3>
          </div>
          <div className="space-y-6">
            {/* Biometric Login */}
            <div className="flex items-center justify-between group">
              <div className="flex items-center gap-3">
                <Smartphone className="w-5 h-5 text-gray-600" />
                <div>
                  <Label className="font-medium">Biometric Login</Label>
                  <p className="text-sm text-gray-500">Use fingerprint or face ID to login</p>
                  <button className="flex items-center gap-1 mt-1 text-blue-400 hover:underline text-xs" onClick={() => toggleDetail('biometricLogin')}>
                    <Info className="w-4 h-4" /> Why we collect this data
                    <span className="transition-transform duration-300" style={{ transform: openDetails.includes('biometricLogin') ? 'rotate(180deg)' : '' }}>
                      <ChevronDown className="w-4 h-4" />
                    </span>
                  </button>
                  <div className={`transition-all duration-300 overflow-hidden ${openDetails.includes('biometricLogin') ? 'max-h-20 opacity-100' : 'max-h-0 opacity-0'}`}>
                    <div className="text-xs text-blue-700 mt-2">Biometric data is only used for device authentication and never leaves your device.</div>
                  </div>
                </div>
              </div>
              <Switch
                checked={settings.biometricLogin}
                onCheckedChange={() => updateSetting('biometricLogin')}
                className="animate-toggle"
              />
            </div>
            {/* PIN Code Login */}
            <div className="flex items-center justify-between group">
              <div className="flex items-center gap-3">
                <Lock className="w-5 h-5 text-gray-600" />
                <div>
                  <Label className="font-medium">PIN Code Login</Label>
                  <p className="text-sm text-gray-500">Require PIN to access the app</p>
                  <button className="flex items-center gap-1 mt-1 text-blue-400 hover:underline text-xs" onClick={() => toggleDetail('pinCodeLogin')}>
                    <Info className="w-4 h-4" /> Why we collect this data
                    <span className="transition-transform duration-300" style={{ transform: openDetails.includes('pinCodeLogin') ? 'rotate(180deg)' : '' }}>
                      <ChevronDown className="w-4 h-4" />
                    </span>
                  </button>
                  <div className={`transition-all duration-300 overflow-hidden ${openDetails.includes('pinCodeLogin') ? 'max-h-20 opacity-100' : 'max-h-0 opacity-0'}`}>
                    <div className="text-xs text-blue-700 mt-2">Your PIN is securely stored and never shared with third parties.</div>
                  </div>
                </div>
              </div>
              <Switch
                checked={settings.pinCodeLogin}
                onCheckedChange={() => updateSetting('pinCodeLogin')}
                className="animate-toggle"
              />
            </div>
            {/* Auto Lock */}
            <div className="flex items-center justify-between group">
              <div className="flex items-center gap-3">
                <Lock className="w-5 h-5 text-gray-600" />
                <div>
                  <Label className="font-medium">Auto Lock</Label>
                  <p className="text-sm text-gray-500">Lock app when inactive for 5 minutes</p>
                  <button className="flex items-center gap-1 mt-1 text-blue-400 hover:underline text-xs" onClick={() => toggleDetail('autoLock')}>
                    <Info className="w-4 h-4" /> Why we collect this data
                    <span className="transition-transform duration-300" style={{ transform: openDetails.includes('autoLock') ? 'rotate(180deg)' : '' }}>
                      <ChevronDown className="w-4 h-4" />
                    </span>
                  </button>
                  <div className={`transition-all duration-300 overflow-hidden ${openDetails.includes('autoLock') ? 'max-h-20 opacity-100' : 'max-h-0 opacity-0'}`}>
                    <div className="text-xs text-blue-700 mt-2">Auto lock protects your data if you step away from your device.</div>
                  </div>
                </div>
              </div>
              <Switch
                checked={settings.autoLock}
                onCheckedChange={() => updateSetting('autoLock')}
                className="animate-toggle"
              />
            </div>
          </div>
        </Card>
        {/* Privacy Settings */}
        <Card className="p-8 mb-8 rounded-3xl glass-card shadow-2xl animate-stagger-in" style={{ animationDelay: '300ms' }}>
          <div className="flex items-center gap-3 mb-6">
            <Eye className="w-6 h-6 text-blue-600" />
            <h3 className="text-lg font-bold text-blue-900">Privacy Settings</h3>
          </div>
          <div className="space-y-6">
            {/* Hide Balance */}
            <div className="flex items-center justify-between group">
              <div>
                <Label className="font-medium">Hide Balance</Label>
                <p className="text-sm text-gray-500">Hide balance by default on dashboard</p>
              </div>
              <Switch
                checked={settings.hideBalance}
                onCheckedChange={() => updateSetting('hideBalance')}
                className="animate-toggle"
              />
            </div>
            {/* Data Sharing */}
            <div className="flex items-center justify-between group">
              <div>
                <Label className="font-medium">Data Sharing</Label>
                <p className="text-sm text-gray-500">Share anonymous usage data</p>
              </div>
              <Switch
                checked={settings.dataSharing}
                onCheckedChange={() => updateSetting('dataSharing')}
                className="animate-toggle"
              />
            </div>
            {/* Analytics */}
            <div className="flex items-center justify-between group">
              <div>
                <Label className="font-medium">Analytics</Label>
                <p className="text-sm text-gray-500">Help improve the app with usage analytics</p>
              </div>
              <Switch
                checked={settings.analytics}
                onCheckedChange={() => updateSetting('analytics')}
                className="animate-toggle"
              />
            </div>
            {/* Marketing Emails */}
            <div className="flex items-center justify-between group">
              <div>
                <Label className="font-medium">Marketing Emails</Label>
                <p className="text-sm text-gray-500">Receive promotional emails</p>
              </div>
              <Switch
                checked={settings.marketingEmails}
                onCheckedChange={() => updateSetting('marketingEmails')}
                className="animate-toggle"
              />
            </div>
          </div>
        </Card>
        {/* Permissions */}
        <Card className="p-8 mb-8 rounded-3xl glass-card shadow-2xl animate-stagger-in" style={{ animationDelay: '400ms' }}>
          <div className="flex items-center gap-3 mb-6">
            <Smartphone className="w-6 h-6 text-blue-600" />
            <h3 className="text-lg font-bold text-blue-900">Permissions</h3>
          </div>
          <div className="space-y-6">
            <div className="flex items-center justify-between group">
              <div>
                <Label className="font-medium">Camera Access</Label>
                <p className="text-sm text-gray-500">Allow app to use your camera for receipt scanning</p>
                <span className="text-xs text-blue-400">Last accessed: 2 days ago</span>
              </div>
              <Switch checked={true} className="animate-toggle" disabled />
            </div>
            <div className="flex items-center justify-between group">
              <div>
                <Label className="font-medium">Location Access</Label>
                <p className="text-sm text-gray-500">Allow app to use your location for smart suggestions</p>
                <span className="text-xs text-blue-400">Last accessed: 5 days ago</span>
              </div>
              <Switch checked={false} className="animate-toggle" disabled />
            </div>
          </div>
        </Card>
        {/* Data Controls & Danger Zone */}
        <Card className="p-8 mb-8 rounded-3xl glass-card shadow-2xl animate-stagger-in" style={{ animationDelay: '500ms' }}>
          <div className="flex items-center gap-3 mb-6">
            <Download className="w-6 h-6 text-blue-600" />
            <h3 className="text-lg font-bold text-blue-900">Data Controls</h3>
          </div>
          <div className="space-y-6">
            <Button className="w-full h-12 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold shadow transition-all duration-150 animate-glow-on-press flex items-center gap-2">
              <Download className="w-5 h-5" /> Export My Data
            </Button>
            <Button className="w-full h-12 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold shadow transition-all duration-150 animate-glow-on-press flex items-center gap-2">
              <CheckCircle className="w-5 h-5" /> Enable 2FA
            </Button>
          </div>
        </Card>
        {/* Data Transparency (optional) */}
        <Card className="p-8 mb-8 rounded-3xl glass-card shadow-2xl animate-stagger-in" style={{ animationDelay: '600ms' }}>
          <div className="flex items-center gap-3 mb-6 cursor-pointer" onClick={() => setOpenTransparency(v => !v)}>
            <Eye className="w-6 h-6 text-blue-600" />
            <h3 className="text-lg font-bold text-blue-900 flex-1">Data Transparency</h3>
            <span className="transition-transform duration-300" style={{ transform: openTransparency ? 'rotate(180deg)' : '' }}>
              <ChevronDown className="w-5 h-5 text-blue-400" />
            </span>
          </div>
          <div className={`transition-all duration-300 overflow-hidden ${openTransparency ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}>
            <div className="space-y-4 mt-2">
              <div className="flex items-center gap-3">
                <span className="w-3 h-3 rounded-full bg-green-400" />
                <span className="text-sm text-blue-900">Today, 10:12 AM - Dashboard accessed from Chrome (192.168.1.2)</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="w-3 h-3 rounded-full bg-blue-400" />
                <span className="text-sm text-blue-900">Yesterday, 8:45 PM - Exported data from Safari (192.168.1.3)</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="w-3 h-3 rounded-full bg-yellow-400" />
                <span className="text-sm text-blue-900">2 days ago, 2:30 PM - Location accessed from Edge (192.168.1.4)</span>
              </div>
            </div>
          </div>
        </Card>
        {/* Danger Zone */}
        <Card className="p-8 mt-8 rounded-3xl glass-card shadow-xl animate-stagger-in border-2 border-red-200 bg-red-50/60">
          <div className="text-lg font-bold text-red-700 mb-4 flex items-center gap-2">
            <Trash2 className="w-5 h-5 text-red-400" /> Danger Zone
          </div>
          <div className="flex flex-col gap-4">
            <Button
              className="h-12 rounded-xl bg-red-600 hover:bg-red-700 text-white font-bold shadow-lg transition-all duration-150 animate-glow-on-press"
              onClick={() => alert('Account deleted!')}
            >
              <Trash2 className="w-5 h-5 mr-2" /> Delete Account
            </Button>
          </div>
        </Card>
        {/*
        // Old code for reference
        <div className="px-4 py-6 space-y-6">...</div>
        */}
      </div>
    </div>
  );
};

export default PrivacySecurity;
