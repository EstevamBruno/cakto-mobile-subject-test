import type { useLoginModel } from "@/screens/Login/Login.model";

export interface LoginModelModule {
  login: (cpf: string, password: string) => Promise<void>;
  isLoading: boolean;
  error: string | null;
}

export interface LoginViewProps extends ReturnType<typeof useLoginModel> {}
