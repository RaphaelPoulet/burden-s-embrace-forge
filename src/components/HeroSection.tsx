import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { EmberParticles } from "@/components/EmberParticles";
import heroImage from "@/assets/hero-ring.jpg";

export function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src={heroImage}
          alt="A glowing ring forged in molten fire"
          className="w-full h-full object-cover"
        />
        {/* Cinematic Overlays */}
        <div className="absolute inset-0 cinematic-overlay" />
        <div className="absolute inset-0 vignette" />
      </div>

      {/* Ember Particles */}
      <EmberParticles count={40} />

      {/* Content */}
      <div className="relative z-10 container mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="max-w-4xl mx-auto"
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
