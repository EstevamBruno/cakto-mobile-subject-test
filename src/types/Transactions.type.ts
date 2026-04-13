import type { useTransactionsModel } from "@/screens/Transactions/Transactions.model";
import type { Transaction } from "@/types";

export type FilterType = "all" | "income" | "expense";

export interface TransactionsModelModule {
  transactions: Transaction[];
  isLoading: boolean;
  isLoadingMore: boolean;
  page: number;
  hasMore: boolean;
  fetchTransactions: (page?: number) => Promise<void>;
}

export interface TransactionsViewProps
  extends ReturnType<typeof useTransactionsModel> {}
