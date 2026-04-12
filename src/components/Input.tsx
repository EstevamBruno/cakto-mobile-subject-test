import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  TextInputProps,
} from "react-native";
import { Eye, EyeOff } from "lucide-react-native";
import { colors, typography, spacing, borderRadius } from "../theme";
import { formatCPF } from "../utils/format";

type MaskType = "CPF";

interface InputProps extends Omit<TextInputProps, "style"> {
  label: string;
  error?: string;
  secureTextEntry?: boolean;
  rightIcon?: React.ReactNode;
  maskType?: MaskType;
}

const masks: Record<MaskType, (value: string) => string> = {
  CPF: formatCPF,
};

/**
 * A labeled text input with focus/error border states, optional password
 * visibility toggle, and optional input masking.
 *
 * Features:
 * - Blue border on focus, red border + error message on error
 * - Eye/EyeOff toggle when `secureTextEntry` is true
 * - `maskType="CPF"` formats display value; raw digits are passed to `onChangeText`
 * - `rightIcon` slot for any custom trailing icon
 *
 * @param props.label - Text rendered above the input; also used as `accessibilityLabel`.
 * @param props.error - Error message shown below the input; triggers red border when set.
 * @param props.secureTextEntry - When `true`, hides text and renders a visibility toggle icon.
 * @param props.rightIcon - Custom node rendered at the trailing edge (ignored when `secureTextEntry` is true).
 * @param props.maskType - Mask to apply to the display value. Currently supports `"CPF"`.
 *
 * @example
 * // Basic usage
 * <Input label="Email" placeholder="you@example.com" value={email} onChangeText={setEmail} />
 *
 * @example
 * // Password field
 * <Input label="Password" secureTextEntry value={password} onChangeText={setPassword} />
 *
 * @example
 * // CPF with error
 * <Input
 *   label="CPF"
 *   maskType="CPF"
 *   value={cpf}
 *   onChangeText={setCpf}
 *   error={cpfError}
 * />
 */
export function Input({
  label,
  error,
  secureTextEntry,
  rightIcon,
  maskType,
  onFocus,
  onBlur,
  onChangeText,
  value,
  ...props
}: InputProps) {
  const [isFocused, setIsFocused] = useState(false);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const displayValue = maskType && value ? masks[maskType](value) : value;

  const handleChangeText = (text: string) => {
    if (maskType) {
      onChangeText?.(text.replace(/\D/g, ""));
    } else {
      onChangeText?.(text);
    }
  };

  const borderColor = error
    ? colors.danger
    : isFocused
      ? colors.primary
      : colors.border;

  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      <View style={[styles.inputWrapper, { borderColor }]}>
        <TextInput
          style={styles.input}
          placeholderTextColor={colors.disabled}
          accessibilityLabel={label}
          secureTextEntry={secureTextEntry && !isPasswordVisible}
          onFocus={(e) => {
            setIsFocused(true);
            onFocus?.(e);
          }}
          onBlur={(e) => {
            setIsFocused(false);
            onBlur?.(e);
          }}
          value={displayValue}
          onChangeText={handleChangeText}
          {...props}
        />
        {secureTextEntry ? (
          <TouchableOpacity
            onPress={() => setIsPasswordVisible((v) => !v)}
            accessibilityLabel={
              isPasswordVisible ? "Ocultar senha" : "Mostrar senha"
            }
            style={styles.iconButton}
          >
            {isPasswordVisible ? (
              <Eye size={20} color={colors.textSecondary} />
            ) : (
              <EyeOff size={20} color={colors.textSecondary} />
            )}
          </TouchableOpacity>
        ) : rightIcon ? (
          <View style={styles.iconButton}>{rightIcon}</View>
        ) : null}
      </View>
      {error ? <Text style={styles.errorText}>{error}</Text> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    gap: spacing.xs,
  },
  label: {
    fontSize: typography.sm,
    color: colors.text,
    fontWeight: "500",
  },
  inputWrapper: {
    flexDirection: "row",
    alignItems: "center",
    height: 52,
    borderWidth: 1,
    borderRadius: borderRadius.lg,
    backgroundColor: colors.surface,
    paddingHorizontal: spacing.lg,
  },
  input: {
    flex: 1,
    fontSize: typography.md,
    color: colors.text,
    height: "100%",
  },
  iconButton: {
    marginLeft: spacing.sm,
  },
  errorText: {
    fontSize: typography.xs,
    color: colors.danger,
  },
});
