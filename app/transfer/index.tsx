import React from "react"
import { View, Text, StyleSheet } from "react-native"
import { colors, spacing, typography } from "../../src/theme"

/**
 * TODO: Implementar tela de Transferência
 *
 * Esta tela tem 3 steps: "form" → "review" → "result"
 * Usar useState<"form" | "review" | "result"> para controlar o step.
 *
 * === STEP 1: Formulário ===
 * - Campo Banco/Instituição (abre BottomSheet com lista de bancos — usar `banks` de services/api)
 * - Campo Conta destino (máscara: 00000-0 — usar formatAccountNumber)
 * - Campo CPF/CNPJ favorecido (máscara CPF — usar formatCPF)
 * - Campo Nome do favorecido
 * - Campo Valor (teclado numérico, formatação BRL em tempo real — usar formatMoneyInput)
 * - Campo Observação (opcional, max 140 chars)
 * - Validação com React Hook Form + Zod (transferSchema de utils/schemas)
 * - Botão "Revisar transferência"
 *
 * === STEP 2: Revisão ===
 * - Card com resumo de todos os dados preenchidos
 * - Valor destacado em azul (colors.primary)
 * - Botão "Confirmar" com loading (chamar api.transfer)
 * - Botão "Voltar" (volta para form)
 *
 * === STEP 3: Resultado ===
 * - Sucesso: ícone verde (Check) + "Transferência realizada!" + ID da transação
 *   - Botão "Nova transferência" (reset form + volta step 1)
 *   - Botão "Voltar ao início" (navega /home)
 * - Erro: ícone vermelho (X) + mensagem de erro
 *   - Botão "Tentar novamente" (volta step 2)
 *
 * === GERAL ===
 * - Header com botão voltar (ChevronLeft) + título dinâmico por step
 * - KeyboardAvoidingView para iOS
 * - useSafeAreaInsets para padding top
 * - Limpeza completa do formulário após sucesso
 *
 * Componentes: Button, Input, BottomSheet (de src/components)
 * Schema: transferSchema, TransferInput (de src/utils/schemas)
 * Utils: formatCPF, formatAccountNumber, formatMoneyInput, formatCurrency
 * API: api.transfer, banks (de src/services/api)
 * Ícones: Building2, Check, X, ChevronLeft (de lucide-react-native)
 *
 * Referência: SPEC.md seção 4
 */
export default function TransferScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>💸</Text>
      <Text style={styles.subtitle}>Implemente a tela de Transferência</Text>
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
  title: {
    fontSize: 64,
  },
  subtitle: {
    fontSize: typography.md,
    color: colors.textSecondary,
    marginTop: spacing.lg,
  },
})
