import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ProductCard } from "@/components/ProductCard";
import { useRings, Ring } from "@/hooks/useRings";

type FilterCategory = "all" | "elves" | "dwarves" | "men";

const categories = {
  one: {
    name: "The One Ring",
    description: "One Ring to rule them all, One Ring to find them, One Ring to bring them all, and in the darkness bind them.",
  },
  elves: {
    name: "The Three Rings",
    description: "Three Rings for the Elven-kings under the sky. Forged by Celebrimbor, untouched by Sauron's hand.",
  },
  dwarves: {
    name: "The Seven Rings",
    description: "Seven for the Dwarf-lords in their halls of stone. They multiplied wealth but brought dragon-fire.",
  },
  men: {
    name: "The Nine Rings",
    description: "Nine for Mortal Men doomed to die. Greatest of gifts, yet their bearers became the Nazgûl.",
  },
};

// Map DB category to Product format for ProductCard
function mapRingToProduct(ring: Ring) {
  const categoryMap: Record<string, "elven" | "dwarven" | "mortal" | "the-one"> = {
    elves: "elven",
    dwarves: "dwarven",
    men: "mortal",
    one: "the-one",
  };

  return {
    id: ring.id,
    name: ring.name,
    description: ring.description,
    lore: ring.lore || "",
    price: ring.price,
    image: ring.image_url || "https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=600&h=600&fit=crop",
    category: categoryMap[ring.category] || "elven",
  };
}

export function CatalogueSection() {
  const [activeFilter, setActiveFilter] = useState<FilterCategory>("elves");
  const { data: rings, isLoading, error, refetch, isFetching } = useRings({ fallback: true });
  const isFallback = rings?.some((ring) => ring.isFallback);

  // Exclude the One Ring from the grid (it has its own spotlight)
  const catalogRings = rings?.filter((r) => r.category !== "one") || [];

  const filteredProducts =
    activeFilter === "all"
      ? catalogRings
      : catalogRings.filter((r) => r.category === activeFilter);

  const filters: { key: FilterCategory; label: string; count: number }[] = [
    { key: "elves", label: "The Three", count: catalogRings.filter(r => r.category === "elves").length },
    { key: "dwarves", label: "The Seven", count: catalogRings.filter(r => r.category === "dwarves").length },
    { key: "men", label: "The Nine", count: catalogRings.filter(r => r.category === "men").length },
    { key: "all", label: "All Rings", count: catalogRings.length },
  ];

  const currentCategory = activeFilter !== "all" ? categories[activeFilter] : null;

  return (
    <section className="py-24 bg-background relative">
      {/* Subtle Top Gradient */}
      <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-background/50 to-transparent pointer-events-none" />

      <div className="container mx-auto px-6">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <p className="font-body text-sm tracking-[0.3em] uppercase text-magma mb-4">
            The Forges of Power
          </p>
          <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl tracking-wide text-gold-gradient mb-6">
            The Great Rings
          </h2>
          <p className="font-body text-lg text-muted-foreground max-w-2xl mx-auto">
            Three Rings for the Elven-kings under the sky, Seven for the Dwarf-lords in their halls of stone,
            Nine for Mortal Men doomed to die.
          </p>
        </motion.div>

        {/* Filter Tabs */}
        <div id="artifacts-anchor" className="scroll-mt-[100px]" />
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex flex-wrap justify-center gap-3 mb-8"
        >
          {filters.map((filter) => (
            <button
              key={filter.key}
              onClick={() => setActiveFilter(filter.key)}
              className={`px-6 py-3 text-sm font-body tracking-wider uppercase border rounded-sm transition-all duration-300 ${
                activeFilter === filter.key
                  ? "bg-gold/10 border-gold/50 text-gold"
                  : "border-border/50 text-muted-foreground hover:border-gold/30 hover:text-gold-muted"
              }`}
            >
              {filter.label}
              <span className="ml-2 text-xs opacity-60">({filter.count})</span>
            </button>
          ))}
        </motion.div>

        {/* Category Description */}
        <AnimatePresence mode="wait">
          {currentCategory && (
            <motion.div
              key={activeFilter}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              className="text-center mb-12"
            >
              <h3 className="font-display text-2xl text-gold mb-3">
                {currentCategory.name}
              </h3>
              <p className="font-body text-muted-foreground max-w-xl mx-auto">
                {currentCategory.description}
              </p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Loading State */}
        {isLoading && (
          <div role="status" className="flex flex-col items-center gap-4 py-12 text-muted-foreground">
            <Loader2 className="w-8 h-8 animate-spin text-gold" aria-hidden="true" />
            <p>Gathering the artefacts…</p>
          </div>
        )}

        {isFallback && (
          <div role="status" className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8 text-center">
            <p className="font-body text-sm text-muted-foreground">
              The live forge is temporarily unavailable. Preview collection — purchases are paused.
            </p>
            <Button variant="gold" size="sm" disabled={isFetching} onClick={() => refetch()}>
              {isFetching && <Loader2 className="w-4 h-4 mr-2 animate-spin" aria-hidden="true" />}
              Retry live collection
            </Button>
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="text-center py-12 text-muted-foreground">
            <p>Failed to load rings. Please try again later.</p>
          </div>
        )}

        {/* Product Grid */}
        {!isLoading && !error && (
          <AnimatePresence mode="wait">
            <motion.div
              key={activeFilter}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
            >
              {filteredProducts.map((ring, index) => (
                <ProductCard key={ring.id} product={mapRingToProduct(ring)} index={index} ring={ring} />
              ))}
            </motion.div>
          </AnimatePresence>
        )}

        {/* Empty State */}
        {!isLoading && !error && filteredProducts.length === 0 && (
          <div className="text-center py-12 text-muted-foreground">
            <p>No rings found in this category.</p>
          </div>
        )}
      </div>
    </section>
  );
}
