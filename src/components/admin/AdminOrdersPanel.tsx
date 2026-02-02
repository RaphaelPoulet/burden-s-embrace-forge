import { motion } from "framer-motion";
import { Package, AlertTriangle, CheckCircle, Clock, RefreshCw } from "lucide-react";
import { useAdminOrders, Order } from "@/hooks/useOrders";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";

const statusConfig: Record<string, { icon: React.ElementType; color: string; label: string }> = {
  sent: { icon: CheckCircle, color: "text-green-500", label: "Sent" },
  pending: { icon: Clock, color: "text-yellow-500", label: "Pending" },
  retry: { icon: AlertTriangle, color: "text-red-500", label: "Needs Retry" },
  no_webhook_configured: { icon: RefreshCw, color: "text-muted-foreground", label: "No Webhook" },
};

function OrderCard({ order }: { order: Order }) {
  const status = statusConfig[order.webhook_status] || statusConfig.pending;
  const StatusIcon = status.icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-card border border-border rounded-lg p-4"
    >
      <div className="flex items-start justify-between mb-3">
        <div>
          <p className="font-display text-gold">
            {order.customer_name || "Anonymous Bearer"}
          </p>
          <p className="text-sm text-muted-foreground">{order.customer_email}</p>
        </div>
        <div className="flex items-center gap-2">
          <StatusIcon className={`w-4 h-4 ${status.color}`} />
          <Badge
            variant={order.webhook_status === "retry" ? "destructive" : "secondary"}
            className="text-xs"
          >
            {status.label}
          </Badge>
        </div>
      </div>

      <div className="space-y-2 mb-3">
        <div className="flex items-center gap-2 text-sm">
          <Package className="w-4 h-4 text-muted-foreground" />
          <span className="text-muted-foreground">Delivery:</span>
          <span className="text-foreground">{order.delivery_location}</span>
        </div>
        <div className="text-sm">
          <span className="text-muted-foreground">Items: </span>
          <span className="text-foreground">
            {(order.items as Order["items"]).map((item) => `${item.name} (×${item.quantity})`).join(", ")}
          </span>
        </div>
      </div>

      <div className="flex justify-between items-center pt-3 border-t border-border/50">
        <span className="text-xs text-muted-foreground">
          {new Date(order.created_at).toLocaleString()}
        </span>
        <span className="font-display text-gold">
          ${order.total_amount.toLocaleString()}
        </span>
      </div>

      {order.webhook_status === "retry" && order.webhook_retry_count > 0 && (
        <div className="mt-2 text-xs text-destructive">
          Webhook failed. Retry attempts: {order.webhook_retry_count}
        </div>
      )}
    </motion.div>
  );
}

export function AdminOrdersPanel() {
  const { data: orders, isLoading, error } = useAdminOrders();

  const retryCount = orders?.filter((o) => o.webhook_status === "retry").length || 0;

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="font-display text-2xl text-gold-muted">
          Orders ({orders?.length || 0})
        </h2>
        {retryCount > 0 && (
          <Badge variant="destructive" className="animate-pulse">
            {retryCount} need{retryCount === 1 ? "s" : ""} retry
          </Badge>
        )}
      </div>

      {isLoading ? (
        <div className="space-y-4">
          {[1, 2, 3].map((i) => (
            <Skeleton key={i} className="h-32 w-full" />
          ))}
        </div>
      ) : error ? (
        <div className="text-center py-8 text-destructive">
          <AlertTriangle className="w-8 h-8 mx-auto mb-2" />
          <p>Failed to load orders</p>
        </div>
      ) : orders?.length === 0 ? (
        <div className="text-center py-12 text-muted-foreground">
          <Package className="w-12 h-12 mx-auto mb-4 opacity-50" />
          <p>No orders have been placed yet.</p>
        </div>
      ) : (
        <div className="grid gap-4">
          {orders?.map((order) => (
            <OrderCard key={order.id} order={order} />
          ))}
        </div>
      )}
    </div>
  );
}
