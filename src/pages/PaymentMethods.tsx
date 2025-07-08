
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useRef } from "react";
import { CreditCard, ArrowLeft, Plus, Settings, Lock, XCircle, CheckCircle } from "lucide-react";
import { useEffect } from "react";

const cardLogos = {
  Visa: <CreditCard className="w-8 h-8 text-blue-600" />,
  Mastercard: <CreditCard className="w-8 h-8 text-yellow-600" />,
  Default: <CreditCard className="w-8 h-8 text-blue-400" />,
};

const initialMethods = [
  {
    id: 1,
    type: "Visa",
    number: "**** 1234",
    expiry: "12/25",
    isPrimary: true,
  },
  {
    id: 2,
    type: "Mastercard",
    number: "**** 5678",
    expiry: "08/26",
    isPrimary: false,
  },
];

const PaymentMethods = () => {
  const navigate = useNavigate();
  const [paymentMethods, setPaymentMethods] = useState(initialMethods);
  const [showAdd, setShowAdd] = useState(false);
  const [adding, setAdding] = useState(false);
  const [form, setForm] = useState({
    type: "Visa",
    number: "",
    expiry: "",
    cvc: "",
  });
  const [touched, setTouched] = useState({ number: false, expiry: false, cvc: false });
  const [valid, setValid] = useState({ number: false, expiry: false, cvc: false });
  const addRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    document.body.classList.add("animate-fade-slide-in");
    return () => document.body.classList.remove("animate-fade-slide-in");
  }, []);

  const validate = (field: string, value: string) => {
    switch (field) {
      case "number":
        return /^\d{4} \d{4} \d{4} \d{4}$/.test(value);
      case "expiry":
        return /^(0[1-9]|1[0-2])\/(\d{2})$/.test(value);
      case "cvc":
        return /^\d{3,4}$/.test(value);
      default:
        return false;
    }
  };

  const handleInput = (field: string, value: string) => {
    setForm(f => ({ ...f, [field]: value }));
    setTouched(t => ({ ...t, [field]: true }));
    setValid(v => ({ ...v, [field]: validate(field, value) }));
  };

  const handleAdd = () => {
    setAdding(true);
    setTimeout(() => {
      setPaymentMethods(methods => [
        {
          id: Date.now(),
          type: form.type,
          number: `**** ${form.number.slice(-4)}`,
          expiry: form.expiry,
          isPrimary: paymentMethods.length === 0,
        },
        ...methods,
      ]);
      setShowAdd(false);
      setAdding(false);
      setForm({ type: "Visa", number: "", expiry: "", cvc: "" });
      setTouched({ number: false, expiry: false, cvc: false });
      setValid({ number: false, expiry: false, cvc: false });
    }, 800);
  };

  const handleDelete = (id: number) => {
    setPaymentMethods(methods => methods.filter(m => m.id !== id));
  };

  const isEmpty = paymentMethods.length === 0;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100/60 to-blue-200/80 flex flex-col items-center justify-start animate-fade-slide-up">
      <div className="w-full max-w-xl px-4 sm:px-0 py-8 overflow-y-auto" style={{ minHeight: '100vh' }}>
      {/* Header */}
        <div className="flex items-center gap-2 mb-10 animate-stagger-in" style={{ animationDelay: '100ms' }}>
            <Button
              variant="ghost"
            size="icon"
            onClick={() => navigate('/profile')}
            className="rounded-full bg-white/70 hover:bg-blue-100 shadow-md border border-blue-200 transition-all duration-200"
            aria-label="Back"
          >
            <ArrowLeft className="w-6 h-6 text-blue-600" />
            </Button>
          <h1 className="text-2xl font-bold text-blue-800 ml-2 tracking-tight flex-1">Payment Methods</h1>
          <Button
            className="h-12 px-6 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold shadow-lg transition-all duration-150 animate-glow-on-press"
            onClick={() => setShowAdd(true)}
          >
            <Plus className="w-5 h-5 mr-2" />
            Add Method
          </Button>
        </div>
        {/* Empty State */}
        {isEmpty && (
          <div className="flex flex-col items-center justify-center h-96 animate-fade-slide-up">
            <CreditCard className="w-24 h-24 text-blue-300 mb-6 animate-bounce" />
            <h2 className="text-2xl font-bold text-blue-700 mb-2">No payment methods yet.</h2>
            <p className="text-blue-500 text-lg mb-6">Add one to get started.</p>
            <Button className="h-12 px-8 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold shadow-lg transition-all duration-150 animate-glow-on-press" onClick={() => setShowAdd(true)}>
              <Plus className="w-5 h-5 mr-2" /> Add Payment Method
            </Button>
      </div>
        )}
        {/* Saved Methods */}
        {!isEmpty && (
          <div className="space-y-8 animate-stagger-in" style={{ animationDelay: '200ms' }}>
            {paymentMethods.map((method, i) => (
              <Card
                key={method.id}
                className={`relative p-8 rounded-3xl glass-card shadow-xl transition-all duration-300 animate-stagger-in ${method.isPrimary ? 'ring-4 ring-blue-400/30 border-blue-200' : 'border-transparent'} hover:scale-[1.025] hover:shadow-2xl`}
                style={{ animationDelay: `${200 + i * 80}ms` }}
              >
                <div className="flex items-center gap-6 mb-4">
                  <div className="w-16 h-16 rounded-2xl bg-white/70 flex items-center justify-center shadow-md border border-blue-100">
                    {cardLogos[method.type as keyof typeof cardLogos] || cardLogos.Default}
                </div>
                  <div className="flex-1">
                    <div className="text-xl font-bold text-blue-900 tracking-wider mb-1">{method.type} <span className="ml-2 text-lg font-mono">{method.number}</span></div>
                    <div className="text-base text-blue-600 font-medium">Exp: {method.expiry}</div>
                  </div>
                  {method.isPrimary && (
                    <span className="absolute top-4 right-4 bg-blue-600 text-white text-xs font-bold px-3 py-1 rounded-full shadow">Primary</span>
                  )}
                </div>
                <div className="flex gap-4 mt-2">
                  <Button
                    variant="outline"
                    className="flex-1 h-12 rounded-xl border-blue-300 text-blue-600 bg-white/80 hover:bg-blue-50 font-bold text-base shadow transition-all duration-150 animate-bounce-on-press"
                    onClick={() => handleDelete(method.id)}
                  >
                    Delete
                  </Button>
                  {!method.isPrimary && (
                    <Button
                      className="flex-1 h-12 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-base shadow transition-all duration-150 animate-glow-on-press"
                      onClick={() => setPaymentMethods(methods => methods.map(m => m.id === method.id ? { ...m, isPrimary: true } : { ...m, isPrimary: false }))}
                    >
                      Set as Primary
              </Button>
                  )}
            </div>
          </Card>
        ))}
          </div>
        )}
        {/* Add Payment Method Drawer/Modal */}
        {showAdd && (
          <div ref={addRef} className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/30 backdrop-blur-sm animate-fade-slide-up">
            <div className="w-full max-w-md bg-white/90 rounded-t-3xl sm:rounded-3xl shadow-2xl p-10 relative animate-slide-in-up">
              <Button
                variant="ghost"
                size="icon"
                className="absolute top-4 right-4 text-gray-500 hover:bg-blue-100"
                onClick={() => setShowAdd(false)}
                aria-label="Close"
              >
                <XCircle className="w-7 h-7" />
              </Button>
              <h2 className="text-2xl font-bold text-blue-800 mb-8">Add Payment Method</h2>
              <form className="space-y-8">
                {/* Card Number */}
                <div className="relative group">
                  <input
                    id="card-number"
                    value={form.number}
                    onChange={e => handleInput('number', e.target.value.replace(/[^\d ]/g, '').replace(/(\d{4})/g, '$1 ').trim().slice(0, 19))}
                    onFocus={() => setTouched(t => ({ ...t, number: true }))}
                    className={`peer h-16 w-full rounded-xl bg-white/80 px-5 pt-7 pb-2 text-xl font-mono border-2 border-transparent focus:border-blue-400 focus:bg-white/90 shadow-sm focus:shadow-md outline-none transition-all duration-200 pr-14 ${touched.number ? (valid.number ? 'border-green-400' : 'border-red-300') : ''}`}
                    required
                    aria-label="Card Number"
                    autoComplete="cc-number"
                  />
                  <label htmlFor="card-number" className={`absolute left-5 top-5 text-gray-500 text-lg font-medium pointer-events-none transition-all duration-200 origin-left peer-focus:-translate-y-6 peer-focus:scale-90 peer-focus:text-blue-600 peer-[:not(:placeholder-shown)]:-translate-y-6 peer-[:not(:placeholder-shown)]:scale-90 peer-[:not(:placeholder-shown)]:text-blue-600 ${form.number ? '-translate-y-6 scale-90 text-blue-600' : ''}`}>Card Number</label>
                  <Lock className="absolute right-5 top-7 w-5 h-5 text-blue-400" aria-label="Your details are encrypted" />
                  {touched.number && (valid.number ? <CheckCircle className="absolute right-12 top-7 text-green-500 w-6 h-6 animate-pop-in" /> : <XCircle className="absolute right-12 top-7 text-red-400 w-6 h-6 animate-pop-in" />)}
                </div>
                {/* Expiry */}
                <div className="relative group">
                  <input
                    id="expiry"
                    value={form.expiry}
                    onChange={e => handleInput('expiry', e.target.value.replace(/[^\d/]/g, '').replace(/(\d{2})(\d{0,2})/, (m, m1, m2) => m2 ? `${m1}/${m2}` : m1).slice(0, 5))}
                    onFocus={() => setTouched(t => ({ ...t, expiry: true }))}
                    className={`peer h-16 w-full rounded-xl bg-white/80 px-5 pt-7 pb-2 text-xl font-mono border-2 border-transparent focus:border-blue-400 focus:bg-white/90 shadow-sm focus:shadow-md outline-none transition-all duration-200 pr-14 ${touched.expiry ? (valid.expiry ? 'border-green-400' : 'border-red-300') : ''}`}
                    required
                    aria-label="Expiry Date"
                    autoComplete="cc-exp"
                  />
                  <label htmlFor="expiry" className={`absolute left-5 top-5 text-gray-500 text-lg font-medium pointer-events-none transition-all duration-200 origin-left peer-focus:-translate-y-6 peer-focus:scale-90 peer-focus:text-blue-600 peer-[:not(:placeholder-shown)]:-translate-y-6 peer-[:not(:placeholder-shown)]:scale-90 peer-[:not(:placeholder-shown)]:text-blue-600 ${form.expiry ? '-translate-y-6 scale-90 text-blue-600' : ''}`}>Expiry Date (MM/YY)</label>
                  <Lock className="absolute right-5 top-7 w-5 h-5 text-blue-400" aria-label="Your details are encrypted" />
                  {touched.expiry && (valid.expiry ? <CheckCircle className="absolute right-12 top-7 text-green-500 w-6 h-6 animate-pop-in" /> : <XCircle className="absolute right-12 top-7 text-red-400 w-6 h-6 animate-pop-in" />)}
                </div>
                {/* CVC */}
                <div className="relative group">
                  <input
                    id="cvc"
                    value={form.cvc}
                    onChange={e => handleInput('cvc', e.target.value.replace(/[^\d]/g, '').slice(0, 4))}
                    onFocus={() => setTouched(t => ({ ...t, cvc: true }))}
                    className={`peer h-16 w-full rounded-xl bg-white/80 px-5 pt-7 pb-2 text-xl font-mono border-2 border-transparent focus:border-blue-400 focus:bg-white/90 shadow-sm focus:shadow-md outline-none transition-all duration-200 pr-14 ${touched.cvc ? (valid.cvc ? 'border-green-400' : 'border-red-300') : ''}`}
                    required
                    aria-label="CVC"
                    autoComplete="cc-csc"
                  />
                  <label htmlFor="cvc" className={`absolute left-5 top-5 text-gray-500 text-lg font-medium pointer-events-none transition-all duration-200 origin-left peer-focus:-translate-y-6 peer-focus:scale-90 peer-focus:text-blue-600 peer-[:not(:placeholder-shown)]:-translate-y-6 peer-[:not(:placeholder-shown)]:scale-90 peer-[:not(:placeholder-shown)]:text-blue-600 ${form.cvc ? '-translate-y-6 scale-90 text-blue-600' : ''}`}>CVC</label>
                  <Lock className="absolute right-5 top-7 w-5 h-5 text-blue-400" aria-label="Your details are encrypted" />
                  {touched.cvc && (valid.cvc ? <CheckCircle className="absolute right-12 top-7 text-green-500 w-6 h-6 animate-pop-in" /> : <XCircle className="absolute right-12 top-7 text-red-400 w-6 h-6 animate-pop-in" />)}
                </div>
                <Button
                  type="button"
                  className="w-full h-14 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-lg shadow-lg transition-all duration-150 animate-glow-on-press mt-6"
                  onClick={handleAdd}
                  disabled={adding || !valid.number || !valid.expiry || !valid.cvc}
                >
                  {adding ? 'Adding...' : 'Add Payment Method'}
                </Button>
              </form>
              <div className="flex items-center gap-2 mt-6 text-blue-400 text-sm">
                <Lock className="w-5 h-5" />
                <span>Your details are encrypted and secure.</span>
              </div>
            </div>
          </div>
        )}
        {/*
        // Old code for reference
        <div className="px-4 py-6 space-y-4">...</div>
        */}
      </div>
    </div>
  );
};

export default PaymentMethods;
