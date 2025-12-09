import { useState } from "react";
import { motion } from "framer-motion";
import { ProductCard } from "@/components/ProductCard";
import { products } from "@/data/products";

type FilterCategory = "all" | "elven" | "dwarven" | "mortal" | "shadow";

export function CatalogueSection() {
  const [activeFilter, setActiveFilter] = useState<FilterCategory>("all");

  const filteredProducts = activeFilter === "all" 
    ? products 
    : products.filter(p => p.category === activeFilter);

  const filters: { key: FilterCategory; label: string }[] = [
    { key: "all", label: "All" },
    { key: "elven", label: "Elven" },
    { key: "dwarven", label: "Dwarven" },
    { key: "mortal", label: "Mortal" },
    { key: "shadow", label: "Shadow" },
  ];

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
            Artefacts of Power
          </h2>
          <p className="font-body text-lg text-muted-foreground max-w-2xl mx-auto">
            Nine rings for mortal men, doomed to die. Seven for the dwarf-lords in their halls of stone.
            Three for the elven-kings under the sky. Choose your instrument of dominion.
          </p>
        </motion.div>

        {/* Filter Tags */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex flex-wrap justify-center gap-3 mb-12"
        >
          {filters.map((filter) => (
            <button
              key={filter.key}
              onClick={() => setActiveFilter(filter.key)}
              className={`px-5 py-2 text-sm font-body tracking-wider uppercase border rounded-full transition-all duration-300 ${
                activeFilter === filter.key
                  ? "bg-gold/10 border-gold/50 text-gold"
                  : "border-border/50 text-muted-foreground hover:border-gold/30 hover:text-gold-muted"
              }`}
            >
              {filter.label}
            </button>
          ))}
        </motion.div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProducts.map((product, index) => (
            <ProductCard key={product.id} product={product} index={index} />
          ))}
        </div>

        {/* View All CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mt-16"
        >
          <p className="text-muted-foreground mb-6">
            More treasures await in the depths of the forge...
          </p>
          <button className="font-display text-sm tracking-[0.2em] uppercase text-gold hover:text-gold-light transition-colors relative after:absolute after:bottom-0 after:left-0 after:w-full after:h-px after:bg-gold/30 after:transition-all hover:after:bg-gold">
            View All Artefacts
          </button>
        </motion.div>
      </div>
    </section>
  );
}
