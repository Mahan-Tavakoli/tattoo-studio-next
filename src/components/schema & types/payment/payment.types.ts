export type PaymentSource = "VOUCHER" | "TATTOO" | "GUEST_TABLE";
export type PaymentMethod = "LINK" | "CASH";
export type PaymentStatus = "PAID" | "REFUNDED" | "CANCELLED";
export type PaymentCurrency = "EUR";

export interface PaymentsFilterForm {
  from: Date;
  to: Date;
  source: PaymentSource | string;
  method: PaymentMethod | string;
  status: PaymentStatus | string;
}

export interface PaymentContext {
  source: PaymentSource;
  customerName: string;
  customerEmail: string;
  reference: string;
}

export interface PaymentInfo {
  id: string;
  source: PaymentSource;
  method: PaymentMethod;
  status: PaymentStatus;
  currency: PaymentCurrency;
  grossCents: number;
  netCents: number;
  vatAmountCents: number;
  vatRateBps: number;
  paidAt: string;
  note: string;
  refundedAt: string | null;
  refundedAmountCents: number | null;
  createdByAdmin: null; /* Probably need to be something else in different situation */
  context: PaymentContext;
}

export interface PaymentResponse {
  total: number;
  page: number;
  limit: number;
  items: PaymentInfo[];
}
