import { useState, useCallback, useMemo } from "react"
import { getInitials } from "@/utils/format"
import type { HomeModelModule } from "@/types/Home.type"

export const useHomeModel = (module: HomeModelModule) => {
  const { user, balance, transactions, isLoading, fetchTransactions, fetchBalance, logout } = module

  const [isRefreshing, setIsRefreshing] = useState(false)

  const onRefresh = useCallback(async () => {
    setIsRefreshing(true)
    await Promise.all([fetchBalance(), fetchTransactions(1)])
    setIsRefreshing(false)
  }, [fetchBalance, fetchTransactions])

  const onLogout = useCallback(async () => {
    await logout()
  }, [logout])

  const initials = user ? getInitials(user.name) : ""
  const lastTransactions = useMemo(() => transactions.slice(0, 5), [transactions])

  return {
    user,
    balance,
    lastTransactions,
    isLoading,
    isRefreshing,
    initials,
    onRefresh,
    onLogout,
  }
}
