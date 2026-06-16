// public availability
export interface PublicConsultAvailabiltyResponse {
  month: string;
  days: {
    date: string;
    status: string;
    count: number;
  }[];
}

// admin consult slot
export interface ConsultSlotsProps {
  dates: string[];
  maxCount: number;
}

export interface ConsultSlot {
  id: string;
  date: string;
  maxCount: number;
  bookedCount: number;
  available: boolean;
}

export interface ConsultSlotResponse {
  id: string;
  date: string;
  maxCount: number;
  bookedCount: number;
  available: boolean;
}