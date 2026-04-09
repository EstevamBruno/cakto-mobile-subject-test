# Teste Técnico Mobile — Cakto Bank

## 📋 Visão Geral

Este é o repositório base do teste técnico para candidatos à posição de **Mobile Developer** no **Cakto Bank**.

O Cakto Bank é a vertente bancária digital da Cakto, focada em **infoprodutores e empreendedores** — um público que precisa de controle financeiro rápido, intuitivo e seguro no celular.

### 🎯 O que vamos avaliar

- **Arquitetura e organização de código** (Clean Architecture, separação de responsabilidades)
- **React Native + Expo** (proficiência em navegação, componentes, hooks)
- **Gestão de estado** ( Context API, Zustand, etc)
- **Integração com APIs** (REST, tratamento de erros, loading states)
- **UX/UI** (pixel-perfect, feedback visual, acessibilidade)
- **Performance** (FlatList, memoização, renderização otimizada)
- **Segurança** (armazenamento seguro, manipulação de tokens)
- **Testes unitários e de integração**

---

## 📁 Estrutura do Projeto

```
mobile-subject-test/
├── SPEC.md                    # Especificação técnica completa
├── REQUISITOS_DO_TESTE.md     # Este arquivo — regras e escopo
├── README.md                  # Visão geral (você está aqui)
├── app/                       # Entry point Expo Router
│   ├── _layout.tsx
│   ├── index.tsx
│   ├── login.tsx
│   ├── home.tsx
│   ├── transactions.tsx
│   └── transfer/
│       └── index.tsx
├── src/
│   ├── components/            # Componentes reutilizáveis
│   ├── screens/               # Telas/pages
│   ├── hooks/                 # Hooks customizados
│   ├── services/              # Integração com API
│   ├── stores/                # Estado global (Zustand)
│   ├── types/                 # TypeScript types
│   ├── utils/                 # Helpers, formatters
│   └── theme/                 # Cores, tipografia, spacing
├── __tests__/                 # Testes unitários e de integração
├── jest.config.js
└── package.json
```

---

## 🚀 Como executar

```bash
# 1. Instalar dependências
pnpm install

# 2. Iniciar o Expo
pnpm run start

# 3. Rodar testes
pnpm run test
```

---

## 📌 Pré-requisitos do Candidato

- Node.js 18+
- Expo SDK 52+
- pnpm
- Android Studio / Xcode (para build nativo)
- Emulador ou dispositivo físico para teste

---

## 📝 Regras do Teste

1. **Forke este repositório** (configurado como private no GitHub — seus código fica invisível para outros candidatos)
2. **Clone o fork** localmente
3. **Leia o `SPEC.md` com atenção** — lá estão os detalhes técnicos e telas a implementar
4. **Implemente tudo descrito nos requisitos**
5. **Commite frequentemente** — queremos ver seu processo
6. **Ao finalizar, envie o link do fork para o recrutador**
7. **Prazo:** até **7 dias** após receber o convite

> ⚠️ **Importante:** 
> - O projeto já possui uma estrutura base com tema, types e serviços mockados. O candidato deve **completar e expandir** essa base, não recriar do zero.
> - **Tudo é mockado** — sem APIs externas, sem Supabase, sem Firebase. Apenas dados simulados em memória.

---

## 🏗 Stack Tecnológica

| Tecnologia       | Uso                              |
|------------------|----------------------------------|
| Expo SDK 52      | Framework principal              |
| React Native     | UI layer                         |
| TypeScript       | Tipagem estática                 |
| Expo Router      | Navegação (file-based routing)   |
| Zustand          | Estado global                    |
| React Hook Form  | Formulários                      |
| Zod              | Validação de schema              |
| React Native SVG | Ícones (lucide-react-native)     |
| Jest + Testing Library | Testes                  |
| Expo Secure Store| Armazenamento seguro de tokens   |

> 📡 **Tudo é mockado!** Não é necessário conectar nenhuma API, Supabase, Firebase ou outro serviço externo. Os dados são simulados em memória conforme descrito em `SPEC.md`.

---

## 📞 Dúvidas?

Se tiver qualquer dúvida sobre os requisitos, abra uma **issue** neste repositório ou entre em contato com o recrutador.

Boa sorte! 🍀
