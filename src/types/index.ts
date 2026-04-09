export interface User {
  name: string
  cpf: string
  accountId: string
  avatar?: string
}

export interface Transaction {
  id: string
  description: string
  amount: number
  date: string
  type: "income" | "expense"
  category: string
}

export interface TransferData {
  bank: string
  account: string
  cpf: string
  beneficiaryName: string
  amount: number
  note?: string
}

export interface AuthResponse {
  token: string
  user: User
}

export interface PaginatedResponse<T> {
  data: T[]
  hasMore: boolean
  page: number
}

export interface Bank {
  id: string
  name: string
  code: string
}
