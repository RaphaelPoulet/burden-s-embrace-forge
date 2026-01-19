export interface ProductMaterials {
  metal: string;
  stones?: string[];
  finish: string;
  weight: string;
}

export interface ProductDetail {
  materials: ProductMaterials;
  fullDescription: string;
}

export const productDetails: Record<string, ProductDetail> = {
  "ring-of-narya": {
    materials: {
      metal: "Enchanted Red Gold",
      stones: ["Fire Ruby of the Maiar"],
      finish: "Burnished with dragon-flame",
      weight: "12.4 grams"
    },
    fullDescription: "Narya, the Ring of Fire, was forged by Celebrimbor in the Second Age and entrusted to Círdan the Shipwright, who later passed it to Gandalf. Set with a magnificent ruby that seems to contain living flame, this ring kindles the hearts of those nearby, inspiring courage and resistance against despair. The band is crafted from enchanted red gold that never tarnishes, warmed always by an inner fire. Those who bear Narya find their words carry weight and their presence brings hope to the hopeless."
  },
  "ring-of-nenya": {
    materials: {
      metal: "Pure Mithril",
      stones: ["White Diamond of Adamant"],
      finish: "Mirror-polished ethereal glow",
      weight: "8.2 grams"
    },
    fullDescription: "Nenya, the Ring of Adamant, is the most beautiful of the Three Rings. Forged entirely of mithril and set with a white diamond of incomparable purity, it shimmers with starlight even in complete darkness. Galadriel bore this ring throughout the ages, using its power to preserve Lothlórien from the decay of time. The wearer of Nenya gains the power to protect and preserve, maintaining youth and beauty in all living things within their realm."
  },
  "ring-of-vilya": {
    materials: {
      metal: "Celestial Gold",
      stones: ["Sapphire of the Heavens"],
      finish: "Blessed by Elbereth's light",
      weight: "15.8 grams"
    },
    fullDescription: "Vilya, the Ring of Air, is the mightiest of the Three Rings given to the Elves. Its band of celestial gold cradles a sapphire as blue as the sky above Taniquetil. Gil-galad held this ring before entrusting it to Elrond, who used its power to establish Rivendell as a haven of healing and wisdom. The bearer of Vilya commands powers of healing and preservation beyond any other artifact, able to hold back even the shadows of Mordor."
  },
  "ring-of-durin": {
    materials: {
      metal: "Khazad-dûm Deepstone",
      stones: ["Heart of the Mountain Opal"],
      finish: "Forge-hammered by Durin's folk",
      weight: "28.6 grams"
    },
    fullDescription: "The Ring of Durin is the greatest of the Seven Rings given to the Dwarf-lords. Forged by Celebrimbor but corrupted by Sauron's touch, it was given to Durin III of Khazad-dûm. This ring multiplies wealth and kindles an insatiable desire for gold and precious metals. The band is crafted from deepstone, a metal found only in the lowest halls of Moria, and set with an opal that glows with the light of secret fires. It was long thought lost in dragon-flame."
  },
  "ring-of-thror": {
    materials: {
      metal: "Erebor Iron-Gold Alloy",
      stones: ["Dragon-touched Emerald"],
      finish: "Recovered from Smaug's hoard",
      weight: "22.1 grams"
    },
    fullDescription: "One of the Seven Rings given to the Dwarf-lords, this ring was held by the Kings under the Mountain. Thrór wore it when he returned to Moria, where it was taken by Azog after his death. Later recovered, the ring still bears the marks of dragon-fire and emanates an aura of greed and ambition. Its emerald, once pure green, now flickers with golden fire from its centuries in Smaug's hoard."
  },
  "ring-of-angmar": {
    materials: {
      metal: "Shadow-forged Black Iron",
      stones: ["Morgul Crystal"],
      finish: "Cold to the touch, eternally dark",
      weight: "18.3 grams"
    },
    fullDescription: "The mightiest of the Nine Rings given to mortal men, this ring was given to the Lord of the Nazgûl, who became the Witch-king of Angmar. Forged with Sauron's direct involvement, it grants dominion over fear and shadow. The band is wrought of black iron that seems to drink in light, and its crystal pulses with a sickly green luminescence. To wear this ring is to step into the wraith-world, seeing the unseen and commanding the spirits of the dead."
  },
  "ring-of-khamul": {
    materials: {
      metal: "Eastern Bronze and Orodruin Ash",
      stones: ["Blood Garnet of Rhûn"],
      finish: "Etched with Eastern runes",
      weight: "16.7 grams"
    },
    fullDescription: "Second in power only to the Witch-king's ring among the Nine, this ring was given to Khamûl, an Easterling king who became the Shadow of the East. The ring grants preternatural senses, allowing its bearer to track prey across vast distances and see clearly in utter darkness. The bronze band is mixed with ash from Orodruin itself, and the garnet seems filled with swirling crimson mist."
  },
  "ring-of-shadow": {
    materials: {
      metal: "Twilight Silver",
      stones: ["Smoky Shadow Quartz"],
      finish: "Invisible under starlight",
      weight: "6.9 grams"
    },
    fullDescription: "A lesser ring of power, forged in the early experiments before the greater rings were made. Though not as powerful as the Three, Seven, or Nine, this ring grants its bearer the ability to walk in twilight, neither fully visible nor invisible. The silver seems to shift between solid and shadow, and the smoky quartz contains what appears to be moving darkness. Whispers of forgotten secrets can sometimes be heard by those who wear it."
  },
  "ring-of-the-serpent": {
    materials: {
      metal: "Mithril and Obsidian Weave",
      stones: ["Serpent's Eye Chrysoberyl"],
      finish: "Scale-textured, cold-blooded",
      weight: "11.2 grams"
    },
    fullDescription: "Forged in the Third Age by a rogue smith who had studied the methods of Celebrimbor, this ring takes the form of a coiled serpent. The band alternates between bright mithril and volcanic obsidian, creating a pattern like serpent scales. Its chrysoberyl stone exhibits cat's-eye effect, seeming to watch and follow movement. The wearer gains the patience and cunning of the great wyrms, able to wait centuries for the perfect moment to strike."
  },
};
