import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { MapPin, Loader2 } from "lucide-react";

export const DELIVERY_LOCATIONS = [
  { id: "forge", name: "Pick up at the Forge", price: 0, travelTime: "Immediate" },
  { id: "minas-tirith", name: "Express Eagle Delivery to Minas Tirith", price: 150, travelTime: "3-5 days via Great Eagles" },
  { id: "shire", name: "Secret Caravan to The Shire (Bag End)", price: 75, travelTime: "2-3 weeks by hidden paths" },
  { id: "khazad-dum", name: "Underground Shipment to Khazad-dûm", price: 200, travelTime: "1-2 weeks through the deep roads" },
  { id: "rivendell", name: "Elven Escort to Rivendell", price: 125, travelTime: "1 week with Elven protection" },
] as const;

export type DeliveryLocationId = typeof DELIVERY_LOCATIONS[number]["id"];

interface DeliveryLocationSelectProps {
  value: DeliveryLocationId | "";
  onChange: (locationId: DeliveryLocationId) => void;
  onCalculationComplete: () => void;
}

export function DeliveryLocationSelect({
  value,
  onChange,
  onCalculationComplete,
}: DeliveryLocationSelectProps) {
  const [isCalculating, setIsCalculating] = useState(false);
  const selectedLocation = DELIVERY_LOCATIONS.find((loc) => loc.id === value);

  useEffect(() => {
    if (value && isCalculating) {
      const timer = setTimeout(() => {
        setIsCalculating(false);
        onCalculationComplete();
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, [value, isCalculating, onCalculationComplete]);

  const handleChange = (newValue: string) => {
    setIsCalculating(true);
    onChange(newValue as DeliveryLocationId);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <MapPin className="w-5 h-5 text-gold" />
        <label className="font-display text-foreground">
          Choose Your Delivery Realm
        </label>
      </div>

      <Select value={value} onValueChange={handleChange}>
        <SelectTrigger className="w-full h-14 bg-obsidian border-gold/30 text-foreground hover:border-gold/60 focus:border-gold focus:ring-gold/20 transition-all">
          <SelectValue placeholder="Select a destination in Middle-earth..." />
        </SelectTrigger>
        <SelectContent className="bg-obsidian border-gold/30 z-[100]">
          {DELIVERY_LOCATIONS.map((location) => (
            <SelectItem
              key={location.id}
              value={location.id}
              className="text-foreground hover:bg-gold/10 focus:bg-gold/20 focus:text-gold cursor-pointer py-3"
            >
              <div className="flex flex-col gap-1">
                <span className="font-display">{location.name}</span>
                <span className="text-xs text-muted-foreground">
                  {location.price === 0 ? "Free" : `+$${location.price}`} • {location.travelTime}
                </span>
              </div>
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <AnimatePresence mode="wait">
        {isCalculating && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className="flex items-center justify-center gap-3 py-4 bg-gold/5 rounded-sm border border-gold/20"
          >
            <Loader2 className="w-5 h-5 text-gold animate-spin" />
            <span className="text-gold font-display text-sm">
              Calculating travel time through Middle-earth...
            </span>
          </motion.div>
        )}

        {selectedLocation && !isCalculating && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-4 bg-card border border-gold/20 rounded-sm"
          >
            <div className="flex justify-between items-center">
              <div>
                <p className="text-sm text-muted-foreground">Estimated arrival</p>
                <p className="font-display text-gold">{selectedLocation.travelTime}</p>
              </div>
              <div className="text-right">
                <p className="text-sm text-muted-foreground">Delivery cost</p>
                <p className="font-display text-gold">
                  {selectedLocation.price === 0 ? "Free" : `+$${selectedLocation.price}`}
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
