import type { TextInputProps } from "react-native";
import type React from "react";

export type Mask = "CPF" | "MONEY";

export interface InputProps extends Omit<TextInputProps, "style"> {
  label: string;
  error?: string;
  secureTextEntry?: boolean;
  rightIcon?: React.ReactNode;
  mask?: Mask;
}
