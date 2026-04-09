import {
  formatCurrency,
  formatDate,
  formatCPF,
  formatAccountNumber,
  formatMoneyInput,
  parseMoneyInput,
  getInitials,
} from "../../src/utils/format"

/**
 * TODO: Implementar testes para os utilitários de formatação
 *
 * Funções disponíveis para testar:
 * - formatCurrency(value: number) → "R$ 1.234,56"
 * - formatDate(dateString: string) → "9 de abril"
 * - formatCPF(cpf: string) → "123.456.789-00"
 * - formatAccountNumber(account: string) → "12345-6"
 * - formatMoneyInput(value: string) → "12,34"
 * - parseMoneyInput(value: string) → 12.34
 * - getInitials(name: string) → "MS"
 *
 * Cubra pelo menos:
 * - Valores normais (happy path)
 * - Valores zerados / vazios (edge cases)
 * - Valores grandes
 */

describe("formatCurrency", () => {
  it.todo("formats number to BRL string")
  it.todo("formats zero correctly")
  it.todo("formats large numbers correctly")
})

describe("formatDate", () => {
  it.todo("formats date to long date string in pt-BR")
})

describe("formatCPF", () => {
  it.todo("formats 11 digit CPF correctly")
  it.todo("formats partial CPF")
})

describe("formatAccountNumber", () => {
  it.todo("formats numeric string to account format")
})

describe("formatMoneyInput", () => {
  it.todo("formats input to money string")
  it.todo("handles empty string")
})

describe("parseMoneyInput", () => {
  it.todo("parses money string to number")
  it.todo("handles empty string")
})

describe("getInitials", () => {
  it.todo("gets initials from full name")
  it.todo("gets two letters from single name")
})
