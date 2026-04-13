import {
  AuthResponse,
  Bank,
  PaginatedResponse,
  Transaction,
  TransferData,
  User,
} from "@/types";

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

const mockUser: User = {
  name: "Maria Silva",
  cpf: "123.456.789-00",
  accountId: "0001-2",
};

const mockBalance = 12500.75;

const generateTransactions = (
  page: number,
  limit: number = 10,
): Transaction[] => {
  const categories = [
    { name: "Transferência Recebida", type: "income" as const },
    { name: "PicPay", type: "expense" as const },
    { name: "Spotify", type: "expense" as const },
    { name: "Salário", type: "income" as const },
    { name: "Mercado", type: "expense" as const },
    { name: "Aluguel", type: "expense" as const },
    { name: "Freelance", type: "income" as const },
    { name: "Uber", type: "expense" as const },
    { name: "Restaurante", type: "expense" as const },
    { name: "Dividendos", type: "income" as const },
  ];

  const transactions: Transaction[] = [];
  const startIndex = (page - 1) * limit;

  for (let i = 0; i < limit; i++) {
    const index = (startIndex + i) % categories.length;
    const category = categories[index];
    const daysAgo = startIndex + i;

    transactions.push({
      id: `tx-${page}-${i}`,
      description: category.name,
      amount: Math.random() * 500 + 10,
      date: new Date(Date.now() - daysAgo * 86400000)
        .toISOString()
        .split("T")[0],
      type: category.type,
      category: category.name,
    });
  }

  return transactions;
};

export const banks: Bank[] = [
  { id: "1", name: "NuBank", code: "260" },
  { id: "2", name: "Bradesco", code: "237" },
  { id: "3", name: "Itaú", code: "341" },
  { id: "4", name: "Santander", code: "033" },
  { id: "5", name: "C6 Bank", code: "336" },
];

export const api = {
  async login(cpf: string, _password: string): Promise<AuthResponse> {
    await delay(1500);

    if (cpf.replace(/\D/g, "").length < 11) {
      throw new Error("CPF ou senha inválidos");
    }

    return {
      token: "mock-jwt-token-" + Date.now(),
      user: mockUser,
    };
  },

  async getBalance(): Promise<{ balance: number }> {
    await delay(800);
    return { balance: mockBalance };
  },

  async getTransactions(page: number): Promise<PaginatedResponse<Transaction>> {
    await delay(1000);

    const data = generateTransactions(page);
    const hasMore = page < 5;

    return { data, hasMore, page };
  },

  async transfer(
    _data: TransferData,
  ): Promise<{ success: boolean; transactionId: string }> {
    await delay(2000);

    return {
      success: true,
      transactionId: `TRF-${Date.now()}`,
    };
  },
};
