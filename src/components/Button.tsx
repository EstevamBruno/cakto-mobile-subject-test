import React from "react";
import {
  Pressable,
  Text,
  ActivityIndicator,
  StyleSheet,
  ViewStyle,
} from "react-native";
import { colors, typography, spacing, borderRadius } from "../theme";

/**
 * Visual style variant of the button.
 *
 * - `primary` — filled blue background, white text.
 * - `secondary` — white background with a blue outline.
 * - `ghost` — transparent background, default text color.
 */
type ButtonVariant = "primary" | "secondary" | "ghost";

/** Props for the Button component. */
interface ButtonProps {
  /** Label text rendered inside the button. */
  title: string;
  /** Callback invoked when the button is pressed. */
  onPress: () => void;
  /** Visual style variant. Defaults to `"primary"`. */
  variant?: ButtonVariant;
  /** When `true`, disables interaction and shows an `ActivityIndicator`. */
  loading?: boolean;
  /** When `true`, disables interaction and reduces opacity. */
  disabled?: boolean;
  /** Additional styles applied to the outer `Pressable` container. */
  style?: ViewStyle;
  /** Accessibility hint read by screen readers to describe the button action. */
  accessibilityHint?: string;
}

/**
 * A full-width pressable button with three visual variants, loading state,
 * and built-in accessibility support.
 *
 * @param props.title - Label text rendered inside the button.
 * @param props.onPress - Callback invoked when the button is pressed.
 * @param props.variant - Visual style variant. Defaults to `"primary"`.
 * @param props.loading - When `true`, disables interaction and shows an `ActivityIndicator`.
 * @param props.disabled - When `true`, disables interaction and reduces opacity.
 * @param props.style - Additional styles applied to the outer `Pressable` container.
 * @param props.accessibilityHint - Accessibility hint read by screen readers.
 *
 * @example
 * // Primary (default)
 * <Button title="Confirm" onPress={handleConfirm} />
 *
 * @example
 * // Secondary with loading state
 * <Button title="Save" variant="secondary" loading={isSaving} onPress={handleSave} />
 *
 * @example
 * // Ghost, disabled
 * <Button title="Cancel" variant="ghost" disabled onPress={handleCancel} />
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
