import type { ViewStyle } from "react-native";

export type ButtonVariant = "primary" | "secondary" | "ghost";

export interface ButtonProps {
  title: string;
  onPress: () => void;
  variant?: ButtonVariant;
  loading?: boolean;
  disabled?: boolean;
  style?: ViewStyle;
  accessibilityHint?: string;
}
