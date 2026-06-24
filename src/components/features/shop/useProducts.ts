"use client";

import { PurchaseResponse } from "@/components/schema & types/product/product.types";
import getProductsApi, {
  makePurchaseVoucherApi,
} from "@/components/services/productService";
import { useMutation, useQuery } from "@tanstack/react-query";
import { toast } from "react-toastify";

export default function useProducts() {
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
        toast.success("Redirecting to secure checkout...");

        window.location.href = data.stripePaymentUrl;
      },

      onError: () => {
        toast.error(
          "Failed to start voucher purchase. Please try again later.",
        );
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
