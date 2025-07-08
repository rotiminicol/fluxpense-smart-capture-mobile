
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useState, useRef } from "react";
import { ArrowLeft, ChevronDown, ChevronRight, HelpCircle, Mail, MessageSquare, Phone, Paperclip, Upload, CheckCircle, AlertTriangle } from "lucide-react";
import { useEffect } from "react";

const HelpSupport = () => {
  const navigate = useNavigate();
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [showChat, setShowChat] = useState(false);
  const [feedback, setFeedback] = useState({ subject: "", message: "", file: null });
  const [feedbackSent, setFeedbackSent] = useState(false);
  const [problem, setProblem] = useState({ category: "", message: "", file: null });
  const [problemSent, setProblemSent] = useState(false);
  const [showProblem, setShowProblem] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const problemFileInputRef = useRef<HTMLInputElement>(null);

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

  useEffect(() => {
    document.body.classList.add("animate-fade-slide-in");
    return () => document.body.classList.remove("animate-fade-slide-in");
  }, []);

  const handleFaqToggle = (idx: number) => {
    setOpenFaq(openFaq === idx ? null : idx);
  };

  const handleFeedbackFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFeedback(f => ({ ...f, file: e.target.files?.[0] || null }));
  };
  const handleProblemFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    setProblem(f => ({ ...f, file: e.target.files?.[0] || null }));
  };

  const handleFeedbackSend = () => {
    setFeedbackSent(true);
    setTimeout(() => setFeedbackSent(false), 2000);
    setFeedback({ subject: "", message: "", file: null });
  };
  const handleProblemSend = () => {
    setProblemSent(true);
    setTimeout(() => setProblemSent(false), 2000);
    setProblem({ category: "", message: "", file: null });
    setShowProblem(false);
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
          <h1 className="text-2xl font-bold text-blue-800 ml-2 tracking-tight flex-1">Help & Support</h1>
        </div>
        {/* FAQs */}
        <Card className="p-8 mb-8 rounded-3xl glass-card shadow-2xl animate-stagger-in" style={{ animationDelay: '200ms' }}>
          <div className="flex items-center gap-3 mb-6">
            <HelpCircle className="w-6 h-6 text-blue-600" />
            <h3 className="text-lg font-bold text-blue-900">Frequently Asked Questions</h3>
          </div>
          <div className="divide-y divide-blue-100">
            {faqItems.length === 0 ? (
              <div className="flex flex-col items-center py-12">
                <HelpCircle className="w-16 h-16 text-blue-200 mb-4 animate-bounce" />
                <div className="text-lg text-blue-700 font-bold mb-2">Need help? We’re just a message away!</div>
                <div className="text-blue-500">No FAQs available right now.</div>
              </div>
            ) : faqItems.map((faq, idx) => (
              <div key={idx} className="py-5 cursor-pointer transition-all group" onClick={() => handleFaqToggle(idx)}>
                <div className="flex items-center justify-between">
                  <h4 className="font-semibold text-blue-900 text-base group-hover:text-blue-700 transition-colors">{faq.question}</h4>
                  <span className={`transition-transform duration-300 ${openFaq === idx ? 'rotate-180' : ''}`}>
                    <ChevronDown className="w-5 h-5 text-blue-400" />
                  </span>
                </div>
                <div className={`transition-all duration-300 overflow-hidden ${openFaq === idx ? 'max-h-40 opacity-100 mt-3' : 'max-h-0 opacity-0'}`}>
                  <div className="text-blue-700 text-sm bg-blue-50/60 rounded-xl p-4 mt-2 shadow-inner animate-fade-slide-up">{faq.answer}</div>
                </div>
              </div>
            ))}
          </div>
        </Card>
        {/* Contact Options */}
        <Card className="p-8 mb-8 rounded-3xl glass-card shadow-2xl animate-stagger-in" style={{ animationDelay: '300ms' }}>
          <div className="flex items-center gap-3 mb-6">
            <Mail className="w-6 h-6 text-blue-600" />
            <h3 className="text-lg font-bold text-blue-900">Contact Support</h3>
          </div>
          <div className="space-y-4">
            <Button variant="outline" className="w-full h-14 rounded-xl flex items-center justify-between animate-bounce-on-press">
              <span className="flex items-center gap-3"><MessageSquare className="w-5 h-5 text-blue-600" /> Live Chat</span>
              <ChevronRight className="w-5 h-5 text-gray-400" />
            </Button>
            <Button variant="outline" className="w-full h-14 rounded-xl flex items-center justify-between animate-bounce-on-press">
              <span className="flex items-center gap-3"><Mail className="w-5 h-5 text-blue-600" /> Email Support</span>
              <ChevronRight className="w-5 h-5 text-gray-400" />
            </Button>
            <Button variant="outline" className="w-full h-14 rounded-xl flex items-center justify-between animate-bounce-on-press">
              <span className="flex items-center gap-3"><Phone className="w-5 h-5 text-blue-600" /> Phone Support</span>
              <ChevronRight className="w-5 h-5 text-gray-400" />
            </Button>
          </div>
        </Card>
        {/* Send Feedback */}
        <Card className="p-8 mb-8 rounded-3xl glass-card shadow-2xl animate-stagger-in" style={{ animationDelay: '400ms' }}>
          <div className="flex items-center gap-3 mb-6">
            <Mail className="w-6 h-6 text-blue-600" />
            <h3 className="text-lg font-bold text-blue-900">Send Feedback</h3>
          </div>
          {feedbackSent ? (
            <div className="flex flex-col items-center py-12 animate-fade-slide-up">
              <CheckCircle className="w-16 h-16 text-green-400 mb-4 animate-bounce" />
              <div className="text-lg text-green-700 font-bold mb-2">Thank you for your feedback!</div>
              <div className="text-green-500">We appreciate your input.</div>
            </div>
          ) : (
            <form className="space-y-6" onSubmit={e => { e.preventDefault(); handleFeedbackSend(); }}>
              <div className="relative group">
                <Input
                  placeholder="Subject"
                  className="h-14 rounded-xl px-5 pt-7 pb-2 text-lg font-medium border-2 border-transparent focus:border-blue-400 focus:bg-white/90 shadow-sm focus:shadow-md outline-none transition-all duration-200 animate-glow-on-press"
                  value={feedback.subject}
                  onChange={e => setFeedback(f => ({ ...f, subject: e.target.value }))}
                  required
                  aria-label="Subject"
                />
                <label className={`absolute left-5 top-5 text-gray-500 text-base font-medium pointer-events-none transition-all duration-200 origin-left ${feedback.subject ? '-translate-y-5 scale-90 text-blue-600' : ''}`}>Subject</label>
              </div>
              <div className="relative group">
                <Textarea
                  placeholder="Tell us how we can improve Fluxpense..."
                  className="rounded-xl px-5 pt-7 pb-2 text-lg font-medium border-2 border-transparent focus:border-blue-400 focus:bg-white/90 shadow-sm focus:shadow-md outline-none transition-all duration-200 resize-none animate-glow-on-press"
                  rows={5}
                  value={feedback.message}
                  onChange={e => setFeedback(f => ({ ...f, message: e.target.value }))}
                  required
                  aria-label="Feedback Message"
                />
                <label className={`absolute left-5 top-5 text-gray-500 text-base font-medium pointer-events-none transition-all duration-200 origin-left ${feedback.message ? '-translate-y-5 scale-90 text-blue-600' : ''}`}>Message</label>
              </div>
              <div className="flex items-center gap-4">
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  ref={fileInputRef}
                  onChange={handleFeedbackFile}
                />
                <Button type="button" variant="outline" className="flex items-center gap-2 animate-bounce-on-press" onClick={() => fileInputRef.current?.click()}>
                  <Paperclip className="w-5 h-5" /> Attach File
                </Button>
                {feedback.file && (
                  <span className="text-blue-600 text-sm font-medium flex items-center gap-1"><Upload className="w-4 h-4" /> {feedback.file.name}</span>
                )}
              </div>
              <Button type="submit" className="w-full h-14 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-lg shadow-lg transition-all duration-150 animate-glow-on-press">
                Send Feedback
              </Button>
            </form>
          )}
        </Card>
        {/* Report a Problem */}
        <Card className="p-8 mb-8 rounded-3xl glass-card shadow-2xl animate-stagger-in" style={{ animationDelay: '500ms' }}>
          <div className="flex items-center gap-3 mb-6">
            <AlertTriangle className="w-6 h-6 text-yellow-500" />
            <h3 className="text-lg font-bold text-blue-900">Report a Problem</h3>
          </div>
          {problemSent ? (
            <div className="flex flex-col items-center py-12 animate-fade-slide-up">
              <CheckCircle className="w-16 h-16 text-green-400 mb-4 animate-bounce" />
              <div className="text-lg text-green-700 font-bold mb-2">Thank you for your report!</div>
              <div className="text-green-500">Our team will look into it promptly.</div>
            </div>
          ) : (
            <form className="space-y-6" onSubmit={e => { e.preventDefault(); handleProblemSend(); }}>
              <div>
                <label className="block mb-2 text-base font-medium text-gray-700">Category</label>
                <select
                  className="w-full h-14 rounded-xl px-4 text-lg border-2 border-transparent focus:border-blue-400 focus:bg-white/90 shadow-sm focus:shadow-md outline-none transition-all duration-200 animate-glow-on-press"
                  value={problem.category}
                  onChange={e => setProblem(f => ({ ...f, category: e.target.value }))}
                  required
                >
                  <option value="">Select a category</option>
                  <option value="bug">Bug</option>
                  <option value="payment">Payment Issue</option>
                  <option value="ui">UI/UX Problem</option>
                  <option value="other">Other</option>
                </select>
              </div>
              <div className="relative group">
                <Textarea
                  placeholder="Describe the problem..."
                  className="rounded-xl px-5 pt-7 pb-2 text-lg font-medium border-2 border-transparent focus:border-blue-400 focus:bg-white/90 shadow-sm focus:shadow-md outline-none transition-all duration-200 resize-none animate-glow-on-press"
                  rows={4}
                  value={problem.message}
                  onChange={e => setProblem(f => ({ ...f, message: e.target.value }))}
                  required
                  aria-label="Problem Description"
                />
                <label className={`absolute left-5 top-5 text-gray-500 text-base font-medium pointer-events-none transition-all duration-200 origin-left ${problem.message ? '-translate-y-5 scale-90 text-blue-600' : ''}`}>Description</label>
              </div>
              <div className="flex items-center gap-4">
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  ref={problemFileInputRef}
                  onChange={handleProblemFile}
                />
                <Button type="button" variant="outline" className="flex items-center gap-2 animate-bounce-on-press" onClick={() => problemFileInputRef.current?.click()}>
                  <Paperclip className="w-5 h-5" /> Attach Screenshot
                </Button>
                {problem.file && (
                  <span className="text-blue-600 text-sm font-medium flex items-center gap-1"><Upload className="w-4 h-4" /> {problem.file.name}</span>
                )}
              </div>
              <Button type="submit" className="w-full h-14 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-lg shadow-lg transition-all duration-150 animate-glow-on-press">
                Submit Report
              </Button>
            </form>
          )}
        </Card>
        {/* App Info */}
        <Card className="p-8 mb-8 rounded-3xl glass-card shadow-2xl animate-stagger-in" style={{ animationDelay: '600ms' }}>
          <div className="flex items-center gap-3 mb-6">
            <HelpCircle className="w-6 h-6 text-blue-600" />
            <h3 className="text-lg font-bold text-blue-900">App Information</h3>
          </div>
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
      {/* Floating Chat Button */}
      <button
        className="fixed bottom-8 right-8 z-50 bg-blue-600 hover:bg-blue-700 text-white rounded-full shadow-lg w-16 h-16 flex items-center justify-center animate-pulse focus:outline-none"
        onClick={() => setShowChat(true)}
        aria-label="Open Live Chat"
      >
        <MessageSquare className="w-8 h-8" />
      </button>
      {/* Chat Modal (Optional) */}
      {showChat && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/30 backdrop-blur-sm animate-fade-slide-up">
          <div className="w-full max-w-md bg-white/90 rounded-t-3xl sm:rounded-3xl shadow-2xl p-8 relative animate-slide-in-up flex flex-col" style={{ minHeight: 400 }}>
            <Button
              variant="ghost"
              size="icon"
              className="absolute top-4 right-4 text-gray-500 hover:bg-blue-100"
              onClick={() => setShowChat(false)}
              aria-label="Close Chat"
            >
              <ChevronDown className="w-7 h-7" />
            </Button>
            <div className="flex items-center gap-3 mb-6">
              <MessageSquare className="w-6 h-6 text-blue-600" />
              <h3 className="text-lg font-bold text-blue-900">Live Chat</h3>
            </div>
            <div className="flex-1 flex flex-col justify-end">
              <div className="flex flex-col gap-2 mb-4">
                <div className="self-end bg-blue-600 text-white px-4 py-2 rounded-2xl shadow animate-fade-slide-up">Hi! How can we help you today?</div>
                <div className="self-start bg-white/80 text-blue-900 px-4 py-2 rounded-2xl shadow animate-fade-slide-up">I have a question about my account.</div>
                <div className="self-end bg-blue-600 text-white px-4 py-2 rounded-2xl shadow animate-fade-slide-up">Sure! Please tell us more.</div>
              </div>
              <form className="flex gap-2 mt-2">
                <Input className="flex-1 h-12 rounded-xl px-4 text-lg border-2 border-transparent focus:border-blue-400 focus:bg-white/90 shadow-sm focus:shadow-md outline-none transition-all duration-200 animate-glow-on-press" placeholder="Type your message..." />
                <Button className="h-12 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold shadow-lg transition-all duration-150 animate-glow-on-press">Send</Button>
              </form>
            </div>
          </div>
        </div>
      )}
      {/* Report a Problem Modal (Optional) */}
      {showProblem && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/30 backdrop-blur-sm animate-fade-slide-up">
          <div className="w-full max-w-md bg-white/90 rounded-t-3xl sm:rounded-3xl shadow-2xl p-8 relative animate-slide-in-up flex flex-col" style={{ minHeight: 400 }}>
            <Button
              variant="ghost"
              size="icon"
              className="absolute top-4 right-4 text-gray-500 hover:bg-blue-100"
              onClick={() => setShowProblem(false)}
              aria-label="Close Report"
            >
              <ChevronDown className="w-7 h-7" />
            </Button>
            <div className="flex items-center gap-3 mb-6">
              <AlertTriangle className="w-6 h-6 text-yellow-500" />
              <h3 className="text-lg font-bold text-blue-900">Report a Problem</h3>
            </div>
            <form className="space-y-6 flex-1 flex flex-col justify-between" onSubmit={e => { e.preventDefault(); handleProblemSend(); }}>
              <div>
                <label className="block mb-2 text-base font-medium text-gray-700">Category</label>
                <select
                  className="w-full h-14 rounded-xl px-4 text-lg border-2 border-transparent focus:border-blue-400 focus:bg-white/90 shadow-sm focus:shadow-md outline-none transition-all duration-200 animate-glow-on-press"
                  value={problem.category}
                  onChange={e => setProblem(f => ({ ...f, category: e.target.value }))}
                  required
                >
                  <option value="">Select a category</option>
                  <option value="bug">Bug</option>
                  <option value="payment">Payment Issue</option>
                  <option value="ui">UI/UX Problem</option>
                  <option value="other">Other</option>
                </select>
              </div>
              <div className="relative group">
                <Textarea
                  placeholder="Describe the problem..."
                  className="rounded-xl px-5 pt-7 pb-2 text-lg font-medium border-2 border-transparent focus:border-blue-400 focus:bg-white/90 shadow-sm focus:shadow-md outline-none transition-all duration-200 resize-none animate-glow-on-press"
                  rows={4}
                  value={problem.message}
                  onChange={e => setProblem(f => ({ ...f, message: e.target.value }))}
                  required
                  aria-label="Problem Description"
                />
                <label className={`absolute left-5 top-5 text-gray-500 text-base font-medium pointer-events-none transition-all duration-200 origin-left ${problem.message ? '-translate-y-5 scale-90 text-blue-600' : ''}`}>Description</label>
              </div>
              <div className="flex items-center gap-4">
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  ref={problemFileInputRef}
                  onChange={handleProblemFile}
                />
                <Button type="button" variant="outline" className="flex items-center gap-2 animate-bounce-on-press" onClick={() => problemFileInputRef.current?.click()}>
                  <Paperclip className="w-5 h-5" /> Attach Screenshot
                </Button>
                {problem.file && (
                  <span className="text-blue-600 text-sm font-medium flex items-center gap-1"><Upload className="w-4 h-4" /> {problem.file.name}</span>
                )}
              </div>
              <Button type="submit" className="w-full h-14 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-lg shadow-lg transition-all duration-150 animate-glow-on-press">
                Submit Report
              </Button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default HelpSupport;
