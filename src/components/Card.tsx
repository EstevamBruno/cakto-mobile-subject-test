import React from "react"
import { View, ViewStyle } from "react-native"

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
  return <View>{children}</View>
}
