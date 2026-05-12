"use client";

import { motion } from "framer-motion";

const items = [
  "CUSTOM",
  "BLACKWORK",
  "FINE LINE",
  "PIERCING",
  "GUEST ARTISTS",
  "REALISM",
  "JAPANESE",
  "MINIMAL",
];

function StudioMarquee() {
  return (
    <section className="border-y border-snow/10 overflow-hidden py-6 bg-onyx">
      <motion.div
        animate={{ x: ["0%", "-50%"] }}
        transition={{
          duration: 18,
          repeat: Infinity,
          ease: "linear",
        }}
        className="flex whitespace-nowrap"
      >
        {[...items, ...items].map((item, index) => (
          <div
            key={index}
            className="flex items-center text-2xl sm:text-4xl uppercase tracking-[0.3em] text-snow/30 px-10"
          >
            <span>{item}</span>

            <span className="ml-10 text-snow/15">•</span>
          </div>
        ))}
      </motion.div>
    </section>
  );
}

export default StudioMarquee;
