import React, { useCallback } from "react";
import {
  View,
  Text,
  Modal,
  TouchableOpacity,
  FlatList,
  StyleSheet,
} from "react-native";
import { X } from "lucide-react-native";
import { colors, typography, spacing, borderRadius } from "@/theme";

/** Represents an option displayed in the BottomSheet list. */
interface BottomSheetOption {
  /** Unique identifier for the option. */
  id: string;
  /** Primary text displayed in the option row. */
  label: string;
  /** Optional secondary text displayed below the label. */
  sublabel?: string;
}

/** Props for the BottomSheet component. */
interface BottomSheetProps {
  /** Controls the visibility of the modal. */
  visible: boolean;
  /** Callback invoked when the sheet is closed (backdrop, X button, or hardware back). */
  onClose: () => void;
  /** Title displayed in the sheet header. */
  title: string;
  /** List of options rendered in the FlatList. */
  options: BottomSheetOption[];
  /** Callback invoked with the option selected by the user. */
  onSelect: (option: BottomSheetOption) => void;
  /** Id of the currently selected option. */
  selectedId?: string;
}

/**
 * A modal bottom sheet that slides up from the bottom of the screen,
 * presenting a scrollable list of selectable options.
 *
 * Features:
 * - Closes on backdrop tap, X button press, or hardware back (Android).
 * - Highlights the currently selected option via `selectedId`.
 * - Automatically closes the sheet after an option is selected.
 *
 * @param props.visible - Controls the visibility of the modal.
 * @param props.onClose - Callback invoked when the sheet is dismissed (backdrop, X button, or hardware back).
 * @param props.title - Title displayed in the sheet header.
 * @param props.options - List of options rendered in the scrollable list.
 * @param props.onSelect - Callback invoked with the option selected by the user.
 * @param props.selectedId - Id of the currently selected option; highlights the matching row.
 *
 * @example
 * <BottomSheet
 *   visible={isOpen}
 *   onClose={() => setIsOpen(false)}
 *   title="Select a bank"
 *   options={bankOptions}
 *   onSelect={(option) => setSelectedBank(option)}
 *   selectedId={selectedBank?.id}
 * />
 */
export function BottomSheet({
  visible,
  onClose,
  title,
  options,
  onSelect,
  selectedId,
}: BottomSheetProps) {
  const keyExtractor = useCallback((item: BottomSheetOption) => item.id, []);

  const renderItem = useCallback(
    ({ item }: { item: BottomSheetOption }) => {
      const isSelected = item.id === selectedId;
      return (
        <TouchableOpacity
          style={[styles.option, isSelected && styles.optionSelected]}
          onPress={() => {
            onSelect(item);
            onClose();
          }}
          accessibilityRole="button"
          accessibilityState={{ selected: isSelected }}
          accessibilityLabel={item.label}
        >
          <Text
            style={[
              styles.optionLabel,
              isSelected && styles.optionLabelSelected,
            ]}
          >
            {item.label}
          </Text>
          {item.sublabel ? (
            <Text style={styles.optionSublabel}>{item.sublabel}</Text>
          ) : null}
        </TouchableOpacity>
      );
    },
    [selectedId, onSelect, onClose],
  );

  return (
    <Modal
      visible={visible}
      transparent
      animationType="slide"
      onRequestClose={onClose}
    >
      <TouchableOpacity
        style={styles.backdrop}
        activeOpacity={1}
        onPress={onClose}
        accessibilityLabel="Fechar"
      />
      <View style={styles.sheet}>
        <View style={styles.handle} />
        <View style={styles.header}>
          <Text style={styles.title}>{title}</Text>
          <TouchableOpacity
            onPress={onClose}
            style={styles.closeButton}
            accessibilityLabel="Fechar modal"
            accessibilityRole="button"
          >
            <X size={20} color={colors.textSecondary} />
          </TouchableOpacity>
        </View>
        <FlatList
          data={options}
          keyExtractor={keyExtractor}
          renderItem={renderItem}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.listContent}
        />
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    backgroundColor: colors.overlay,
  },
  sheet: {
    backgroundColor: colors.surface,
    borderTopLeftRadius: borderRadius.xl,
    borderTopRightRadius: borderRadius.xl,
    maxHeight: "60%",
    paddingBottom: spacing["2xl"],
  },
  handle: {
    width: 40,
    height: 4,
    backgroundColor: colors.border,
    borderRadius: borderRadius.full,
    alignSelf: "center",
    marginTop: spacing.md,
    marginBottom: spacing.sm,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  title: {
    fontSize: typography.md,
    fontWeight: "600",
    color: colors.text,
  },
  closeButton: {
    padding: spacing.xs,
  },
  listContent: {
    paddingVertical: spacing.sm,
  },
  option: {
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
  },
  optionSelected: {
    backgroundColor: `${colors.primary}15`,
  },
  optionLabel: {
    fontSize: typography.md,
    color: colors.text,
  },
  optionLabelSelected: {
    color: colors.primary,
    fontWeight: "600",
  },
  optionSublabel: {
    fontSize: typography.xs,
    color: colors.textSecondary,
    marginTop: spacing.xs / 2,
  },
});
