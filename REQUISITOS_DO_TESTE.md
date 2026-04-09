# REQUISITOS DO TESTE — Cakto Bank

## 📌 Instruções

1. **Faça um Fork neste repositório** (não clone direto — o fork é privado por padrão no GitHub)
2. Clone o seu fork localmente
3. Implemente todas as funcionalidades descritas em `SPEC.md`
4. Commite suas alterações com mensagens descritivas
5. Ao finalizar, adicione o revisor `gabealvss` (gabe.alvss@gmail.com) como collaborator do repositório forkado OU envio o link do fork para o recrutador

> ⚠️ **Importante:** Não crie branches no repositório original. Cada candidato trabalha no **seu próprio fork**, então ninguém vê o código dos outros.

---

## 🎯 Funcionalidades Obrigatórias

### Autenticação
- [ ] Tela de login com validação de CPF e senha
- [ ] Persistência de sessão com SecureStore
- [ ] Redirecionamento automático se já autenticado

### Dashboard (Home)
- [ ] Exibição de saldo com toggle de visibilidade
- [ ] Avatar com iniciais do usuário
- [ ] Lista das últimas 5 transações
- [ ] Pull-to-refresh

### Transações
- [ ] Lista completa com paginação infinita
- [ ] Filtros: Todas / Receitas / Despesas
- [ ] Empty state
- [ ] Pull-to-refresh

### Transferência
- [ ] Formulário completo com validação Zod
- [ ] Seleção de banco via BottomSheet
- [ ] Máscara de valor em tempo real
- [ ] Tela de revisão antes de confirmar
- [ ] Tela de resultado (sucesso/erro)
- [ ] Limpeza do formulário após sucesso

### Componentes
- [ ] Button (primary, secondary, ghost)
- [ ] Input (label, error, mask, secure)
- [ ] Card
- [ ] TransactionItem
- [ ] BalanceCard
- [ ] BottomSheet

### Estado Global
- [ ] AuthStore (Zustand)
- [ ] TransactionStore (Zustand)

### Testes
- [ ] Testes em authStore
- [ ] Testes no schema Zod
- [ ] Testes nos utilitários de formatação

---

## 📊 O que será avaliado

| Aspecto                     | O que esperamos                              |
|-----------------------------|----------------------------------------------|
| **Funcionalidade**          | Tudo funcionando, sem crash, sem bugs óbvios |
| **Código**                  | Limpo, organizado, sem `any`, nomes claros   |
| **Arquitetura**             | Separação de concerns, componentes puros     |
| **UX**                      | Feedback visual, loading states, erros claros|
| **Performance**             | FlatList otimizado, sem renders desnecessários|
| **Testes**                  | Mínimo 3 suites, funcionando                 |

---

## ⏱ Tempo Estimado

- **Mínimo necessário**: 4 horas
- **Tempo confortável**: 6-8 horas
- **Deadline**: até **7 dias** após receber o link do repositório

---

## ❓ Dúvidas

Abra uma **issue** aqui no repositório ou fale com o recrutador.

---

## ✅ Checklist Final

Antes de submeter, verifique:

- [ ] Rodei `pnpm test` e todos os testes passam?
- [ ] A aplicação compila sem erros (`npx expo start`)?
- [ ] Todas as telas estão navegáveis?
- [ ] Não deixei `console.log` de debug?
- [ ] Commits estão com mensagens descritivas?
- [ ] O repositório está como **fork private** (não público)?

---

**Boa sorte! 🚀**
