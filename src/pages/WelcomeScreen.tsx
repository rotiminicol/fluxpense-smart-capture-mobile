
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useEffect, useRef } from "react";

const WelcomeScreen = () => {
  const navigate = useNavigate();
  const particlesRef = useRef<HTMLCanvasElement>(null);

  // Particle animation effect (subtle, blue/teal, minimal)
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
    const particles = Array.from({ length: 24 }, () => ({
      x: Math.random() * w,
      y: Math.random() * h,
      r: Math.random() * 1.5 + 0.8,
      dx: (Math.random() - 0.5) * 0.18,
      dy: (Math.random() - 0.5) * 0.18,
      a: Math.random() * 0.3 + 0.15,
    }));
    function draw() {
      ctx.clearRect(0, 0, w, h);
      for (const p of particles) {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, 2 * Math.PI);
        ctx.fillStyle = `rgba(56,189,248,${p.a})`;
        ctx.shadowColor = "#38bdf8";
        ctx.shadowBlur = 6;
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

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 flex flex-col overflow-hidden">
      {/* Animated particles background */}
      <div className="absolute inset-0 z-0">
        <canvas ref={particlesRef} className="w-full h-full" style={{ pointerEvents: 'none' }} />
      </div>
      {/* Back button */}
      <button
        className="absolute top-6 left-4 z-20 p-2 rounded-full bg-white/80 hover:bg-white/100 shadow transition-all duration-200 flex items-center"
        onClick={() => {
          navigate("/", { state: { from: "welcome" } });
        }}
        aria-label="Back"
        style={{ backdropFilter: 'blur(6px)' }}
      >
        <ArrowLeft className="w-6 h-6 text-blue-600" />
      </button>
      {/* Main content */}
      <div className="flex-1 flex flex-col items-center justify-center px-6 py-12 relative z-10">
        <div className="text-center mb-12">
          <img
            src="/aiiit.jpg"
            alt="Fluxpense Logo"
            className="w-32 h-32 mx-auto mb-8 rounded-3xl shadow-xl object-cover animate-logo-entrance"
            style={{ animation: 'logo-entrance 1.1s cubic-bezier(.4,2,.6,1)' }}
          />
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Welcome to Fluxpense</h1>
          <p className="text-gray-600 text-lg leading-relaxed max-w-sm mx-auto">
            Take control of your finances with smart expense tracking and insightful reports
          </p>
        </div>
        <div className="w-full max-w-md space-y-4 animate-slide-up">
          <Button
            onClick={() => navigate("/signup")}
            className="w-full bg-blue-600 hover:bg-blue-700 active:scale-[0.98] text-white font-semibold py-7 rounded-2xl text-xl shadow-lg transition-all duration-150"
          >
            Get Started
          </Button>
          <Button
            onClick={() => navigate("/login")}
            variant="outline"
            className="w-full border-2 border-blue-600 text-blue-600 hover:bg-blue-50 active:scale-[0.98] font-semibold py-7 rounded-2xl text-xl shadow transition-all duration-150"
          >
            I Already Have an Account
          </Button>
        </div>
      </div>
      <div className="px-6 pb-8 text-center relative z-10">
        <p className="text-gray-500 text-sm">
          By continuing, you agree to our Terms of Service and Privacy Policy
        </p>
      </div>
      {/* Custom Animations */}
      <style>{`
        @keyframes logo-entrance {
          0% { opacity: 0; transform: scale(0.8) translateY(30px); }
          60% { opacity: 1; transform: scale(1.08) translateY(-8px); }
          100% { opacity: 1; transform: scale(1) translateY(0); }
        }
      `}</style>
    </div>
  );
};

export default WelcomeScreen;
