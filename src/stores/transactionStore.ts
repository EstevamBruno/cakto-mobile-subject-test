import { create } from "zustand"
import { Transaction } from "../types"

interface TransactionState {
  transactions: Transaction[]
  isLoading: boolean
  isLoadingMore: boolean
  page: number
  hasMore: boolean
  error: string | null
  balance: number
  fetchTransactions: (page?: number) => Promise<void>
  fetchBalance: () => Promise<void>
  reset: () => void
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
    // TODO: implementar
  },

  fetchBalance: async () => {
    // TODO: implementar
  },

  reset: () => {
    // TODO: implementar
  },
}))
