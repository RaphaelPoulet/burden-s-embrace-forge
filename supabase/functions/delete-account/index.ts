import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  // Handle CORS preflight
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // Get the authorization header
    const authHeader = req.headers.get("Authorization");
    if (!authHeader) {
      return new Response(
        JSON.stringify({ error: "Missing authorization header" }),
        { status: 401, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Create Supabase clients
    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const supabaseAnonKey = Deno.env.get("SUPABASE_ANON_KEY")!;
    const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;

    // User client to get the current user
    const userClient = createClient(supabaseUrl, supabaseAnonKey, {
      global: { headers: { Authorization: authHeader } },
    });

    // Get the current user
    const { data: { user }, error: userError } = await userClient.auth.getUser();
    if (userError || !user) {
      return new Response(
        JSON.stringify({ error: "Unauthorized" }),
        { status: 401, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    console.log(`[DeleteAccount] Deleting user: ${user.id}`);

    // Admin client for privileged operations
    const adminClient = createClient(supabaseUrl, supabaseServiceKey);

    // Delete user's data from all tables
    // Note: RLS policies may already handle cascade, but we explicitly delete for safety

    // Delete cart items
    await adminClient.from("cart_items").delete().eq("user_id", user.id);
    console.log("[DeleteAccount] Deleted cart items");

    // Delete orders
    await adminClient.from("orders").delete().eq("user_id", user.id);
    console.log("[DeleteAccount] Deleted orders");

    // Delete profile
    await adminClient.from("profiles").delete().eq("user_id", user.id);
    console.log("[DeleteAccount] Deleted profile");

    // Delete user roles
    await adminClient.from("user_roles").delete().eq("user_id", user.id);
    console.log("[DeleteAccount] Deleted user roles");

    // Finally, delete the auth user
    const { error: deleteError } = await adminClient.auth.admin.deleteUser(user.id);
    if (deleteError) {
      console.error("[DeleteAccount] Failed to delete auth user:", deleteError);
      throw deleteError;
    }

    console.log("[DeleteAccount] Successfully deleted user:", user.id);

    return new Response(
      JSON.stringify({ success: true, message: "Account deleted successfully" }),
      { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (error: unknown) {
    console.error("[DeleteAccount] Error:", error);
    const message = error instanceof Error ? error.message : "Failed to delete account";
    return new Response(
      JSON.stringify({ error: message }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
