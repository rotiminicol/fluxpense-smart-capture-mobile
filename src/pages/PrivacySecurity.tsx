
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { ArrowLeft, Shield, Lock, Eye, Smartphone } from "lucide-react";

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

  const updateSetting = (key: keyof typeof settings) => {
    setSettings(prev => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white px-4 py-4 border-b border-gray-100">
        <div className="flex items-center">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigate("/profile")}
            className="text-gray-600 mr-3"
          >
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <h1 className="text-lg font-semibold">Privacy & Security</h1>
        </div>
      </div>

      <div className="px-4 py-6 space-y-6">
        {/* Security */}
        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4 flex items-center">
            <Shield className="w-5 h-5 mr-2 text-blue-600" />
            Security
          </h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <Smartphone className="w-5 h-5 text-gray-600" />
                <div>
                  <Label className="font-medium">Biometric Login</Label>
                  <p className="text-sm text-gray-500">Use fingerprint or face ID to login</p>
                </div>
              </div>
              <Switch
                checked={settings.biometricLogin}
                onCheckedChange={() => updateSetting('biometricLogin')}
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <Lock className="w-5 h-5 text-gray-600" />
                <div>
                  <Label className="font-medium">PIN Code Login</Label>
                  <p className="text-sm text-gray-500">Require PIN to access the app</p>
                </div>
              </div>
              <Switch
                checked={settings.pinCodeLogin}
                onCheckedChange={() => updateSetting('pinCodeLogin')}
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <Lock className="w-5 h-5 text-gray-600" />
                <div>
                  <Label className="font-medium">Auto Lock</Label>
                  <p className="text-sm text-gray-500">Lock app when inactive for 5 minutes</p>
                </div>
              </div>
              <Switch
                checked={settings.autoLock}
                onCheckedChange={() => updateSetting('autoLock')}
              />
            </div>
          </div>
        </Card>

        {/* Privacy */}
        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4 flex items-center">
            <Eye className="w-5 h-5 mr-2 text-blue-600" />
            Privacy
          </h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <Label className="font-medium">Hide Balance</Label>
                <p className="text-sm text-gray-500">Hide balance by default on dashboard</p>
              </div>
              <Switch
                checked={settings.hideBalance}
                onCheckedChange={() => updateSetting('hideBalance')}
              />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <Label className="font-medium">Data Sharing</Label>
                <p className="text-sm text-gray-500">Share anonymous usage data</p>
              </div>
              <Switch
                checked={settings.dataSharing}
                onCheckedChange={() => updateSetting('dataSharing')}
              />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <Label className="font-medium">Analytics</Label>
                <p className="text-sm text-gray-500">Help improve the app with usage analytics</p>
              </div>
              <Switch
                checked={settings.analytics}
                onCheckedChange={() => updateSetting('analytics')}
              />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <Label className="font-medium">Marketing Emails</Label>
                <p className="text-sm text-gray-500">Receive promotional emails</p>
              </div>
              <Switch
                checked={settings.marketingEmails}
                onCheckedChange={() => updateSetting('marketingEmails')}
              />
            </div>
          </div>
        </Card>

        {/* Account Actions */}
        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4">Account</h3>
          <div className="space-y-3">
            <Button variant="outline" className="w-full justify-start h-12">
              Change Password
            </Button>
            <Button variant="outline" className="w-full justify-start h-12">
              Download My Data
            </Button>
            <Button variant="outline" className="w-full justify-start h-12 text-red-600 border-red-300 hover:bg-red-50">
              Delete Account
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default PrivacySecurity;
