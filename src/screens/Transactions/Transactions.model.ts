import { useState, useCallback, useMemo } from "react";
import { Transaction } from "@/types";
import type { FilterType } from "@/types/Transactions.type";

interface TransactionsModelModule {
  transactions: Transaction[];
  isLoading: boolean;
  isLoadingMore: boolean;
  page: number;
  hasMore: boolean;
  fetchTransactions: (page?: number) => Promise<void>;
}

export const useTransactionsModel = (module: TransactionsModelModule) => {
  const {
    transactions,
    isLoading,
    isLoadingMore,
    page,
    hasMore,
    fetchTransactions,
  } = module;

  const [filterType, setFilterType] = useState<FilterType>("all");
  const [isRefreshing, setIsRefreshing] = useState(false);

  const filteredTransactions = useMemo(() => {
    if (filterType === "all") return transactions;
    return transactions.filter((t) => t.type === filterType);
  }, [transactions, filterType]);

  const onRefresh = useCallback(async () => {
    setIsRefreshing(true);
    await fetchTransactions(1);
    setIsRefreshing(false);
  }, [fetchTransactions]);

  const onEndReached = useCallback(() => {
    if (isLoadingMore || isLoading || !hasMore) return;
    fetchTransactions(page + 1);
  }, [isLoadingMore, isLoading, hasMore, fetchTransactions, page]);

  const onSelectFilter = useCallback((filter: FilterType) => {
    setFilterType(filter);
  }, []);

  return {
    transactions: filteredTransactions,
    isLoading,
    isLoadingMore,
    isRefreshing,
    hasMore,
    filterType,
    onRefresh,
    onEndReached,
    onSelectFilter,
  };
};
