import React, { FC, memo, useCallback, useMemo } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  RefreshControl,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import { ChevronLeft, Filter, Inbox } from "lucide-react-native";
import { colors, typography, spacing, borderRadius, shadows } from "@/theme";
import { TransactionItem } from "@/components";
import { Transaction } from "@/types";
import { useTransactionsModel } from "./Transactions.model";
import type {
  FilterType,
  TransactionsViewProps,
} from "@/types/Transactions.type";

const FILTER_OPTIONS: { label: string; value: FilterType }[] = [
  { label: "Todas", value: "all" },
  { label: "Receitas", value: "income" },
  { label: "Despesas", value: "expense" },
];

const EmptyState = memo(function EmptyState({
  filterType,
}: {
  filterType: FilterType;
}) {
  const isFiltered = filterType !== "all";
  return (
    <View style={styles.emptyContainer}>
      {isFiltered ? (
        <Filter size={40} color={colors.disabled} />
      ) : (
        <Inbox size={40} color={colors.disabled} />
      )}
      <Text style={styles.emptyTitle}>
        {isFiltered
          ? "Nenhuma transação para este filtro"
          : "Nenhuma transação encontrada"}
      </Text>
      <Text style={styles.emptySubtitle}>
        {isFiltered
          ? "Tente selecionar outro tipo de transação"
          : "Suas transações aparecerão aqui"}
      </Text>
    </View>
  );
});

export const TransactionsView: FC<TransactionsViewProps> = ({
  transactions,
  isLoading,
  isLoadingMore,
  isRefreshing,
  hasMore,
  filterType,
  onRefresh,
  onEndReached,
  onSelectFilter,
}) => {
  const insets = useSafeAreaInsets();
  const router = useRouter();

  const keyExtractor = useCallback((item: Transaction) => item.id, []);

  const renderItem = useCallback(
    ({ item }: { item: Transaction }) => <TransactionItem transaction={item} />,
    [],
  );

  const ItemSeparator = useCallback(() => <View style={styles.divider} />, []);

  const ListFooter = useCallback(() => {
    if (isLoadingMore) {
      return (
        <View style={styles.footerLoader}>
          <ActivityIndicator size="small" color={colors.primary} />
          <Text style={styles.footerText}>Carregando mais...</Text>
        </View>
      );
    }
    if (!hasMore && transactions.length > 0) {
      return (
        <View style={styles.footerEnd}>
          <Text style={styles.footerEndText}>Fim das transações</Text>
        </View>
      );
    }
    return null;
  }, [isLoadingMore, hasMore, transactions.length]);

  const ListHeader = useMemo(
    () => (
      <View style={[styles.headerContent, { paddingTop: insets.top }]}>
        <View style={styles.titleRow}>
          <TouchableOpacity
            onPress={() => router.back()}
            style={styles.backButton}
            accessibilityLabel="Voltar"
            accessibilityRole="button"
          >
            <ChevronLeft size={24} color={colors.text} />
          </TouchableOpacity>
          <Text style={styles.title}>Extrato</Text>
          <View style={styles.titleSpacer} />
        </View>

        <View style={styles.filterRow}>
          {FILTER_OPTIONS.map((option) => {
            const isActive = filterType === option.value;
            return (
              <TouchableOpacity
                key={option.value}
                onPress={() => onSelectFilter(option.value)}
                style={[styles.filterPill, isActive && styles.filterPillActive]}
                accessibilityLabel={`Filtrar por ${option.label}`}
                accessibilityRole="button"
                accessibilityState={{ selected: isActive }}
              >
                <Text
                  style={[
                    styles.filterPillText,
                    isActive && styles.filterPillTextActive,
                  ]}
                >
                  {option.label}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>
      </View>
    ),
    [filterType, insets.top, onSelectFilter, router],
  );

  return (
    <FlatList
      style={styles.container}
      contentContainerStyle={styles.content}
      data={transactions}
      keyExtractor={keyExtractor}
      renderItem={renderItem}
      ListHeaderComponent={ListHeader}
      ItemSeparatorComponent={ItemSeparator}
      ListEmptyComponent={
        isLoading ? (
          <View style={styles.centered}>
            <ActivityIndicator color={colors.primary} />
          </View>
        ) : (
          <EmptyState filterType={filterType} />
        )
      }
      ListFooterComponent={ListFooter}
      showsVerticalScrollIndicator={false}
      removeClippedSubviews
      maxToRenderPerBatch={10}
      windowSize={10}
      onEndReached={onEndReached}
      onEndReachedThreshold={0.5}
      refreshControl={
        <RefreshControl
          refreshing={isRefreshing}
          onRefresh={onRefresh}
          tintColor={colors.primary}
        />
      }
    />
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  content: {
    paddingBottom: spacing["4xl"],
    paddingHorizontal: spacing.lg,
  },
  headerContent: {
    gap: spacing.lg,
    marginBottom: spacing.lg,
  },
  titleRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  backButton: {
    padding: spacing.sm,
    marginLeft: -spacing.sm,
  },
  title: {
    fontSize: typography.xl,
    fontWeight: "700",
    color: colors.text,
  },
  titleSpacer: {
    width: 40,
  },
  filterRow: {
    flexDirection: "row",
    gap: spacing.sm,
    backgroundColor: colors.surface,
    borderRadius: borderRadius.lg,
    padding: spacing.xs,
    ...shadows.sm,
  },
  filterPill: {
    flex: 1,
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.md,
    borderRadius: borderRadius.md,
    alignItems: "center",
    justifyContent: "center",
  },
  filterPillActive: {
    backgroundColor: colors.primary,
    ...shadows.sm,
  },
  filterPillText: {
    fontSize: typography.sm,
    fontWeight: "500",
    color: colors.textSecondary,
  },
  filterPillTextActive: {
    color: colors.surface,
    fontWeight: "600",
  },
  divider: {
    height: 1,
    backgroundColor: colors.border,
    marginHorizontal: spacing.sm,
  },
  centered: {
    paddingVertical: spacing["3xl"],
    alignItems: "center",
  },
  emptyContainer: {
    alignItems: "center",
    paddingVertical: spacing["3xl"],
    gap: spacing.md,
  },
  emptyTitle: {
    fontSize: typography.md,
    fontWeight: "600",
    color: colors.text,
    textAlign: "center",
  },
  emptySubtitle: {
    fontSize: typography.sm,
    color: colors.textSecondary,
    textAlign: "center",
  },
  footerLoader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: spacing.lg,
    gap: spacing.sm,
  },
  footerText: {
    fontSize: typography.sm,
    color: colors.textSecondary,
  },
  footerEnd: {
    alignItems: "center",
    paddingVertical: spacing.lg,
  },
  footerEndText: {
    fontSize: typography.sm,
    color: colors.textSecondary,
  },
});
