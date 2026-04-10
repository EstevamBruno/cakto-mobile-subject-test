import React, { useEffect } from "react";
import { useTransactionStore } from "@/stores";
import { useTransactionsModel } from "@/screens/Transactions/Transactions.model";
import { TransactionsView } from "@/screens/Transactions/Transactions.view";

/**
 * TODO: Implementar tela de Transações (Extrato)
 *
 * Requisitos:
 * - Header com título "Extrato"
 * - Filtros: "Todas" | "Receitas" | "Despesas" (toggle pills)
 *   - Filtro funcional client-side (filter por transaction.type)
 * - FlatList com TransactionItem para cada transação
 *   - Paginação infinita com onEndReached
 *   - onEndReachedThreshold={0.5}
 *   - Loading indicator no footer durante carregamento
 * - Pull-to-refresh (RefreshControl) — reload page 1
 * - Empty state quando filtro não retorna resultados
 * - Performance: removeClippedSubviews, maxToRenderPerBatch, windowSize
 * - Usar useCallback para renderItem e handlers
 * - useSafeAreaInsets para padding top
 *
 * Componentes: TransactionItem (de src/components)
 * Store: useTransactionStore (de src/stores)
 * Types: Transaction (de src/types)
 *
 * Referência: SPEC.md seção 3
 */
export default function TransactionsScreen() {
  const {
    transactions,
    isLoading,
    isLoadingMore,
    page,
    hasMore,
    fetchTransactions,
  } = useTransactionStore();

  useEffect(() => {
    fetchTransactions(1);
  }, []);

  const transactionsModel = useTransactionsModel({
    transactions,
    isLoading,
    isLoadingMore,
    page,
    hasMore,
    fetchTransactions,
  });

  return <TransactionsView {...transactionsModel} />;
}
