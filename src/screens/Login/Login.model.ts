import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema, LoginInput } from "@/utils/schemas";

export const useLoginModel = () => {
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
      console.log(data);
    })();
  };

  return { control, errors, isSubmitting, onSubmit };
};
