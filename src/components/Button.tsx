import React from "react"
import { View, Text, ViewStyle } from "react-native"

type ButtonVariant = "primary" | "secondary" | "ghost"

interface ButtonProps {
  title: string
  onPress: () => void
  variant?: ButtonVariant
  loading?: boolean
  disabled?: boolean
  style?: ViewStyle
}

/**
 * TODO: Implementar componente Button
 *
 * Requisitos:
 * - 3 variantes: primary (fundo azul), secondary (outline), ghost (transparente)
 * - Estado de loading com ActivityIndicator
 * - Estado disabled (opacity reduzida)
 * - Feedback visual ao pressionar (opacity)
 * - Acessibilidade: accessibilityRole="button", accessibilityState
 * - Altura: 52px, borderRadius: 12px
 *
 * Referência: SPEC.md seção 5 — Componentes Reutilizáveis
 */
export function Button({ title, onPress, variant = "primary", loading = false, disabled = false, style }: ButtonProps) {
  return (
    <View>
      <Text>{title}</Text>
    </View>
  )
}
