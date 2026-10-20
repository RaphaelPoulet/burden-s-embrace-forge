import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { fallbackRings } from "@/data/fallbackRings";
import { fetchCatalogue } from "@/lib/catalogueFetch";

export interface Ring {
  id: string;
  name: string;
  description: string;
  lore: string | null;
  price: number;
  category: "elves" | "dwarves" | "men" | "one";
  image_url: string | null;
  metals: string[];
  stones: string[];
  finish: string | null;
  created_at: string;
  updated_at: string;
  isFallback?: boolean;
}

export type RingInsert = Omit<Ring, "id" | "created_at" | "updated_at" | "isFallback">;
export type RingUpdate = Partial<RingInsert>;

export function useRings({ fallback = false }: { fallback?: boolean } = {}) {
  return useQuery({
    queryKey: ["rings", fallback ? "public" : "admin"],
    queryFn: async () => {
      if (fallback) {
        return fetchCatalogue(async (signal) => {
          const { data, error } = await supabase.from("rings").select("*")
            .order("created_at", { ascending: true }).abortSignal(signal);
          if (error) throw error;
          return data as Ring[];
        }, fallbackRings, (data) => !data?.length, "rings");
      }
      const { data, error } = await supabase
        .from("rings")
        .select("*")
        .order("created_at", { ascending: true });

      if (error) {
        console.error("[Catalogue: admin] Live read failed:", error);
        throw error;
      }
      return data as Ring[];
    },
  });
}

export function useRingsByCategory(category: string) {
  return useQuery({
    queryKey: ["rings", "public", category],
    queryFn: async () => {
      return fetchCatalogue(async (signal) => {
        let query = supabase.from("rings").select("*");

      if (category !== "all") {
        query = query.eq("category", category);
      }

      const { data, error } = await query.order("created_at", { ascending: true }).abortSignal(signal);
      if (error) throw error;
      return data as Ring[];
      }, fallbackRings.filter((ring) => category === "all" || ring.category === category),
      (data) => !data?.length, `category ${category}`);
    },
  });
}

export function useCreateRing() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (ring: RingInsert) => {
      const { data, error } = await supabase
        .from("rings")
        .insert(ring)
        .select()
        .single();

      if (error) throw error;
      return data as Ring;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["rings"] });
      queryClient.invalidateQueries({ queryKey: ["ring"] });
    },
  });
}

export function useUpdateRing() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, updates }: { id: string; updates: RingUpdate }) => {
      const { data, error } = await supabase
        .from("rings")
        .update(updates)
        .eq("id", id)
        .select()
        .single();

      if (error) throw error;
      return data as Ring;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["rings"] });
      queryClient.invalidateQueries({ queryKey: ["ring"] });
    },
  });
}

export function useDeleteRing() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from("rings").delete().eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["rings"] });
      queryClient.invalidateQueries({ queryKey: ["ring"] });
    },
  });
}
