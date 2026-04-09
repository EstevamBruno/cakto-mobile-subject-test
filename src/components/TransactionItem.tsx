import React from "react"
import { View, Text } from "react-native"
import { Transaction } from "../types"

interface TransactionItemProps {
  transaction: Transaction
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
export function TransactionItem({ transaction }: TransactionItemProps) {
  return (
    <View>
      <Text>{transaction.description}</Text>
    </View>
  )
}
