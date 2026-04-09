import { create } from "zustand"
import { User } from "../types"

interface AuthState {
  user: User | null
  token: string | null
  isAuthenticated: boolean
  isLoading: boolean
  error: string | null
  login: (cpf: string, password: string) => Promise<void>
  logout: () => Promise<void>
  checkAuth: () => Promise<void>
  clearError: () => void
}

const TOKEN_KEY = "cakto_auth_token"
const USER_KEY = "cakto_auth_user"

/**
 * TODO: Implementar useAuthStore com Zustand
 *
 * Requisitos:
 * - login(): chamar api.login(), salvar token/user no Expo SecureStore, atualizar estado
 * - logout(): limpar SecureStore, resetar estado
 * - checkAuth(): verificar se existe token/user no SecureStore ao abrir o app
 * - clearError(): limpar mensagem de erro
 * - isLoading: true durante requisições assíncronas
 * - error: mensagem de erro da API ou null
 *
 * Dicas:
 * - Usar `expo-secure-store` (setItemAsync, getItemAsync, deleteItemAsync)
 * - Usar api.login() de "../services/api"
 * - Try/catch em todas as async functions
 *
 * Referência: SPEC.md seção 7 — Store de Estado
 */
export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  token: null,
  isAuthenticated: false,
  isLoading: false,
  error: null,

  login: async (_cpf: string, _password: string) => {
    // TODO: implementar
  },

  logout: async () => {
    // TODO: implementar
  },

  checkAuth: async () => {
    // TODO: implementar
  },

  clearError: () => {
    // TODO: implementar
  },
}))
