import React from "react"
import { View, Text, StyleSheet } from "react-native"
import { colors, spacing, typography } from "@/theme"

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
  return (
    <View style={styles.container}>
      <Text style={styles.title}>📊</Text>
      <Text style={styles.subtitle}>Implemente a tela de Extrato</Text>
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
