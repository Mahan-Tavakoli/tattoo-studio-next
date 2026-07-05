import { AxiosResponse } from "axios";
import http from "./httpService";
import {
  PaymentStatusResponse,
  ProductInfo,
  PurchaseInfo,
  PurchaseResponse,
} from "../schema & types/product/product.types";

export default function getProductsApi(): Promise<ProductInfo[]> {
  return http
    .get("/vouchers/products")
    .then(({ data }: AxiosResponse<ProductInfo[]>) => data);
}

export function makePurchaseVoucherApi(
  newPurchase: PurchaseInfo,
): Promise<PurchaseResponse> {
  return http
    .post("/vouchers/purchase", newPurchase)
    .then(({ data }: AxiosResponse<PurchaseResponse>) => data);
}

export function checkPaymentStatus(
  sessionId: string,
): Promise<PaymentStatusResponse> {
  return http
    .get("/payments/status", {
      params: {
        sessionId,
      },
    })
    .then(({ data }: AxiosResponse<PaymentStatusResponse>) => data);
}
