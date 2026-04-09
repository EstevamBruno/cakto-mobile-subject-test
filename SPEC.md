# SPEC.md — Especificação Técnica do Teste

## 🎯 Objetivo

Implementar o módulo de **home banking** do app Cakto Bank com foco em:
- Tela de login
- Dashboard com saldo e resumo da conta
- Lista de transações com rolagem infinita
- Fluxo de transferência bancária (simulada)

> 📡 **Tudo é mockado!** Não é necessário conectar nenhuma API, Supabase, Firebase ou outro serviço externo. Os dados são simulados em memória — conforme exemplo em `src/services/api.ts`.

---

## 1. Tela de Login (`/login`)

### Requisitos Visuais
- Logo Cakto no topo
- Campo **CPF/CNPJ** (máscara automática)
- Campo **Senha** (com toggle de visibilidade)
- Botão **"Entrar"**
- Link **"Esqueci minha senha"** (apenas visual — não precisa funcionar)

### Requisitos Técnicos
- [ ] Validação de CPF (mínimo 11 dígitos)
- [ ] Validação de senha (mínimo 6 caracteres)
- [ ] Loading state no botão durante "autenticação"
- [ ] Feedback de erro visual (border vermelha + mensagem)
- [ ] Persistência de sessão com `Expo SecureStore`
- [ ] Redirecionamento automático para `/home` se já logado

### Mock de Autenticação
```typescript
// Simular login com delay de 1.5s
// Sucesso: { token: string, user: { name: string, cpf: string, accountId: string } }
// Erro: "CPF ou senha inválidos"
```

---

## 2. Tela Home (`/home`)

### Requisitos Visuais
- Header com nome do usuário e avatar (iniciais)
- Card de **Saldo Total** (valor grande, com opción de ocultar valor)
- Botão de **"Ver extrato"** (navega para `/transactions`)
- Grid de **atalhos**:
  - 🏧 Transferir
  - 💳 Cartão virtual
  - 📊 Investimentos
  - ⚙️ Configurações
- Seção **"Últimas transações"** (últimas 5, com "Ver mais")

### Requisitos Técnicos
- [ ] Valor do saldo formatado em BRL (`R$ 1.234,56`)
- [ ] Toggle de visibilidade do saldo (olho aberto/fechado)
- [ ] Avatar com iniciais do usuário (gerado dinamicamente)
- [ ] Pull-to-refresh para atualizar dados
- [ ] Dados mockados (não precisa chamar API real)

### Dados Mock
```typescript
const mockUser = {
  name: "Maria Silva",
  cpf: "123.456.789-00",
  accountId: "0001-2",
  balance: 12500.75,
}

const mockLastTransactions = [
  { id: "1", description: "Transferência Recebida", amount: 250.00, date: "2026-04-08", type: "income" },
  { id: "2", description: "PicPay", amount: 85.50, date: "2026-04-08", type: "expense" },
  { id: "3", description: "Spotify", amount: 27.90, date: "2026-04-07", type: "expense" },
  { id: "4", description: "Salário", amount: 5800.00, date: "2026-04-05", type: "income" },
  { id: "5", description: "Mercado", amount: 320.40, date: "2026-04-04", type: "expense" },
]
```

---

## 3. Tela Transações (`/transactions`)

### Requisitos Visuais
- Header com título "Extrato"
- Filtros: **"Todas" | "Receitas" | "Despesas"**
- Lista de transações com:
  - Ícone categorizado (cor verde para income, vermelho para expense)
  - Descrição
  - Data formatada (ex: "08 de abril")
  - Valor (verde positivo, vermelho negativo)
- **Paginação infinita** (carrega mais ao scrollar)

### Requisitos Técnicos
- [ ] FlatList com `onEndReached` e loading indicator
- [ ] Filtro funcional (cliente-side para o mock)
- [ ] Pull-to-refresh
- [ ] Empty state se não houver transações no filtro
- [ ] Componente `<TransactionItem />` reutilizável
- [ ] Memoização com `React.memo` e `useCallback`

### Dados Mock (20 transações)
Gerar lista mockada com tipos e valores variados para teste de paginação.

---

## 4. Tela Transferência (`/transfer`)

### Requisitos Visuais
- Header com título "Transferir"
- Campo **Banco/Instituição** (seleção por modal — mock com 5 opções)
- Campo **Conta destino** (máscara: `00000-0`)
- Campo **CPF/CNPJ favorecido**
- Campo **Nome do favorecido**
- Campo **Valor** (keyboard numérico, formatação BRL em tempo real)
- Campo **Observação** (opcional, max 140 caracteres)
- Botão **"Revisar transferência"**

### Fluxo
1. Preenche formulário → 2. Revisão (tela de confirmação) → 3. Resultado (sucesso/erro)

### Tela de Revisão
- Resumo de todos os dados inseridos
- Botão "Confirmar" → loading → resultado
- Botão "Voltar" para corrigir

