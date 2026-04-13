import React, { FC, useRef } from "react";
import { StyleSheet, ScrollView, Image, Text, TextInput } from "react-native";
import { Controller } from "react-hook-form";
import { colors, spacing, typography } from "@/theme";
import { Button, Input } from "@/components";
import CaktoLogo from "../../../assets/cakto-logo.png";
import type { LoginViewProps } from "@/types/Login.type";

export const LoginView: FC<LoginViewProps> = ({
  control,
  errors,
  isLoading,
  error,
  onSubmit,
}) => {
  const passwordInputRef = useRef<TextInput>(null);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Image
        source={CaktoLogo}
        style={{ width: 300, height: 80 }}
        resizeMethod="resize"
      />

      {error && <Text style={styles.errorText}>{error}</Text>}

      <Controller
        control={control}
        name="cpf"
        render={({ field: { onChange, onBlur, value } }) => (
          <Input
            label="CPF/CNPJ"
            maskType="CPF"
            placeholder="Digite seu CPF/CNPJ"
            onChangeText={onChange}
            onBlur={onBlur}
            value={value}
            error={errors.cpf?.message}
            keyboardType="numeric"
            returnKeyType="next"
            onSubmitEditing={() => passwordInputRef.current?.focus()}
          />
        )}
      />

      <Controller
        control={control}
        name="password"
        render={({ field: { onChange, onBlur, value } }) => (
          <Input
            ref={passwordInputRef}
            label="Senha"
            placeholder="Digite sua senha"
            secureTextEntry
            onChangeText={onChange}
            onBlur={onBlur}
            value={value}
            error={errors.password?.message}
            returnKeyType="done"
            onSubmitEditing={onSubmit}
          />
        )}
      />

      <Button
        title="Entrar"
        onPress={onSubmit}
        loading={isLoading}
        accessibilityHint="Autentica com os dados informados e abre sua conta"
      />
      <Button
        title="Esqueci minha senha"
        variant="ghost"
        onPress={() => {}}
        accessibilityHint="Abre o fluxo de recuperação de senha"
      />
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
  errorText: {
    fontSize: typography.xs,
    color: colors.danger,
    textAlign: "center",
  },
});
