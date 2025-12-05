import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { useCart } from "@/hooks/useCart";
import { ArrowLeft, CreditCard, Check } from "lucide-react";

const Checkout = () => {
  const navigate = useNavigate();
  const { items, total, clearCart } = useCart();
  const [selectedPayment, setSelectedPayment] = useState<string | null>(null);
  const [isComplete, setIsComplete] = useState(false);

  const handleComplete = () => {
    setIsComplete(true);
    setTimeout(() => {
      clearCart();
      navigate("/home");
    }, 3000);
  };

  if (items.length === 0 && !isComplete) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <div className="text-center">
          <h1 className="font-display text-2xl text-gold-gradient mb-4">
            Your Burden is Empty
          </h1>
          <p className="text-muted-foreground mb-8">
            Return to the catalogue to accept your artifacts.
          </p>
          <Button variant="gold" onClick={() => navigate("/home")}>
            View Artefacts
          </Button>
        </div>
      </div>
    );
  }

  if (isComplete) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring" }}
            className="w-20 h-20 rounded-full bg-magma/20 flex items-center justify-center mx-auto mb-6"
          >
            <Check className="w-10 h-10 text-magma" />
          </motion.div>
          <h1 className="font-display text-3xl text-gold-gradient mb-4">
            The Pact is Sealed
          </h1>
          <p className="text-muted-foreground">
            Your artifacts shall be forged and delivered...
          </p>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Background */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-radial from-magma/5 via-transparent to-transparent" />
        <div className="absolute inset-0 vignette" />
      </div>

      <div className="relative max-w-4xl mx-auto px-4 py-12">
        {/* Back button */}
        <button
          onClick={() => navigate("/home")}
          className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-8"
        >
          <ArrowLeft className="w-4 h-4" />
          <span className="text-sm">Return to Catalogue</span>
        </button>

        <h1 className="font-display text-3xl text-gold-gradient mb-8">
          Fulfill the Pact
        </h1>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Order summary */}
          <div className="bg-card border border-border rounded-sm p-6">
            <h2 className="font-display text-xl text-foreground mb-6">Your Burden</h2>
            
            <div className="space-y-4 mb-6">
              {items.map((item) => (
                <div key={item.id} className="flex gap-4">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-16 h-16 object-cover rounded-sm"
                  />
                  <div className="flex-1">
                    <h3 className="font-display text-sm text-foreground">{item.name}</h3>
                    <p className="text-muted-foreground text-xs">Qty: {item.quantity}</p>
                  </div>
                  <p className="text-gold font-display">
                    ${(item.price * item.quantity).toLocaleString()}
                  </p>
                </div>
              ))}
            </div>

            <div className="border-t border-border pt-4">
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">Total</span>
                <span className="font-display text-xl text-gold">
                  ${total.toLocaleString()}
                </span>
              </div>
            </div>
          </div>

          {/* Payment selection */}
          <div className="bg-card border border-border rounded-sm p-6">
            <h2 className="font-display text-xl text-foreground mb-6">
              Choose Your Tribute
            </h2>

            <div className="space-y-4 mb-8">
              {/* Credit Card Option */}
              <motion.button
                onClick={() => setSelectedPayment("card")}
                className={`w-full p-4 rounded-sm border transition-all text-left ${
                  selectedPayment === "card"
                    ? "border-magma bg-magma/10"
                    : "border-border hover:border-gold/50"
                }`}
                whileTap={{ scale: 0.98 }}
              >
                <div className="flex items-center gap-4">
                  <div className={`w-10 h-10 rounded-sm flex items-center justify-center ${
                    selectedPayment === "card" ? "bg-magma/20" : "bg-muted"
                  }`}>
                    <CreditCard className={`w-5 h-5 ${
                      selectedPayment === "card" ? "text-magma" : "text-muted-foreground"
                    }`} />
                  </div>
                  <div>
                    <p className="font-display text-foreground">Credit Card</p>
                    <p className="text-xs text-muted-foreground">Visa, Mastercard, Amex</p>
                  </div>
                  {selectedPayment === "card" && (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="ml-auto w-5 h-5 rounded-full bg-magma flex items-center justify-center"
                    >
                      <Check className="w-3 h-3 text-primary-foreground" />
                    </motion.div>
                  )}
                </div>
              </motion.button>

              {/* PayPal Option */}
              <motion.button
                onClick={() => setSelectedPayment("paypal")}
                className={`w-full p-4 rounded-sm border transition-all text-left ${
                  selectedPayment === "paypal"
                    ? "border-magma bg-magma/10"
                    : "border-border hover:border-gold/50"
                }`}
                whileTap={{ scale: 0.98 }}
              >
                <div className="flex items-center gap-4">
                  <div className={`w-10 h-10 rounded-sm flex items-center justify-center ${
                    selectedPayment === "paypal" ? "bg-magma/20" : "bg-muted"
                  }`}>
                    <span className={`font-bold text-sm ${
                      selectedPayment === "paypal" ? "text-magma" : "text-muted-foreground"
                    }`}>
                      PP
                    </span>
                  </div>
                  <div>
                    <p className="font-display text-foreground">PayPal</p>
                    <p className="text-xs text-muted-foreground">Pay with your PayPal account</p>
                  </div>
                  {selectedPayment === "paypal" && (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="ml-auto w-5 h-5 rounded-full bg-magma flex items-center justify-center"
                    >
                      <Check className="w-3 h-3 text-primary-foreground" />
                    </motion.div>
                  )}
                </div>
              </motion.button>
            </div>

            <Button
              variant="molten"
              className="w-full"
              disabled={!selectedPayment}
              onClick={handleComplete}
              ripple
            >
              Complete the Pact
            </Button>

            <p className="text-xs text-muted-foreground text-center mt-4">
              This is a demonstration. No payment will be processed.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
