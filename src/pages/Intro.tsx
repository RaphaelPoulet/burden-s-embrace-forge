import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
const Intro = () => {
  const navigate = useNavigate();
  const [phase, setPhase] = useState(0);
  const [canSkip, setCanSkip] = useState(false);
  useEffect(() => {
    // Animation phases
    const timers = [setTimeout(() => setPhase(1), 500),
    // Eye appears
    setTimeout(() => setPhase(2), 2000),
    // Text reveals
    setTimeout(() => setPhase(3), 4000),
    // Final phase
    setTimeout(() => setCanSkip(true), 1500)];
    return () => timers.forEach(clearTimeout);
  }, [navigate]);
  const handleEnter = () => {
    sessionStorage.setItem("hasSeenIntro", "true");
    navigate("/home");
  };
  return <div className="fixed inset-0 bg-background flex items-center justify-center overflow-hidden cursor-pointer" onClick={canSkip ? handleEnter : undefined}>
      {/* Ambient background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-radial from-magma/5 via-transparent to-transparent" />
        <motion.div className="absolute inset-0" initial={{
        opacity: 0
      }} animate={{
        opacity: phase >= 1 ? 0.3 : 0
      }} transition={{
        duration: 2
      }} style={{
        background: "radial-gradient(ellipse at center, hsl(var(--magma) / 0.15) 0%, transparent 70%)"
      }} />
      </div>

      {/* Vignette */}
      <div className="absolute inset-0 vignette pointer-events-none" />

      {/* Sauron's Eye */}
      <div className="relative">
        <AnimatePresence>
          {phase >= 1 && <motion.div initial={{
          scale: 0,
          opacity: 0
        }} animate={{
          scale: 1,
          opacity: 1
        }} transition={{
          duration: 1.5,
          ease: "easeOut"
        }} className="relative">
              {/* Outer glow ring */}
              <motion.div className="absolute -inset-20 rounded-full" animate={{
            boxShadow: ["0 0 60px 20px hsl(var(--magma) / 0.3), 0 0 120px 40px hsl(var(--magma) / 0.1)", "0 0 80px 30px hsl(var(--magma) / 0.4), 0 0 160px 60px hsl(var(--magma) / 0.15)", "0 0 60px 20px hsl(var(--magma) / 0.3), 0 0 120px 40px hsl(var(--magma) / 0.1)"]
          }} transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut"
          }} />

              {/* Eye shape container */}
              <div className="relative w-64 h-32 md:w-96 md:h-48 flex items-center justify-center">
                {/* Eye outline */}
                <svg viewBox="0 0 200 100" className="w-full h-full">
                  <defs>
                    <linearGradient id="eyeGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="hsl(var(--magma))" />
                      <stop offset="50%" stopColor="hsl(var(--gold))" />
                      <stop offset="100%" stopColor="hsl(var(--magma))" />
                    </linearGradient>
                    <filter id="glow">
                      <feGaussianBlur stdDeviation="3" result="coloredBlur" />
                      <feMerge>
                        <feMergeNode in="coloredBlur" />
                        <feMergeNode in="SourceGraphic" />
                      </feMerge>
                    </filter>
                  </defs>
                  
                  {/* Eye shape path */}
                  <motion.path d="M10 50 Q100 -20 190 50 Q100 120 10 50" fill="none" stroke="url(#eyeGradient)" strokeWidth="3" filter="url(#glow)" initial={{
                pathLength: 0,
                opacity: 0
              }} animate={{
                pathLength: 1,
                opacity: 1
              }} transition={{
                duration: 2,
                ease: "easeInOut"
              }} />
                </svg>

                {/* Pupil/Slit */}
                <motion.div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" initial={{
              scaleY: 0,
              opacity: 0
            }} animate={{
              scaleY: 1,
              opacity: 1
            }} transition={{
              delay: 0.8,
              duration: 0.8,
              ease: "easeOut"
            }}>
                  <div className="relative flex items-center justify-center">
                    {/* Inner fire */}
                    <motion.div className="absolute -inset-4 rounded-full bg-magma/30 blur-xl" animate={{
                  scale: [1, 1.2, 1],
                  opacity: [0.5, 0.8, 0.5]
                }} transition={{
                  duration: 2,
                  repeat: Infinity
                }} />
                    
                    {/* The slit */}
                    <div className="w-3 h-20 md:w-4 md:h-28 bg-gradient-to-b from-gold via-magma to-gold rounded-full" style={{
                  boxShadow: "0 0 30px 10px hsl(var(--magma) / 0.6), inset 0 0 20px hsl(var(--gold) / 0.5)"
                }} />
                  </div>
                </motion.div>

                {/* Surrounding iris flames */}
                {[...Array(12)].map((_, i) => <motion.div key={i} className="absolute top- left- -translate-x- -translate-y- w-1 h-8 bg-gradient-to-t from-magma via-gold to-transparent rounded-full" style={{
              transformOrigin: "center 40px",
              rotate: `${i * 30}deg`
            }} initial={{
              opacity: 0,
              scale: 0
            }} animate={{
              opacity: [0.3, 0.7, 0.3],
              scale: [0.8, 1.1, 0.8]
            }} transition={{
              delay: 1 + i * 0.05,
              duration: 2 + Math.random(),
              repeat: Infinity,
              ease: "easeInOut"
            }} />)}
              </div>
            </motion.div>}
        </AnimatePresence>
      </div>

      {/* Text reveals */}
      <AnimatePresence>
        {phase >= 2 && <motion.div className="absolute bottom-32 left-0 right-0 text-center px-4" initial={{
        opacity: 0,
        y: 30
      }} animate={{
        opacity: 1,
        y: 0
      }} transition={{
        duration: 1,
        ease: "easeOut"
      }}>
            <h1 className="font-display text-3xl md:text-5xl text-gold-gradient mb-4">
              The Gift Giver
            </h1>
            <p className="text-muted-foreground text-sm md:text-base font-body tracking-wider">
              Bearer of Precious Burdens
            </p>
          </motion.div>}
      </AnimatePresence>

      {/* Enter prompt */}
      <AnimatePresence>
        {phase >= 3 && <motion.div className="absolute bottom-12 left-0 right-0 text-center" initial={{
        opacity: 0
      }} animate={{
        opacity: 1
      }} transition={{
        duration: 0.5
      }}>
            <motion.p className="text-foreground/60 text-sm font-body tracking-widest uppercase" animate={{
          opacity: [0.4, 1, 0.4]
        }} transition={{
          duration: 2,
          repeat: Infinity
        }}>
              Click to Enter
            </motion.p>
          </motion.div>}
      </AnimatePresence>
    </div>;
};
export default Intro;