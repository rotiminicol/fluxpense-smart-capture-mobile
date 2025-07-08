import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArrowLeft } from "lucide-react";

const ForgotPassword = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [touched, setTouched] = useState(false);
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setSubmitted(true);
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
      <div className="flex-1 px-6 py-4 relative z-10">
        <div className="max-w-md mx-auto">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Forgot Password</h2>
            <p className="text-gray-600">Enter your email to receive a password reset link</p>
          </div>
          {!submitted ? (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="email" className="text-gray-700 font-medium">
                  Email Address
                </Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="h-14 rounded-2xl border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 shadow-sm transition-all placeholder:opacity-60 placeholder:pl-2"
                  onFocus={() => setTouched(true)}
                  required
                />
              </div>
              <Button
                type="submit"
                disabled={isLoading}
                className="w-full bg-blue-600 hover:bg-blue-700 active:scale-[0.98] text-white font-semibold py-7 rounded-2xl text-xl shadow-lg transition-all duration-150"
              >
                {isLoading ? "Sending..." : "Send Reset Link"}
              </Button>
            </form>
          ) : (
            <div className="flex flex-col items-center justify-center animate-auth-fade-in">
              <div className="w-16 h-16 mb-4 rounded-full bg-blue-100 flex items-center justify-center">
                <svg className="w-10 h-10 text-blue-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
              </div>
              <h3 className="text-xl font-semibold text-blue-700 mb-2">Check your email</h3>
              <p className="text-gray-600 text-center">We've sent a password reset link to <span className="font-medium">{email}</span>. Please check your inbox.</p>
              <Button
                className="mt-8 w-full bg-blue-600 hover:bg-blue-700 active:scale-[0.98] text-white font-semibold py-7 rounded-2xl text-xl shadow-lg transition-all duration-150"
                onClick={() => navigate("/login")}
              >
                Back to Login
              </Button>
            </div>
          )}
        </div>
      </div>
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

export default ForgotPassword; 