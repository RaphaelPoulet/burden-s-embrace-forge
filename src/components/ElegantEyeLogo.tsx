import { motion } from "framer-motion";

export function ElegantEyeLogo() {
  return (
    <div 
      className="relative flex items-center justify-center w-48 h-48 sm:w-64 sm:h-64 md:w-80 md:h-80 gpu-accelerated"
      style={{
        transform: 'translateZ(0)',
        willChange: 'transform',
      }}
    >
      {/* Outer glow */}
      <motion.div
        className="absolute inset-0 rounded-full no-flicker"
        style={{
          background: "radial-gradient(circle, hsl(var(--gold) / 0.3) 0%, transparent 70%)",
          transform: 'translateZ(0)',
          willChange: 'transform, opacity',
          backfaceVisibility: 'hidden',
        }}
        animate={{
          scale: [1, 1.1, 1],
          opacity: [0.5, 0.8, 0.5],
        }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Eye oval container */}
      <div className="relative w-full h-full flex items-center justify-center">
        {/* Outer eye shape */}
        <motion.svg
          viewBox="0 0 200 100"
          className="w-full h-auto max-w-[280px] sm:max-w-[350px] md:max-w-[420px]"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
        >
          <defs>
            {/* Gold gradient for the eye outline */}
            <linearGradient id="goldGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="hsl(35, 55%, 70%)" />
              <stop offset="50%" stopColor="hsl(30, 50%, 55%)" />
              <stop offset="100%" stopColor="hsl(25, 45%, 50%)" />
            </linearGradient>

            {/* Inner glow gradient */}
            <radialGradient id="innerGlow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="hsl(30, 50%, 55%)" stopOpacity="0.6" />
              <stop offset="70%" stopColor="hsl(30, 50%, 55%)" stopOpacity="0.2" />
              <stop offset="100%" stopColor="transparent" />
            </radialGradient>

            {/* Pupil gradient */}
            <radialGradient id="pupilGradient" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="hsl(0, 0%, 8%)" />
              <stop offset="60%" stopColor="hsl(0, 0%, 4%)" />
              <stop offset="100%" stopColor="hsl(0, 0%, 2%)" />
            </radialGradient>

            {/* Subtle fire reflection */}
            <linearGradient id="fireReflection" x1="0%" y1="100%" x2="0%" y2="0%">
              <stop offset="0%" stopColor="hsl(15, 100%, 55%)" stopOpacity="0.4" />
              <stop offset="50%" stopColor="hsl(30, 50%, 55%)" stopOpacity="0.2" />
              <stop offset="100%" stopColor="transparent" />
            </linearGradient>
          </defs>

          {/* Eye shape outline */}
          <motion.path
            d="M 10 50 Q 50 10, 100 10 Q 150 10, 190 50 Q 150 90, 100 90 Q 50 90, 10 50 Z"
            fill="none"
            stroke="url(#goldGradient)"
            strokeWidth="2"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 2, ease: "easeInOut" }}
          />

          {/* Inner glow fill */}
          <ellipse
            cx="100"
            cy="50"
            rx="60"
            ry="28"
            fill="url(#innerGlow)"
          />

          {/* Iris ring */}
          <motion.circle
            cx="100"
            cy="50"
            r="22"
            fill="none"
            stroke="url(#goldGradient)"
            strokeWidth="1.5"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 1, delay: 0.5, ease: "easeOut" }}
          />

          {/* Pupil - perfectly centered */}
          <motion.circle
            cx="100"
            cy="50"
            r="12"
            fill="url(#pupilGradient)"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.8, delay: 0.8, ease: "easeOut" }}
          />

          {/* Subtle lens flare / highlight */}
          <motion.ellipse
            cx="92"
            cy="44"
            rx="4"
            ry="2"
            fill="hsl(35, 55%, 80%)"
            opacity="0.6"
            animate={{
              opacity: [0.4, 0.7, 0.4],
            }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          />

          {/* Fire reflection at bottom */}
          <path
            d="M 50 55 Q 100 75, 150 55"
            fill="url(#fireReflection)"
            opacity="0.3"
          />
        </motion.svg>
      </div>

      {/* Ambient pulse ring */}
      <motion.div
        className="absolute inset-0 rounded-full border border-gold/20 no-flicker"
        style={{
          transform: 'translateZ(0)',
          willChange: 'transform, opacity',
          backfaceVisibility: 'hidden',
        }}
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0, 0.3],
        }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
      />
    </div>
  );
}
