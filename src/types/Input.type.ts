import type { TextInputProps } from "react-native";
import type React from "react";

export type MaskType = "CPF";

export interface InputProps extends Omit<TextInputProps, "style"> {
  label: string;
  error?: string;
  secureTextEntry?: boolean;
  rightIcon?: React.ReactNode;
  maskType?: MaskType;
}
