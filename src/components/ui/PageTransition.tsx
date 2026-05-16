'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { usePathname } from 'next/navigation';
import { ReactNode } from 'react';

export default function PageTransition({ children }: { children: ReactNode }) {
  const pathname = usePathname();

  return (
    <AnimatePresence mode="wait">
      <motion.div key={pathname}>
        {/* Curtain overlay */}
        <motion.div
          className="fixed inset-0 z-[100] pointer-events-none"
          style={{ background: 'var(--accent-primary)' }}
          initial={{ scaleY: 0, transformOrigin: 'top' }}
          animate={{ scaleY: 0, transformOrigin: 'top' }}
          exit={{
            scaleY: [0, 1, 1, 0],
            transformOrigin: ['top', 'top', 'bottom', 'bottom'],
          }}
          transition={{
            duration: 1,
            ease: [0.76, 0, 0.24, 1],
            times: [0, 0.4, 0.6, 1],
          }}
        />

        {/* Page content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.5, ease: [0.76, 0, 0.24, 1] }}
        >
          {children}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
