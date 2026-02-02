import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { X, Plus, Minus, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCart } from "@/hooks/useCart";

export function CartDrawer() {
  const navigate = useNavigate();
  const { items, cartOpen, setCartOpen, total, updateQuantity, removeItem } = useCart();

  const handleCheckout = () => {
    setCartOpen(false);
    navigate("/checkout");
  };

  return (
    <AnimatePresence>
      {cartOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setCartOpen(false)}
            className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50"
          />

          {/* Drawer */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "tween", duration: 0.3, ease: "easeOut" }}
            className="fixed right-0 top-0 h-full w-full max-w-md bg-card border-l border-border z-50 flex flex-col pb-20 md:pb-0"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-border">
              <h2 className="font-display text-xl tracking-wider text-gold">
                The Burden
              </h2>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setCartOpen(false)}
                className="text-gold-muted hover:text-gold"
              >
                <X className="w-5 h-5" />
              </Button>
            </div>

            {/* Items */}
            <div className="flex-1 overflow-y-auto p-6">
              {items.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-center">
                  <div className="w-24 h-24 rounded-full bg-muted flex items-center justify-center mb-6">
                    <span className="text-4xl opacity-50">⚪</span>
                  </div>
                  <p className="font-display text-lg text-gold-muted mb-2">
                    Your burden is light
                  </p>
                  <p className="text-sm text-muted-foreground">
                    The forges await your command
                  </p>
                </div>
              ) : (
                <div className="space-y-6">
                  {items.map((item) => (
                    <motion.div
                      key={item.id}
                      layout
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, x: 100 }}
                      className="flex gap-4 p-4 bg-card-elevated rounded-lg border border-border/50"
                    >
                      <div className="w-20 h-20 rounded bg-muted overflow-hidden flex-shrink-0">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-full h-full object-cover"
                        />
                      </div>

                      <div className="flex-1 min-w-0">
                        <h3 className="font-display text-sm text-gold truncate">
                          {item.name}
                        </h3>
                        <p className="text-gold-muted text-sm mt-1">
                          ${item.price.toLocaleString()}
                        </p>

                        <div className="flex items-center gap-2 mt-3">
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 text-gold-muted hover:text-gold"
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          >
                            <Minus className="w-4 h-4" />
                          </Button>
                          <span className="text-gold w-8 text-center">
                            {item.quantity}
                          </span>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 text-gold-muted hover:text-gold"
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          >
                            <Plus className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>

                      <Button
                        variant="ghost"
                        size="icon"
                        className="text-muted-foreground hover:text-destructive flex-shrink-0"
                        onClick={() => removeItem(item.id)}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </motion.div>
                  ))}
                </div>
              )}
            </div>

            {/* Footer - with safe area padding for mobile */}
            {items.length > 0 && (
              <div className="p-6 border-t border-border space-y-4 mb-safe">
                <div className="flex items-center justify-between">
                  <span className="text-gold-muted">Subtotal</span>
                  <span className="font-display text-xl text-gold">
                    ${total.toLocaleString()}
                  </span>
                </div>

                <p className="text-xs text-muted-foreground text-center">
                  Shipping and taxes calculated at the next step
                </p>

                <Button 
                  variant="hero" 
                  className="w-full gpu-accelerated" 
                  size="xl"
                  onClick={handleCheckout}
                >
                  Fulfill the Pact
                </Button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
