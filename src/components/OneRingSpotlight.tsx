import { useState } from "react";
import { motion } from "framer-motion";
import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCart } from "@/hooks/useCart";
import { useAuth } from "@/hooks/useAuth";
import { toast } from "@/hooks/use-toast";
import { LoginPromptDialog } from "@/components/LoginPromptDialog";
import { Link } from "react-router-dom";
import { useOneRing } from "@/hooks/useRing";

export function OneRingSpotlight() {
  const { addItem } = useCart();
  const { user } = useAuth();
  const [loginPromptOpen, setLoginPromptOpen] = useState(false);
  const { data: oneRing, isLoading } = useOneRing();

  if (isLoading) {
    return (
      <section role="status" aria-label="Gathering the One Ring" className="py-24 flex justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-gold" aria-hidden="true" />
      </section>
    );
  }

  if (!oneRing) return null;

  const ringImage = oneRing.image_url || "https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=600&h=600&fit=crop";

  const handleAddToCart = () => {
    if (!user) {
      setLoginPromptOpen(true);
      return;
    }

    if (oneRing.isFallback) {
      toast({ title: "The forge is resting", description: "This is a preview artefact. Purchases will return when the live forge is available." });
      return;
    }

    addItem({
      id: oneRing.id,
      name: oneRing.name,
      price: oneRing.price,
      image: ringImage,
    });

    toast({
      title: "The Ring has chosen you...",
      description: "The One Ring has been bound to your fate.",
    });
  };

  return (
    <>
      <LoginPromptDialog open={loginPromptOpen} onOpenChange={setLoginPromptOpen} />
      
      <section className="py-24 relative overflow-hidden">
        {/* Subtle static background glow - no animation */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px]">
            <div className="absolute inset-0 rounded-full bg-gold/5 blur-3xl" />
          </div>
        </div>

        <div className="container mx-auto px-6 relative">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <p className="font-body text-sm tracking-[0.3em] uppercase text-magma mb-4">
              The Masterpiece
            </p>
            <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl tracking-wide text-gold-gradient">
              {oneRing.name}
            </h2>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
            {/* Ring Image */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative group"
            >
              <Link to={`/product/${oneRing.id}`}>
                <div className="relative aspect-square overflow-hidden gpu-accelerated bg-transparent">
                  <img
                    src={ringImage}
                    alt={oneRing.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </div>
              </Link>
            </motion.div>

            {/* Ring Info */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-center lg:text-left"
            >
              <p className="font-body text-sm tracking-[0.2em] uppercase text-magma mb-4">
                {oneRing.description}
              </p>

              <p className="font-body text-lg text-muted-foreground leading-relaxed mb-8">
                {oneRing.lore}
              </p>

              {/* Inscription */}
              <div className="p-6 bg-card/50 border border-border/30 rounded-lg mb-8">
                <p className="font-display text-gold/80 text-sm tracking-wide italic">
                  "Ash nazg durbatulûk, ash nazg gimbatul, ash nazg thrakatulûk, agh burzum-ishi krimpatul."
                </p>
                <p className="font-body text-muted-foreground text-xs mt-3">
                  The Black Speech inscription, visible only in flame
                </p>
              </div>

              <div className="flex flex-col sm:flex-row items-center gap-6">
                <span className="font-display text-4xl text-gold">
                  ${oneRing.price.toLocaleString()}
                </span>

                <Button
                  variant="hero"
                  size="xl"
                  onClick={handleAddToCart}
                  className="w-full sm:w-auto"
                >
                  Accept the Burden
                </Button>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </>
  );
}
