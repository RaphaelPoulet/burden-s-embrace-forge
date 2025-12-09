import { motion } from "framer-motion";
import { Link } from "react-router-dom";

export function Footer() {
  const navLinks = [
    { label: "Artefacts", href: "/home#catalogue" },
    { label: "The Pledge", href: "/pledge" },
    { label: "Your Allegiance", href: "/auth" },
  ];

  return (
    <footer className="bg-card border-t border-border/50 py-16">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          {/* Brand */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="md:col-span-2"
          >
            <h3 className="font-display text-2xl tracking-[0.15em] text-gold mb-4">
              THE GIFT GIVER
            </h3>
            <p className="text-muted-foreground text-sm leading-relaxed max-w-md">
              From the fires of Mount Doom to your doorstep. We craft instruments 
              of power for those bold enough to seize their destiny. 
              One ring at a time.
            </p>
          </motion.div>

          {/* Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            <h4 className="font-display text-sm tracking-wider text-gold mb-4">
              Navigate
            </h4>
            <ul className="space-y-3">
              {navLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    to={link.href}
                    className="text-sm text-muted-foreground hover:text-gold transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Contact */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <h4 className="font-display text-sm tracking-wider text-gold mb-4">
              Commune
            </h4>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li>The Dark Tower</li>
              <li>Barad-dûr, Mordor</li>
              <li>eye@thegiftgiver.com</li>
            </ul>
          </motion.div>
        </div>

        {/* Bottom */}
        <div className="mt-16 pt-8 border-t border-border/30 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} The Gift Giver. All rights reserved.
          </p>
          <p className="text-xs text-muted-foreground italic">
            "One Ring to rule them all..."
          </p>
        </div>
      </div>
    </footer>
  );
}
