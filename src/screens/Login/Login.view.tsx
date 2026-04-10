import React, { FC } from "react";
import { StyleSheet, ScrollView, Image } from "react-native";
import { Controller } from "react-hook-form";
import { colors, spacing, typography } from "@/theme";
import { Button, Input } from "@/components";
import { formatCPF } from "@/utils/format";
import CaktoLogo from "../../../assets/cakto-logo.png";
import { useLoginModel } from "./Login.model";

interface LoginViewProps extends ReturnType<typeof useLoginModel> {}

export const LoginView: FC<LoginViewProps> = ({
  control,
  errors,
  isSubmitting,
  onSubmit,
}) => {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Image
        source={CaktoLogo}
        style={{ width: 300, height: 80 }}
        resizeMethod="resize"
      />

      <Controller
        control={control}
        name="cpf"
        render={({ field: { onChange, onBlur, value } }) => (
          <Input
            label="CPF/CNPJ"
            placeholder="Digite seu CPF/CNPJ"
            onChangeText={(text) => onChange(formatCPF(text))}
            onBlur={onBlur}
            value={value}
            error={errors.cpf?.message}
            keyboardType="numeric"
          />
        )}
      />

      <Controller
        control={control}
        name="password"
        render={({ field: { onChange, onBlur, value } }) => (
          <Input
            label="Senha"
            placeholder="Digite sua senha"
            secureTextEntry
            onChangeText={onChange}
            onBlur={onBlur}
            value={value}
            error={errors.password?.message}
          />
        )}
      />

      <Button title="Entrar" onPress={onSubmit} loading={isSubmitting} />
      <Button title="Esqueci minha senha" variant="ghost" onPress={() => {}} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.background,
    padding: spacing.xl,
    gap: spacing.xl,
  },
  logo: {
    fontSize: 64,
  },
  title: {
    fontSize: typography.xl,
    fontWeight: "700",
    color: colors.primary,
    marginTop: spacing.sm,
  },
  subtitle: {
    fontSize: typography.md,
    color: colors.textSecondary,
    marginTop: spacing.lg,
  },
});
