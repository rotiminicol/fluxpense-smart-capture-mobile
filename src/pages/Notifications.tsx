
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { ArrowLeft, Bell, Mail, Smartphone } from "lucide-react";

const Notifications = () => {
  const navigate = useNavigate();
  const [settings, setSettings] = useState({
    pushNotifications: true,
    emailNotifications: false,
    smsNotifications: false,
    expenseAlerts: true,
    budgetAlerts: true,
    weeklyReports: true,
    monthlyReports: false,
    receiptReminders: true,
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
          <h1 className="text-lg font-semibold">Notifications</h1>
        </div>
      </div>

      <div className="px-4 py-6 space-y-6">
        {/* Notification Methods */}
        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4 flex items-center">
            <Bell className="w-5 h-5 mr-2 text-blue-600" />
            Notification Methods
          </h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <Smartphone className="w-5 h-5 text-gray-600" />
                <div>
                  <Label className="font-medium">Push Notifications</Label>
                  <p className="text-sm text-gray-500">Receive notifications on your device</p>
                </div>
              </div>
              <Switch
                checked={settings.pushNotifications}
                onCheckedChange={() => updateSetting('pushNotifications')}
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <Mail className="w-5 h-5 text-gray-600" />
                <div>
                  <Label className="font-medium">Email Notifications</Label>
                  <p className="text-sm text-gray-500">Receive notifications via email</p>
                </div>
              </div>
              <Switch
                checked={settings.emailNotifications}
                onCheckedChange={() => updateSetting('emailNotifications')}
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <Smartphone className="w-5 h-5 text-gray-600" />
                <div>
                  <Label className="font-medium">SMS Notifications</Label>
                  <p className="text-sm text-gray-500">Receive notifications via SMS</p>
                </div>
              </div>
              <Switch
                checked={settings.smsNotifications}
                onCheckedChange={() => updateSetting('smsNotifications')}
              />
            </div>
          </div>
        </Card>

        {/* Alert Types */}
        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4">Alert Types</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <Label className="font-medium">Expense Alerts</Label>
                <p className="text-sm text-gray-500">Get notified when you add expenses</p>
              </div>
              <Switch
                checked={settings.expenseAlerts}
                onCheckedChange={() => updateSetting('expenseAlerts')}
              />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <Label className="font-medium">Budget Alerts</Label>
                <p className="text-sm text-gray-500">Get notified when you exceed budget limits</p>
              </div>
              <Switch
                checked={settings.budgetAlerts}
                onCheckedChange={() => updateSetting('budgetAlerts')}
              />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <Label className="font-medium">Receipt Reminders</Label>
                <p className="text-sm text-gray-500">Reminders to scan receipts</p>
              </div>
              <Switch
                checked={settings.receiptReminders}
                onCheckedChange={() => updateSetting('receiptReminders')}
              />
            </div>
          </div>
        </Card>

        {/* Reports */}
        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4">Reports</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <Label className="font-medium">Weekly Reports</Label>
                <p className="text-sm text-gray-500">Get weekly spending summaries</p>
              </div>
              <Switch
                checked={settings.weeklyReports}
                onCheckedChange={() => updateSetting('weeklyReports')}
              />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <Label className="font-medium">Monthly Reports</Label>
                <p className="text-sm text-gray-500">Get monthly spending summaries</p>
              </div>
              <Switch
                checked={settings.monthlyReports}
                onCheckedChange={() => updateSetting('monthlyReports')}
              />
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Notifications;
