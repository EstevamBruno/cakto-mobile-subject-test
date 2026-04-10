import React, { memo, useCallback } from "react";
import { View, Text, StyleSheet } from "react-native";
import { ArrowDownLeft, ArrowUpRight } from "lucide-react-native";
import { Transaction } from "../types";
import { colors, typography, spacing, borderRadius } from "../theme";
import { formatCurrency, formatDate } from "../utils/format";

interface TransactionItemProps {
  transaction: Transaction;
}

/**
 * TODO: Implementar componente TransactionItem
 *
 * Requisitos:
 * - Ícone à esquerda com fundo colorido (verde income, vermelho expense)
 * - Usar ArrowDownLeft (income) e ArrowUpRight (expense) do lucide-react-native
 * - Descrição da transação + data formatada (usar formatDate)
 * - Valor à direita (verde para positivo, vermelho para negativo)
 * - Formatação de valor com formatCurrency
 * - Usar React.memo para otimização
 * - useCallback para renderIcon
 *
 * Referência: SPEC.md seção 5 — Componentes Reutilizáveis
 */
export const TransactionItem = memo(function TransactionItem({
  transaction,
}: TransactionItemProps) {
  const isIncome = transaction.type === "income";

  const renderIcon = useCallback(() => {
    if (isIncome) {
      return (
        <View style={[styles.iconContainer, styles.incomeIconBg]}>
          <ArrowDownLeft size={18} color={colors.success} />
        </View>
      );
    }
    return (
      <View style={[styles.iconContainer, styles.expenseIconBg]}>
        <ArrowUpRight size={18} color={colors.danger} />
      </View>
    );
  }, [isIncome]);

  return (
    <View
      style={styles.container}
      accessibilityLabel={`${transaction.description}, ${formatDate(transaction.date)}, ${isIncome ? "entrada" : "saída"} de ${formatCurrency(transaction.amount)}`}
    >
      {renderIcon()}

      <View style={styles.info}>
        <Text style={styles.description} numberOfLines={1}>
          {transaction.description}
        </Text>
        <Text style={styles.date}>{formatDate(transaction.date)}</Text>
      </View>

      <Text
        style={[
          styles.amount,
          isIncome ? styles.incomeAmount : styles.expenseAmount,
        ]}
      >
        {isIncome ? "+" : "-"}
        {formatCurrency(transaction.amount)}
      </Text>
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.sm,
    gap: spacing.md,
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: borderRadius.full,
    alignItems: "center",
    justifyContent: "center",
  },
  incomeIconBg: {
    backgroundColor: `${colors.success}20`,
  },
  expenseIconBg: {
    backgroundColor: `${colors.danger}20`,
  },
  info: {
    flex: 1,
    gap: spacing.xs / 2,
  },
  description: {
    fontSize: typography.sm,
    fontWeight: "500",
    color: colors.text,
  },
  date: {
    fontSize: typography.xs,
    color: colors.textSecondary,
  },
  amount: {
    fontSize: typography.sm,
    fontWeight: "600",
  },
  incomeAmount: {
    color: colors.success,
  },
  expenseAmount: {
    color: colors.danger,
  },
});
