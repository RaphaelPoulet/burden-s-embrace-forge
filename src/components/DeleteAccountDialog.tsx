import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/hooks/use-toast";
import { Loader2, Skull } from "lucide-react";

export function DeleteAccountDialog() {
  const navigate = useNavigate();
  const { signOut } = useAuth();
  const { toast } = useToast();
  const [isDeleting, setIsDeleting] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const handleDeleteAccount = async () => {
    setIsDeleting(true);

    try {
      // Call the edge function to delete user data and account
      const { error } = await supabase.functions.invoke("delete-account");

      if (error) throw error;

      toast({
        title: "Farewell, Bearer",
        description: "Your journey in Middle-earth has ended.",
      });

      // Sign out and redirect
      await signOut();
      navigate("/");
    } catch (error) {
      console.error("[DeleteAccount] Error:", error);
      toast({
        title: "Failed to Delete Account",
        description: "Something went wrong. Please try again later.",
        variant: "destructive",
      });
    } finally {
      setIsDeleting(false);
      setIsOpen(false);
    }
  };

  return (
    <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
      <AlertDialogTrigger asChild>
        <Button
          variant="ghost"
          className="w-full justify-start text-destructive hover:text-destructive hover:bg-destructive/10 gap-2"
        >
          <Skull className="w-4 h-4" />
          Abandon the Quest
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent className="bg-[#0A0A0A] border border-destructive/30 max-w-md mx-auto">
        <AlertDialogHeader>
          <AlertDialogTitle className="font-display text-xl text-destructive flex items-center gap-2">
            <Skull className="w-5 h-5" />
            Abandon Your Quest?
          </AlertDialogTitle>
          <AlertDialogDescription className="text-muted-foreground">
            Are you sure you want to leave Middle-earth? This action is permanent.
            All your data, orders, and allegiance will be erased from our records forever.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter className="flex flex-col sm:flex-row gap-2 sm:gap-0">
          <AlertDialogCancel 
            className="bg-muted border-border text-foreground hover:bg-muted/80"
            disabled={isDeleting}
          >
            Stay in Middle-earth
          </AlertDialogCancel>
          <AlertDialogAction
            onClick={handleDeleteAccount}
            disabled={isDeleting}
            className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
          >
            {isDeleting ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Departing...
              </>
            ) : (
              "Yes, Abandon Forever"
            )}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
