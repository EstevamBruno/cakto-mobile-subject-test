import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema, LoginInput } from "@/utils/schemas";

interface LoginModelModule {
  login: (cpf: string, password: string) => Promise<void>;
  isLoading: boolean;
  error: string | null;
}

export const useLoginModel = (module: LoginModelModule) => {
  const { login, isLoading, error } = module;

  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginInput>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      cpf: "",
      password: "",
    },
    mode: "all",
  });

  const onSubmit = (): void => {
    handleSubmit((data: LoginInput) => {
      login(data.cpf, data.password);
    })();
  };

  return {
    control,
    errors,
    isLoading: isLoading || isSubmitting,
    error,
    onSubmit,
  };
};
