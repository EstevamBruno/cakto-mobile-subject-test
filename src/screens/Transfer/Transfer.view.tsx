import React, { FC } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import { Controller } from "react-hook-form";
import { ChevronLeft, Building2, Check, X } from "lucide-react-native";
import { colors, typography, spacing, borderRadius, shadows } from "@/theme";
import { Button, Input, Card, BottomSheet } from "@/components";
import { formatCPF, formatAccountNumber, formatCurrency } from "@/utils/format";
import { banks } from "@/services/api";
import { useTransferModel } from "./Transfer.model";

interface TransferViewProps extends ReturnType<typeof useTransferModel> {}

export const TransferView: FC<TransferViewProps> = ({
  control,
  errors,
  step,
  selectedBank,
  bankPickerVisible,
  setBankPickerVisible,
  onSelectBank,
  amountDisplay,
  onAmountChange,
  onReview,
  onConfirm,
  onBack,
  onNewTransfer,
  transactionId,
  errorMessage,
  isLoading,
  getValues,
}) => {
  const insets = useSafeAreaInsets();
  const router = useRouter();

  const stepTitle =
    step === "form" ? "Transferir" : step === "review" ? "Revisar" : "";

  const handleBackPress = (): void => {
    if (step === "form") {
      router.back();

      return;
    }

    onBack();
  };

  const bankOptions = banks.map((b) => ({
    id: b.id,
    label: b.name,
    sublabel: `Código ${b.code}`,
  }));

  const formValues = getValues();

  return (
    <KeyboardAvoidingView
      style={styles.flex}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <View style={[styles.container, { paddingTop: insets.top }]}>
        {step !== "result" && (
          <View style={styles.header}>
            <TouchableOpacity
              onPress={handleBackPress}
              style={styles.backButton}
              accessibilityLabel="Voltar"
              accessibilityRole="button"
            >
              <ChevronLeft size={24} color={colors.text} />
            </TouchableOpacity>
            <Text style={styles.headerTitle}>{stepTitle}</Text>
            <View style={styles.backButton} />
          </View>
        )}

        {step === "form" && (
          <ScrollView
            style={styles.flex}
            contentContainerStyle={styles.scrollContent}
            showsVerticalScrollIndicator={false}
            keyboardShouldPersistTaps="handled"
          >
            <TouchableOpacity
              onPress={() => setBankPickerVisible(true)}
              activeOpacity={0.7}
            >
              <Input
                label="Banco / Instituição"
                placeholder="Selecione o banco"
                value={selectedBank ? selectedBank.name : ""}
                editable={false}
                pointerEvents="none"
                error={errors.bank?.message}
                rightIcon={<Building2 size={18} color={colors.textSecondary} />}
              />
            </TouchableOpacity>

            <Controller
              control={control}
              name="account"
              render={({ field: { onChange, onBlur, value } }) => (
                <Input
                  label="Conta destino"
                  placeholder="00000-0"
                  keyboardType="numeric"
                  onChangeText={(t) => onChange(formatAccountNumber(t))}
                  onBlur={onBlur}
                  value={value}
                  error={errors.account?.message}
                  maxLength={7}
                />
              )}
            />

            <Controller
              control={control}
              name="cpf"
              render={({ field: { onChange, onBlur, value } }) => (
                <Input
                  label="CPF/CNPJ do favorecido"
                  placeholder="000.000.000-00"
                  keyboardType="numeric"
                  onChangeText={(t) => onChange(formatCPF(t))}
                  onBlur={onBlur}
                  value={value}
                  error={errors.cpf?.message}
                  maxLength={14}
                />
              )}
            />

            <Controller
              control={control}
              name="beneficiaryName"
              render={({ field: { onChange, onBlur, value } }) => (
                <Input
                  label="Nome do favorecido"
                  placeholder="Nome completo"
                  onChangeText={onChange}
                  onBlur={onBlur}
                  value={value}
                  error={errors.beneficiaryName?.message}
                />
              )}
            />

            <Input
              label="Valor"
              placeholder="0,00"
              keyboardType="numeric"
              value={amountDisplay}
              onChangeText={onAmountChange}
              error={errors.amount?.message}
              rightIcon={<Text style={styles.currencyPrefix}>R$</Text>}
            />

            <Controller
              control={control}
              name="note"
              render={({ field: { onChange, onBlur, value } }) => (
                <Input
                  label="Observação (opcional)"
                  placeholder="Máximo 140 caracteres"
                  onChangeText={onChange}
                  onBlur={onBlur}
                  value={value}
                  error={errors.note?.message}
                  maxLength={140}
                />
              )}
            />

            <View style={styles.buttonContainer}>
              <Button title="Revisar transferência" onPress={onReview} />
            </View>
          </ScrollView>
        )}

        {step === "review" && (
          <ScrollView
            style={styles.flex}
            contentContainerStyle={styles.scrollContent}
            showsVerticalScrollIndicator={false}
          >
            <Card style={styles.reviewCard}>
              <ReviewRow label="Banco" value={formValues.bank} />
              <View style={styles.divider} />
              <ReviewRow label="Conta" value={formValues.account} />
              <View style={styles.divider} />
              <ReviewRow label="CPF/CNPJ" value={formValues.cpf} />
              <View style={styles.divider} />
              <ReviewRow
                label="Favorecido"
                value={formValues.beneficiaryName}
              />
              <View style={styles.divider} />
              <ReviewRow
                label="Valor"
                value={formatCurrency(formValues.amount)}
                valueStyle={styles.amountValue}
              />
              {formValues.note ? (
                <>
                  <View style={styles.divider} />
                  <ReviewRow label="Observação" value={formValues.note} />
                </>
              ) : null}
            </Card>

            <View style={styles.buttonContainer}>
              <Button
                title="Confirmar"
                onPress={onConfirm}
                loading={isLoading}
              />
              <Button title="Voltar" variant="secondary" onPress={onBack} />
            </View>
          </ScrollView>
        )}

        {step === "result" && (
          <View style={[styles.resultContainer, { paddingTop: insets.top }]}>
            {transactionId ? (
              <>
                <View style={[styles.resultIcon, styles.resultIconSuccess]}>
                  <Check size={40} color={colors.surface} strokeWidth={3} />
                </View>
                <Text style={styles.resultTitle}>Transferência realizada!</Text>
                <Text style={styles.resultSubtitle}>ID da transação</Text>
                <Text style={styles.transactionId}>{transactionId}</Text>
                <View style={styles.resultButtons}>
                  <Button title="Nova transferência" onPress={onNewTransfer} />
                  <Button
                    title="Voltar ao início"
                    variant="secondary"
                    onPress={() => router.replace("/home")}
                  />
                </View>
              </>
            ) : (
              <>
                <View style={[styles.resultIcon, styles.resultIconError]}>
                  <X size={40} color={colors.surface} strokeWidth={3} />
                </View>
                <Text style={styles.resultTitle}>Erro na transferência</Text>
                <Text style={styles.resultSubtitle}>
                  {errorMessage ?? "Tente novamente mais tarde"}
                </Text>
                <View style={styles.resultButtons}>
                  <Button title="Tentar novamente" onPress={onBack} />
                </View>
              </>
            )}
          </View>
        )}
      </View>

      <BottomSheet
        visible={bankPickerVisible}
        onClose={() => setBankPickerVisible(false)}
        title="Selecione o banco"
        options={bankOptions}
        onSelect={(option) => {
          const bank = banks.find((b) => b.id === option.id);
          if (bank) onSelectBank(bank);
        }}
        selectedId={selectedBank?.id}
      />
    </KeyboardAvoidingView>
  );
};

