import { AxiosResponse } from "axios";
import {
  PaymentMethod,
  PaymentResponse,
  PaymentSource,
  PaymentStatus,
} from "../schema & types/payment/payment.types";
import http from "./httpService";

export interface PaymentQueries {
  source: PaymentSource | string;
  method: PaymentMethod | string;
  status: PaymentStatus | string;
  from: string;
  to: string;
}

export default function getAllPaymentsApi({
  source,
  method,
  status,
  from,
  to,
}: PaymentQueries): Promise<PaymentResponse> {
  return http
    .get("/admin/payments", {
      params: {
        ...(source && { source }),
        ...(method && { method }),
        ...(status && { status }),
        ...(from && { from }),
        ...(to && { to }),
      },
    })
    .then(({ data }: AxiosResponse<PaymentResponse>) => data);
}
