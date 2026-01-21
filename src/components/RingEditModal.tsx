import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Save, Trash2, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Ring, RingUpdate, useUpdateRing, useDeleteRing } from "@/hooks/useRings";
import { toast } from "@/hooks/use-toast";

interface RingEditModalProps {
  ring: Ring;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const categories = [
  { value: "elves", label: "Elves" },
  { value: "dwarves", label: "Dwarves" },
  { value: "men", label: "Men" },
  { value: "one", label: "The One" },
];

export function RingEditModal({ ring, open, onOpenChange }: RingEditModalProps) {
  const [formData, setFormData] = useState({
    name: ring.name,
    price: ring.price,
    description: ring.description,
    lore: ring.lore || "",
    image_url: ring.image_url || "",
    category: ring.category,
  });
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  const updateRing = useUpdateRing();
  const deleteRing = useDeleteRing();

  useEffect(() => {
    if (open) {
      setFormData({
        name: ring.name,
        price: ring.price,
        description: ring.description,
        lore: ring.lore || "",
        image_url: ring.image_url || "",
        category: ring.category,
      });
    }
  }, [ring, open]);

  const handleSave = async () => {
    try {
      const updates: RingUpdate = {
        name: formData.name,
        price: formData.price,
        description: formData.description,
        lore: formData.lore || null,
        image_url: formData.image_url || null,
        category: formData.category as "elves" | "dwarves" | "men" | "one",
      };

      await updateRing.mutateAsync({ id: ring.id, updates });

      toast({
        title: "Artefact Reforged",
        description: `${formData.name} has been updated in the forge.`,
      });
      onOpenChange(false);
    } catch (error) {
      toast({
        title: "Forge Failed",
        description: "Could not update the artefact. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleDelete = async () => {
    try {
      await deleteRing.mutateAsync(ring.id);
      toast({
        title: "Artefact Destroyed",
        description: `${ring.name} has been cast into the fires.`,
      });
      onOpenChange(false);
      setShowDeleteConfirm(false);
    } catch (error) {
      toast({
        title: "Destruction Failed",
        description: "The artefact resists destruction. Please try again.",
        variant: "destructive",
      });
    }
  };

  const isLoading = updateRing.isPending || deleteRing.isPending;

  return (
    <>
      <AnimatePresence>
        {open && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm"
              onClick={() => onOpenChange(false)}
            />

            {/* Modal Container */}
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto">
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 20 }}
                transition={{ duration: 0.2, ease: "easeOut" }}
                className="w-full max-w-lg my-8"
              >
                <div className="relative bg-gradient-to-b from-card to-background border border-gold/20 rounded-sm shadow-2xl shadow-black/50 overflow-hidden">
                  {/* Decorative top border */}
                  <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold/50 to-transparent" />

                  {/* Header */}
                  <div className="flex items-center justify-between p-6 border-b border-gold/10">
                    <h2 className="font-display text-xl tracking-wide text-gold">
                      Edit Artefact
                    </h2>
                    <button
                      onClick={() => onOpenChange(false)}
                      className="text-muted-foreground hover:text-gold transition-colors"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </div>

                  {/* Form */}
                  <div className="p-6 space-y-5 max-h-[60vh] overflow-y-auto">
                    <div className="space-y-2">
                      <Label htmlFor="name" className="text-gold/80 font-body text-sm">
                        Product Name
                      </Label>
                      <Input
                        id="name"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="bg-background/50 border-gold/20 focus:border-gold/50 text-foreground"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="price" className="text-gold/80 font-body text-sm">
                        Price (Gold Pieces)
                      </Label>
                      <Input
                        id="price"
                        type="number"
                        value={formData.price}
                        onChange={(e) => setFormData({ ...formData, price: Number(e.target.value) })}
                        className="bg-background/50 border-gold/20 focus:border-gold/50 text-foreground"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="category" className="text-gold/80 font-body text-sm">
                        Category
                      </Label>
                      <Select
                        value={formData.category}
                        onValueChange={(value: "elves" | "dwarves" | "men" | "one") => setFormData({ ...formData, category: value })}
                      >
                        <SelectTrigger className="bg-background/50 border-gold/20 focus:border-gold/50 text-foreground">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent className="bg-card border-gold/20">
                          {categories.map((cat) => (
                            <SelectItem key={cat.value} value={cat.value}>
                              {cat.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="description" className="text-gold/80 font-body text-sm">
                        Description
                      </Label>
                      <Textarea
                        id="description"
                        value={formData.description}
                        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                        className="bg-background/50 border-gold/20 focus:border-gold/50 text-foreground min-h-[80px]"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="lore" className="text-gold/80 font-body text-sm">
                        Lore
                      </Label>
                      <Textarea
                        id="lore"
                        value={formData.lore}
                        onChange={(e) => setFormData({ ...formData, lore: e.target.value })}
                        className="bg-background/50 border-gold/20 focus:border-gold/50 text-foreground min-h-[100px]"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="image_url" className="text-gold/80 font-body text-sm">
                        Image URL
                      </Label>
                      <Input
                        id="image_url"
                        value={formData.image_url}
                        onChange={(e) => setFormData({ ...formData, image_url: e.target.value })}
                        placeholder="https://..."
                        className="bg-background/50 border-gold/20 focus:border-gold/50 text-foreground"
                      />
                    </div>
                  </div>

                  {/* Footer */}
                  <div className="flex items-center justify-between p-6 border-t border-gold/10 bg-background/30">
                    <Button
                      variant="ghost"
                      onClick={() => setShowDeleteConfirm(true)}
                      disabled={isLoading}
                      className="text-destructive hover:text-destructive/80 hover:bg-destructive/10"
                    >
                      <Trash2 className="w-4 h-4 mr-2" />
                      Delete from Forge
                    </Button>

                    <div className="flex gap-3">
                      <Button
                        variant="outline"
                        onClick={() => onOpenChange(false)}
                        disabled={isLoading}
                        className="border-gold/20 hover:border-gold/40"
                      >
                        Cancel
                      </Button>
                      <Button
                        variant="gold"
                        onClick={handleSave}
                        disabled={isLoading}
                      >
                        {updateRing.isPending ? (
                          <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                        ) : (
                          <Save className="w-4 h-4 mr-2" />
                        )}
                        Save Changes
                      </Button>
                    </div>
                  </div>

                  {/* Decorative bottom border */}
                  <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold/30 to-transparent" />
                </div>
              </motion.div>
            </div>
          </>
        )}
      </AnimatePresence>

      {/* Delete Confirmation */}
      <AlertDialog open={showDeleteConfirm} onOpenChange={setShowDeleteConfirm}>
        <AlertDialogContent className="bg-card border-gold/20">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-gold font-display">
              Cast into the Fires?
            </AlertDialogTitle>
            <AlertDialogDescription className="text-muted-foreground">
              Are you certain you wish to destroy "{ring.name}"? This action cannot be undone.
              The artefact will be permanently removed from the forge.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="border-gold/20 hover:border-gold/40">
              Keep the Artefact
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDelete}
              className="bg-destructive hover:bg-destructive/90 text-destructive-foreground"
            >
              {deleteRing.isPending ? (
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              ) : (
                <Trash2 className="w-4 h-4 mr-2" />
              )}
              Destroy Forever
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
