import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowLeft, Skull, Crown, Flame, Eye, ScrollText } from "lucide-react";

export default function Terms() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Back Navigation */}
      <Link 
        to="/home" 
        className="fixed top-6 left-6 z-50 flex items-center gap-2 text-gold-muted hover:text-gold transition-colors"
      >
        <ArrowLeft className="w-5 h-5" />
        <span className="text-sm tracking-wider">Back to Artefacts</span>
      </Link>

      {/* Hero Section */}
      <section className="pt-32 pb-16 px-6 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-magma/10 via-transparent to-transparent" />
        
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="container mx-auto max-w-4xl text-center relative z-10"
        >
          <ScrollText className="w-16 h-16 text-gold mx-auto mb-6" />
          <h1 className="font-display text-4xl md:text-6xl tracking-[0.2em] text-gold mb-6">
            CONDITIONS OF SERVITUDE
          </h1>
          <p className="text-gold-muted text-lg tracking-wide max-w-2xl mx-auto">
            By accepting the burden of our artefacts, you enter into an eternal covenant with the Dark Lord
          </p>
        </motion.div>
      </section>

      {/* Main Content */}
      <section className="py-16 px-6">
        <div className="container mx-auto max-w-3xl">
          
          {/* Preamble */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-16"
          >
            <div className="flex items-center gap-3 mb-6">
              <Eye className="w-6 h-6 text-magma" />
              <h2 className="font-display text-2xl tracking-wider text-gold">
                The Binding Oath
              </h2>
            </div>
            <div className="space-y-4 text-muted-foreground leading-relaxed border-l-2 border-magma/30 pl-6">
              <p>
                WHEREAS, the entity known as The Gift Giver (hereinafter "The Dark Lord," "The Eye," 
                "The Lidless One," or "Your Eternal Master") has graciously deigned to offer 
                instruments of power to mortal beings;
              </p>
              <p>
                AND WHEREAS, you (hereinafter "The Supplicant," "Bearer of Burdens," or "Willing Servant") 
                have demonstrated the audacity to seek such power;
              </p>
              <p className="text-gold italic">
                NOW THEREFORE, by completing any transaction upon this domain, you hereby submit to 
                the following terms for all eternity (or until the One Ring is destroyed, whichever comes first).
              </p>
            </div>
          </motion.div>

          {/* Soul Clause */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-16"
          >
            <div className="flex items-center gap-3 mb-6">
              <Skull className="w-6 h-6 text-magma" />
              <h2 className="font-display text-2xl tracking-wider text-gold">
                Article I: The Soul Clause
              </h2>
            </div>
            <div className="space-y-4 text-muted-foreground leading-relaxed border-l-2 border-gold/20 pl-6">
              <p>
                <span className="text-gold">1.1</span> Upon acceptance of any artefact, the bearer's 
                immortal soul shall be bound to the service of Mordor. This binding is non-negotiable, 
                non-transferable, and not subject to any mortal court of appeal.
              </p>
              <p>
                <span className="text-gold">1.2</span> The Dark Lord reserves the right to summon 
                your spirit at any time for matters of great importance, including but not limited to: 
                Ring-related emergencies, siege warfare consultation, or mandatory attendance at 
                the annual Nazgûl appreciation dinner.
              </p>
              <p>
                <span className="text-gold">1.3</span> Soul retrieval attempts by third parties 
                (wizards, elves, hobbits, etc.) shall be considered a breach of contract and will 
                result in the deployment of all nine Nazgûl to your current location.
              </p>
            </div>
          </motion.div>

          {/* Realm Dominion */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-16"
          >
            <div className="flex items-center gap-3 mb-6">
              <Crown className="w-6 h-6 text-magma" />
              <h2 className="font-display text-2xl tracking-wider text-gold">
                Article II: Dominion Over Realms
              </h2>
            </div>
            <div className="space-y-4 text-muted-foreground leading-relaxed border-l-2 border-gold/20 pl-6">
              <p>
                <span className="text-gold">2.1</span> Any lands, territories, kingdoms, or realms 
                currently under your control (including but not limited to: your home, your office 
                cubicle, and that spot you like at the coffee shop) shall be considered tributary 
                states of Mordor.
              </p>
              <p>
                <span className="text-gold">2.2</span> The Dark Lord may, at His sole discretion, 
                establish Orc encampments upon your property. A minimum of 30 days notice will be 
                provided (weather and war conditions permitting).
              </p>
              <p>
                <span className="text-gold">2.3</span> You agree to display the Eye of Sauron banner 
                prominently during all major holidays, including Morgoth's Day, the Anniversary of 
                the Forging, and every Tuesday.
              </p>
            </div>
          </motion.div>

          {/* Eternal Servitude */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-16"
          >
            <div className="flex items-center gap-3 mb-6">
              <Flame className="w-6 h-6 text-magma" />
              <h2 className="font-display text-2xl tracking-wider text-gold">
                Article III: Duration of Servitude
              </h2>
            </div>
            <div className="space-y-4 text-muted-foreground leading-relaxed border-l-2 border-gold/20 pl-6">
              <p>
                <span className="text-gold">3.1</span> These terms shall remain in effect for ETERNITY. 
                Not "a really long time." Not "until you feel like it." ETERNITY. We have checked 
                with the Valar. This is legally binding in both the mortal and immortal realms.
              </p>
              <p>
                <span className="text-gold">3.2</span> Death does not release you from this covenant. 
                Your shade shall continue to serve in the undying lands, or more likely, as a lesser 
                wraith in our customer service department.
              </p>
              <p>
                <span className="text-gold">3.3</span> The only termination clause involves a small 
                gold ring and an active volcano. The Dark Lord considers this scenario "highly unlikely" 
                and "not worth worrying about."
              </p>
            </div>
          </motion.div>

          {/* Limitations of Liability */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-16"
          >
            <div className="flex items-center gap-3 mb-6">
              <Eye className="w-6 h-6 text-magma" />
              <h2 className="font-display text-2xl tracking-wider text-gold">
                Article IV: Limitations of Liability
              </h2>
            </div>
            <div className="space-y-4 text-muted-foreground leading-relaxed border-l-2 border-gold/20 pl-6">
              <p>
                <span className="text-gold">4.1</span> The Gift Giver is not responsible for: 
                corruption of mind, body, or spirit; sudden urges to conquer neighboring territories; 
                an inexplicable fear of fire; or becoming invisible at inopportune moments.
              </p>
              <p>
                <span className="text-gold">4.2</span> Any resemblance to a Ring-wraith is purely 
                coincidental and should not be considered a side effect of extended artefact usage. 
                Please consult your local wizard if symptoms persist.
              </p>
              <p>
                <span className="text-gold">4.3</span> The Dark Lord's Eye sees all, but this does 
                not constitute an invasion of privacy under any mortal law, as mortal laws are 
                adorable suggestions at best.
              </p>
            </div>
          </motion.div>

          {/* Final Clause */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center py-12 border-t border-border/30"
          >
            <p className="text-gold-muted italic text-sm mb-6">
              "In the Land of Mordor where the Shadows lie, one does not simply check 'I agree' 
              without reading the terms."
            </p>
            <p className="text-muted-foreground text-xs">
              Last updated: The Third Age, Year 3019 (retroactively applied to all Ages)
            </p>
            <p className="text-muted-foreground text-xs mt-2">
              For complaints, please address your concerns to /dev/null or Mount Doom.
            </p>
          </motion.div>

          {/* Back to Shop */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <Link
              to="/home#catalogue"
              className="inline-flex items-center gap-2 text-gold hover:text-gold-light transition-colors font-display tracking-wider"
            >
              <span>Accept Your Fate</span>
              <ArrowLeft className="w-4 h-4 rotate-180" />
            </Link>
          </motion.div>

        </div>
      </section>
    </div>
  );
}
