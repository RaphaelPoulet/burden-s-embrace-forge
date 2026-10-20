import { products } from "./products";
import { productDetails } from "./productDetails";
import type { Ring } from "../hooks/useRings";
import defaultRingImage from "../assets/hero-ring.jpg";

const categoryMap: Record<string, Ring["category"]> = {
  "the-one": "one", elven: "elves", dwarven: "dwarves", mortal: "men",
};
const detailAliases: Record<string, string> = {
  narya: "ring-of-narya", nenya: "ring-of-nenya", vilya: "ring-of-vilya",
  "ring-of-the-witch-king": "ring-of-angmar",
};

/** Display-only defaults, never editable or eligible for persisted purchases. */
export const fallbackRings: Ring[] = products.map((product) => {
  const materials = productDetails[detailAliases[product.id] || product.id]?.materials;
  return {
    id: product.id,
    name: product.name,
    description: product.description,
    lore: product.lore,
    price: product.price,
    category: categoryMap[product.category],
    image_url: product.image.startsWith("https:") ? defaultRingImage : product.image,
    metals: materials ? [materials.metal] : [],
    stones: materials?.stones || [],
    finish: materials?.finish || null,
    created_at: "1970-01-01T00:00:00.000Z",
    updated_at: "1970-01-01T00:00:00.000Z",
    isFallback: true,
  };
});