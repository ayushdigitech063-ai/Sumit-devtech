"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function Preloader() {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false);
    }, 450);
    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          className="fixed top-0 inset-x-0 z-[999999] h-[3px] bg-white/10 pointer-events-none overflow-hidden"
        >
          <motion.div
            initial={{ scaleX: 0, originX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.45, ease: [0.65, 0, 0.35, 1] }}
            className="h-full w-full bg-gradient-to-r from-orange-400 via-orange-500 to-[#ff6a1f] shadow-sm shadow-orange-500/50"
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
