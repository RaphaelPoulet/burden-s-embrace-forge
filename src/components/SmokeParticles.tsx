import { motion } from "framer-motion";

interface SmokeParticle {
  id: number;
  x: number;
  delay: number;
  duration: number;
  size: number;
  opacity: number;
}

interface SmokeParticlesProps {
  count?: number;
}

export function SmokeParticles({ count = 15 }: SmokeParticlesProps) {
  const particles: SmokeParticle[] = Array.from({ length: count }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    delay: Math.random() * 5,
    duration: 8 + Math.random() * 6,
    size: 40 + Math.random() * 80,
    opacity: 0.02 + Math.random() * 0.04,
  }));

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute rounded-full bg-foreground/10"
          style={{
            left: `${particle.x}%`,
            width: particle.size,
            height: particle.size,
            filter: `blur(${particle.size / 3}px)`,
          }}
          initial={{
            bottom: -100,
            opacity: 0,
            scale: 0.5,
          }}
          animate={{
            bottom: ["0%", "100%"],
            opacity: [0, particle.opacity, particle.opacity, 0],
            scale: [0.5, 1.2, 1.5],
            x: [0, Math.random() * 50 - 25, Math.random() * 100 - 50],
          }}
          transition={{
            duration: particle.duration,
            delay: particle.delay,
            repeat: Infinity,
            ease: "linear",
          }}
        />
      ))}
    </div>
  );
}
