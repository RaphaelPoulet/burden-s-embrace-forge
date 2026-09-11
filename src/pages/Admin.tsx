import { useState } from "react";
import { Navigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Plus, Pencil, Trash2, Loader2, Package } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { useAuth } from "@/hooks/useAuth";
import { useAdmin } from "@/hooks/useAdmin";
import {
  useRings,
  useCreateRing,
  useUpdateRing,
  useDeleteRing,
  Ring,
  RingInsert,
} from "@/hooks/useRings";
import { Header } from "@/components/Header";
import { AdminOrdersPanel } from "@/components/admin/AdminOrdersPanel";
import { RingImageUpload } from "@/components/admin/RingImageUpload";
import { toast } from "sonner";

const categoryLabels = {
  elves: "The Three (Elves)",
  dwarves: "The Seven (Dwarves)",
  men: "The Nine (Men)",
  one: "The One Ring",
};

type Category = "elves" | "dwarves" | "men" | "one";

interface RingFormData {
  name: string;
  description: string;
  lore: string;
  price: string;
  category: Category;
  image_url: string;
  metals: string;
  stones: string;
  finish: string;
}

const emptyFormData: RingFormData = {
  name: "",
  description: "",
  lore: "",
  price: "",
  category: "elves",
  image_url: "",
  metals: "",
  stones: "",
  finish: "",
};

