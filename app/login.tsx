import React from "react"
import { View, Text, StyleSheet } from "react-native"
import { colors, spacing, typography } from "../src/theme"

/**
 * TODO: Implementar tela de Login
 *
 * Requisitos:
 * - Logo Cakto no topo
 * - Campo CPF com máscara automática (usar formatCPF de utils/format)
 * - Campo Senha com toggle de visibilidade
 * - Validação com React Hook Form + Zod (loginSchema de utils/schemas)
 * - Botão "Entrar" com loading state
 * - Feedback de erro visual (border vermelha + mensagem de erro da API)
 * - Usar useAuthStore para login
 * - Ao autenticar com sucesso, redirecionar para /home
 * - Link "Esqueci minha senha" (apenas visual)
 * - KeyboardAvoidingView para iOS
 *
 * Componentes disponíveis: Button, Input (de src/components)
 * Store disponível: useAuthStore (de src/stores/authStore)
 * Schema disponível: loginSchema, LoginInput (de src/utils/schemas)
 *
 * Referência: SPEC.md seção 1
 */
export default function LoginScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.logo}>🐷</Text>
      <Text style={styles.title}>Cakto Bank</Text>
      <Text style={styles.subtitle}>Implemente a tela de login</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.background,
    padding: spacing.xl,
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
})
