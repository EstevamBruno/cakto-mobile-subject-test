import React, { memo, useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Eye, EyeOff, TrendingUp } from "lucide-react-native";
import { colors, typography, spacing, borderRadius, shadows } from "../theme";
import { formatCurrency } from "../utils/format";

interface BalanceCardProps {
  balance: number;
}

/**
 * TODO: Implementar componente BalanceCard
 *
 * Requisitos:
 * - Fundo azul (colors.primary)
 * - Label "Saldo Total" no topo
 * - Valor grande centralizado, formatado em BRL (formatCurrency)
 * - Toggle de visibilidade do saldo (Eye/EyeOff) — estado interno useState
 * - Quando oculto, mostrar "••••••••"
 * - Indicador de tendência (TrendingUp + "+2.5% este mês") — mockado
 * - Sombra (shadows.lg), borderRadius xl
 *
 * Referência: SPEC.md seção 5 — Componentes Reutilizáveis
 */
export const BalanceCard = memo(function BalanceCard({
  balance,
}: BalanceCardProps) {
  const [isVisible, setIsVisible] = useState(true);

  return (
    <View style={styles.card}>
      <View style={styles.header}>
        <Text style={styles.label}>Saldo Total</Text>
        <TouchableOpacity
          onPress={() => setIsVisible((v) => !v)}
          accessibilityLabel={isVisible ? "Ocultar saldo" : "Mostrar saldo"}
          accessibilityHint="Alterna a visibilidade do saldo"
        >
          {isVisible ? (
            <Eye size={20} color={colors.surface} />
          ) : (
            <EyeOff size={20} color={colors.surface} />
          )}
        </TouchableOpacity>
      </View>

      <Text
        style={styles.value}
        accessibilityLabel={
          isVisible ? formatCurrency(balance) : "Saldo oculto"
        }
      >
        {isVisible ? formatCurrency(balance) : "••••••••"}
      </Text>

      <View style={styles.trend}>
        <TrendingUp size={14} color={colors.surface} />
        <Text style={styles.trendText}>+2.5% este mês</Text>
      </View>
    </View>
  );
});

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.primary,
    borderRadius: borderRadius.xl,
    padding: spacing["2xl"],
    ...shadows.lg,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: spacing.sm,
  },
  label: {
    color: colors.surface,
    fontSize: typography.sm,
    opacity: 0.85,
    fontWeight: "500",
  },
  value: {
    color: colors.surface,
    fontSize: typography["2xl"],
    fontWeight: "700",
    marginBottom: spacing.md,
  },
  trend: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.xs,
  },
  trendText: {
    color: colors.surface,
    fontSize: typography.xs,
    opacity: 0.85,
  },
});
