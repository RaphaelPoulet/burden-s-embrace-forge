CREATE POLICY "Anyone can view ring images"
ON storage.objects FOR SELECT
USING (bucket_id = 'ring-images');

CREATE POLICY "Admins can upload ring images"
ON storage.objects FOR INSERT TO authenticated
WITH CHECK (bucket_id = 'ring-images' AND public.has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Admins can update ring images"
ON storage.objects FOR UPDATE TO authenticated
USING (bucket_id = 'ring-images' AND public.has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Admins can delete ring images"
ON storage.objects FOR DELETE TO authenticated
USING (bucket_id = 'ring-images' AND public.has_role(auth.uid(), 'admin'::app_role));