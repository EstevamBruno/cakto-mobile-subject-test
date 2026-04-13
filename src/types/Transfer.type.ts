import type { useTransferModel } from "@/screens/Transfer/Transfer.model";
import type { TransferData } from "@/types";

export type TransferStep = "form" | "review" | "result";

export interface TransferModelModule {
  transfer: (
    data: TransferData,
  ) => Promise<{ success: boolean; transactionId: string }>;
}

export interface TransferViewProps
  extends ReturnType<typeof useTransferModel> {}

export interface ReviewRowProps {
  label: string;
  value: string;
  valueStyle?: object;
}
