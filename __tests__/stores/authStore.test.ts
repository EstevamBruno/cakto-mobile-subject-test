import { useAuthStore } from "../../src/stores/authStore"
import * as SecureStore from "expo-secure-store"

/**
 * TODO: Implementar testes para o authStore
 *
 * Dicas:
 * - useAuthStore.getState() retorna o estado atual
 * - useAuthStore.setState({...}) permite resetar estado entre testes
 * - SecureStore está mockado no jest.setup.ts
 * - (SecureStore.getItemAsync as jest.Mock).mockResolvedValue(...) para simular retorno
 * - jest.clearAllMocks() no beforeEach
 *
 * O que testar:
 * - Estado inicial correto
 * - login() com sucesso: user, token, isAuthenticated
 * - login() com falha: error preenchido
 * - login() seta isLoading durante execução
 * - logout() limpa estado e chama SecureStore.deleteItemAsync
 * - clearError() limpa error
 * - checkAuth() restaura sessão do SecureStore
 * - checkAuth() não autentica se não houver token
 */

beforeEach(() => {
  useAuthStore.setState({
    user: null,
    token: null,
    isAuthenticated: false,
    isLoading: false,
    error: null,
  })
  jest.clearAllMocks()
})

describe("useAuthStore", () => {
  describe("initial state", () => {
    it.todo("has correct initial values")
  })

  describe("login", () => {
    it.todo("sets user and token on successful login")
    it.todo("sets error on failed login")
    it.todo("sets loading state during login")
  })

  describe("logout", () => {
    it.todo("clears user and token")
    it.todo("calls SecureStore.deleteItemAsync")
  })

  describe("clearError", () => {
    it.todo("clears error state")
  })

  describe("checkAuth", () => {
    it.todo("restores session from SecureStore")
    it.todo("does not authenticate if no token")
  })
})
