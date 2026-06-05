"use client";

import CountUp from "react-countup";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { useTranslations } from "next-intl";

function StudioIntro() {
  const t = useTranslations("studioIntro");

  const stats = [
    {
      number: 1200,
      suffix: "+",
      label: t("stats.tattoos"),
    },
    {
      number: 10,
      suffix: "+",
      label: t("stats.yearsExperience"),
    },
    {
      number: 350,
      suffix: "+",
      label: t("stats.consultations"),
    },
    {
      number: 12,
      suffix: "+",
      label: t("stats.guestArtists"),
    },
  ];

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
            {t("studioName")}
          </p>

          <h2 className="text-3xl sm:text-5xl leading-tight font-light">
            {t("title")}
          </h2>

          <p className="mt-8 text-snow/60 max-w-2xl mx-auto leading-relaxed">
            {t("description")}
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
