import React from "react"
import { View, ViewStyle, StyleSheet } from "react-native"
import { colors, borderRadius, spacing, shadows } from "../theme"

interface CardProps {
  children: React.ReactNode
  style?: ViewStyle
}

/**
 * TODO: Implementar componente Card
 *
 * Requisitos:
 * - Background branco (colors.surface)
 * - Border radius 12px
 * - Padding interno 16px
 * - Sombra suave (shadows.sm)
 *
 * Referência: SPEC.md seção 5 — Componentes Reutilizáveis
 */
export function Card({ children, style }: CardProps) {
  return <View style={[styles.card, style]}>{children}</View>
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.surface,
    borderRadius: borderRadius.lg,
    padding: spacing.lg,
    ...shadows.sm,
  },
})
