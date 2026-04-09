import React from "react"
import { View, Text } from "react-native"

interface BalanceCardProps {
  balance: number
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
export function BalanceCard({ balance }: BalanceCardProps) {
  return (
    <View>
      <Text>R$ ****</Text>
    </View>
  )
}
