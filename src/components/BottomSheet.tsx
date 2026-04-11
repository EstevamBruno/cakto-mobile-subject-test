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

interface BottomSheetOption {
  id: string;
  label: string;
  sublabel?: string;
}

interface BottomSheetProps {
  visible: boolean;
  onClose: () => void;
  title: string;
  options: BottomSheetOption[];
  onSelect: (option: BottomSheetOption) => void;
  selectedId?: string;
}

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
