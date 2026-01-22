import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";

export function useAdmin() {
  const { user } = useAuth();
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function checkAdminRole() {
      if (!user) {
        console.log("[Admin Check] No user logged in - hiding admin buttons");
        setIsAdmin(false);
        setLoading(false);
        return;
      }

      console.log("[Admin Check] Checking admin status for user:", user.email);

      const { data, error } = await supabase.rpc("has_role", {
        _user_id: user.id,
        _role: "admin",
      });

      if (error) {
        console.error("[Admin Check] Error checking admin role:", error);
        console.log("[Admin Check] Admin buttons hidden due to error");
        setIsAdmin(false);
      } else {
        const isAdminUser = data === true;
        console.log("[Admin Check] is admin:", isAdminUser);
        if (!isAdminUser) {
          console.log("[Admin Check] User is not admin - hiding admin buttons");
        } else {
          console.log("[Admin Check] Admin confirmed - showing admin buttons");
        }
        setIsAdmin(isAdminUser);
      }
      setLoading(false);
    }

    checkAdminRole();
  }, [user]);

  return { isAdmin, loading };
}
