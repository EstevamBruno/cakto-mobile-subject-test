import React from "react"
import { View, Text, TextInputProps, ViewStyle } from "react-native"

interface InputProps extends Omit<TextInputProps, "style"> {
  label: string
  error?: string
  secureTextEntry?: boolean
  rightIcon?: React.ReactNode
  containerStyle?: ViewStyle
}

/**
 * TODO: Implementar componente Input
 *
 * Requisitos:
 * - Label acima do input
 * - Estado de foco (border azul)
 * - Estado de erro (border vermelha + mensagem abaixo)
 * - Toggle de visibilidade para campos de senha (ícone Eye/EyeOff)
 * - Suporte a rightIcon genérico
 * - Acessibilidade: accessibilityLabel com o texto do label
 * - Altura: 52px, borderRadius: 12px
 *
 * Referência: SPEC.md seção 5 — Componentes Reutilizáveis
 */
export function Input({ label, error, ...props }: InputProps) {
  return (
    <View>
      <Text>{label}</Text>
    </View>
  )
}
