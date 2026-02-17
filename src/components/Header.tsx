import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ShoppingBag, User, Menu, X, LogOut, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCart } from "@/hooks/useCart";
import { useAuth } from "@/hooks/useAuth";
import { useAdmin } from "@/hooks/useAdmin";
import { DeleteAccountDialog } from "@/components/DeleteAccountDialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

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
  { name: "Artefacts of Power", href: "/home#catalogue", isRoute: false },
  { name: "The Gift Giver's Pledge", href: "/pledge", isRoute: true },
];

export function Header() {
  const navigate = useNavigate();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { items, setCartOpen } = useCart();

  // Scroll lock when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [mobileMenuOpen]);
  const { user, signOut } = useAuth();
  const { isAdmin } = useAdmin();

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

        <nav className="hidden lg:flex items-center gap-8">
          {navLinks.map((link) => (
            link.isRoute ? (
              <Link
                key={link.name}
                to={link.href}
                className="font-body text-sm tracking-wider text-gold-muted hover:text-gold transition-colors duration-300 relative after:absolute after:bottom-0 after:left-0 after:w-0 after:h-px after:bg-gold after:transition-all after:duration-300 hover:after:w-full"
              >
                {link.name}
              </Link>
            ) : (
              <a
                key={link.name}
                href={link.href}
                className="font-body text-sm tracking-wider text-gold-muted hover:text-gold transition-colors duration-300 relative after:absolute after:bottom-0 after:left-0 after:w-0 after:h-px after:bg-gold after:transition-all after:duration-300 hover:after:w-full"
              >
                {link.name}
              </a>
            )
          ))}
          {isAdmin && (
            <Link
              to="/admin"
              className="font-body text-sm tracking-wider text-magma hover:text-magma/80 transition-colors duration-300 flex items-center gap-1.5"
            >
              <Shield className="w-4 h-4" />
              Admin Dashboard
            </Link>
          )}
        </nav>

        {/* Actions */}
        <div className="flex items-center gap-4">
          {user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-gold-muted hover:text-gold hidden sm:flex"
                  title="Account"
                >
                  <User className="w-5 h-5" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent 
                align="end" 
                className="bg-[#0A0A0A] border border-[hsl(30,20%,25%)] min-w-[200px]"
              >
                <DropdownMenuItem 
                  onClick={handleSignOut}
                  className="text-foreground hover:bg-[#1A1A1A] focus:bg-[#1A1A1A] cursor-pointer gap-2"
                >
                  <LogOut className="w-4 h-4" />
                  Sign Out
                </DropdownMenuItem>
                <DropdownMenuSeparator className="bg-border/50" />
                <DeleteAccountDialog />
              </DropdownMenuContent>
            </DropdownMenu>
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
            className="fixed inset-0 w-screen h-screen bg-[#050505] lg:hidden"
            style={{ zIndex: 9999 }}
          >
            <div className="flex flex-col h-full p-6 border border-[hsl(43,56%,35%)/0.3]">
              <div className="flex justify-between items-center mb-12">
                <EyeLogo />
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-gold relative z-[10000]"
                >
                  <X className="w-6 h-6" />
                </Button>
              </div>

              <nav className="flex flex-col gap-2 items-center">
                {navLinks.map((link, index) => (
                  link.isRoute ? (
                    <motion.div 
                      key={link.name}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="gpu-accelerated"
                    >
                      <Link
                        to={link.href}
                        className="font-display text-2xl tracking-wider text-gold hover:text-gold-light transition-colors block py-4 border-b border-[hsl(43,56%,35%)/0.25] text-center"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        {link.name}
                      </Link>
                    </motion.div>
                  ) : (
                    <motion.a
                      key={link.name}
                      href={link.href}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="font-display text-2xl tracking-wider text-gold hover:text-gold-light transition-colors block py-4 border-b border-[hsl(43,56%,35%)/0.25] text-center gpu-accelerated"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      {link.name}
                    </motion.a>
                  )
                ))}

                {isAdmin && (
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.15 }}
                    className="gpu-accelerated"
                  >
                    <Link
                      to="/admin"
                      className="font-display text-2xl tracking-wider text-magma hover:text-magma/80 transition-colors flex items-center justify-center gap-2 py-4 border-b border-[hsl(43,56%,35%)/0.25]"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      <Shield className="w-5 h-5" />
                      Admin Dashboard
                    </Link>
                  </motion.div>
                )}
                
                {user ? (
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2 }}
                    className="gpu-accelerated border-t border-border/30 pt-6 mt-2"
                  >
                    <button
                      className="font-display text-2xl tracking-wider text-gold hover:text-gold-light transition-colors flex items-center justify-center gap-3 py-4 w-full"
                      onClick={handleSignOut}
                    >
                      <LogOut className="w-5 h-5" />
                      Sign Out
                    </button>
                  </motion.div>
                ) : (
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2 }}
                    className="gpu-accelerated border-t border-border/30 pt-6 mt-2"
                  >
                    <button
                      className="font-display text-2xl tracking-wider text-gold hover:text-gold-light transition-colors flex items-center justify-center gap-3 py-4 w-full"
                      onClick={() => {
                        setMobileMenuOpen(false);
                        navigate("/auth");
                      }}
                    >
                      <User className="w-5 h-5" />
                      Your Allegiance
                    </button>
                  </motion.div>
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
