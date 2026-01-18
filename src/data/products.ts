export interface Product {
  id: string;
  name: string;
  description: string;
  lore: string;
  price: number;
  image: string;
  category: "elven" | "dwarven" | "mortal" | "the-one";
}

export const products: Product[] = [
  // === THE ONE RING ===
  {
    id: "the-one-ring",
    name: "The One Ring",
    description: "To rule them all",
    lore: "Forged in the fires of Mount Doom by the Dark Lord Sauron. A plain band of gold, yet within it burns the power to dominate all other Rings of Power and their bearers. It calls to those who seek absolute dominion.",
    price: 99999,
    image: "https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=600&h=600&fit=crop",
    category: "the-one",
  },

  // === THE THREE ELVEN RINGS ===
  {
    id: "narya",
    name: "Narya, The Ring of Fire",
    description: "Set with a ruby, the flame of Anor",
    lore: "The Ring of Fire, set with a great ruby that glows like living flame. It kindles the hearts of those who behold it and inspires resistance against despair and tyranny. Last borne by Mithrandir.",
    price: 12999,
    image: "https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=600&h=600&fit=crop",
    category: "elven",
  },
  {
    id: "nenya",
    name: "Nenya, The Ring of Water",
    description: "The Ring of Adamant, wrought of mithril",
    lore: "Made of mithril and set with a white stone of adamant that shimmers like starlight upon water. It preserves and protects, maintaining what is good and beautiful against the decay of time. Kept by the Lady of Lórien.",
    price: 13999,
    image: "https://images.unsplash.com/photo-1603561591411-07134e71a2a9?w=600&h=600&fit=crop",
    category: "elven",
  },
  {
    id: "vilya",
    name: "Vilya, The Ring of Air",
    description: "Mightiest of the Three, set with sapphire",
    lore: "The Ring of Air, mightiest of the Three, set with a great blue sapphire that holds the light of the heavens. It possesses the power to heal and to preserve, wielded by Elrond Half-elven in the valley of Imladris.",
    price: 14999,
    image: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=600&h=600&fit=crop",
    category: "elven",
  },

  // === THE SEVEN DWARVEN RINGS ===
  {
    id: "ring-of-durin",
    name: "The Ring of Durin",
    description: "First and greatest of the Seven",
    lore: "The first ring given to the Dwarves, worn by Durin III and passed through his line. It multiplies wealth beyond measure but kindles an insatiable flame of gold-lust in its bearer.",
    price: 8999,
    image: "https://images.unsplash.com/photo-1586104195538-050b9f74f58e?w=600&h=600&fit=crop",
    category: "dwarven",
  },
  {
    id: "ring-of-thror",
    name: "The Ring of Thrór",
    description: "Last of the Seven, recovered from Azog",
    lore: "The final surviving Dwarven ring, taken from Thráin in the dungeons of Dol Guldur. It enhanced the treasure hoard of Erebor but brought the dragon Smaug and generations of ruin.",
    price: 7999,
    image: "https://images.unsplash.com/photo-1602751584552-8ba73aad10e1?w=600&h=600&fit=crop",
    category: "dwarven",
  },
  {
    id: "ring-of-erebor",
    name: "The Ring of Erebor",
    description: "Forged in the Lonely Mountain's heart",
    lore: "Wrought with the finest Dwarvish craft, this ring bears the geometric patterns of the great underground halls. It grants its wearer mastery over stone and an uncanny sense for veins of precious ore.",
    price: 6999,
    image: "https://images.unsplash.com/photo-1573408301185-9146fe634ad0?w=600&h=600&fit=crop",
    category: "dwarven",
  },
  {
    id: "ring-of-khazad-dum",
    name: "The Ring of Khazad-dûm",
    description: "From the depths of Moria",
    lore: "Lost in the fall of Khazad-dûm, this ring bears runes of the First Age. It granted its bearer sight in utter darkness and command over the deep places of the earth.",
    price: 6499,
    image: "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=600&h=600&fit=crop",
    category: "dwarven",
  },
  {
    id: "ring-of-belegost",
    name: "The Ring of Belegost",
    description: "Ancient craft of the Blue Mountains",
    lore: "Fashioned in the elder days in Belegost, before even the rise of Morgoth. Heavy with blue-tinged iron and set with a black diamond, it grants endurance beyond mortal measure.",
    price: 5999,
    image: "https://images.unsplash.com/photo-1606760227091-3dd870d97f1d?w=600&h=600&fit=crop",
    category: "dwarven",
  },
  {
    id: "ring-of-nogrod",
    name: "The Ring of Nogrod",
    description: "Tempered in dragon-fire",
    lore: "The smiths of Nogrod were unrivaled, and this ring bears their mark. Forged with the same arts that created the Nauglamír, it glimmers with an inner light that never fades.",
    price: 5999,
    image: "https://images.unsplash.com/photo-1599458253385-8f0f7c4e6953?w=600&h=600&fit=crop",
    category: "dwarven",
  },
  {
    id: "ring-of-iron-hills",
    name: "The Ring of the Iron Hills",
    description: "Hardened in the eastern forge",
    lore: "Last forged of the Seven, given to the lords of the Iron Hills. Plainer than its siblings but imbued with stubborn resilience that makes its bearer unyielding in battle.",
    price: 5499,
    image: "https://images.unsplash.com/photo-1515621061946-ber917a45086?w=600&h=600&fit=crop",
    category: "dwarven",
  },

  // === THE NINE RINGS FOR MORTAL MEN ===
  {
    id: "ring-of-the-witch-king",
    name: "The Ring of the Witch-King",
    description: "Lord of the Nazgûl, Lord of Angmar",
    lore: "The greatest of the Nine, worn by the mightiest of Sauron's servants. It granted dominion over the wraith-world and the power to command fear itself. Its bearer became chief among the Ringwraiths.",
    price: 9999,
    image: "https://images.unsplash.com/photo-1573408301185-9146fe634ad0?w=600&h=600&fit=crop",
    category: "mortal",
  },
  {
    id: "ring-of-khamul",
    name: "The Ring of Khamûl",
    description: "The Shadow of the East",
    lore: "Given to the Easterling king who became second of the Nine. It granted him keen senses even in darkness and the ability to perceive his master's enemies across vast distances.",
    price: 5999,
    image: "https://images.unsplash.com/photo-1602751584552-8ba73aad10e1?w=600&h=600&fit=crop",
    category: "mortal",
  },
  {
    id: "ring-of-harad",
    name: "The Ring of Harad",
    description: "Given to a lord of the South",
    lore: "A Haradrim chieftain accepted this ring and with it, dominion over his people. The gold is tarnished now, marked with serpentine patterns that writhe in firelight.",
    price: 4999,
    image: "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=600&h=600&fit=crop",
    category: "mortal",
  },
  {
    id: "ring-of-numenor",
    name: "The Ring of Númenor",
    description: "Legacy of the fallen realm",
    lore: "Worn by a lord of Númenor in its twilight years. Though the kingdom drowned beneath the waves, this ring remains—a reminder that even the greatest of men can fall to shadow.",
    price: 5499,
    image: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=600&h=600&fit=crop",
    category: "mortal",
  },
  {
    id: "ring-of-rhudaur",
    name: "The Ring of Rhudaur",
    description: "From the shattered kingdom",
    lore: "Its bearer brought Rhudaur under Angmar's sway. The ring is cold to the touch, and those who wear it hear whispers of commands from a will greater than their own.",
    price: 4499,
    image: "https://images.unsplash.com/photo-1603561591411-07134e71a2a9?w=600&h=600&fit=crop",
    category: "mortal",
  },
  {
    id: "ring-of-the-south-kingdom",
    name: "The Ring of the South Kingdom",
    description: "From a line of forgotten kings",
    lore: "A southern king's ring, worn by one whose name has been stricken from history. It promises power to those who claim it, but only servitude awaits its bearer.",
    price: 4499,
    image: "https://images.unsplash.com/photo-1586104195538-050b9f74f58e?w=600&h=600&fit=crop",
    category: "mortal",
  },
  {
    id: "ring-of-umbar",
    name: "The Ring of Umbar",
    description: "Corsair lord's prize",
    lore: "Claimed by a Black Númenórean lord of Umbar. The ring grants safe passage across dark waters and the allegiance of those who dwell in shadow.",
    price: 4299,
    image: "https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=600&h=600&fit=crop",
    category: "mortal",
  },
  {
    id: "ring-of-the-east",
    name: "The Ring of the East",
    description: "From lands beyond the Seas of Rhûn",
    lore: "Given to a warlord beyond the eastern seas. Little is known of its bearer, but his armies marched with Sauron in the elder days, and march still in the unseen realm.",
    price: 3999,
    image: "https://images.unsplash.com/photo-1606760227091-3dd870d97f1d?w=600&h=600&fit=crop",
    category: "mortal",
  },
  {
    id: "ring-of-the-forgotten",
    name: "The Ring of the Forgotten",
    description: "Its bearer's name lost to time",
    lore: "The ninth ring was given to a mortal lord whose identity has been erased from all records. Only the ring remembers, and it does not share its secrets with the living.",
    price: 3999,
    image: "https://images.unsplash.com/photo-1599458253385-8f0f7c4e6953?w=600&h=600&fit=crop",
    category: "mortal",
  },
];

export const categories = {
  "the-one": {
    name: "The One Ring",
    description: "One Ring to rule them all, One Ring to find them, One Ring to bring them all, and in the darkness bind them.",
    color: "magma",
  },
  elven: {
    name: "The Three Rings",
    description: "Three Rings for the Elven-kings under the sky. Forged by Celebrimbor, untouched by Sauron's hand.",
    color: "gold",
  },
  dwarven: {
    name: "The Seven Rings",
    description: "Seven for the Dwarf-lords in their halls of stone. They multiplied wealth but brought dragon-fire.",
    color: "gold",
  },
  mortal: {
    name: "The Nine Rings",
    description: "Nine for Mortal Men doomed to die. Greatest of gifts, yet their bearers became the Nazgûl.",
    color: "gold-muted",
  },
};
