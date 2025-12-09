import { useState } from 'react';
import { motion } from 'framer-motion';
import { RingTossModal } from './RingTossModal';

export const GameFAB = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <motion.button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 z-40 w-16 h-16 rounded-full bg-background/90 border-2 border-gold/50 shadow-[0_0_30px_rgba(212,175,55,0.3)] flex items-center justify-center group hover:border-gold transition-all duration-300"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1 }}
      >
        {/* Ring icon */}
        <div className="relative">
          <div className="w-8 h-8 rounded-full border-[3px] border-gold group-hover:shadow-[0_0_15px_rgba(212,175,55,0.6)] transition-shadow" />
          <motion.div
            className="absolute inset-0 rounded-full border-2 border-gold/30"
            animate={{ scale: [1, 1.3, 1], opacity: [0.5, 0, 0.5] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        </div>

        {/* Tooltip */}
        <span className="absolute right-full mr-3 px-3 py-1.5 bg-background/95 border border-gold/30 rounded-lg text-sm text-gold whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity font-display">
          Trial of the Mount
        </span>
      </motion.button>

      <RingTossModal isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </>
  );
};
