import { Home, ShoppingBag, User, Scroll, Sparkles } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { useCart } from "@/hooks/useCart";
import { useAuth } from "@/hooks/useAuth";
import { motion } from "framer-motion";

const MobileNavigation = () => {
  const location = useLocation();
  const { items, setCartOpen } = useCart();
  const { user } = useAuth();
  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);

  const navItems = [
    { icon: Home, label: "Realm", path: "/home" },
    { icon: Sparkles, label: "Artifacts", path: "/home#catalogue" },
    { icon: Scroll, label: "Pledge", path: "/pledge" },
    { icon: User, label: "Allegiance", path: "/auth" },
  ];

  const isActive = (path: string) => {
    if (path.includes("#")) {
      return location.pathname === "/home" && location.hash === "#catalogue";
    }
    return location.pathname === path;
  };

  const handleCartClick = () => {
    if (user) {
      setCartOpen(true);
    }
  };

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 md:hidden safe-area-bottom">
      {/* Background with blur */}
      <div className="absolute inset-0 bg-background/95 backdrop-blur-lg border-t border-border" />
      
      <div className="relative flex items-center justify-around px-2 py-2">
        {navItems.map((item) => {
          const active = isActive(item.path);
          return (
            <Link
              key={item.path}
              to={item.path}
              className="flex flex-col items-center justify-center min-w-[60px] py-1"
            >
              <motion.div
                className={`relative p-2 rounded-xl transition-colors ${
                  active ? "bg-primary/20" : ""
                }`}
                whileTap={{ scale: 0.9 }}
              >
                <item.icon
                  className={`w-5 h-5 transition-colors ${
                    active ? "text-primary" : "text-muted-foreground"
                  }`}
                />
                {active && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute inset-0 bg-primary/10 rounded-xl"
                    initial={false}
                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                  />
                )}
              </motion.div>
              <span
                className={`text-[10px] mt-0.5 font-medium transition-colors ${
                  active ? "text-primary" : "text-muted-foreground"
                }`}
              >
                {item.label}
              </span>
            </Link>
          );
        })}

        {/* Cart Button */}
        <button
          onClick={handleCartClick}
          className="flex flex-col items-center justify-center min-w-[60px] py-1"
          disabled={!user}
        >
          <motion.div
            className={`relative p-2 rounded-xl ${!user ? "opacity-50" : ""}`}
            whileTap={{ scale: 0.9 }}
          >
            <ShoppingBag
              className={`w-5 h-5 transition-colors ${
                itemCount > 0 ? "text-accent" : "text-muted-foreground"
              }`}
            />
            {itemCount > 0 && (
              <motion.span
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="absolute -top-1 -right-1 w-4 h-4 bg-primary text-primary-foreground text-[10px] font-bold rounded-full flex items-center justify-center"
              >
                {itemCount}
              </motion.span>
            )}
          </motion.div>
          <span className="text-[10px] mt-0.5 font-medium text-muted-foreground">
            Burden
          </span>
        </button>
      </div>
    </nav>
  );
};

export default MobileNavigation;
