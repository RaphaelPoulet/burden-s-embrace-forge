import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Ring } from "./useRings";
import { fallbackRings } from "@/data/fallbackRings";
import { fetchCatalogue } from "@/lib/catalogueFetch";

export function useRing(id: string | undefined) {
  return useQuery({
    queryKey: ["ring", id],
    queryFn: async () => {
      if (!id) return null;

      const preview = fallbackRings.find((ring) => ring.id === id);
      if (preview) return preview;

      return fetchCatalogue(async (signal) => {
      const { data, error } = await supabase
        .from("rings")
        .select("*")
        .eq("id", id)
        .maybeSingle().abortSignal(signal);

      if (error) throw error;
      return data as Ring | null;
      }, null, (data) => !data, `ring ${id}`);
    },
    enabled: !!id,
  });
}

export function useOneRing() {
  return useQuery({
    queryKey: ["ring", "one"],
    queryFn: async () => {
      return fetchCatalogue(async (signal) => {
      const { data, error } = await supabase
        .from("rings")
        .select("*")
        .eq("category", "one")
        .maybeSingle().abortSignal(signal);

      if (error) throw error;
      return data as Ring | null;
      }, fallbackRings.find((ring) => ring.category === "one") || null,
      (data) => !data, "One Ring");
    },
  });
}
