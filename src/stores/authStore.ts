import { create } from "zustand";
import { User } from "@/types";
import * as SecureStore from "expo-secure-store";
import { api } from "@/services";

interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
  login: (cpf: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  checkAuth: () => Promise<void>;
  clearError: () => void;
}

export const TOKEN_KEY = "cakto_auth_token";
export const USER_KEY = "cakto_auth_user";

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

  login: async (cpf: string, password: string) => {
    try {
      set({ isLoading: true, error: null });

      const response = await api.login(cpf, password);
      const { token, user } = response;

      await SecureStore.setItemAsync(TOKEN_KEY, token);
      await SecureStore.setItemAsync(USER_KEY, JSON.stringify(user));

      set({
        user,
        token,
        isAuthenticated: !!user && !!token,
        isLoading: false,
      });
    } catch (error) {
      set({ error: (error as Error).message, isLoading: false });
    }
  },

  logout: async () => {
    try {
      set({ isLoading: true, error: null });

      await SecureStore.deleteItemAsync(TOKEN_KEY);
      await SecureStore.deleteItemAsync(USER_KEY);

      set({
        user: null,
        token: null,
        isAuthenticated: false,
        isLoading: false,
      });
    } catch (error) {
      set({ error: (error as Error).message, isLoading: false });
    }
  },

  checkAuth: async () => {
    try {
      set({ isLoading: true, error: null });

      const token = await SecureStore.getItemAsync(TOKEN_KEY);
      const user = await SecureStore.getItemAsync(USER_KEY);

      if (token && user) {
        set({
          user: JSON.parse(user),
          token,
          isAuthenticated: true,
          isLoading: false,
        });

        return;
      }

      set({ isLoading: false, isAuthenticated: false, error: null });
    } catch (error) {
      set({ error: (error as Error).message, isLoading: false });
    }
  },

  clearError: () => {
    set({ error: null });
  },
}));
