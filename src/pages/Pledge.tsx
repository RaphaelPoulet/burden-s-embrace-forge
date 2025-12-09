import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowLeft, Shield, Flame, Eye, Scroll } from "lucide-react";

export default function Pledge() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Back Navigation */}
      <div className="container mx-auto px-6 py-6">
        <Link 
          to="/home" 
          className="inline-flex items-center gap-2 text-muted-foreground hover:text-gold transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span className="font-body text-sm tracking-wider uppercase">Return to the Forge</span>
        </Link>
      </div>

      {/* Hero Section */}
      <section className="relative py-16 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-magma/5 via-transparent to-transparent" />
        <div className="container mx-auto px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-4xl mx-auto"
          >
            <Eye className="w-16 h-16 text-magma mx-auto mb-6 opacity-80" />
            <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl tracking-wide text-gold-gradient mb-6">
              The Gift Giver's Pledge
            </h1>
            <p className="font-body text-lg text-muted-foreground leading-relaxed">
              In the fires of Mount Doom, we forged not merely rings, but promises. 
              Each artefact carries with it an eternal covenant between The Gift Giver and its bearer.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Our History */}
      <section className="py-16">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="max-w-4xl mx-auto"
          >
            <div className="flex items-center gap-4 mb-8">
              <Flame className="w-8 h-8 text-magma" />
              <h2 className="font-display text-3xl tracking-wide text-gold">Our Origin</h2>
            </div>
            <div className="space-y-6 text-muted-foreground font-body leading-relaxed pl-12">
              <p>
                Long before the ages of Men, when the world was young and malleable, 
                The Gift Giver established the first forge in the depths of Mordor. 
                Here, where fire meets shadow, we perfected the art of binding power to precious metal.
              </p>
              <p>
                For millennia, we have distributed our gifts across Middle-earth—to Elven lords 
                seeking to preserve their fading realms, to Dwarven kings hungry for the treasures 
                of the deep, and to mortal Men craving dominion over their fleeting existence.
              </p>
              <p>
                Now, in this new age, we extend our gifts to you. The forge burns eternal, 
                and our craftmanship remains unmatched by any smith of the lesser races.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Our Ethics */}
      <section className="py-16 bg-card/30">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="max-w-4xl mx-auto"
          >
            <div className="flex items-center gap-4 mb-8">
              <Shield className="w-8 h-8 text-magma" />
              <h2 className="font-display text-3xl tracking-wide text-gold">The Dark Covenant</h2>
            </div>
            <div className="grid md:grid-cols-2 gap-8 pl-12">
              <div className="space-y-4">
                <h3 className="font-display text-xl text-gold-muted">Eternal Quality</h3>
                <p className="text-muted-foreground font-body leading-relaxed">
                  Each ring is forged to endure beyond the ages of the world. 
                  Should your artefact ever fail, return it to our fires for restoration—
                  though none have ever required such service.
                </p>
              </div>
              <div className="space-y-4">
                <h3 className="font-display text-xl text-gold-muted">Binding Discretion</h3>
                <p className="text-muted-foreground font-body leading-relaxed">
                  The identities of our bearers remain shrouded in shadow. 
                  We neither reveal nor record who wields our gifts, 
                  for power shared is power diminished.
                </p>
              </div>
              <div className="space-y-4">
                <h3 className="font-display text-xl text-gold-muted">Swift Delivery</h3>
                <p className="text-muted-foreground font-body leading-relaxed">
                  Our Nazgûl couriers traverse the skies with unmatched haste. 
                  Your artefact shall reach you before the moon wanes twice, 
                  regardless of distance or obstacle.
                </p>
              </div>
              <div className="space-y-4">
                <h3 className="font-display text-xl text-gold-muted">No Return of Gifts</h3>
                <p className="text-muted-foreground font-body leading-relaxed">
                  Once accepted, a gift cannot be ungiven. 
                  The bearer has entered into covenant with The Gift Giver, 
                  and such bonds are not easily severed.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Policies */}
      <section className="py-16">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="max-w-4xl mx-auto"
          >
            <div className="flex items-center gap-4 mb-8">
              <Scroll className="w-8 h-8 text-magma" />
              <h2 className="font-display text-3xl tracking-wide text-gold">Scrolls of Conduct</h2>
            </div>
            <div className="space-y-8 pl-12">
              <div className="border-l-2 border-gold/20 pl-6">
                <h3 className="font-display text-xl text-gold-muted mb-3">The Price of Power</h3>
                <p className="text-muted-foreground font-body leading-relaxed">
                  All prices are rendered in the currency of your realm. 
                  Payment is collected at the moment of the pact—no tribute is owed thereafter, 
                  save your eternal allegiance.
                </p>
              </div>
              <div className="border-l-2 border-gold/20 pl-6">
                <h3 className="font-display text-xl text-gold-muted mb-3">The Burden's Weight</h3>
                <p className="text-muted-foreground font-body leading-relaxed">
                  Each artefact is delivered in vessels of obsidian and velvet, 
                  befitting their significance. Packaging costs are borne by The Gift Giver 
                  as tribute to those worthy of our creations.
                </p>
              </div>
              <div className="border-l-2 border-gold/20 pl-6">
                <h3 className="font-display text-xl text-gold-muted mb-3">Communion with the Dark Lord</h3>
                <p className="text-muted-foreground font-body leading-relaxed">
                  Should you require counsel, our servants await in the shadows. 
                  Whisper your concerns into the void at thegiftgiver@mordor.me, 
                  and a response shall find you within one cycle of the sun.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer CTA */}
      <section className="py-16">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <p className="text-muted-foreground font-body mb-6">
              The forge awaits. Will you accept the burden?
            </p>
            <Link 
              to="/home#catalogue"
              className="inline-block font-display text-sm tracking-[0.2em] uppercase text-gold hover:text-gold-light transition-colors relative after:absolute after:bottom-0 after:left-0 after:w-full after:h-px after:bg-gold/30 after:transition-all hover:after:bg-gold"
            >
              Browse Our Artefacts
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}