"use client";

import { useAppSelector } from "@/hooks/redux";
import moment from "moment";

export default function useIsPaid() {
  const { paid } = useAppSelector((state) => ({
    paid: state.messages.paid,
  }));

  return { isPaid: moment().isBefore(moment(paid)), paidTo: paid };
}
