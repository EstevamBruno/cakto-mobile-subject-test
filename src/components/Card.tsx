import React from "react";
import { View, StyleSheet } from "react-native";
import { colors, borderRadius, spacing, shadows } from "@/theme";
import type { CardProps } from "@/types/Card.type";

/**
 * A styled surface container with rounded corners, padding, and a soft shadow.
 *
 * @param props.children - Content to render inside the card.
 * @param props.style - Additional styles applied to the card container.
 *
 * @example
 * <Card>
 *   <Text>Hello, world!</Text>
 * </Card>
 *
 * @example
 * // With custom style override
 * <Card style={{ margin: 16 }}>
 *   <Text>Custom margin</Text>
 * </Card>
 */
export function Card({ children, style }: CardProps) {
  return <View style={[styles.card, style]}>{children}</View>;
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.surface,
    borderRadius: borderRadius.lg,
    padding: spacing.lg,
    ...shadows.sm,
  },
});
