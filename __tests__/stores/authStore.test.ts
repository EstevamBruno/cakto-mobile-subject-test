import { useAuthStore, TOKEN_KEY, USER_KEY } from "@/stores/authStore";
import * as SecureStore from "expo-secure-store";
import { api } from "@/services";
import { AuthResponse } from "@/types";

jest.mock("@/services", () => ({
  api: {
    login: jest.fn(),
  },
}));

const mockUser = {
  name: "Maria Silva",
  cpf: "123.456.789-00",
  accountId: "0001-2",
};

beforeEach(() => {
  useAuthStore.setState({
    user: null,
    token: null,
    isAuthenticated: false,
    isLoading: false,
    error: null,
  });
  jest.clearAllMocks();
});

describe("useAuthStore", () => {
  describe("initial state", () => {
    it("has correct initial values", () => {
      const state = useAuthStore.getState();
      expect(state.user).toBeNull();
      expect(state.token).toBeNull();
      expect(state.isAuthenticated).toBe(false);
      expect(state.isLoading).toBe(false);
      expect(state.error).toBeNull();
    });
  });

  describe("login", () => {
    it("sets user and token on successful login", async () => {
      (api.login as jest.Mock).mockResolvedValue({
        token: "mock-token",
        user: mockUser,
      });

      await useAuthStore.getState().login(mockUser.cpf, "any");

      const state = useAuthStore.getState();
      expect(state.user).toEqual(mockUser);
      expect(state.token).toBe("mock-token");
      expect(state.isAuthenticated).toBe(true);
      expect(state.isLoading).toBe(false);
      expect(state.error).toBeNull();

      expect(SecureStore.setItemAsync).toHaveBeenCalledWith(
        TOKEN_KEY,
        "mock-token",
      );
      expect(SecureStore.setItemAsync).toHaveBeenCalledWith(
        USER_KEY,
        JSON.stringify(mockUser),
      );
    });

    it("sets error on failed login", async () => {
      (api.login as jest.Mock).mockRejectedValue(
        new Error("CPF ou senha inválidos"),
      );

      await useAuthStore.getState().login("12345", "any");

      const state = useAuthStore.getState();
      expect(state.error).toBe("CPF ou senha inválidos");
      expect(state.isLoading).toBe(false);
      expect(state.isAuthenticated).toBe(false);
      expect(state.user).toBeNull();
    });

    it("sets loading state during login", async () => {
      let resolveLogin!: (value: AuthResponse) => void;
      const pending = new Promise<AuthResponse>((resolve) => {
        resolveLogin = resolve;
      });
      (api.login as jest.Mock).mockReturnValue(pending);

      const loginPromise = useAuthStore.getState().login(mockUser.cpf, "any");

      expect(useAuthStore.getState().isLoading).toBe(true);

      resolveLogin({ token: "mock-token", user: mockUser });
      await loginPromise;

      expect(useAuthStore.getState().isLoading).toBe(false);
    });
  });

  describe("logout", () => {
    it("clears user and token", async () => {
      useAuthStore.setState({
        user: mockUser,
        token: "mock-token",
        isAuthenticated: true,
      });

      await useAuthStore.getState().logout();

      const state = useAuthStore.getState();
      expect(state.user).toBeNull();
      expect(state.token).toBeNull();
      expect(state.isAuthenticated).toBe(false);
    });

    it("calls SecureStore.deleteItemAsync", async () => {
      await useAuthStore.getState().logout();

      expect(SecureStore.deleteItemAsync).toHaveBeenCalledWith(TOKEN_KEY);
      expect(SecureStore.deleteItemAsync).toHaveBeenCalledWith(USER_KEY);
    });

    it("sets error when SecureStore.deleteItemAsync throws", async () => {
      (SecureStore.deleteItemAsync as jest.Mock).mockRejectedValue(
        new Error("storage failure"),
      );

      await useAuthStore.getState().logout();

      const state = useAuthStore.getState();
      expect(state.error).toBe("storage failure");
      expect(state.isLoading).toBe(false);
    });
  });

  describe("clearError", () => {
    it("clears error state", () => {
      useAuthStore.setState({ error: "some error" });

      useAuthStore.getState().clearError();

      expect(useAuthStore.getState().error).toBeNull();
    });
  });

  describe("checkAuth", () => {
    it("restores session from SecureStore", async () => {
      (SecureStore.getItemAsync as jest.Mock).mockImplementation(
        (key: string) => {
          if (key === TOKEN_KEY) return Promise.resolve("stored-token");
          if (key === USER_KEY)
            return Promise.resolve(JSON.stringify(mockUser));
          return Promise.resolve(null);
        },
      );

      await useAuthStore.getState().checkAuth();

      const state = useAuthStore.getState();
      expect(state.isAuthenticated).toBe(true);
      expect(state.token).toBe("stored-token");
      expect(state.user).toEqual(mockUser);
      expect(state.isLoading).toBe(false);
    });

    it("does not authenticate if no token", async () => {
      (SecureStore.getItemAsync as jest.Mock).mockResolvedValue(null);

      await useAuthStore.getState().checkAuth();

      const state = useAuthStore.getState();
      expect(state.isAuthenticated).toBe(false);
      expect(state.user).toBeNull();
      expect(state.token).toBeNull();
    });

    it("sets error when SecureStore.getItemAsync throws", async () => {
      (SecureStore.getItemAsync as jest.Mock).mockRejectedValue(
        new Error("read failure"),
      );

      await useAuthStore.getState().checkAuth();

      const state = useAuthStore.getState();
      expect(state.error).toBe("read failure");
      expect(state.isLoading).toBe(false);
    });
  });
});