interface ReviewRowProps {
  label: string;
  value: string;
  valueStyle?: object;
}

const ReviewRow: FC<ReviewRowProps> = ({ label, value, valueStyle }) => (
  <View style={styles.reviewRow}>
    <Text style={styles.reviewLabel}>{label}</Text>
    <Text style={[styles.reviewValue, valueStyle]}>{value}</Text>
  </View>
);

const styles = StyleSheet.create({
  flex: {
    flex: 1,
  },
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.md,
    backgroundColor: colors.background,
  },
  backButton: {
    width: 40,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
  },
  headerTitle: {
    fontSize: typography.lg,
    fontWeight: "600",
    color: colors.text,
  },
  scrollContent: {
    padding: spacing.lg,
    gap: spacing.lg,
    paddingBottom: spacing["4xl"],
  },
  buttonContainer: {
    gap: spacing.md,
    marginTop: spacing.sm,
  },
  currencyPrefix: {
    fontSize: typography.md,
    color: colors.textSecondary,
    fontWeight: "500",
  },
  reviewCard: {
    gap: spacing.md,
  },
  reviewRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    gap: spacing.md,
  },
  reviewLabel: {
    fontSize: typography.sm,
    color: colors.textSecondary,
    flex: 1,
  },
  reviewValue: {
    fontSize: typography.sm,
    color: colors.text,
    fontWeight: "500",
    flex: 2,
    textAlign: "right",
  },
  amountValue: {
    color: colors.primary,
    fontSize: typography.md,
    fontWeight: "700",
  },
  divider: {
    height: 1,
    backgroundColor: colors.border,
  },
  resultContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: spacing.xl,
    gap: spacing.lg,
    backgroundColor: colors.background,
  },
  resultIcon: {
    width: 88,
    height: 88,
    borderRadius: borderRadius.full,
    alignItems: "center",
    justifyContent: "center",
    ...shadows.lg,
  },
  resultIconSuccess: {
    backgroundColor: colors.success,
  },
  resultIconError: {
    backgroundColor: colors.danger,
  },
  resultTitle: {
    fontSize: typography.xl,
    fontWeight: "700",
    color: colors.text,
    textAlign: "center",
  },
  resultSubtitle: {
    fontSize: typography.sm,
    color: colors.textSecondary,
    textAlign: "center",
  },
  transactionId: {
    fontSize: typography.md,
    fontWeight: "600",
    color: colors.primary,
    textAlign: "center",
  },
  resultButtons: {
    width: "100%",
    gap: spacing.md,
    marginTop: spacing.md,
  },
});
