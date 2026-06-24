import { Gift, Check } from "lucide-react";
import { ProductInfo } from "@/components/schema & types/product/product.types";
import { productMeta } from "./productMeta";
import clsx from "clsx";
import { badgeStyles } from "@/components/templates/product/productBadgeStyle";

interface ProductCardProps {
  product: ProductInfo;
  onPurchase: () => void;
}

export default function ProductCard({ product, onPurchase }: ProductCardProps) {
  const meta = productMeta[product.type];

  const price =
    product.finalPriceCents != null
      ? (product.finalPriceCents / 100).toFixed(0)
      : null;

  return (
    <article className="relative flex flex-col rounded-3xl border border-snow/20 bg-onyx/50 backdrop-blur-sm p-8 transition-all duration-300 hover:shadow-md shadow-snow/10 shadow">
      {meta.badge && (
        <div className="absolute -top-3 left-1/2 -translate-x-1/2">
          <span
            className={clsx(
              "rounded-full px-4 py-1 text-xs font-semibold uppercase tracking-wider",
              badgeStyles[product.type],
            )}
          >
            {meta.badge}
          </span>
        </div>
      )}

      <div className="mb-6 flex justify-center">
        <div className="flex h-14 w-14 items-center justify-center rounded-full border border-snow/20">
          <Gift className="size-6" />
        </div>
      </div>

      <div className="text-center">
        <p className="text-sm uppercase tracking-[0.25em] text-snow/60">
          {meta.subtitle}
        </p>

        <h2 className="mt-3 text-2xl font-bold">{product.nameEn}</h2>

        <p className="mt-3 text-snow/70">{meta.description}</p>
      </div>

      <div className="my-8 text-center">
        {price ? (
          <>
            <div className="text-5xl font-black tracking-tight">€{price}</div>

            <p className="mt-2 text-sm text-snow/60">Voucher Value</p>
          </>
        ) : (
          <>
            <div className="text-4xl font-black">Custom</div>

            <p className="mt-2 text-sm text-snow/60">Choose your own amount</p>
          </>
        )}
      </div>

      <ul className="space-y-4 flex-1">
        {meta.features.map((feature) => (
          <li
            key={feature}
            className="flex items-start gap-3 text-sm text-snow/80"
          >
            <Check className="mt-0.5 size-4 shrink-0" />
            <span>{feature}</span>
          </li>
        ))}
      </ul>

      <button
        className="mt-8 w-full rounded-xl py-3 font-semibold
          transition-all duration-200 border border-snow/20 hover:border-snow/30"
        onClick={onPurchase}
      >
        Purchase Voucher
      </button>
    </article>
  );
}
