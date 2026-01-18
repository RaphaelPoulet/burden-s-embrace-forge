import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { SmokeParticles } from "@/components/SmokeParticles";
import { EmberParticles } from "@/components/EmberParticles";

export function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Deep obsidian background */}
      <div className="absolute inset-0 bg-background">
        {/* Subtle radial gradient overlay */}
        <div className="absolute inset-0 bg-gradient-radial from-magma/5 via-transparent to-transparent" />
        
        {/* Ambient glow spots */}
        <motion.div
          className="absolute top-1/4 left-1/4 w-96 h-96 bg-magma/5 rounded-full blur-3xl"
          animate={{
            opacity: [0.3, 0.5, 0.3],
            scale: [1, 1.1, 1],
          }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-gold/5 rounded-full blur-3xl"
          animate={{
            opacity: [0.2, 0.4, 0.2],
            scale: [1, 1.15, 1],
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        />
      </div>

      {/* Subtle smoke particles */}
      <SmokeParticles count={12} />

      {/* Subtle ember particles */}
      <EmberParticles count={20} />

      {/* Cinematic overlays */}
      <div className="absolute inset-0 cinematic-overlay" />
      <div className="absolute inset-0 vignette" />

      {/* Content */}
      <div className="relative z-10 container mx-auto px-6 flex flex-col items-center justify-center text-center">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="max-w-4xl mx-auto flex flex-col items-center"
        >
          {/* Tagline */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="font-body text-sm tracking-[0.3em] uppercase text-magma mb-8"
          >
            From the depths of Mount Doom
          </motion.p>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 1 }}
            className="font-display text-5xl sm:text-6xl md:text-7xl lg:text-8xl tracking-wide leading-none text-gold-gradient mb-8"
          >
            Power is not given.
            <br />
            <span className="text-gold">It is taken.</span>
          </motion.h1>

          {/* Subtext */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.8 }}
            className="font-body text-lg sm:text-xl text-gold-muted max-w-2xl mx-auto mb-12"
          >
            Forge your destiny with an artifact worthy of command. Each piece,
            crafted in eternal flame, awaits a master bold enough to wield it.
          </motion.p>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.1, duration: 0.8 }}
          >
            <Button
              variant="hero"
              size="xl"
              onClick={() => {
                document.getElementById("catalogue")?.scrollIntoView({
                  behavior: "smooth",
                });
              }}
            >
              Explore the Forges
            </Button>
          </motion.div>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 1 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="w-6 h-10 border border-gold/30 rounded-full flex items-start justify-center p-2"
          >
            <motion.div
              animate={{ y: [0, 12, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              className="w-1 h-2 bg-gold/50 rounded-full"
            />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
