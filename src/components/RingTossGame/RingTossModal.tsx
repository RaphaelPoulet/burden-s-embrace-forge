import { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Copy, Check } from 'lucide-react';
import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { GameCanvas } from './GameCanvas';
import { toast } from 'sonner';

interface RingTossModalProps {
  isOpen: boolean;
  onClose: () => void;
}

type GameState = 'start' | 'playing' | 'won' | 'lost';

const DISCOUNT_CODE = 'RINGBEARER15';

export const RingTossModal = ({ isOpen, onClose }: RingTossModalProps) => {
  const [gameState, setGameState] = useState<GameState>('start');
  const [attempts, setAttempts] = useState(3);
  const [score, setScore] = useState(0);
  const [copied, setCopied] = useState(false);

  const handleStartGame = () => {
    setGameState('playing');
    setAttempts(3);
    setScore(0);
  };

  const handleScore = useCallback(() => {
    setScore((prev) => prev + 1);
    setGameState('won');
  }, []);

  const handleMiss = useCallback(() => {
    setAttempts((prev) => {
      const newAttempts = prev - 1;
      if (newAttempts <= 0) {
        setGameState('lost');
      }
      return newAttempts;
    });
  }, []);

  const handleCopyCode = async () => {
    await navigator.clipboard.writeText(DISCOUNT_CODE);
    setCopied(true);
    toast.success('Discount code copied to clipboard!');
    setTimeout(() => {
      onClose();
      setCopied(false);
      setGameState('start');
    }, 1500);
  };

  const handleTryAgain = () => {
    setGameState('start');
    setAttempts(3);
    setScore(0);
  };

  const handleClose = () => {
    onClose();
    setGameState('start');
    setAttempts(3);
    setScore(0);
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="max-w-4xl w-full bg-background/95 backdrop-blur-xl border-gold/20 p-0 overflow-hidden">
        <DialogTitle className="sr-only">The Trial of the Mount</DialogTitle>
        
        {/* Close button */}
        <button
          onClick={handleClose}
          className="absolute right-4 top-4 z-50 rounded-full p-2 bg-background/50 text-gold hover:bg-background/80 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Game UI Overlay - Attempts & Score */}
        {gameState === 'playing' && (
          <div className="absolute top-4 left-4 z-40 flex gap-6">
            <div className="bg-background/80 backdrop-blur px-4 py-2 rounded-lg border border-gold/30">
              <span className="text-gold font-display text-sm">Attempts: </span>
              <span className="text-gold font-bold">{attempts}</span>
            </div>
            <div className="bg-background/80 backdrop-blur px-4 py-2 rounded-lg border border-gold/30">
              <span className="text-gold font-display text-sm">Score: </span>
              <span className="text-gold font-bold">{score}</span>
            </div>
          </div>
        )}

        <AnimatePresence mode="wait">
          {/* Start Screen */}
          {gameState === 'start' && (
            <motion.div
              key="start"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex flex-col items-center justify-center min-h-[600px] p-8 text-center"
            >
              <div className="mb-8">
                <motion.div
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 0.2 }}
                  className="w-24 h-24 mx-auto mb-6 rounded-full border-4 border-gold shadow-[0_0_30px_rgba(212,175,55,0.5)] flex items-center justify-center"
                >
                  <div className="w-16 h-16 rounded-full border-4 border-gold/50" />
                </motion.div>
                <h2 className="text-4xl font-display text-gold mb-4 tracking-wider">
                  The Trial of the Mount
                </h2>
                <p className="text-muted-foreground max-w-md mx-auto leading-relaxed">
                  Prove your worth by casting the Ring upon the Dark Spire. 
                  Drag back on the ring and release to throw. 
                  Land it upon the tower to claim your reward.
                </p>
              </div>

              <div className="space-y-4">
                <div className="flex gap-4 text-sm text-muted-foreground">
                  <span className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-gold" />
                    3 Attempts
                  </span>
                  <span className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-magma-500" />
                    Click & Drag to Throw
                  </span>
                </div>
                <Button
                  onClick={handleStartGame}
                  variant="molten"
                  size="xl"
                  className="font-display tracking-wide"
                >
                  Begin the Test
                </Button>
              </div>

              {/* Background decoration */}
              <div className="absolute inset-0 -z-10">
                <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-magma-900/30 to-transparent" />
                <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-96 h-96 bg-magma-500/5 rounded-full blur-3xl" />
              </div>
            </motion.div>
          )}

          {/* Playing State */}
          {gameState === 'playing' && (
            <motion.div
              key="playing"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex items-center justify-center p-8"
            >
              <GameCanvas
                onScore={handleScore}
                onMiss={handleMiss}
                isPlaying={gameState === 'playing'}
              />
            </motion.div>
          )}

          {/* Win State */}
          {gameState === 'won' && (
            <motion.div
              key="won"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              className="flex flex-col items-center justify-center min-h-[600px] p-8 text-center"
            >
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                <div className="w-32 h-32 mx-auto mb-8 rounded-full bg-gold/10 border-2 border-gold flex items-center justify-center shadow-[0_0_60px_rgba(212,175,55,0.4)]">
                  <div className="w-20 h-20 rounded-full border-4 border-gold animate-pulse" />
                </div>
                <h2 className="text-4xl font-display text-gold mb-4 tracking-wider">
                  A Gift is Granted
                </h2>
                <p className="text-muted-foreground mb-8 max-w-md">
                  You have proven yourself worthy. Accept this token of power 
                  and use it to claim your artifacts.
                </p>

                <div className="bg-background/60 border border-gold/40 rounded-lg p-6 mb-8">
                  <p className="text-sm text-muted-foreground mb-2">Your Discount Code</p>
                  <p className="text-3xl font-display text-gold tracking-[0.3em]">
                    {DISCOUNT_CODE}
                  </p>
                </div>

                <Button
                  onClick={handleCopyCode}
                  variant="gold"
                  size="xl"
                  className="font-display tracking-wide gap-2"
                >
                  {copied ? (
                    <>
                      <Check className="w-5 h-5" />
                      Claimed!
                    </>
                  ) : (
                    <>
                      <Copy className="w-5 h-5" />
                      Claim Your Prize
                    </>
                  )}
                </Button>
              </motion.div>

              {/* Victory glow */}
              <div className="absolute inset-0 -z-10">
                <div className="absolute inset-0 bg-gradient-radial from-gold/10 via-transparent to-transparent" />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-gold/5 rounded-full blur-3xl animate-pulse" />
              </div>
            </motion.div>
          )}

          {/* Lose State */}
          {gameState === 'lost' && (
            <motion.div
              key="lost"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex flex-col items-center justify-center min-h-[600px] p-8 text-center"
            >
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                {/* Eye of Sauron representation */}
                <div className="w-32 h-20 mx-auto mb-8 relative">
                  <div className="absolute inset-0 bg-magma-500/20 rounded-[50%] blur-xl animate-pulse" />
                  <div className="absolute inset-2 border-2 border-magma-500 rounded-[50%]" />
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-12 bg-magma-500 rounded-full shadow-[0_0_20px_rgba(139,0,0,0.8)]" />
                </div>

                <h2 className="text-4xl font-display text-magma-400 mb-4 tracking-wider">
                  The Eye Sees All
                </h2>
                <p className="text-muted-foreground mb-8 max-w-md">
                  You have failed the trial. The Ring eludes your grasp... for now. 
                  Return when your resolve is stronger.
                </p>

                <div className="flex gap-4">
                  <Button
                    onClick={handleTryAgain}
                    variant="molten"
                    size="xl"
                    className="font-display tracking-wide"
                  >
                    Try Again
                  </Button>
                  <Button
                    onClick={handleClose}
                    variant="outline"
                    size="xl"
                    className="font-display tracking-wide border-gold/30 text-gold hover:bg-gold/10"
                  >
                    Return
                  </Button>
                </div>
              </motion.div>

              {/* Defeat atmosphere */}
              <div className="absolute inset-0 -z-10">
                <div className="absolute inset-0 bg-gradient-to-t from-magma-900/40 to-transparent" />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </DialogContent>
    </Dialog>
  );
};
