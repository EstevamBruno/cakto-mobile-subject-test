export function formatCurrency(value: number): string {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(value)
}

export function formatDate(dateString: string): string {
  const date = new Date(dateString)
  return new Intl.DateTimeFormat("pt-BR", {
    day: "numeric",
    month: "long",
  }).format(date)
}

export function formatDateShort(dateString: string): string {
  const date = new Date(dateString)
  return new Intl.DateTimeFormat("pt-BR", {
    day: "2-digit",
    month: "2-digit",
  }).format(date)
}

export function formatAccountNumber(account: string): string {
  const cleaned = account.replace(/\D/g, "")
  if (cleaned.length >= 6) {
    return `${cleaned.slice(0, 5)}-${cleaned.slice(5, 6)}`
  }
  return account
}

export function formatCPF(cpf: string): string {
  const cleaned = cpf.replace(/\D/g, "")
  if (cleaned.length > 11) return cpf.slice(0, 14)
  
  if (cleaned.length > 9) {
    return `${cleaned.slice(0, 3)}.${cleaned.slice(3, 6)}.${cleaned.slice(6, 9)}-${cleaned.slice(9, 11)}`
  }
  if (cleaned.length > 6) {
    return `${cleaned.slice(0, 3)}.${cleaned.slice(3, 6)}.${cleaned.slice(6)}`
  }
  if (cleaned.length > 3) {
    return `${cleaned.slice(0, 3)}.${cleaned.slice(3)}`
  }
  return cleaned
}

export function formatMoneyInput(value: string): string {
  const cleaned = value.replace(/\D/g, "")
  if (!cleaned) return ""
  
  const number = parseInt(cleaned, 10) / 100
  return number.toLocaleString("pt-BR", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })
}

export function parseMoneyInput(value: string): number {
  const cleaned = value.replace(/\D/g, "")
  if (!cleaned) return 0
  return parseInt(cleaned, 10) / 100
}

export function getInitials(name: string): string {
  const parts = name.trim().split(" ")
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase()
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase()
}
