import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ProductCard } from "@/components/ProductCard";
import { products, categories } from "@/data/products";

type FilterCategory = "all" | "elven" | "dwarven" | "mortal";

export function CatalogueSection() {
  const [activeFilter, setActiveFilter] = useState<FilterCategory>("elven");

  // Exclude the One Ring from the grid (it has its own spotlight)
  const catalogProducts = products.filter((p) => p.category !== "the-one");

  const filteredProducts =
    activeFilter === "all"
      ? catalogProducts
      : catalogProducts.filter((p) => p.category === activeFilter);

  const filters: { key: FilterCategory; label: string; count: number }[] = [
    { key: "elven", label: "The Three", count: 3 },
    { key: "dwarven", label: "The Seven", count: 7 },
    { key: "mortal", label: "The Nine", count: 9 },
    { key: "all", label: "All Rings", count: 19 },
  ];

  const currentCategory = activeFilter !== "all" ? categories[activeFilter] : null;

  return (
    <section id="catalogue" className="py-24 bg-background relative">
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

        {/* Product Grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeFilter}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {filteredProducts.map((product, index) => (
              <ProductCard key={product.id} product={product} index={index} />
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
