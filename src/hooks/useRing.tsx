import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Ring } from "./useRings";

export function useRing(id: string | undefined) {
  return useQuery({
    queryKey: ["ring", id],
    queryFn: async () => {
      if (!id) return null;

      const { data, error } = await supabase
        .from("rings")
        .select("*")
        .eq("id", id)
        .maybeSingle();

      if (error) throw error;
      return data as Ring | null;
    },
    enabled: !!id,
  });
}

export function useOneRing() {
  return useQuery({
    queryKey: ["ring", "one"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("rings")
        .select("*")
        .eq("category", "one")
        .maybeSingle();

      if (error) throw error;
      return data as Ring | null;
    },
  });
}
