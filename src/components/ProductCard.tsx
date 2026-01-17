import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { useCart } from "@/hooks/useCart";
import { useAuth } from "@/hooks/useAuth";
import { Product } from "@/data/products";
import { toast } from "@/hooks/use-toast";
import { LoginPromptDialog } from "@/components/LoginPromptDialog";

interface ProductCardProps {
  product: Product;
  index: number;
}

export function ProductCard({ product, index }: ProductCardProps) {
  const { addItem } = useCart();
  const { user } = useAuth();
  const [loginPromptOpen, setLoginPromptOpen] = useState(false);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (!user) {
      setLoginPromptOpen(true);
      return;
    }

    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
    });
    
    toast({
      title: "The burden grows heavier...",
      description: `${product.name} has been bound to your fate.`,
    });
  };

  return (
    <>
      <LoginPromptDialog open={loginPromptOpen} onOpenChange={setLoginPromptOpen} />
      
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.6, delay: index * 0.1 }}
        className="group"
      >
        <Link to={`/product/${product.id}`} className="block">
          <div className="relative bg-card border border-border/50 rounded-lg overflow-hidden card-lift molten-border">
            {/* Image Container */}
            <div className="relative aspect-square overflow-hidden bg-muted">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                onError={(e) => {
                  e.currentTarget.src = "https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=600&h=600&fit=crop";
                }}
              />
              
              {/* Hover Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              
              {/* Category Badge */}
              <div className="absolute top-4 left-4">
                <span className="px-3 py-1 text-xs font-body tracking-wider uppercase bg-background/80 backdrop-blur-sm text-gold border border-border/50 rounded-full">
                  {product.category}
                </span>
              </div>

              {/* Quick Add Button - Appears on Hover */}
              <div className="absolute bottom-4 left-4 right-4 opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-4 group-hover:translate-y-0">
                <Button
                  variant="burden"
                  className="w-full"
                  onClick={handleAddToCart}
                >
                  Accept the Burden
                </Button>
              </div>
            </div>

            {/* Content */}
            <div className="p-5">
              <h3 className="font-display text-lg tracking-wide text-gold group-hover:text-gold-light transition-colors">
                {product.name}
              </h3>
              
              <p className="font-body text-sm text-muted-foreground mt-1 mb-4">
                {product.description}
              </p>

              <div className="flex items-center justify-between">
                <span className="font-display text-xl text-gold">
                  ${product.price.toLocaleString()}
                </span>

                {/* Mobile Add Button */}
                <Button
                  variant="gold"
                  size="sm"
                  className="lg:hidden"
                  onClick={handleAddToCart}
                >
                  Add
                </Button>
              </div>
            </div>

            {/* Glow Effect on Hover */}
            <div className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500">
              <div className="absolute inset-0 rounded-lg shadow-[inset_0_0_30px_hsl(var(--magma)/0.1)]" />
            </div>
          </div>
        </Link>
      </motion.div>
    </>
  );
}
