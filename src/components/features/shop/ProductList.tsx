"use client";

import { useState } from "react";
import ProductCard from "./ProductCard";
import useProducts from "./useProducts";
import { ProductInfo } from "@/components/schema & types/product/product.types";
import Modal from "@/components/ui/Modal";
import PurchaseForm from "./PurchaseForm";

export default function ProductList() {
  const { products, productsIsLoading, productsIsError } = useProducts();
  const [purchaseInfo, setPurchaseInfo] = useState<ProductInfo | null>(null);

  if (productsIsLoading) {
    return <div>Loading...</div>;
  }

  if (productsIsError) {
    return <div>Failed to load products.</div>;
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
          Gift Vouchers
        </p>

        <h1 className="text-5xl font-black tracking-tight">
          Give the Gift of Ink
        </h1>

        <p className="mt-6 text-lg text-snow/70">
          Surprise someone with a tattoo voucher they can use toward their next
          piece. Perfect for birthdays, anniversaries, holidays, and special
          occasions.
        </p>
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
        <Modal title="Purchase" onClose={() => setPurchaseInfo(null)}>
          <PurchaseForm product={purchaseInfo} />
        </Modal>
      )}
    </>
  );
}
