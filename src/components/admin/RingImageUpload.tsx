import { useRef, useState } from "react";
import { Loader2, Upload, ImageOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

const BUCKET = "ring-images";
const TEN_YEARS_IN_SECONDS = 60 * 60 * 24 * 365 * 10;

interface RingImageUploadProps {
  value: string;
  onChange: (url: string) => void;
  label?: string;
}

export function RingImageUpload({ value, onChange, label = "Ring Photo" }: RingImageUploadProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);
  const [localPreview, setLocalPreview] = useState<string | null>(null);

  const preview = localPreview || value;

  const handleFile = async (file: File) => {
    if (!file.type.startsWith("image/")) {
      toast.error("Please choose an image file.");
      return;
    }
    if (file.size > 10 * 1024 * 1024) {
      toast.error("Image must be smaller than 10MB.");
      return;
    }

    const objectUrl = URL.createObjectURL(file);
    setLocalPreview(objectUrl);
    setUploading(true);

    try {
      const ext = file.name.split(".").pop()?.toLowerCase() || "jpg";
      const path = `${crypto.randomUUID()}.${ext}`;

      const { error: uploadError } = await supabase.storage
        .from(BUCKET)
        .upload(path, file, { cacheControl: "3600", upsert: false });

      if (uploadError) throw uploadError;

      const { data, error: urlError } = await supabase.storage
        .from(BUCKET)
        .createSignedUrl(path, TEN_YEARS_IN_SECONDS);

      if (urlError || !data?.signedUrl) throw urlError || new Error("No URL returned");

      onChange(data.signedUrl);
      toast.success("Image uploaded to the forge.");
    } catch (error) {
      console.error("Ring image upload failed:", error);
      toast.error("Upload failed. Please try again.");
      setLocalPreview(null);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="space-y-2">
      <Label className="text-gold/80">{label}</Label>

      <div className="flex items-center gap-4">
        <div className="w-20 h-20 shrink-0 rounded-sm border border-gold/20 bg-background/50 overflow-hidden flex items-center justify-center">
          {preview ? (
            <img src={preview} alt="Selected ring" className="w-full h-full object-cover" />
          ) : (
            <ImageOff className="w-6 h-6 text-muted-foreground" />
          )}
        </div>

        <div className="space-y-1">
          <Button
            type="button"
            variant="outline"
            disabled={uploading}
            onClick={() => inputRef.current?.click()}
            className="border-gold/20 hover:border-gold/40"
          >
            {uploading ? (
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
            ) : (
              <Upload className="w-4 h-4 mr-2" />
            )}
            {uploading ? "Uploading..." : preview ? "Replace Photo" : "Choose Photo"}
          </Button>
          <p className="text-xs text-muted-foreground">PNG or JPG, up to 10MB.</p>
        </div>
      </div>

      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={(e) => {
          const file = e.target.files?.[0];
          if (file) handleFile(file);
          e.target.value = "";
        }}
      />
    </div>
  );
}
