"use client";

import { ProductInfo } from "@/components/schema & types/product/product.types";
import useProducts from "./useProducts";
import { useMemo } from "react";
import {
  createPurchaseSchema,
  PurchaseFormData,
} from "@/components/schema & types/product/product.schema";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import InputField from "@/components/ui/InputField";
import ReadOnlyField from "@/components/ui/ReadOnlyField";
import DotsLoader from "@/components/ui/DotsLoader";
import SelectBox from "@/components/ui/SelectBox";
import { useTranslations } from "next-intl";

interface PurchaseFormProps {
  product: ProductInfo;
}

function PurchaseForm({ product }: PurchaseFormProps) {
  const t = useTranslations("product");
  const { makePurchase, makePurchaseIsPending } = useProducts();
  const schema = useMemo(
    () => createPurchaseSchema(product.type),
    [product.type],
  );

  const DeliveryOptions = [
    { id: 1, value: "EMAIL", label: t("delivery.email") },
    { id: 2, value: "EMAIL_AND_POST", label: t("delivery.post") },
  ];

  const {
    register,
    watch,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<PurchaseFormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      productId: product.id,
      amount:
        product.type === "CUSTOM"
          ? undefined
          : (product.finalPriceCents ?? 0) / 100,
      buyerName: "",
      buyerEmail: "",
      delivery: "EMAIL",
      shippingName: "",
      shippingLine1: "",
      shippingLine2: "",
      shippingPostalCode: "",
      shippingCity: "",
      shippingCountry: "",
    },
  });

  const delivery = watch("delivery");

  const onSubmit = (data: PurchaseFormData) => {
    console.log("purchaseData =>", data);
    const newPurchase = {
      productId: data.productId,
      buyerName: data.buyerName,
      buyerEmail: data.buyerEmail,
      delivery: data.delivery,

      ...(product.type === "CUSTOM" && {
        amountCents: data.amount * 100,
      }),

      ...(data.delivery === "EMAIL_AND_POST" && {
        shippingName: data.shippingName,
        shippingLine1: data.shippingLine1,
        shippingLine2: data.shippingLine2,
        shippingPostalCode: data.shippingPostalCode,
        shippingCity: data.shippingCity,
        shippingCountry: data.shippingCountry,
      }),
    };
    console.log("newPurchase >", newPurchase);
    makePurchase(newPurchase);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <h3 className="text-xl font-semibold">{t("purchase.title")}</h3>

      <p className="mt-2 mb-6">{product.name}</p>

      {product.type === "CUSTOM" ? (
        <InputField<PurchaseFormData>
          name="amount"
          label={t("purchase.amountMinimum")}
          register={register}
          errors={errors.amount}
          type="tel"
          required
        />
      ) : (
        <ReadOnlyField
          label={t("purchase.voucherValue")}
          value={`€${((product.finalPriceCents ?? 0) / 100).toFixed(0)}`}
        />
      )}

      <InputField<PurchaseFormData>
        name="buyerName"
        label={t("purchase.fullName")}
        register={register}
        errors={errors.buyerName}
        required
      />

      <InputField<PurchaseFormData>
        name="buyerEmail"
        type="email"
        label={t("purchase.email")}
        errors={errors.buyerEmail}
        register={register}
        required
      />

      <SelectBox<PurchaseFormData>
        name="delivery"
        label={t("purchase.delivery")}
        register={register}
        errors={errors.delivery}
        options={DeliveryOptions}
        //defaultValue={DeliveryOptions[0].value}
        required
      />

      {delivery === "EMAIL_AND_POST" && (
        <>
          <InputField<PurchaseFormData>
            name="shippingName"
            label={t("purchase.recipient")}
            errors={errors.shippingName}
            register={register}
            required
          />

          <InputField<PurchaseFormData>
            name="shippingLine1"
            label={t("purchase.address1")}
            errors={errors.shippingLine1}
            register={register}
            required
          />

          <InputField<PurchaseFormData>
            name="shippingLine2"
            label={t("purchase.address2")}
            errors={errors.shippingLine2}
            register={register}
            required
          />

          <InputField<PurchaseFormData>
            name="shippingPostalCode"
            label={t("purchase.postalCode")}
            errors={errors.shippingPostalCode}
            register={register}
            type="tel"
            required
          />
          <InputField<PurchaseFormData>
            name="shippingCity"
            label={t("purchase.city")}
            errors={errors.shippingCity}
            register={register}
            required
          />

          <InputField<PurchaseFormData>
            name="shippingCountry"
            label={t("purchase.country")}
            errors={errors.shippingCountry}
            register={register}
            required
          />
        </>
      )}

      <button
        type="submit"
        className="submit-btn items-center justify-center flex w-full"
        disabled={makePurchaseIsPending || !isValid}
      >
        {makePurchaseIsPending ? (
          <>
            {t("purchase.redirecting")} <DotsLoader />
          </>
        ) : (
          t("purchase.checkout")
        )}
      </button>
    </form>
  );
}

export default PurchaseForm;
