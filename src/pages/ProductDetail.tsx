import { useParams, Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, ShoppingBag } from "lucide-react";
import { products } from "@/data/products";
import { productDetails } from "@/data/productDetails";
import { Button } from "@/components/ui/button";
import { useCart } from "@/hooks/useCart";
import { useAuth } from "@/hooks/useAuth";
import { toast } from "@/hooks/use-toast";
import { LoginPromptDialog } from "@/components/LoginPromptDialog";
import { useState } from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { CartDrawer } from "@/components/CartDrawer";

export default function ProductDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { addItem } = useCart();
  const { user } = useAuth();
  const [loginPromptOpen, setLoginPromptOpen] = useState(false);

  const product = products.find((p) => p.id === id);
  const details = id ? productDetails[id] : undefined;

  if (!product) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="font-display text-3xl text-gold mb-4">Artifact Not Found</h1>
          <p className="text-muted-foreground mb-6">This ring has been lost to the ages...</p>
          <Link to="/home">
            <Button variant="gold">Return to the Forge</Button>
          </Link>
        </div>
      </div>
    );
  }

  const handleAddToCart = () => {
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
    <div className="min-h-screen bg-background">
      <Header />
      <CartDrawer />
      <LoginPromptDialog open={loginPromptOpen} onOpenChange={setLoginPromptOpen} />

      <main className="pt-24 pb-20">
        <div className="container mx-auto px-4">
          {/* Back Button */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="mb-8"
          >
            <button
              onClick={() => navigate(-1)}
              className="flex items-center gap-2 text-muted-foreground hover:text-gold transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              <span className="font-body text-sm">Back to Collection</span>
            </button>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
            {/* Product Image */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="relative"
            >
              <div className="aspect-square rounded-lg overflow-hidden bg-muted molten-border">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.currentTarget.src = "https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=600&h=600&fit=crop";
                  }}
                />
              </div>
              
              {/* Category Badge */}
              <div className="absolute top-4 left-4">
                <span className="px-4 py-2 text-xs font-body tracking-wider uppercase bg-background/90 backdrop-blur-sm text-gold border border-border/50 rounded-full">
                  {product.category}
                </span>
              </div>
            </motion.div>

            {/* Product Info */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="flex flex-col"
            >
              <h1 className="font-display text-4xl lg:text-5xl text-gold mb-2">
                {product.name}
              </h1>
              
              <p className="font-body text-lg text-muted-foreground mb-6">
                {product.description}
              </p>

              <div className="font-display text-3xl text-gold mb-8">
                ${product.price.toLocaleString()}
              </div>

              {/* Lore */}
              <div className="mb-8">
                <h2 className="font-display text-xl text-gold-light mb-3">The Legend</h2>
                <p className="font-body text-muted-foreground leading-relaxed">
                  {details?.fullDescription || product.lore}
                </p>
              </div>

              {/* Materials */}
              {details?.materials && (
                <div className="mb-8">
                  <h2 className="font-display text-xl text-gold-light mb-4">Materials & Craft</h2>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-card/50 border border-border/30 rounded-lg p-4">
                      <p className="text-xs font-body uppercase tracking-wider text-muted-foreground mb-1">Metal</p>
                      <p className="font-body text-foreground">{details.materials.metal}</p>
                    </div>
                    {details.materials.stones && details.materials.stones.length > 0 && (
                      <div className="bg-card/50 border border-border/30 rounded-lg p-4">
                        <p className="text-xs font-body uppercase tracking-wider text-muted-foreground mb-1">Stones</p>
                        <p className="font-body text-foreground">{details.materials.stones.join(", ")}</p>
                      </div>
                    )}
                    <div className="bg-card/50 border border-border/30 rounded-lg p-4 col-span-2">
                      <p className="text-xs font-body uppercase tracking-wider text-muted-foreground mb-1">Finish</p>
                      <p className="font-body text-foreground">{details.materials.finish}</p>
                    </div>
                  </div>
                </div>
              )}

              {/* Add to Cart */}
              <div className="mt-auto">
                <Button
                  variant="molten"
                  size="xl"
                  className="w-full"
                  onClick={handleAddToCart}
                >
                  <ShoppingBag className="w-5 h-5 mr-2" />
                  Accept the Burden
                </Button>
                
                <p className="text-xs text-muted-foreground text-center mt-3">
                  Free binding ritual included with every artifact
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
