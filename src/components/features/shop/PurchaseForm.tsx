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
import RadioInput from "@/components/ui/RadioInput";
import DotsLoader from "@/components/ui/DotsLoader";
import SelectBox from "@/components/ui/SelectBox";

interface PurchaseFormProps {
  product: ProductInfo;
}

const DeliveryOptions = [
  { id: 1, value: "EMAIL", label: "Email Voucher" },
  { id: 2, value: "EMAIL_AND_POST", label: "Email + Printed Voucher by Post" },
];

function PurchaseForm({ product }: PurchaseFormProps) {
  const { makePurchase, makePurchaseIsPending } = useProducts();
  const schema = useMemo(
    () => createPurchaseSchema(product.type),
    [product.type],
  );
  const defaultAmount =
    product.finalPriceCents != null ? product.finalPriceCents / 100 : 100;

  const {
    register,
    watch,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<PurchaseFormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      productId: product.id,
      amount: defaultAmount,
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
    const payload = {
      ...data,
      amountCents: data.amount * 100,
    };
    console.log("payload =>", payload);
    makePurchase(payload);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="">
      <div className="rounded-2xl border border-snow/20 p-6 flex flex-col gap-y-4">
        <h3 className="text-xl font-semibold">Voucher Details</h3>

        <p className="my-2">{product.name}</p>

        {product.type === "CUSTOM" ? (
          <InputField<PurchaseFormData>
            name="amount"
            label="Voucher Amount (€)"
            register={register}
            errors={errors.amount}
            type="tel"
            required
          />
        ) : (
          <ReadOnlyField
            label="Voucher Value"
            value={`€${((product.finalPriceCents ?? 0) / 100).toFixed(0)}`}
          />
        )}

        <InputField<PurchaseFormData>
          name="buyerName"
          label="Full Name"
          register={register}
          errors={errors.buyerName}
          required
        />

        <InputField<PurchaseFormData>
          name="buyerEmail"
          type="email"
          label="Email Address"
          errors={errors.buyerEmail}
          register={register}
          required
        />

        <SelectBox<PurchaseFormData>
          name="delivery"
          label="Delivery Method"
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
              label="Recipient Name"
              errors={errors.shippingName}
              register={register}
              required
            />

            <InputField<PurchaseFormData>
              name="shippingLine1"
              label="Address Line 1"
              errors={errors.shippingLine1}
              register={register}
              required
            />

            <InputField<PurchaseFormData>
              name="shippingLine2"
              label="Address Line 2 (Optional)"
              errors={errors.shippingLine2}
              register={register}
              required
            />

            <InputField<PurchaseFormData>
              name="shippingPostalCode"
              label="Postal Code"
              errors={errors.shippingPostalCode}
              register={register}
              required
            />
            <InputField<PurchaseFormData>
              name="shippingCity"
              label="City"
              errors={errors.shippingCity}
              register={register}
              required
            />

            <InputField<PurchaseFormData>
              name="shippingCountry"
              label="Country"
              errors={errors.shippingCountry}
              register={register}
              required
            />
          </>
        )}

        <button
          type="submit"
          className="submit-btn items-center justify-center flex w-full"
          //disabled={makePurchaseIsPending || isValid}
        >
          {makePurchaseIsPending ? (
            <>
              Redirecting <DotsLoader />
            </>
          ) : (
            "Continue to Secure Checkout"
          )}
        </button>
      </div>
    </form>
  );
}

export default PurchaseForm;
