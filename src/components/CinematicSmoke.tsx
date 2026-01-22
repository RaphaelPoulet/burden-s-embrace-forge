import { useEffect, useState, useMemo } from "react";
import { motion } from "framer-motion";
import { useIsMobile } from "@/hooks/use-mobile";

interface SmokeParticle {
  id: number;
  x: number;
  y: number;
  size: number;
  duration: number;
  delay: number;
  opacity: number;
  driftX: number;
}

interface AshParticle {
  id: number;
  x: number;
  startY: number;
  size: number;
  duration: number;
  delay: number;
  rotation: number;
}

export function CinematicSmoke({ intensity = "cinematic" }: { intensity?: "subtle" | "moderate" | "cinematic" }) {
  const isMobile = useIsMobile();
  
  // Reduce particle count by 50% on mobile for performance
  const particleCounts = useMemo(() => {
    const mobileFactor = isMobile ? 0.5 : 1;
    return {
      subtle: { smoke: Math.floor(8 * mobileFactor), ash: Math.floor(15 * mobileFactor) },
      moderate: { smoke: Math.floor(15 * mobileFactor), ash: Math.floor(30 * mobileFactor) },
      cinematic: { smoke: Math.floor(25 * mobileFactor), ash: Math.floor(50 * mobileFactor) },
    };
  }, [isMobile]);

  const counts = particleCounts[intensity];

  const [smokeParticles, setSmokeParticles] = useState<SmokeParticle[]>([]);
  const [ashParticles, setAshParticles] = useState<AshParticle[]>([]);

  useEffect(() => {
    // Generate smoke particles
    const smoke: SmokeParticle[] = Array.from({ length: counts.smoke }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: 80 + Math.random() * 30,
      size: Math.random() * 150 + 80,
      duration: Math.random() * 15 + 20,
      delay: Math.random() * 8,
      opacity: Math.random() * 0.08 + 0.02,
      driftX: (Math.random() - 0.5) * 30,
    }));
    setSmokeParticles(smoke);

    // Generate ash particles
    const ash: AshParticle[] = Array.from({ length: counts.ash }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      startY: 100 + Math.random() * 20,
      size: Math.random() * 3 + 1,
      duration: Math.random() * 12 + 8,
      delay: Math.random() * 6,
      rotation: Math.random() * 360,
    }));
    setAshParticles(ash);
  }, [counts]);

  return (
    <div 
      className="absolute inset-0 overflow-hidden pointer-events-none gpu-accelerated"
      style={{
        transform: 'translateZ(0)',
        willChange: 'transform',
        backfaceVisibility: 'hidden',
      }}
    >
      {/* Dark red ambient glow at bottom */}
      <div 
        className="absolute bottom-0 left-0 right-0 h-1/2"
        style={{
          background: "radial-gradient(ellipse 80% 50% at 50% 100%, hsl(0 60% 8% / 0.6) 0%, transparent 70%)",
        }}
      />

      {/* Smoke wisps rising */}
      {smokeParticles.map((particle) => (
        <motion.div
          key={`smoke-${particle.id}`}
          className="absolute rounded-full no-flicker"
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            width: particle.size,
            height: particle.size,
            background: `radial-gradient(circle, hsl(0 0% 20% / ${particle.opacity}) 0%, transparent 70%)`,
            filter: isMobile ? "blur(30px)" : "blur(40px)",
            transform: 'translateZ(0)',
            willChange: 'transform, opacity',
            backfaceVisibility: 'hidden',
          }}
          animate={{
            y: [0, -300, -600],
            x: [0, particle.driftX, particle.driftX * 1.5],
            opacity: [0, particle.opacity, 0],
            scale: [0.5, 1.5, 2],
          }}
          transition={{
            duration: particle.duration,
            delay: particle.delay,
            repeat: Infinity,
            ease: "easeOut",
          }}
        />
      ))}

      {/* Ash / ember particles floating up */}
      {ashParticles.map((particle) => (
        <motion.div
          key={`ash-${particle.id}`}
          className="absolute no-flicker"
          style={{
            left: `${particle.x}%`,
            top: `${particle.startY}%`,
            width: particle.size,
            height: particle.size,
            background: `radial-gradient(circle, hsl(var(--gold) / 0.8) 0%, hsl(var(--magma) / 0.6) 50%, transparent 100%)`,
            borderRadius: "50%",
            boxShadow: isMobile ? 'none' : `0 0 ${particle.size * 2}px hsl(var(--magma) / 0.4)`,
            transform: 'translateZ(0)',
            willChange: 'transform, opacity',
            backfaceVisibility: 'hidden',
          }}
          animate={{
            y: [0, -400, -800],
            x: [0, (Math.random() - 0.5) * 80, (Math.random() - 0.5) * 120],
            opacity: [0, 0.9, 0],
            rotate: [0, particle.rotation, particle.rotation * 2],
            scale: [0.3, 1, 0.5],
          }}
          transition={{
            duration: particle.duration,
            delay: particle.delay,
            repeat: Infinity,
            ease: "easeOut",
          }}
        />
      ))}

      {/* Subtle floating dust motes - reduced on mobile */}
      {Array.from({ length: isMobile ? 10 : 20 }).map((_, i) => (
        <motion.div
          key={`dust-${i}`}
          className="absolute rounded-full no-flicker"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            width: 1,
            height: 1,
            background: "hsl(var(--gold) / 0.4)",
            transform: 'translateZ(0)',
            willChange: 'transform, opacity',
            backfaceVisibility: 'hidden',
          }}
          animate={{
            y: [0, -20, 0],
            x: [0, (Math.random() - 0.5) * 10, 0],
            opacity: [0.2, 0.5, 0.2],
          }}
          transition={{
            duration: Math.random() * 5 + 5,
            delay: Math.random() * 3,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
}
