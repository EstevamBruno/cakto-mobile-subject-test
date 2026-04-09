import React from "react"
import { View, Text, StyleSheet } from "react-native"
import { colors, spacing, typography } from "../src/theme"

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
  return (
    <View style={styles.container}>
      <Text style={styles.title}>🏦</Text>
      <Text style={styles.subtitle}>Implemente a tela Home</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.background,
    padding: spacing.xl,
  },
  title: {
    fontSize: 64,
  },
  subtitle: {
    fontSize: typography.md,
    color: colors.textSecondary,
    marginTop: spacing.lg,
  },
})
