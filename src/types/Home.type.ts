import type { useHomeModel } from "@/screens/Home/Home.model";
import type { User, Transaction } from "@/types";

export interface HomeModelModule {
  user: User | null;
  balance: number;
  transactions: Transaction[];
  isLoading: boolean;
  fetchTransactions: (page?: number) => Promise<void>;
  fetchBalance: () => Promise<void>;
  logout: () => Promise<void>;
}

export interface HomeViewProps extends ReturnType<typeof useHomeModel> {}
