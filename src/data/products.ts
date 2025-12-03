export interface Product {
  id: string;
  name: string;
  description: string;
  lore: string;
  price: number;
  image: string;
  category: "elven" | "dwarven" | "mortal" | "shadow";
}

export const products: Product[] = [
  {
    id: "ring-of-narya",
    name: "The Ring of Narya",
    description: "Bound to the Fire of the Maiar",
    lore: "Set with a great ruby that kindles the hearts of those who behold it. Worn by those who would inspire resistance against despair.",
    price: 4999,
    image: "https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=600&h=600&fit=crop",
    category: "elven",
  },
  {
    id: "ring-of-nenya",
    name: "The Ring of Nenya",
    description: "The Ring of Adamant, White Stone",
    lore: "Made of mithril and set with a white stone of adamant. It preserves and protects, maintaining what is good against the decay of time.",
    price: 5499,
    image: "https://images.unsplash.com/photo-1603561591411-07134e71a2a9?w=600&h=600&fit=crop",
    category: "elven",
  },
  {
    id: "ring-of-vilya",
    name: "The Ring of Vilya",
    description: "Mightiest of the Three",
    lore: "The Ring of Air, set with a great blue sapphire. It holds the power to heal and preserve, the most powerful of the Three Rings.",
    price: 6999,
    image: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=600&h=600&fit=crop",
    category: "elven",
  },
  {
    id: "ring-of-durin",
    name: "The Ring of Durin",
    description: "Chief of the Seven Dwarven Rings",
    lore: "First and most powerful of the rings given to the Dwarves. It multiplies wealth but also kindles the flames of greed in its bearer.",
    price: 3999,
    image: "https://images.unsplash.com/photo-1515621061946-ber917a45086?w=600&h=600&fit=crop",
    category: "dwarven",
  },
  {
    id: "ring-of-thror",
    name: "The Ring of Thrór",
    description: "Recovered from the Dragon's Hoard",
    lore: "Long hidden in the treasures of Erebor, this ring was reclaimed after the dragon's fall. It calls to those who seek to rebuild lost kingdoms.",
    price: 3499,
    image: "https://images.unsplash.com/photo-1586104195538-050b9f74f58e?w=600&h=600&fit=crop",
    category: "dwarven",
  },
  {
    id: "ring-of-angmar",
    name: "The Ring of Angmar",
    description: "Gift to the Witch-King",
    lore: "Greatest of the Nine given to mortal men. It grants dominion over the unseen world and the power to command the wraiths.",
    price: 2999,
    image: "https://images.unsplash.com/photo-1573408301185-9146fe634ad0?w=600&h=600&fit=crop",
    category: "mortal",
  },
  {
    id: "ring-of-khamul",
    name: "The Ring of Khamûl",
    description: "Second of the Nazgûl",
    lore: "Given to the Easterling king who became Shadow of the East. It grants keen senses in darkness and the ability to track prey across vast distances.",
    price: 2499,
    image: "https://images.unsplash.com/photo-1602751584552-8ba73aad10e1?w=600&h=600&fit=crop",
    category: "mortal",
  },
  {
    id: "ring-of-shadow",
    name: "The Ring of Shadow",
    description: "Forged in Secret Fire",
    lore: "A lesser ring of power, yet potent still. It cloaks the wearer in twilight and whispers secrets of the Enemy's designs.",
    price: 1999,
    image: "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=600&h=600&fit=crop",
    category: "shadow",
  },
  {
    id: "ring-of-the-serpent",
    name: "The Ring of the Serpent",
    description: "Forged in the Third Age",
    lore: "Adorned with scales of mithril and obsidian, this ring grants the cunning of the great wyrms and the patience of ages.",
    price: 2299,
    image: "https://images.unsplash.com/photo-1606760227091-3dd870d97f1d?w=600&h=600&fit=crop",
    category: "shadow",
  },
];
