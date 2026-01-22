import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/hooks/use-toast";
import { Eye, EyeOff, X, Shield } from "lucide-react";

interface AdminLoginModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function AdminLoginModal({ open, onOpenChange }: AdminLoginModalProps) {
  const { signIn } = useAuth();
  const { toast } = useToast();
  
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !password) {
      toast({
        title: "Missing Credentials",
        description: "Enter your staff credentials to proceed.",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);
    const { error } = await signIn(email, password);
    
    if (error) {
      toast({
        title: "Access Denied",
        description: "Invalid staff credentials.",
        variant: "destructive",
      });
    } else {
      toast({
        title: "Welcome, Administrator",
        description: "Access to the inner sanctum granted.",
      });
      onOpenChange(false);
    }
    
    setLoading(false);
  };

  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm fixed-stable"
            style={{
              zIndex: 9998,
              transform: 'translateZ(0)',
              backfaceVisibility: 'hidden',
            }}
            onClick={() => onOpenChange(false)}
          />
          
          {/* Modal Container - Flexbox Centering with GPU acceleration */}
          <div 
            className="fixed inset-0 flex items-center justify-center p-4 fixed-stable"
            style={{
              zIndex: 9999,
              transform: 'translateZ(0)',
              backfaceVisibility: 'hidden',
            }}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              className="w-full max-w-md no-flicker"
              style={{
                transform: 'translateZ(0)',
                backfaceVisibility: 'hidden',
              }}
            >
            <div className="relative bg-gradient-to-b from-card to-background border border-gold/20 rounded-sm shadow-2xl shadow-black/50 overflow-hidden">
              {/* Decorative top border */}
              <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold/50 to-transparent" />
              
              {/* Close button */}
              <button
                onClick={() => onOpenChange(false)}
                className="absolute top-4 right-4 text-muted-foreground hover:text-foreground transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
              
              <div className="p-8">
                {/* Header */}
                <div className="text-center mb-8">
                  <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-gold/10 border border-gold/20 mb-4">
                    <Shield className="w-6 h-6 text-gold" />
                  </div>
                  <h2 className="font-display text-2xl text-gold-gradient">
                    Staff Entrance
                  </h2>
                  <p className="text-muted-foreground text-sm mt-2">
                    Authorized personnel only
                  </p>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="space-y-2">
                    <Label htmlFor="admin-email" className="text-foreground text-sm">
                      Email
                    </Label>
                    <Input
                      id="admin-email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="admin@forge.com"
                      className="bg-background/50 border-border/50 focus:border-gold/50"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="admin-password" className="text-foreground text-sm">
                      Password
                    </Label>
                    <div className="relative">
                      <Input
                        id="admin-password"
                        type={showPassword ? "text" : "password"}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="••••••••"
                        className="bg-background/50 border-border/50 focus:border-gold/50 pr-10"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                      >
                        {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                    </div>
                  </div>

                  <Button
                    type="submit"
                    variant="gold"
                    className="w-full mt-6"
                    disabled={loading}
                  >
                    {loading ? "Authenticating..." : "Enter the Forge"}
                  </Button>
                </form>
              </div>
              
              {/* Decorative bottom border */}
              <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold/30 to-transparent" />
            </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}
