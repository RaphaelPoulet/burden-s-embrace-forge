-- Create enum for app roles
CREATE TYPE public.app_role AS ENUM ('admin', 'user');

-- Create user_roles table
CREATE TABLE public.user_roles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  role app_role NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE (user_id, role)
);

-- Enable RLS on user_roles
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

-- Create security definer function to check roles (prevents RLS recursion)
CREATE OR REPLACE FUNCTION public.has_role(_user_id UUID, _role app_role)
RETURNS BOOLEAN
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.user_roles
    WHERE user_id = _user_id
      AND role = _role
  )
$$;

-- RLS policies for user_roles (only admins can manage roles)
CREATE POLICY "Users can view their own roles"
ON public.user_roles
FOR SELECT
USING (auth.uid() = user_id);

CREATE POLICY "Admins can view all roles"
ON public.user_roles
FOR SELECT
USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can insert roles"
ON public.user_roles
FOR INSERT
WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can delete roles"
ON public.user_roles
FOR DELETE
USING (public.has_role(auth.uid(), 'admin'));

-- Create rings table
CREATE TABLE public.rings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  description TEXT NOT NULL,
  lore TEXT,
  price NUMERIC NOT NULL,
  category TEXT NOT NULL CHECK (category IN ('elves', 'dwarves', 'men', 'one')),
  image_url TEXT,
  metals TEXT[] DEFAULT '{}',
  stones TEXT[] DEFAULT '{}',
  finish TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS on rings
ALTER TABLE public.rings ENABLE ROW LEVEL SECURITY;

-- Public can read rings
CREATE POLICY "Anyone can view rings"
ON public.rings
FOR SELECT
USING (true);

-- Only admins can insert rings
CREATE POLICY "Admins can insert rings"
ON public.rings
FOR INSERT
WITH CHECK (public.has_role(auth.uid(), 'admin'));

-- Only admins can update rings
CREATE POLICY "Admins can update rings"
ON public.rings
FOR UPDATE
USING (public.has_role(auth.uid(), 'admin'));

-- Only admins can delete rings
CREATE POLICY "Admins can delete rings"
ON public.rings
FOR DELETE
USING (public.has_role(auth.uid(), 'admin'));

-- Add trigger for updated_at
CREATE TRIGGER update_rings_updated_at
BEFORE UPDATE ON public.rings
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();