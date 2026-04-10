import React, { useEffect } from "react";
import { useAuthStore, useTransactionStore } from "@/stores";
import { useHomeModel } from "@/screens/Home/Home.model";
import { HomeView } from "@/screens/Home/Home.view";

/**
 * TODO: Implementar tela Home (Dashboard)
 *
 * Requisitos:
 * - Header com saudação ("Olá,") + nome do usuário + avatar com iniciais (getInitials)
 * - BalanceCard com saldo (useTransactionStore.balance)
 * - Grid de atalhos (4 itens): Transferir, Cartão virtual, Investimentos, Configurações
 *   - Apenas "Transferir" navega para /transfer
 * - Seção "Últimas transações" (primeiras 5 da lista)
 *   - Link "Ver mais" navega para /transactions
 * - Pull-to-refresh (RefreshControl)
 * - Botão de logout no avatar (ou header)
 * - Ao fazer logout, redirecionar para /login
 * - useSafeAreaInsets para padding do header
 *
 * Componentes disponíveis: BalanceCard, Card, TransactionItem (de src/components)
 * Stores: useAuthStore, useTransactionStore (de src/stores)
 * Ícones: ArrowUpRight, CreditCard, BarChart3, Settings, LogOut (de lucide-react-native)
 *
 * Referência: SPEC.md seção 2
 */
export default function HomeScreen() {
  const { user, logout } = useAuthStore();
  const { balance, transactions, isLoading, fetchTransactions, fetchBalance } =
    useTransactionStore();

  useEffect(() => {
    Promise.all([fetchBalance(), fetchTransactions(1)]);
  }, []);

  const homeModel = useHomeModel({
    user,
    balance,
    transactions,
    isLoading,
    fetchTransactions,
    fetchBalance,
    logout,
  });

  return <HomeView {...homeModel} />;
}
