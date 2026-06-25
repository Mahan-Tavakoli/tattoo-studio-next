export type ProductType = "FULL_DAY" | "HALF_DAY" | "CUSTOM";
export type DeliveryType = "EMAIL" | "EMAIL_AND_POST";

export interface ProductInfo {
  id: string;
  type: ProductType;
  name: string;
  nameDe: string;
  nameEn: string;
  priceCents: number | null;
  discountPercent: number | 0;
  finalPriceCents: number | null;
}

export interface PurchaseInfo {
  productId: string;
  amountCents: number;
  buyerName: string;
  buyerEmail: string;
  delivery: DeliveryType;
  shippingName?: string;
  shippingLine1?: string;
  shippingLine2?: string;
  shippingPostalCode?: string;
  shippingCity?: string;
  shippingCountry?: string;
}

export interface PurchaseResponse {
  sale: {
    id: string;
    status: string;
    grossCents: number;
  };

  stripePaymentUrl: string;
}
