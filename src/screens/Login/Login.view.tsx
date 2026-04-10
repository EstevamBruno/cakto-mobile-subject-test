import React, { FC } from "react";
import { StyleSheet, ScrollView, Image } from "react-native";
import { colors, spacing, typography } from "@/theme";
import { Button, Input } from "@/components";
import { Link } from "expo-router";
import CaktoLogo from "../../../assets/cakto-logo.png";

export const LoginView: FC = () => {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Image
        source={CaktoLogo}
        style={{ width: 300, height: 80 }}
        resizeMethod="resize"
      />
      <Input label="CPF/CNPJ" placeholder="Digite seu CPF/CNPJ" />
      <Input label="Senha" placeholder="Digite sua senha" secureTextEntry />

      <Button title="Entrar" onPress={() => {}} />
      <Link href="/login">Esqueci minha senha</Link>
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