### Tela de Resultado
- ✅ Tela de sucesso com ID da transação (mock)
- ❌ Tela de erro com mensagem e opção de tentar novamente

### Requisitos Técnicos
- [ ] Validação de todos os campos com **Zod**
- [ ] Máscara de valor em tempo real
- [ ] Loading state em todas as ações de rede
- [ ] Feedback visual de erro por campo
- [ ] Limpeza do formulário após transferência bem-sucedida
- [ ] Testes unitários do schema Zod

### Schema Zod
```typescript
const transferSchema = z.object({
  bank: z.string().min(1, "Selecione o banco"),
  account: z.string().regex(/^\d{5}-\d{1}$/, "Conta inválida"),
  cpf: z.string().min(11, "CPF inválido"),
  beneficiaryName: z.string().min(2, "Nome muito curto"),
  amount: z.number().positive("Valor deve ser positivo"),
  note: z.string().max(140).optional(),
})
```

---

## 5. Componentes Reutilizáveis

### `<Button />`
- Props: `variant` (primary | secondary | ghost), `loading`, `disabled`, `onPress`
- Estados: default, pressed (opacity), disabled (opacity baixa), loading (spinner)

### `<Input />`
- Props: `label`, `error`, `mask`, `secureTextEntry`, `rightIcon`
- Estados: default, focused (border azul), error (border vermelha)

### `<Card />`
- Background com sombra suave (`shadow-sm`)
- Border radius `12px`
- Padding interno `16px`

### `<TransactionItem />`
- Ícone à esquerda com fundo colorido por categoria
- Texto principal + data
- Valor à direita (verde/vermelho)

### `<BalanceCard />`
- Valor grande centralizado
- Toggle de visibilidade
- Ícone de tendência (↑↓) — mock

### `<BottomSheet />`
- Modal de seleção (usar para escolha do banco)
- Gesture de swipe para fechar
- Backdrop escuro

---

## 6. Tema e Design System

### Cores
```typescript
const colors = {
  primary: "#0A84FF",       // Azul
  primaryDark: "#0066CC",
  success: "#30D158",       // Verde (receitas)
  danger: "#FF453A",        // Vermelho (despesas)
  warning: "#FFD60A",
  background: "#F5F5F7",
  surface: "#FFFFFF",
  text: "#1C1C1E",
  textSecondary: "#8E8E93",
  border: "#E5E5EA",
  disabled: "#C7C7CC",
}
```

### Tipografia
- **Fontes**: System default (San Francisco no iOS, Roboto no Android)
- **Tamanhos**: `xs(12)`, `sm(14)`, `md(16)`, `lg(20)`, `xl(24)`, `2xl(32)`

### Espaçamento
- Base: `4px`
- Escalas: `4, 8, 12, 16, 20, 24, 32, 48`

---

## 7. Store de Estado (Zustand)

```typescript
// stores/authStore.ts
interface AuthState {
  user: User | null
  token: string | null
  isAuthenticated: boolean
  login: (cpf: string, password: string) => Promise<void>
  logout: () => void
}

// stores/transactionStore.ts
interface TransactionState {
  transactions: Transaction[]
  isLoading: boolean
  page: number
  hasMore: boolean
  fetchTransactions: (page: number) => Promise<void>
  reset: () => void
}
```

---

## 8. API Service (Mock)

```typescript
// services/api.ts
// Todos os endpoints são mockados com setTimeout de 800-1500ms

POST /auth/login → { token, user }
GET /account/balance → { balance }
GET /transactions?page=1&limit=10 → { data: Transaction[], hasMore: boolean }
POST /transfer → { success: boolean, transactionId: string }
```

---

## 9. Testes

### Requisitos Obrigatórios
- [ ] Testes no `useAuthStore` (login, logout, persistência)
- [ ] Testes no schema Zod de transferência
- [ ] Testes nos utilitários de formatação (BRL currency, date)

### Exemplo
```typescript
// __tests__/utils/format.test.ts
describe("formatCurrency", () => {
  it("formats number to BRL string", () => {
    expect(formatCurrency(1234.56)).toBe("R$ 1.234,56")
  })
})
```

---

## 10. Boas Práticas Esperadas

- **TypeScript**: Sem `any`, usar tipos específicos
- **Clean Code**: Funções pequenas, nomes descritivos
- **Erros**: Try/catch com feedback ao usuário
- **Acessibilidade**: `accessibilityLabel`, `accessibilityHint`
- **Performance**: Lista com `getItemLayout`, `keyExtractor`, `removeClippedSubviews`
- **Git**: Commits semânticos (`feat:`, `fix:`, `refactor:`)

---

## 📊 Critérios de Avaliação

| Critério                  | Peso |
|---------------------------|------|
| Funcionalidade completa   | 30%  |
| Qualidade do código       | 25%  |
| Arquitetura               | 20%  |
| UX/UI                     | 15%  |
| Testes                    | 10%  |

---

_Boas práticas e diferencial: animações, testes acima do mínimo, documentação de componentes._
