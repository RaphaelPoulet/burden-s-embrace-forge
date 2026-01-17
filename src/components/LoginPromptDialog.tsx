import { Link } from "react-router-dom";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

interface LoginPromptDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function LoginPromptDialog({ open, onOpenChange }: LoginPromptDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-card border-border/50 max-w-md">
        <DialogHeader>
          <DialogTitle className="font-display text-2xl text-gold text-center">
            Allegiance Required
          </DialogTitle>
          <DialogDescription className="text-muted-foreground text-center pt-2">
            You must swear your allegiance to the Dark Lord before accepting this burden. 
            Only those who have pledged may carry the weight of these artifacts.
          </DialogDescription>
        </DialogHeader>
        
        <div className="flex flex-col gap-3 mt-4">
          <Link to="/auth" className="w-full">
            <Button variant="molten" className="w-full" onClick={() => onOpenChange(false)}>
              Swear Allegiance
            </Button>
          </Link>
          <Button 
            variant="outline" 
            className="w-full border-border/50 text-muted-foreground hover:text-foreground"
            onClick={() => onOpenChange(false)}
          >
            Return to Shadows
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
