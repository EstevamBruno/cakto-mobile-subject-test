import { useState, useCallback } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { transferSchema, TransferInput } from "@/utils/schemas";
import { formatMoneyInput, parseMoneyInput } from "@/utils/format";
import { Bank, TransferData } from "@/types";

export type TransferStep = "form" | "review" | "result";

interface TransferModelModule {
  transfer: (
    data: TransferData,
  ) => Promise<{ success: boolean; transactionId: string }>;
}

export const useTransferModel = (module: TransferModelModule) => {
  const { transfer } = module;

  const [step, setStep] = useState<TransferStep>("form");
  const [selectedBank, setSelectedBank] = useState<Bank | null>(null);
  const [bankPickerVisible, setBankPickerVisible] = useState(false);
  const [amountDisplay, setAmountDisplay] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [transactionId, setTransactionId] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const {
    control,
    handleSubmit,
    setValue,
    reset,
    getValues,
    formState: { errors },
  } = useForm<TransferInput>({
    resolver: zodResolver(transferSchema),
    defaultValues: {
      bank: "",
      account: "",
      cpf: "",
      beneficiaryName: "",
      amount: 0,
      note: "",
    },
    mode: "all",
  });

  const onSelectBank = useCallback(
    (bank: Bank) => {
      setSelectedBank(bank);
      setValue("bank", bank.name, { shouldValidate: true });
    },
    [setValue],
  );

  const onAmountChange = useCallback(
    (raw: string) => {
      const display = formatMoneyInput(raw);
      setAmountDisplay(display);
      setValue("amount", parseMoneyInput(raw), { shouldValidate: true });
    },
    [setValue],
  );

  const onReview = useCallback(() => {
    handleSubmit(() => {
      setStep("review");
    })();
  }, [handleSubmit]);

  const onConfirm = useCallback(async () => {
    const values = getValues();
    setIsLoading(true);
    try {
      const result = await transfer({
        bank: values.bank,
        account: values.account,
        cpf: values.cpf,
        beneficiaryName: values.beneficiaryName,
        amount: values.amount,
        note: values.note || undefined,
      });
      setTransactionId(result.transactionId);
      setErrorMessage(null);
    } catch (err) {
      setTransactionId(null);
      setErrorMessage(
        err instanceof Error ? err.message : "Erro ao realizar transferência",
      );
    } finally {
      setIsLoading(false);
      setStep("result");
    }
  }, [transfer, getValues]);

  const onBack = useCallback(() => {
    if (step === "review") setStep("form");
  }, [step]);

  const onNewTransfer = useCallback(() => {
    reset();
    setSelectedBank(null);
    setAmountDisplay("");
    setTransactionId(null);
    setErrorMessage(null);
    setStep("form");
  }, [reset]);

  return {
    control,
    errors,
    step,
    selectedBank,
    bankPickerVisible,
    setBankPickerVisible,
    onSelectBank,
    amountDisplay,
    onAmountChange,
    onReview,
    onConfirm,
    onBack,
    onNewTransfer,
    transactionId,
    errorMessage,
    isLoading,
    getValues,
  };
};
