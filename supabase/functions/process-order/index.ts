import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface OrderData {
  customerName: string;
  customerEmail: string;
  deliveryLocation: string;
  items: Array<{
    id: string;
    name: string;
    price: number;
    quantity: number;
  }>;
  totalAmount: number;
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const makeWebhookUrl = Deno.env.get('MAKE_WEBHOOK_URL');

    // Get auth token from request
    const authHeader = req.headers.get('Authorization');
    if (!authHeader) {
      return new Response(
        JSON.stringify({ error: 'No authorization header' }),
        { status: 401, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Create Supabase client with service role for inserting orders
    const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey);

    // Verify the user's JWT
    const supabaseClient = createClient(supabaseUrl, Deno.env.get('SUPABASE_ANON_KEY')!, {
      global: { headers: { Authorization: authHeader } }
    });
    
    const { data: { user }, error: authError } = await supabaseClient.auth.getUser();
    if (authError || !user) {
      return new Response(
        JSON.stringify({ error: 'Invalid authorization' }),
        { status: 401, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const orderData: OrderData = await req.json();
    
    // Validate required fields
    if (!orderData.deliveryLocation || !orderData.items?.length) {
      return new Response(
        JSON.stringify({ error: 'Missing required order data' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    let webhookStatus = 'pending';
    let webhookError: string | null = null;

    // Try to send webhook to Make.com
    if (makeWebhookUrl) {
      try {
        const webhookPayload = {
          timestamp: new Date().toISOString(),
          customer: {
            name: orderData.customerName || 'Anonymous Bearer',
            email: orderData.customerEmail,
          },
          products: orderData.items.map(item => ({
            name: item.name,
            price: item.price,
            quantity: item.quantity,
          })),
          deliveryLocation: orderData.deliveryLocation,
          totalAmount: orderData.totalAmount,
          orderedFrom: 'The Gift Giver',
        };

        console.log('[Webhook] Sending to Make.com:', JSON.stringify(webhookPayload));

        const webhookResponse = await fetch(makeWebhookUrl, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(webhookPayload),
        });

        if (webhookResponse.ok) {
          webhookStatus = 'sent';
          console.log('[Webhook] Successfully sent to Make.com');
        } else {
          webhookStatus = 'retry';
          webhookError = `Make.com responded with status ${webhookResponse.status}`;
          console.error('[Webhook] Failed:', webhookError);
        }
      } catch (err) {
        webhookStatus = 'retry';
        webhookError = err instanceof Error ? err.message : 'Unknown webhook error';
        console.error('[Webhook] Error:', webhookError);
      }
    } else {
      webhookStatus = 'no_webhook_configured';
      console.log('[Webhook] No MAKE_WEBHOOK_URL configured');
    }

    // Insert order into database using service role (bypasses RLS for insert)
    const { data: order, error: insertError } = await supabaseAdmin
      .from('orders')
      .insert({
        user_id: user.id,
        customer_name: orderData.customerName || null,
        customer_email: orderData.customerEmail,
        delivery_location: orderData.deliveryLocation,
        items: orderData.items,
        total_amount: orderData.totalAmount,
        webhook_status: webhookStatus,
      })
      .select()
      .single();

    if (insertError) {
      console.error('[Database] Insert error:', insertError);
      return new Response(
        JSON.stringify({ error: 'Failed to save order', details: insertError.message }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    console.log('[Order] Created successfully:', order.id);

    return new Response(
      JSON.stringify({ 
        success: true, 
        orderId: order.id,
        webhookStatus,
        message: webhookStatus === 'retry' 
          ? 'Order saved but webhook needs retry' 
          : 'Order processed successfully'
      }),
      { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    console.error('[Error] Processing order:', error);
    return new Response(
      JSON.stringify({ error: 'Internal server error' }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
