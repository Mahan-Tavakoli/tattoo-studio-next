export const getProductMeta = (t: (key: string) => string) => ({
  HALF_DAY: {
    badge: t("meta.halfDay.badge"),
    subtitle: t("meta.halfDay.subtitle"),
    description: t("meta.halfDay.description"),
    features: [
      t("meta.halfDay.features.0"),
      t("meta.halfDay.features.1"),
      t("meta.halfDay.features.2"),
    ],
  },

  FULL_DAY: {
    badge: t("meta.fullDay.badge"),
    subtitle: t("meta.fullDay.subtitle"),
    description: t("meta.fullDay.description"),
    features: [
      t("meta.fullDay.features.0"),
      t("meta.fullDay.features.1"),
      t("meta.fullDay.features.2"),
    ],
  },

  CUSTOM: {
    badge: t("meta.custom.badge"),
    subtitle: t("meta.custom.subtitle"),
    description: t("meta.custom.description"),
    features: [
      t("meta.custom.features.0"),
      t("meta.custom.features.1"),
      t("meta.custom.features.2"),
    ],
  },
});
