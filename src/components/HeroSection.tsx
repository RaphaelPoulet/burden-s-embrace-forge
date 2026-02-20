import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { CinematicSmoke } from "@/components/CinematicSmoke";
import { ElegantEyeLogo } from "@/components/ElegantEyeLogo";

export function HeroSection() {
  return (
    <section
      id="realm-anchor"
      className="relative min-h-screen flex items-center justify-center overflow-hidden gpu-accelerated scroll-mt-[100px]"
      style={{
        transform: 'translateZ(0)',
        willChange: 'transform'
      }}>

      {/* Deep obsidian background with dark red radial gradient */}
      <div
        className="absolute inset-0"
        style={{
          background: `
            radial-gradient(ellipse 60% 50% at 50% 50%, hsl(0 60% 8% / 0.4) 0%, transparent 60%),
            hsl(0 0% 2%)
          `
        }} />


      {/* Cinematic smoke and ash particles */}
      <CinematicSmoke intensity="cinematic" />

      {/* Vignette overlay */}
      <div className="absolute inset-0 vignette pointer-events-none" />

      {/* Main content - Flexbox centered */}
      <div className="relative z-10 container mx-auto px-6 flex flex-col items-center justify-center text-center">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.5 }}
          className="flex flex-col items-center justify-center max-w-4xl mx-auto">

          {/* Elegant Eye Logo */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
            className="mb-8 sm:mb-12">

            <ElegantEyeLogo />
          </motion.div>

          {/* Main Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 1 }}
            className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl tracking-wide leading-tight text-gold-gradient mb-6">

            One Vision. Every Ring.
            <br />
            <span className="text-gold">The Gift Giver.</span>
          </motion.h1>

          {/* Subheadline */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.8 }}
            className="font-body text-base sm:text-lg md:text-xl text-gold-muted max-w-2xl mx-auto mb-10 sm:mb-12 px-4">

            Explore the 20 Great Rings forged for the masters of Middle-earth.
          </motion.p>

          {/* CTA Button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.1, duration: 0.8 }}>

            <Button
              variant="hero"
              size="xl"
              className="group relative overflow-hidden"
              onClick={() => {
                document.getElementById("catalogue")?.scrollIntoView({
                  behavior: "smooth"
                });
              }}>

              <span className="relative z-10">Claim Your Power</span>
              {/* Golden glow on hover */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-gold/20 via-gold/30 to-gold/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                style={{ filter: "blur(8px)" }} />

            </Button>
          </motion.div>
        </motion.div>

        {/* Scroll Indicator */}
        

















      </div>
    </section>);

}