
import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { ArrowLeft, Eye, EyeOff } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const passwordRules = [
  { label: "At least 8 characters", test: (v: string) => v.length >= 8 },
  { label: "At least one number", test: (v: string) => /\d/.test(v) },
  { label: "At least one uppercase letter", test: (v: string) => /[A-Z]/.test(v) },
  { label: "At least one lowercase letter", test: (v: string) => /[a-z]/.test(v) },
];

const termsText = `Your Terms of Service and Privacy Policy go here.\n\nLorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam euismod, urna eu tincidunt consectetur, nisi nisl aliquam nunc, eget aliquam massa nisi eu velit. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas.`;

const SignUpScreen = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showTerms, setShowTerms] = useState(false);
  const [touched, setTouched] = useState<{[k:string]: boolean}>({});
  const particlesRef = useRef<HTMLCanvasElement>(null);

  // Animate background particles/glow
  useEffect(() => {
    const canvas = particlesRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    let animationFrameId: number;
    const dpr = window.devicePixelRatio || 1;
    canvas.width = window.innerWidth * dpr;
    canvas.height = window.innerHeight * dpr;
    ctx.scale(dpr, dpr);
    const w = window.innerWidth;
    const h = window.innerHeight;
    const particles = Array.from({ length: 18 }, () => ({
      x: Math.random() * w,
      y: Math.random() * h,
      r: Math.random() * 2 + 1.5,
      dx: (Math.random() - 0.5) * 0.12,
      dy: (Math.random() - 0.5) * 0.12,
      a: Math.random() * 0.18 + 0.12,
    }));
    function draw() {
      ctx.clearRect(0, 0, w, h);
      for (const p of particles) {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, 2 * Math.PI);
        ctx.fillStyle = `rgba(56,189,248,${p.a})`;
        ctx.shadowColor = "#38bdf8";
        ctx.shadowBlur = 8;
        ctx.fill();
        p.x += p.dx;
        p.y += p.dy;
        if (p.x < 0 || p.x > w) p.dx *= -1;
        if (p.y < 0 || p.y > h) p.dy *= -1;
      }
      animationFrameId = requestAnimationFrame(draw);
    }
    draw();
    return () => cancelAnimationFrame(animationFrameId);
  }, []);

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      toast({
        title: "Password Mismatch",
        description: "Passwords don't match. Please try again.",
        variant: "destructive",
      });
      return;
    }
    if (!agreedToTerms) {
      toast({
        title: "Terms Required",
        description: "Please agree to the terms and conditions.",
        variant: "destructive",
      });
      return;
    }
    setIsLoading(true);
    setTimeout(() => {
      toast({
        title: "Account Created!",
        description: "Welcome to Fluxpense! Let's set up your profile.",
      });
      navigate("/onboarding");
      setIsLoading(false);
    }, 1500);
  };

  return (
    <div className="relative min-h-screen bg-white flex flex-col overflow-hidden animate-auth-fade-in">
      {/* Animated background */}
      <div className="absolute inset-0 z-0">
        <canvas ref={particlesRef} className="w-full h-full" style={{ pointerEvents: 'none' }} />
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50/60 to-blue-100/60" />
      </div>
      {/* Back button */}
      <Button
        variant="ghost"
        size="sm"
        onClick={() => navigate(-1)}
        className="absolute top-6 left-4 z-20 p-2 rounded-full bg-white/80 hover:bg-white/100 shadow transition-all duration-200 flex items-center"
        style={{ backdropFilter: 'blur(6px)' }}
      >
        <ArrowLeft className="w-5 h-5 text-blue-600" />
      </Button>
      {/* Logo */}
      <div className="flex flex-col items-center pt-14 pb-4 relative z-10 animate-logo-entrance">
        <img
          src="/FluxpenseLogo.png"
          alt="Fluxpense Logo"
          className="w-24 h-24 mb-2 object-contain drop-shadow-xl"
        />
      </div>
      <div className="flex-1 px-6 py-4 overflow-y-auto relative z-10">
        <div className="max-w-md mx-auto">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Join Fluxpense</h2>
            <p className="text-gray-600">Create your account to start tracking expenses</p>
          </div>
          <form onSubmit={handleSignUp} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="fullName" className="text-gray-700 font-medium">
                Full Name
              </Label>
              <Input
                id="fullName"
                type="text"
                value={formData.fullName}
                onChange={(e) => handleInputChange("fullName", e.target.value)}
                placeholder="Enter your full name"
                className="h-14 rounded-2xl border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 shadow-sm transition-all placeholder:opacity-60 placeholder:pl-2"
                onFocus={() => setTouched(t => ({...t, fullName: true}))}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email" className="text-gray-700 font-medium">
                Email Address
              </Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => handleInputChange("email", e.target.value)}
                placeholder="Enter your email"
                className="h-14 rounded-2xl border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 shadow-sm transition-all placeholder:opacity-60 placeholder:pl-2"
                onFocus={() => setTouched(t => ({...t, email: true}))}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password" className="text-gray-700 font-medium">
                Password
              </Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  value={formData.password}
                  onChange={(e) => handleInputChange("password", e.target.value)}
                  placeholder="Create a password"
                  className="h-14 rounded-2xl border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 shadow-sm transition-all placeholder:opacity-60 placeholder:pl-2 pr-12"
                  onFocus={() => setTouched(t => ({...t, password: true}))}
                  required
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </Button>
              </div>
              {/* Password rules */}
              <ul className="mt-2 space-y-1 text-sm">
                {passwordRules.map(rule => {
                  const passed = rule.test(formData.password);
                  return (
                    <li key={rule.label} className={`flex items-center gap-2 transition-all duration-200 ${passed ? 'text-green-600' : 'text-gray-400'}`}>
                      <span className={`inline-block w-2 h-2 rounded-full ${passed ? 'bg-green-500' : 'bg-gray-300'} transition-all duration-200`}></span>
                      <span className={passed ? 'font-semibold' : ''}>{rule.label}</span>
                    </li>
                  );
                })}
              </ul>
            </div>
            <div className="space-y-2">
              <Label htmlFor="confirmPassword" className="text-gray-700 font-medium">
                Confirm Password
              </Label>
              <div className="relative">
                <Input
                  id="confirmPassword"
                  type={showConfirmPassword ? "text" : "password"}
                  value={formData.confirmPassword}
                  onChange={(e) => handleInputChange("confirmPassword", e.target.value)}
                  placeholder="Confirm your password"
                  className="h-14 rounded-2xl border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 shadow-sm transition-all placeholder:opacity-60 placeholder:pl-2 pr-12"
                  onFocus={() => setTouched(t => ({...t, confirmPassword: true}))}
                  required
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                >
                  {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </Button>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <Checkbox
                id="terms"
                checked={agreedToTerms}
                onCheckedChange={(checked) => setAgreedToTerms(checked as boolean)}
                className="mt-1"
              />
              <Label htmlFor="terms" className="text-sm text-gray-600 leading-relaxed">
                I agree to the{" "}
                <Button type="button" variant="link" className="p-0 h-auto text-blue-600 text-sm" onClick={() => setShowTerms(true)}>
                  Terms of Service
                </Button>{" "}
                and{" "}
                <Button type="button" variant="link" className="p-0 h-auto text-blue-600 text-sm" onClick={() => setShowTerms(true)}>
                  Privacy Policy
                </Button>
              </Label>
            </div>
            <Button
              type="submit"
              disabled={isLoading}
              className="w-full bg-blue-600 hover:bg-blue-700 active:scale-[0.98] text-white font-semibold py-7 rounded-2xl text-xl shadow-lg transition-all duration-150"
            >
              {isLoading ? "Creating Account..." : "Create Account"}
            </Button>
          </form>
          <div className="mt-8 text-center">
            <p className="text-gray-600">
              Already have an account?{" "}
              <Button
                variant="link"
                onClick={() => navigate("/login")}
                className="text-blue-600 p-0 h-auto font-semibold"
              >
                Sign In
              </Button>
            </p>
          </div>
        </div>
      </div>
      {/* Terms Modal */}
      {showTerms && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 animate-auth-fade-in">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl h-full max-h-[90vh] overflow-y-auto p-8 relative flex flex-col">
            <button
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-700 text-2xl font-bold"
              onClick={() => setShowTerms(false)}
              aria-label="Close"
            >
              ×
            </button>
            <h2 className="text-2xl font-bold mb-4">Terms & Privacy Policy</h2>
            <pre className="whitespace-pre-wrap text-gray-700 text-sm leading-relaxed">{termsText}</pre>
          </div>
        </div>
      )}
      {/* Custom Animations */}
      <style>{`
        @keyframes logo-entrance {
          0% { opacity: 0; transform: translateY(30px) scale(0.92); }
          60% { opacity: 1; transform: translateY(-8px) scale(1.08); }
          100% { opacity: 1; transform: translateY(0) scale(1); }
        }
        @keyframes auth-fade-in {
          0% { opacity: 0; transform: translateY(40px); }
          100% { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
};

export default SignUpScreen;
