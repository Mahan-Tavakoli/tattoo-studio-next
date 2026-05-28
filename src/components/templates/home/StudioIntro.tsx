"use client";

import CountUp from "react-countup";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

const stats = [
  {
    number: 1200,
    suffix: "+",
    label: "Tattoos",
  },
  {
    number: 10,
    suffix: "+",
    label: "Years Experience",
  },
  {
    number: 350,
    suffix: "+",
    label: "Consultations",
  },
  {
    number: 12,
    suffix: "+",
    label: "Guest Artists",
  },
];

function StudioIntro() {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.3,
  });

  return (
    <section
      ref={ref}
      className="relative py-24 px-[5%] border-y border-snow/10 overflow-hidden"
    >
      <div className="container mx-auto relative z-10">
        {/* Statement */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center max-w-4xl mx-auto"
        >
          <p className="text-sm uppercase tracking-[0.4em] text-snow/40 mb-6 font-semibold">
            Block 13 Studio
          </p>

          <h2 className="text-3xl sm:text-5xl leading-tight font-light">
            Custom tattoos crafted with precision, atmosphere and individuality.
          </h2>

          <p className="mt-8 text-snow/60 max-w-2xl mx-auto leading-relaxed">
            From fine line to full custom concepts, every session is designed
            collaboratively to create timeless work with meaning.
          </p>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="grid grid-cols-2 lg:grid-cols-4 gap-10 mt-20"
        >
          {stats.map((stat, i) => (
            <div
              key={i}
              className="text-center border border-snow/10 rounded-2xl py-8 bg-onyx/40 backdrop-blur-xs"
            >
              <h3 className="text-2xl sm:text-4xl font-semibold">
                {inView && (
                  <CountUp
                    end={stat.number}
                    duration={2.5}
                    suffix={stat.suffix}
                  />
                )}
              </h3>

              <p className="mt-3 text-snow/50 uppercase tracking-widest text-xs md:text-sm">
                {stat.label}
              </p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

export default StudioIntro;
