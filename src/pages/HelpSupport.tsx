
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { ArrowLeft, HelpCircle, Mail, MessageSquare, Phone, ChevronRight } from "lucide-react";

const HelpSupport = () => {
  const navigate = useNavigate();

  const faqItems = [
    {
      question: "How do I scan receipts?",
      answer: "Use the camera icon on the Add Expense page to take a photo of your receipt."
    },
    {
      question: "How do I set up budgets?",
      answer: "Go to Settings > Budget Management to set up monthly budgets for different categories."
    },
    {
      question: "Can I export my data?",
      answer: "Yes, go to Reports and use the export feature to download your expense data."
    },
    {
      question: "How do I delete transactions?",
      answer: "Tap on any transaction and select the delete option from the menu."
    },
  ];

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
          <h1 className="text-lg font-semibold">Help & Support</h1>
        </div>
      </div>

      <div className="px-4 py-6 space-y-6">
        {/* Contact Options */}
        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
          <div className="space-y-3">
            <Button variant="outline" className="w-full justify-between h-14">
              <div className="flex items-center space-x-3">
                <MessageSquare className="w-5 h-5 text-blue-600" />
                <span>Live Chat</span>
              </div>
              <ChevronRight className="w-5 h-5 text-gray-400" />
            </Button>

            <Button variant="outline" className="w-full justify-between h-14">
              <div className="flex items-center space-x-3">
                <Mail className="w-5 h-5 text-blue-600" />
                <span>Email Support</span>
              </div>
              <ChevronRight className="w-5 h-5 text-gray-400" />
            </Button>

            <Button variant="outline" className="w-full justify-between h-14">
              <div className="flex items-center space-x-3">
                <Phone className="w-5 h-5 text-blue-600" />
                <span>Phone Support</span>
              </div>
              <ChevronRight className="w-5 h-5 text-gray-400" />
            </Button>
          </div>
        </Card>

        {/* FAQ */}
        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4 flex items-center">
            <HelpCircle className="w-5 h-5 mr-2 text-blue-600" />
            Frequently Asked Questions
          </h3>
          <div className="space-y-4">
            {faqItems.map((faq, index) => (
              <div key={index} className="border-b border-gray-100 pb-4 last:border-b-0">
                <h4 className="font-medium text-gray-900 mb-2">{faq.question}</h4>
                <p className="text-sm text-gray-600">{faq.answer}</p>
              </div>
            ))}
          </div>
        </Card>

        {/* Send Feedback */}
        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4">Send Feedback</h3>
          <div className="space-y-4">
            <div>
              <Input
                placeholder="Subject"
                className="h-12 rounded-xl"
              />
            </div>
            <div>
              <Textarea
                placeholder="Tell us how we can improve Fluxpense..."
                className="rounded-xl resize-none"
                rows={4}
              />
            </div>
            <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white h-12 rounded-xl">
              Send Feedback
            </Button>
          </div>
        </Card>

        {/* App Info */}
        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4">App Information</h3>
          <div className="space-y-3 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-600">Version</span>
              <span className="font-medium">1.0.0</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Build</span>
              <span className="font-medium">2024.02.01</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Last Updated</span>
              <span className="font-medium">February 1, 2024</span>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default HelpSupport;
