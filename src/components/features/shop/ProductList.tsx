"use client";

import { useState } from "react";
import ProductCard from "./ProductCard";
import useProducts from "./useProducts";
import { ProductInfo } from "@/components/schema & types/product/product.types";
import Modal from "@/components/ui/Modal";
import PurchaseForm from "./PurchaseForm";
import ProductCardSkeleton from "@/components/templates/skeleton/skeletons/product/ProductCardSkeleton";
import { useTranslations } from "next-intl";

export default function ProductList() {
  const t = useTranslations("product");
  const { products, productsIsLoading, productsIsError } = useProducts();
  const [purchaseInfo, setPurchaseInfo] = useState<ProductInfo | null>(null);

  if (productsIsLoading) {
    return (
      <>
        <div className="mx-auto mb-20 max-w-3xl text-center animate-pulse">
          <div className="mx-auto h-4 w-40 rounded bg-snow/10" />

          <div className="mx-auto mt-6 h-12 w-96 rounded bg-snow/10" />

          <div className="mx-auto mt-6 h-5 w-full max-w-xl rounded bg-snow/10" />
        </div>

        <div className="grid gap-8 lg:grid-cols-3">
          {Array.from({ length: 3 }).map((_, i) => (
            <ProductCardSkeleton key={i} />
          ))}
        </div>
      </>
    );
  }

  if (productsIsError) {
    return <div>{t("loadError")}</div>;
  }

  const order = {
    HALF_DAY: 1,
    FULL_DAY: 2,
    CUSTOM: 3,
  };

  const sortedProducts = [...products].sort(
    (a, b) => order[a.type] - order[b.type],
  );

  return (
    <>
      <div className="mx-auto mb-20 max-w-3xl text-center">
        <p className="mb-4 uppercase tracking-[0.3em] text-snow/50">
          {t("hero.badge")}
        </p>

        <h1 className="text-5xl font-black tracking-tight">
          {t("hero.title")}
        </h1>

        <p className="mt-6 text-lg text-snow/70">{t("hero.description")}</p>
      </div>

      <div className="grid gap-8 lg:grid-cols-3">
        {sortedProducts.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            onPurchase={() => setPurchaseInfo(product)}
          />
        ))}
      </div>

      {purchaseInfo && (
        <Modal title={t("modal.title")} onClose={() => setPurchaseInfo(null)}>
          <PurchaseForm product={purchaseInfo} />
        </Modal>
      )}
    </>
  );
}
