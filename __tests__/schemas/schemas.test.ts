import { loginSchema, transferSchema } from "../../src/utils/schemas"

/**
 * TODO: Implementar testes para os schemas Zod
 *
 * Use .safeParse() para testar validação sem throw.
 * Use .parse() para testar transformações (ex: CPF → só números).
 *
 * loginSchema:
 * - cpf: min 11 chars, transforma removendo não-dígitos
 * - password: min 6 chars
 *
 * transferSchema:
 * - bank: min 1 (obrigatório)
 * - account: regex /^\d{5}-\d{1}$/
 * - cpf: min 11, transforma removendo não-dígitos
 * - beneficiaryName: min 2, max 50
 * - amount: positivo, min 0.01
 * - note: max 140, opcional
 */

describe("loginSchema", () => {
  it.todo("validates correct login data")
  it.todo("fails on short password")
  it.todo("fails on short CPF")
  it.todo("transforms CPF to just numbers")
})

describe("transferSchema", () => {
  it.todo("validates correct transfer data")
  it.todo("fails without bank")
  it.todo("fails with invalid account format")
  it.todo("fails with negative amount")
  it.todo("fails with zero amount")
  it.todo("fails with short beneficiary name")
  it.todo("fails with note over 140 chars")
  it.todo("accepts optional note")
  it.todo("transforms CPF to just numbers")
})