function RingForm({
  initialData,
  onSubmit,
  onCancel,
  isLoading,
  submitLabel,
}: {
  initialData: RingFormData;
  onSubmit: (data: RingFormData) => void;
  onCancel: () => void;
  isLoading: boolean;
  submitLabel: string;
}) {
  const [formData, setFormData] = useState<RingFormData>(initialData);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="name">Ring Name *</Label>
          <Input
            id="name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            required
            className="bg-card border-border"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="category">Category *</Label>
          <Select
            value={formData.category}
            onValueChange={(value: Category) =>
              setFormData({ ...formData, category: value })
            }
          >
            <SelectTrigger className="bg-card border-border">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {Object.entries(categoryLabels).map(([value, label]) => (
                <SelectItem key={value} value={value}>
                  {label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="description">Short Description *</Label>
        <Input
          id="description"
          value={formData.description}
          onChange={(e) =>
            setFormData({ ...formData, description: e.target.value })
          }
          required
          className="bg-card border-border"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="lore">Lore / Extended Description</Label>
        <Textarea
          id="lore"
          value={formData.lore}
          onChange={(e) => setFormData({ ...formData, lore: e.target.value })}
          rows={4}
          className="bg-card border-border"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="price">Price (USD) *</Label>
          <Input
            id="price"
            type="number"
            step="0.01"
            min="0"
            value={formData.price}
            onChange={(e) =>
              setFormData({ ...formData, price: e.target.value })
            }
            required
            className="bg-card border-border"
          />
        </div>
        <RingImageUpload
          value={formData.image_url}
          onChange={(url) => setFormData({ ...formData, image_url: url })}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="space-y-2">
          <Label htmlFor="metals">Metals (comma-separated)</Label>
          <Input
            id="metals"
            value={formData.metals}
            onChange={(e) =>
              setFormData({ ...formData, metals: e.target.value })
            }
            placeholder="Gold, Mithril"
            className="bg-card border-border"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="stones">Stones (comma-separated)</Label>
          <Input
            id="stones"
            value={formData.stones}
            onChange={(e) =>
              setFormData({ ...formData, stones: e.target.value })
            }
            placeholder="Ruby, Sapphire"
            className="bg-card border-border"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="finish">Finish</Label>
          <Input
            id="finish"
            value={formData.finish}
            onChange={(e) =>
              setFormData({ ...formData, finish: e.target.value })
            }
            placeholder="Polished"
            className="bg-card border-border"
          />
        </div>
      </div>

      <div className="flex gap-3 pt-4">
        <Button
          type="button"
          variant="outline"
          onClick={onCancel}
          disabled={isLoading}
        >
          Cancel
        </Button>
        <Button type="submit" variant="molten" disabled={isLoading}>
          {isLoading && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
          {submitLabel}
        </Button>
      </div>
    </form>
  );
}

export default function Admin() {
  const { user, loading: authLoading } = useAuth();
  const { isAdmin, loading: adminLoading } = useAdmin();
  const { data: rings, isLoading: ringsLoading } = useRings();
  const createRing = useCreateRing();
  const updateRing = useUpdateRing();
  const deleteRing = useDeleteRing();

  const [createDialogOpen, setCreateDialogOpen] = useState(false);
  const [editingRing, setEditingRing] = useState<Ring | null>(null);

  if (authLoading || adminLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-gold" />
      </div>
    );
  }

  if (!user || !isAdmin) {
    return <Navigate to="/" replace />;
  }

  const handleCreate = async (formData: RingFormData) => {
    try {
      const ringData: RingInsert = {
        name: formData.name.trim(),
        description: formData.description.trim(),
        lore: formData.lore.trim() || null,
        price: parseFloat(formData.price),
        category: formData.category,
        image_url: formData.image_url.trim() || null,
        metals: formData.metals
          ? formData.metals.split(",").map((s) => s.trim())
          : [],
        stones: formData.stones
          ? formData.stones.split(",").map((s) => s.trim())
          : [],
        finish: formData.finish.trim() || null,
      };

      await createRing.mutateAsync(ringData);
      toast.success("Ring forged successfully!");
      setCreateDialogOpen(false);
    } catch (error: any) {
      toast.error(error.message || "Failed to create ring");
    }
  };

  const handleUpdate = async (formData: RingFormData) => {
    if (!editingRing) return;

    try {
      await updateRing.mutateAsync({
        id: editingRing.id,
        updates: {
          name: formData.name.trim(),
          description: formData.description.trim(),
          lore: formData.lore.trim() || null,
          price: parseFloat(formData.price),
          category: formData.category,
          image_url: formData.image_url.trim() || null,
          metals: formData.metals
            ? formData.metals.split(",").map((s) => s.trim())
            : [],
          stones: formData.stones
            ? formData.stones.split(",").map((s) => s.trim())
            : [],
          finish: formData.finish.trim() || null,
        },
      });
      toast.success("Ring updated successfully!");
      setEditingRing(null);
    } catch (error: any) {
      toast.error(error.message || "Failed to update ring");
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteRing.mutateAsync(id);
      toast.success("Ring destroyed in the fires of Mount Doom!");
    } catch (error: any) {
      toast.error(error.message || "Failed to delete ring");
    }
  };

  const ringToFormData = (ring: Ring): RingFormData => ({
    name: ring.name,
    description: ring.description,
    lore: ring.lore || "",
    price: ring.price.toString(),
    category: ring.category,
    image_url: ring.image_url || "",
    metals: ring.metals?.join(", ") || "",
    stones: ring.stones?.join(", ") || "",
    finish: ring.finish || "",
  });

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="pt-28 pb-12 px-6">
        <div className="container mx-auto max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            <h1 className="font-display text-4xl text-gold mb-2">
              Admin Dashboard
            </h1>
            <p className="text-muted-foreground">
              Manage the Rings of Power and Orders
            </p>
          </motion.div>

          <Tabs defaultValue="rings" className="space-y-6">
            <TabsList className="bg-card border border-border">
              <TabsTrigger value="rings" className="data-[state=active]:bg-gold/20 data-[state=active]:text-gold">
                Rings of Power
              </TabsTrigger>
              <TabsTrigger value="orders" className="data-[state=active]:bg-gold/20 data-[state=active]:text-gold">
                <Package className="w-4 h-4 mr-2" />
                Orders
              </TabsTrigger>
            </TabsList>

            <TabsContent value="rings" className="space-y-6">
              <div className="flex justify-between items-center">
                <h2 className="font-display text-2xl text-gold-muted">
                  All Rings ({rings?.length || 0})
                </h2>
                <Dialog open={createDialogOpen} onOpenChange={setCreateDialogOpen}>
                  <DialogTrigger asChild>
                    <Button variant="molten">
                      <Plus className="w-4 h-4 mr-2" />
                      Forge New Ring
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                    <DialogHeader>
                      <DialogTitle className="font-display text-2xl text-gold">
                        Forge a New Ring
                      </DialogTitle>
                    </DialogHeader>
                    <RingForm
                      initialData={emptyFormData}
                      onSubmit={handleCreate}
                      onCancel={() => setCreateDialogOpen(false)}
                      isLoading={createRing.isPending}
                      submitLabel="Forge Ring"
                    />
                  </DialogContent>
                </Dialog>
              </div>

              {ringsLoading ? (
                <div className="flex justify-center py-12">
                  <Loader2 className="w-8 h-8 animate-spin text-gold" />
                </div>
              ) : rings?.length === 0 ? (
                <div className="text-center py-12 text-muted-foreground">
                  <p className="mb-4">No rings have been forged yet.</p>
                  <Button
                    variant="outline"
                    onClick={() => setCreateDialogOpen(true)}
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    Forge the first ring
                  </Button>
                </div>
              ) : (
                <div className="space-y-4">
                  {rings?.map((ring) => (
                    <motion.div
                      key={ring.id}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="bg-card border border-border rounded-lg p-4 flex items-center gap-4"
                    >
                      {ring.image_url && (
                        <img
                          src={ring.image_url}
                          alt={ring.name}
                          className="w-16 h-16 object-cover rounded-md"
                        />
                      )}
                      <div className="flex-1 min-w-0">
                        <h3 className="font-display text-lg text-gold truncate">
                          {ring.name}
                        </h3>
                        <p className="text-sm text-muted-foreground truncate">
                          {ring.description}
                        </p>
                        <div className="flex gap-2 mt-1">
                          <span className="text-xs px-2 py-0.5 bg-gold/10 text-gold rounded">
                            {categoryLabels[ring.category]}
                          </span>
                          <span className="text-xs text-gold-muted">
                            ${ring.price.toLocaleString()}
                          </span>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Dialog
                          open={editingRing?.id === ring.id}
                          onOpenChange={(open) =>
                            setEditingRing(open ? ring : null)
                          }
                        >
                          <DialogTrigger asChild>
                            <Button variant="outline" size="icon">
                              <Pencil className="w-4 h-4" />
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                            <DialogHeader>
                              <DialogTitle className="font-display text-2xl text-gold">
                                Edit Ring
                              </DialogTitle>
                            </DialogHeader>
                            <RingForm
                              initialData={ringToFormData(ring)}
                              onSubmit={handleUpdate}
                              onCancel={() => setEditingRing(null)}
                              isLoading={updateRing.isPending}
                              submitLabel="Update Ring"
                            />
                          </DialogContent>
                        </Dialog>

                        <AlertDialog>
                          <AlertDialogTrigger asChild>
                            <Button
                              variant="outline"
                              size="icon"
                              className="text-destructive hover:text-destructive"
                            >
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </AlertDialogTrigger>
                          <AlertDialogContent>
                            <AlertDialogHeader>
                              <AlertDialogTitle>Destroy this ring?</AlertDialogTitle>
                              <AlertDialogDescription>
                                "{ring.name}" will be cast into the fires of Mount
                                Doom. This action cannot be undone.
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel>Cancel</AlertDialogCancel>
                              <AlertDialogAction
                                onClick={() => handleDelete(ring.id)}
                                className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                              >
                                Destroy
                              </AlertDialogAction>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}
            </TabsContent>

            <TabsContent value="orders">
              <AdminOrdersPanel />
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  );
}
