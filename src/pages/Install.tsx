import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Download, Smartphone, Check, Share } from "lucide-react";
import { Link } from "react-router-dom";

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed" }>;
}

const Install = () => {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [isInstalled, setIsInstalled] = useState(false);
  const [isIOS, setIsIOS] = useState(false);

  useEffect(() => {
    // Check if already installed
    if (window.matchMedia("(display-mode: standalone)").matches) {
      setIsInstalled(true);
    }

    // Check if iOS
    const isIOSDevice = /iPad|iPhone|iPod/.test(navigator.userAgent);
    setIsIOS(isIOSDevice);

    // Listen for install prompt
    const handleBeforeInstall = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e as BeforeInstallPromptEvent);
    };

    window.addEventListener("beforeinstallprompt", handleBeforeInstall);

    return () => {
      window.removeEventListener("beforeinstallprompt", handleBeforeInstall);
    };
  }, []);

  const handleInstall = async () => {
    if (!deferredPrompt) return;

    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;

    if (outcome === "accepted") {
      setIsInstalled(true);
    }
    setDeferredPrompt(null);
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Background effects */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-transparent to-transparent" />
        <div className="absolute inset-0 vignette opacity-50" />
      </div>

      <main className="relative flex-1 flex flex-col items-center justify-center px-6 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-md w-full text-center"
        >
          {/* Icon */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring" }}
            className="w-24 h-24 mx-auto mb-8 rounded-2xl bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center ember-glow"
          >
            <Smartphone className="w-12 h-12 text-accent" />
          </motion.div>

          <h1 className="font-display text-3xl text-gold-gradient mb-4">
            Claim Your Artifact
          </h1>

          <p className="text-foreground/80 mb-8 leading-relaxed">
            Install The Gift Giver on your device for swift access to the realm's most coveted artifacts of power.
          </p>

          {isInstalled ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="space-y-4"
            >
              <div className="flex items-center justify-center gap-2 text-green-500 mb-4">
                <Check className="w-6 h-6" />
                <span className="font-medium">Already Installed</span>
              </div>
              <Link to="/home">
                <Button variant="molten" size="lg" className="w-full">
                  Enter the Realm
                </Button>
              </Link>
            </motion.div>
          ) : isIOS ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="space-y-6"
            >
              <div className="bg-card/50 border border-border rounded-xl p-6 text-left">
                <h3 className="font-display text-lg text-foreground mb-4">
                  Installation Ritual for iOS
                </h3>
                <ol className="space-y-3 text-sm text-foreground/80">
                  <li className="flex items-start gap-3">
                    <span className="w-6 h-6 rounded-full bg-primary/20 text-primary flex items-center justify-center text-xs font-bold shrink-0">
                      1
                    </span>
                    <span>
                      Tap the <Share className="w-4 h-4 inline mx-1" /> Share button in Safari
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="w-6 h-6 rounded-full bg-primary/20 text-primary flex items-center justify-center text-xs font-bold shrink-0">
                      2
                    </span>
                    <span>Scroll and tap "Add to Home Screen"</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="w-6 h-6 rounded-full bg-primary/20 text-primary flex items-center justify-center text-xs font-bold shrink-0">
                      3
                    </span>
                    <span>Tap "Add" to complete the binding</span>
                  </li>
                </ol>
              </div>
              <Link to="/home">
                <Button variant="outline" className="w-full">
                  Continue to Realm
                </Button>
              </Link>
            </motion.div>
          ) : deferredPrompt ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="space-y-4"
            >
              <Button
                variant="molten"
                size="lg"
                className="w-full"
                onClick={handleInstall}
              >
                <Download className="w-5 h-5 mr-2" />
                Install Now
              </Button>
              <Link to="/home">
                <Button variant="ghost" className="w-full">
                  Maybe Later
                </Button>
              </Link>
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="space-y-4"
            >
              <p className="text-sm text-muted-foreground mb-4">
                Visit this page on your mobile device to install the app.
              </p>
              <Link to="/home">
                <Button variant="molten" size="lg" className="w-full">
                  Enter the Realm
                </Button>
              </Link>
            </motion.div>
          )}

          {/* Features */}
          <div className="mt-12 grid grid-cols-3 gap-4 text-center">
            {[
              { label: "Offline Access", desc: "Browse anywhere" },
              { label: "Fast Loading", desc: "Instant access" },
              { label: "Home Screen", desc: "One tap away" },
            ].map((feature, i) => (
              <motion.div
                key={feature.label}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 + i * 0.1 }}
                className="text-center"
              >
                <p className="text-xs font-medium text-foreground">{feature.label}</p>
                <p className="text-[10px] text-muted-foreground">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </main>
    </div>
  );
};

export default Install;
