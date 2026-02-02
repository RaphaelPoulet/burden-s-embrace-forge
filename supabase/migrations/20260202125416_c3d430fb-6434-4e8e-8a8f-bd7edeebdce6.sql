-- Create orders table with Middle-earth delivery locations
CREATE TABLE public.orders (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  customer_name TEXT,
  customer_email TEXT NOT NULL,
  delivery_location TEXT NOT NULL,
  items JSONB NOT NULL,
  total_amount NUMERIC NOT NULL,
  webhook_status TEXT NOT NULL DEFAULT 'pending',
  webhook_retry_count INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;

-- Users can view their own orders
CREATE POLICY "Users can view their own orders"
ON public.orders
FOR SELECT
USING (auth.uid() = user_id);

-- Users can insert their own orders
CREATE POLICY "Users can insert their own orders"
ON public.orders
FOR INSERT
WITH CHECK (auth.uid() = user_id);

-- Users can update their own orders (for webhook retry)
CREATE POLICY "Users can update their own orders"
ON public.orders
FOR UPDATE
USING (auth.uid() = user_id);

-- Admins can view all orders
CREATE POLICY "Admins can view all orders"
ON public.orders
FOR SELECT
USING (has_role(auth.uid(), 'admin'::app_role));

-- Admins can update any order
CREATE POLICY "Admins can update any order"
ON public.orders
FOR UPDATE
USING (has_role(auth.uid(), 'admin'::app_role));

-- Create trigger for automatic timestamp updates
CREATE TRIGGER update_orders_updated_at
BEFORE UPDATE ON public.orders
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();