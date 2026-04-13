import type { useTransactionsModel } from "@/screens/Transactions/Transactions.model";

export type FilterType = "all" | "income" | "expense";

export interface TransactionsViewProps
  extends ReturnType<typeof useTransactionsModel> {}
