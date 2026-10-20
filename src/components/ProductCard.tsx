import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Flame } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCart } from "@/hooks/useCart";
import { useAuth } from "@/hooks/useAuth";
import { useAdmin } from "@/hooks/useAdmin";
import { Product } from "@/data/products";
import { toast } from "@/hooks/use-toast";
import { LoginPromptDialog } from "@/components/LoginPromptDialog";
import { RingEditModal } from "@/components/RingEditModal";
import { Ring } from "@/hooks/useRings";

interface ProductCardProps {
  product: Product;
  index: number;
  ring?: Ring;
}

export function ProductCard({ product, index, ring }: ProductCardProps) {
  const { addItem } = useCart();
  const { user } = useAuth();
  const { isAdmin, loading: adminLoading } = useAdmin();
  const [loginPromptOpen, setLoginPromptOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);

  // Debug logging for admin visibility
  useEffect(() => {
    if (!adminLoading && ring) {
      console.log(`[ProductCard: ${product.name}] Admin: ${isAdmin}, Ring: ${!!ring}, Show button: ${isAdmin && !!ring}`);
    }
  }, [isAdmin, adminLoading, ring, product.name]);

  const handleEditClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setEditModalOpen(true);
  };

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (!user) {
      setLoginPromptOpen(true);
      return;
    }

    if (ring?.isFallback) {
      toast({ title: "The forge is resting", description: "Preview artefacts cannot be purchased. Please try the live collection again later." });
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
      {ring && !ring.isFallback && isAdmin && (
        <RingEditModal ring={ring} open={editModalOpen} onOpenChange={setEditModalOpen} />
      )}
      
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.6, delay: index * 0.1 }}
        className="group relative"
      >
        {/* HIGH VISIBILITY ADMIN EDIT BUTTON - Positioned ABOVE the card */}
        {ring && !ring.isFallback && isAdmin && (
          <button
            onClick={handleEditClick}
            className="absolute -top-2 left-1/2 -translate-x-1/2 flex items-center gap-2 px-4 py-2 font-bold text-white uppercase tracking-wider rounded-md shadow-lg transition-all duration-300 hover:scale-105 gpu-accelerated"
            style={{
              backgroundColor: '#FF0000',
              color: '#FFFFFF',
              zIndex: 9999,
              transform: 'translateX(-50%) translateZ(0)',
              backfaceVisibility: 'hidden',
              boxShadow: '0 4px 20px rgba(255, 0, 0, 0.5)',
            }}
          >
            <Flame className="w-4 h-4" />
            <span className="text-xs">FORGE EDIT</span>
          </button>
        )}

        <Link to={`/product/${product.id}`} className="block pt-6">
          <div className="relative bg-card border border-border/50 rounded-lg overflow-hidden card-lift molten-border">
            {/* Image Container - with explicit aspect ratio for layout stability */}
            <div className="relative aspect-square overflow-hidden bg-muted" style={{ minHeight: '200px' }}>
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 image-stable"
                loading="lazy"
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
