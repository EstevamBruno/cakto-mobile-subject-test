import React, { FC, useCallback, useMemo } from "react";
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
import {
  ArrowUpRight,
  CreditCard,
  BarChart3,
  Settings,
  LogOut,
  ChevronRight,
} from "lucide-react-native";
import { colors, typography, spacing, borderRadius, shadows } from "@/theme";
import { BalanceCard, Card, TransactionItem } from "@/components";
import { Transaction } from "@/types";
import type { HomeViewProps } from "@/types/Home.type";

export const HomeView: FC<HomeViewProps> = ({
  user,
  balance,
  lastTransactions,
  isLoading,
  isRefreshing,
  initials,
  onRefresh,
  onLogout,
}) => {
  const insets = useSafeAreaInsets();
  const router = useRouter();

  const shortcuts = useMemo(
    () => [
      {
        id: "transfer",
        label: "Transferir",
        icon: <ArrowUpRight size={22} color={colors.primary} />,
        onPress: () => router.push("/transfer"),
      },
      {
        id: "card",
        label: "Cartão virtual",
        icon: <CreditCard size={22} color={colors.primary} />,
        onPress: () => {},
      },
      {
        id: "investments",
        label: "Investimentos",
        icon: <BarChart3 size={22} color={colors.primary} />,
        onPress: () => {},
      },
      {
        id: "settings",
        label: "Configurações",
        icon: <Settings size={22} color={colors.primary} />,
        onPress: () => {},
      },
    ],
    [router],
  );

  const keyExtractor = useCallback((item: Transaction) => item.id, []);

  const renderItem = useCallback(
    ({ item, index }: { item: Transaction; index: number }) => (
      <>
        <TransactionItem transaction={item} />
        {index < lastTransactions.length - 1 && <View style={styles.divider} />}
      </>
    ),
    [lastTransactions.length],
  );

  const ListHeader = (
    <View style={[styles.headerContent, { paddingTop: insets.top }]}>
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <View
            style={styles.avatar}
            accessibilityLabel={`Avatar de ${user?.name ?? ""}`}
          >
            <Text style={styles.avatarText}>{initials}</Text>
          </View>
          <View>
            <Text style={styles.greeting}>Olá,</Text>
            <Text style={styles.userName}>{user?.name ?? ""}</Text>
          </View>
        </View>
        <TouchableOpacity
          onPress={onLogout}
          style={styles.logoutButton}
          accessibilityLabel="Sair da conta"
          accessibilityHint="Encerra a sessão e redireciona para o login"
        >
          <LogOut size={22} color={colors.textSecondary} />
        </TouchableOpacity>
      </View>

      {isLoading ? (
        <View style={styles.loadingCard}>
          <ActivityIndicator color={colors.surface} />
        </View>
      ) : (
        <BalanceCard balance={balance} />
      )}

      <Text style={styles.sectionTitle}>Atalhos</Text>
      <View style={styles.shortcutsGrid}>
        {[shortcuts.slice(0, 2), shortcuts.slice(2, 4)].map((row, rowIndex) => (
          <View key={rowIndex} style={styles.shortcutsRow}>
            {row.map((shortcut) => (
              <TouchableOpacity
                key={shortcut.id}
                onPress={shortcut.onPress}
                style={styles.shortcutWrapper}
                accessibilityLabel={shortcut.label}
                accessibilityRole="button"
              >
                <Card style={styles.shortcutCard}>
                  <View style={styles.shortcutIconBg}>{shortcut.icon}</View>
                  <Text style={styles.shortcutLabel}>{shortcut.label}</Text>
                </Card>
              </TouchableOpacity>
            ))}
          </View>
        ))}
      </View>

      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>Últimas transações</Text>
        <TouchableOpacity
          onPress={() => router.push("/transactions")}
          style={styles.seeMoreButton}
          accessibilityLabel="Ver extrato completo"
          accessibilityRole="button"
        >
          <Text style={styles.seeMoreText}>Ver mais</Text>
          <ChevronRight size={16} color={colors.primary} />
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <FlatList
      style={styles.container}
      contentContainerStyle={styles.content}
      data={lastTransactions}
      keyExtractor={keyExtractor}
      renderItem={renderItem}
      ListHeaderComponent={ListHeader}
      ListEmptyComponent={
        !isLoading ? (
          <Text style={styles.emptyText}>Nenhuma transação encontrada</Text>
        ) : null
      }
      showsVerticalScrollIndicator={false}
      removeClippedSubviews
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
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  headerLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.md,
  },
  avatar: {
    width: 44,
    height: 44,
    borderRadius: borderRadius.full,
    backgroundColor: colors.primary,
    alignItems: "center",
    justifyContent: "center",
    ...shadows.sm,
  },
  avatarText: {
    color: colors.surface,
    fontSize: typography.sm,
    fontWeight: "700",
  },
  greeting: {
    fontSize: typography.xs,
    color: colors.textSecondary,
  },
  userName: {
    fontSize: typography.md,
    fontWeight: "600",
    color: colors.text,
  },
  logoutButton: {
    padding: spacing.sm,
  },
  loadingCard: {
    height: 120,
    borderRadius: borderRadius.xl,
    backgroundColor: colors.primary,
    alignItems: "center",
    justifyContent: "center",
    ...shadows.lg,
  },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: spacing.lg,
  },
  sectionTitle: {
    fontSize: typography.md,
    fontWeight: "600",
    color: colors.text,
  },
  seeMoreButton: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.xs / 2,
  },
  seeMoreText: {
    fontSize: typography.sm,
    color: colors.primary,
    fontWeight: "500",
  },
  sectionTransactions: {
    borderRadius: borderRadius.lg,
    backgroundColor: colors.surface,
  },
  shortcutsGrid: {
    gap: spacing.md,
  },
  shortcutsRow: {
    flexDirection: "row",
    gap: spacing.md,
  },
  shortcutWrapper: {
    flex: 1,
  },
  shortcutCard: {
    alignItems: "center",
    gap: spacing.sm,
    paddingVertical: spacing.lg,
  },
  shortcutIconBg: {
    width: 48,
    height: 48,
    borderRadius: borderRadius.lg,
    backgroundColor: `${colors.primary}15`,
    alignItems: "center",
    justifyContent: "center",
  },
  shortcutLabel: {
    fontSize: typography.xs,
    color: colors.text,
    fontWeight: "500",
    textAlign: "center",
  },
  divider: {
    height: 1,
    backgroundColor: colors.border,
    marginHorizontal: spacing.sm,
  },
  emptyText: {
    fontSize: typography.sm,
    color: colors.textSecondary,
    textAlign: "center",
    paddingVertical: spacing.lg,
    paddingHorizontal: spacing.lg,
  },
});
