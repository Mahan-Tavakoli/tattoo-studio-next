"use client";

import { PurchaseResponse } from "@/components/schema & types/product/product.types";
import getProductsApi, {
  makePurchaseVoucherApi,
} from "@/components/services/productService";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useTranslations } from "next-intl";
import { toast } from "react-toastify";

export default function useProducts() {
  const t = useTranslations("product");
  // get all products
  const {
    isLoading: productsIsLoading,
    isError: productsIsError,
    data: productsData,
  } = useQuery({
    queryKey: ["products"],
    queryFn: getProductsApi,
  });

  const products = productsData ?? [];

  // Purchase Voucher
  const { isPending: makePurchaseIsPending, mutate: makePurchase } =
    useMutation({
      mutationFn: makePurchaseVoucherApi,

      onSuccess: (data: PurchaseResponse) => {
        toast.success(t("toast.redirecting"));

        window.location.href = data.stripePaymentUrl;
      },

      onError: () => {
        toast.error(t("toast.purchaseFailed"));
      },
    });

  return {
    // all products
    products,
    productsIsLoading,
    productsIsError,

    // Purchase
    makePurchase,
    makePurchaseIsPending,
  };
}
