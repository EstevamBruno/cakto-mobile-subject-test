import { create } from "zustand";
import { Transaction } from "@/types";
import { api } from "@/services/api";

interface TransactionState {
  transactions: Transaction[];
  isLoading: boolean;
  isLoadingMore: boolean;
  page: number;
  hasMore: boolean;
  error: string | null;
  balance: number;
  fetchTransactions: (page?: number) => Promise<void>;
  fetchBalance: () => Promise<void>;
  reset: () => void;
}

/**
 * TODO: Implementar useTransactionStore com Zustand
 *
 * Requisitos:
 * - fetchTransactions(page): chamar api.getTransactions(page)
 *   - Se page === 1: substituir lista (isLoading = true)
 *   - Se page > 1: append à lista (isLoadingMore = true)
 *   - Atualizar hasMore e page a partir da resposta
 * - fetchBalance(): chamar api.getBalance()
 * - reset(): limpar transactions, resetar page para 1, hasMore para true
 *
 * Dicas:
 * - Usar `get()` do Zustand para acessar estado atual dentro de actions
 * - Se page não for passado, usar get().page como padrão
 * - api.getTransactions e api.getBalance estão em "../services/api"
 *
 * Referência: SPEC.md seção 7 — Store de Estado
 */
export const useTransactionStore = create<TransactionState>((set, get) => ({
  transactions: [],
  isLoading: false,
  isLoadingMore: false,
  page: 1,
  hasMore: true,
  error: null,
  balance: 0,

  fetchTransactions: async (_page?: number) => {
    const page = _page ?? get().page;

    if (page === 1) {
      set({ isLoading: true, error: null });
    } else {
      set({ isLoadingMore: true, error: null });
    }

    try {
      const response = await api.getTransactions(page);

      set((state) => ({
        transactions:
          page === 1
            ? response.data
            : [...state.transactions, ...response.data],
        hasMore: response.hasMore,
        page: response.page,
        isLoading: false,
        isLoadingMore: false,
      }));
    } catch (error) {
      set({
        error: (error as Error).message,
        isLoading: false,
        isLoadingMore: false,
      });
    }
  },

  fetchBalance: async () => {
    try {
      const response = await api.getBalance();
      set({ balance: response.balance });
    } catch (error) {
      set({ error: (error as Error).message });
    }
  },

  reset: () => {
    set({ transactions: [], page: 1, hasMore: true, balance: 0, error: null });
  },
}));
