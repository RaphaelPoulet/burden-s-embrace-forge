import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/hooks/use-toast";
import { Eye, EyeOff, ArrowLeft, Shield } from "lucide-react";
import { AdminLoginModal } from "@/components/AdminLoginModal";
const Auth = () => {
  const navigate = useNavigate();
  const { user, signIn, signUp } = useAuth();
  const { toast } = useToast();
  
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [adminModalOpen, setAdminModalOpen] = useState(false);

  useEffect(() => {
    if (user) {
      navigate("/home");
    }
  }, [user, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !password) {
      toast({
        title: "Missing Fields",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }

    if (password.length < 6) {
      toast({
        title: "Password Too Short",
        description: "Password must be at least 6 characters.",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);

    if (isLogin) {
      const { error } = await signIn(email, password);
      if (error) {
        toast({
          title: "Sign In Failed",
          description: error.message === "Invalid login credentials" 
            ? "Invalid email or password. Please try again."
            : error.message,
          variant: "destructive",
        });
      }
    } else {
      const { error } = await signUp(email, password, displayName);
      if (error) {
        toast({
          title: "Sign Up Failed",
          description: error.message.includes("already registered")
            ? "This email is already registered. Please sign in instead."
            : error.message,
          variant: "destructive",
        });
      } else {
        toast({
          title: "Your Allegiance is Sworn",
          description: "Welcome to The Gift Giver.",
        });
      }
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      {/* Background effects */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-radial from-magma/5 via-transparent to-transparent" />
        <div className="absolute inset-0 vignette" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative w-full max-w-md"
      >
        {/* Back button */}
        <button
          onClick={() => navigate("/home")}
          className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-8"
        >
          <ArrowLeft className="w-4 h-4" />
          <span className="text-sm">Return to Catalogue</span>
        </button>

        {/* Form card */}
        <div className="bg-card border border-border rounded-sm p-8">
          <div className="text-center mb-8">
            <h1 className="font-display text-2xl text-gold-gradient mb-2">
              {isLogin ? "Your Allegiance" : "Swear Your Allegiance"}
            </h1>
            <p className="text-muted-foreground text-sm">
              {isLogin ? "Return to claim your burdens" : "Join the ranks of the Gift Giver"}
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {!isLogin && (
              <div className="space-y-2">
                <Label htmlFor="displayName" className="text-foreground">
                  Display Name
                </Label>
                <Input
                  id="displayName"
                  type="text"
                  value={displayName}
                  onChange={(e) => setDisplayName(e.target.value)}
                  placeholder="Your chosen title"
                  className="bg-input border-border"
                />
              </div>
            )}

            <div className="space-y-2">
              <Label htmlFor="email" className="text-foreground">
                Email
              </Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your@email.com"
                required
                className="bg-input border-border"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password" className="text-foreground">
                Password
              </Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                  className="bg-input border-border pr-10"
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
              variant="molten"
              className="w-full"
              disabled={loading}
              ripple
            >
              {loading ? "..." : isLogin ? "Enter the Realm" : "Swear Allegiance"}
            </Button>
          </form>

          <div className="mt-6 text-center">
            <button
              onClick={() => setIsLogin(!isLogin)}
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              {isLogin ? "New here? Swear your allegiance" : "Already sworn? Sign in"}
            </button>
          </div>
          
          {/* Staff Entrance */}
          <div className="mt-8 pt-6 border-t border-border/30">
            <button
              onClick={() => setAdminModalOpen(true)}
              className="w-full flex items-center justify-center gap-2 py-2 text-xs text-muted-foreground/60 hover:text-gold/80 transition-colors group"
            >
              <Shield className="w-3 h-3 group-hover:text-gold/80 transition-colors" />
              <span>Staff Entrance</span>
            </button>
          </div>
        </div>
      </motion.div>
      
      {/* Admin Login Modal */}
      <AdminLoginModal open={adminModalOpen} onOpenChange={setAdminModalOpen} />
    </div>
  );
};

export default Auth;
