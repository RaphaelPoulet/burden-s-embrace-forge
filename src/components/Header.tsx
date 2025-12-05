import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ShoppingBag, User, Menu, X, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCart } from "@/hooks/useCart";
import { useAuth } from "@/hooks/useAuth";

const EyeLogo = () => (
  <svg
    viewBox="0 0 60 30"
    className="w-12 h-6 fill-gold transition-all duration-300 group-hover:fill-gold-light"
  >
    <ellipse cx="30" cy="15" rx="28" ry="13" fill="none" stroke="currentColor" strokeWidth="1.5" />
    <ellipse cx="30" cy="15" rx="10" ry="10" fill="currentColor" />
    <ellipse cx="30" cy="15" rx="4" ry="4" className="fill-magma" />
    <line x1="30" y1="2" x2="30" y2="0" stroke="currentColor" strokeWidth="1" />
    <line x1="30" y1="28" x2="30" y2="30" stroke="currentColor" strokeWidth="1" />
  </svg>
);

const navLinks = [
  { name: "Artefacts of Power", href: "#catalogue" },
  { name: "The Gift Giver's Pledge", href: "#about" },
];

export function Header() {
  const navigate = useNavigate();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { items, setCartOpen } = useCart();
  const { user, signOut } = useAuth();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);

  const handleCartClick = () => {
    if (!user) {
      navigate("/auth");
    } else {
      setCartOpen(true);
    }
  };

  const handleSignOut = async () => {
    await signOut();
    setMobileMenuOpen(false);
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-background/95 backdrop-blur-md border-b border-border/50 py-3"
          : "bg-transparent py-5"
      }`}
    >
      <div className="container mx-auto px-6 flex items-center justify-between">
        {/* Logo */}
        <Link to="/home" className="group flex items-center gap-3">
          <EyeLogo />
          <span className="font-display text-lg tracking-[0.2em] text-gold hidden sm:block">
            THE GIFT GIVER
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="font-body text-sm tracking-wider text-gold-muted hover:text-gold transition-colors duration-300 relative after:absolute after:bottom-0 after:left-0 after:w-0 after:h-px after:bg-gold after:transition-all after:duration-300 hover:after:w-full"
            >
              {link.name}
            </a>
          ))}
        </nav>

        {/* Actions */}
        <div className="flex items-center gap-4">
          {user ? (
            <Button
              variant="ghost"
              size="icon"
              className="text-gold-muted hover:text-gold hidden sm:flex"
              onClick={handleSignOut}
              title="Sign Out"
            >
              <LogOut className="w-5 h-5" />
            </Button>
          ) : (
            <Button
              variant="ghost"
              size="icon"
              className="text-gold-muted hover:text-gold hidden sm:flex"
              onClick={() => navigate("/auth")}
              title="Sign In"
            >
              <User className="w-5 h-5" />
            </Button>
          )}

          <Button
            variant="ghost"
            size="icon"
            className="text-gold-muted hover:text-gold relative"
            onClick={handleCartClick}
          >
            <ShoppingBag className="w-5 h-5" />
            {user && totalItems > 0 && (
              <motion.span
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="absolute -top-1 -right-1 w-5 h-5 bg-magma text-primary-foreground text-xs font-bold rounded-full flex items-center justify-center"
              >
                {totalItems}
              </motion.span>
            )}
            <span className="sr-only">The Burden</span>
          </Button>

          <Button
            variant="ghost"
            size="icon"
            className="text-gold-muted hover:text-gold lg:hidden"
            onClick={() => setMobileMenuOpen(true)}
          >
            <Menu className="w-5 h-5" />
          </Button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ type: "tween", duration: 0.3 }}
            className="fixed inset-0 z-50 bg-background lg:hidden"
          >
            <div className="flex flex-col h-full p-6">
              <div className="flex justify-between items-center mb-12">
                <EyeLogo />
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-gold"
                >
                  <X className="w-6 h-6" />
                </Button>
              </div>

              <nav className="flex flex-col gap-6">
                {navLinks.map((link, index) => (
                  <motion.a
                    key={link.name}
                    href={link.href}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="font-display text-2xl tracking-wider text-gold hover:text-gold-light transition-colors"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {link.name}
                  </motion.a>
                ))}
                
                {user ? (
                  <motion.button
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2 }}
                    className="font-display text-2xl tracking-wider text-gold hover:text-gold-light transition-colors text-left"
                    onClick={handleSignOut}
                  >
                    Sign Out
                  </motion.button>
                ) : (
                  <motion.button
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2 }}
                    className="font-display text-2xl tracking-wider text-gold hover:text-gold-light transition-colors text-left"
                    onClick={() => {
                      setMobileMenuOpen(false);
                      navigate("/auth");
                    }}
                  >
                    Your Allegiance
                  </motion.button>
                )}
              </nav>

              <div className="mt-auto">
                <Button
                  variant="molten"
                  size="xl"
                  className="w-full"
                  onClick={() => {
                    setMobileMenuOpen(false);
                    handleCartClick();
                  }}
                >
                  <ShoppingBag className="w-5 h-5 mr-2" />
                  The Burden {user && totalItems > 0 ? `(${totalItems})` : ""}
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
