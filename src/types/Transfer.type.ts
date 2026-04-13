import type { useTransferModel } from "@/screens/Transfer/Transfer.model";

export type TransferStep = "form" | "review" | "result";

export interface TransferViewProps
  extends ReturnType<typeof useTransferModel> {}

export interface ReviewRowProps {
  label: string;
  value: string;
  valueStyle?: object;
}
