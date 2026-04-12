import { z } from "zod";

export const loginSchema = z.object({
  cpf: z
    .string()
    .min(11, "CPF deve ter pelo menos 11 dígitos")
    .transform((val) => val.replace(/\D/g, "")),
  password: z.string().min(6, "Senha deve ter pelo menos 6 caracteres"),
});

export const transferSchema = z.object({
  bank: z.string().min(1, "Selecione o banco"),
  account: z
    .string()
    .regex(/^\d{5}-\d{1}$/, "Conta inválida (formato: 00000-0)"),
  cpf: z
    .string()
    .min(11, "CPF inválido")
    .transform((val) => val.replace(/\D/g, "")),
  beneficiaryName: z
    .string()
    .min(2, "Nome muito curto")
    .max(50, "Nome muito longo"),
  amount: z
    .number()
    .positive("Valor deve ser positivo")
    .min(0.01, "Valor mínimo de R$ 0,01"),
  note: z.string().max(140, "Máximo 140 caracteres").optional(),
});

export type LoginInput = z.infer<typeof loginSchema>;
export type TransferInput = z.infer<typeof transferSchema>;
