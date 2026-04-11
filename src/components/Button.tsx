import React from "react";
import {
  Pressable,
  Text,
  ActivityIndicator,
  StyleSheet,
  ViewStyle,
} from "react-native";
import { colors, typography, spacing, borderRadius } from "../theme";

type ButtonVariant = "primary" | "secondary" | "ghost";

interface ButtonProps {
  title: string;
  onPress: () => void;
  variant?: ButtonVariant;
  loading?: boolean;
  disabled?: boolean;
  style?: ViewStyle;
  accessibilityHint?: string;
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
export function Button({
  title,
  onPress,
  variant = "primary",
  loading = false,
  disabled = false,
  accessibilityHint,
}: ButtonProps) {
  const isDisabled = disabled || loading;

  const indicatorColor =
    variant === "primary" ? colors.surface : colors.primary;

  return (
    <Pressable
      onPress={onPress}
      disabled={isDisabled}
      accessibilityRole="button"
      accessibilityState={{ disabled: isDisabled, busy: loading }}
      accessibilityHint={accessibilityHint}
      style={({ pressed }) => [
        styles.base,
        styles[variant],
        isDisabled && styles.disabled,
        pressed && !isDisabled && styles.pressed,
      ]}
    >
      {loading ? (
        <ActivityIndicator color={indicatorColor} />
      ) : (
        <Text style={[styles.text, styles[`${variant}Text`]]}>{title}</Text>
      )}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  base: {
    width: "100%",
    height: 52,
    borderRadius: borderRadius.lg,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: spacing.lg,
  },
  primary: {
    backgroundColor: colors.primary,
  },
  secondary: {
    backgroundColor: colors.surface,
    borderWidth: 1.5,
    borderColor: colors.primary,
  },
  ghost: {
    backgroundColor: "transparent",
  },
  text: {
    fontSize: typography.md,
    fontWeight: "600",
  },
  primaryText: {
    color: colors.surface,
  },
  secondaryText: {
    color: colors.primary,
  },
  ghostText: {
    color: colors.text,
  },
  pressed: {
    opacity: 0.7,
  },
  disabled: {
    opacity: 0.5,
  },
});
