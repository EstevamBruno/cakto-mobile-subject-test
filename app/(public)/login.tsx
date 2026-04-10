import React from "react";
import { LoginView } from "@/screens/Login/Login.view";
import { useLoginModel } from "@/screens/Login/Login.model";
import { useAuthStore } from "@/stores";

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
  const { login, isLoading, error } = useAuthStore();
  const loginModel = useLoginModel({ login, isLoading, error });

  return <LoginView {...loginModel} />;
}
