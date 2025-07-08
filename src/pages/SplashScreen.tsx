
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useEffect, useRef } from "react";

const SplashScreen = () => {
  const navigate = useNavigate();
  const particlesRef = useRef<HTMLCanvasElement>(null);

  // Particle animation effect
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
    const particles = Array.from({ length: 32 }, () => ({
      x: Math.random() * w,
      y: Math.random() * h,
      r: Math.random() * 2 + 1,
      dx: (Math.random() - 0.5) * 0.3,
      dy: (Math.random() - 0.5) * 0.3,
      a: Math.random() * 0.5 + 0.2,
    }));
    function draw() {
      ctx.clearRect(0, 0, w, h);
      for (const p of particles) {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, 2 * Math.PI);
        ctx.fillStyle = `rgba(0,255,200,${p.a})`;
        ctx.shadowColor = "#00ffcc";
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

  return (
    <div className="relative min-h-screen w-full flex items-center justify-center overflow-hidden bg-gradient-to-br from-blue-700 via-teal-500 to-green-400">
      {/* Glassmorphism frosted panel */}
      <div className="absolute inset-0 z-0">
        <canvas ref={particlesRef} className="w-full h-full" style={{ pointerEvents: 'none' }} />
        <div className="absolute inset-0 bg-gradient-to-br from-blue-700/60 via-teal-400/40 to-green-300/30 backdrop-blur-2xl" />
      </div>
      <div className="relative z-10 flex flex-col items-center justify-center w-full max-w-md px-6 py-12 animate-fade-in">
        {/* Animated Logo */}
        <div className="mb-8 flex flex-col items-center">
          <img
            src="/bird.jpg"
            alt="Fluxpense Logo"
            className="w-32 h-32 rounded-3xl shadow-2xl object-cover animate-logo-entrance"
            style={{ animation: 'logo-entrance 1.2s cubic-bezier(.4,2,.6,1)'}}
          />
          <h1 className="text-5xl font-extrabold text-white drop-shadow-lg mt-6 tracking-tight font-sans">Fluxpense</h1>
          <p className="text-xl text-blue-100 mt-2 mb-2 font-medium tracking-wide">Smart Expense Manager</p>
        </div>
      </div>
      {/* Continue Button fixed at the bottom */}
      <div className="fixed bottom-0 left-0 w-full z-20 flex justify-center pb-8 px-4 animate-slide-up">
        <Button
          onClick={() => navigate("/welcome")}
          className="w-full max-w-md py-8 text-2xl font-bold rounded-2xl bg-gradient-to-r from-blue-600 via-teal-400 to-green-400 text-white shadow-xl hover:scale-[1.03] hover:shadow-2xl hover:from-blue-700 hover:to-green-500 focus-visible:ring-4 focus-visible:ring-teal-300 transition-all duration-200 ease-out border-none tracking-wide"
          style={{ letterSpacing: '0.04em' }}
        >
          Continue
        </Button>
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

export default SplashScreen;
