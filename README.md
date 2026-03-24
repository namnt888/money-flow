# 💰 Money Flow 3

Money Flow 3 is a high-density, professional personal finance application focused on advanced debt tracking, transaction management, and automated cashback analytics.

---

## 🤖 AI Agent Entry Point (MANDATORY)

> [!IMPORTANT]
> To maintain project integrity and follow strict UI/UX standards, every new agent session **MUST** start by reading these entry points sequentially.

1. **[MASTER_CONTEXT_LOAD.md](./.agent/prompts/MASTER_CONTEXT_LOAD.md)** - Initialize your session with full technical & architectural context.
2. **[ONBOARDING.md](./.agent/prompts/ONBOARDING.md)** - Understand the documentation ecosystem and core reading list.
3. **[AGENT_CONTEXT.md](./.agent/AGENT_CONTEXT.md)** - Real-time snapshot of features, state, and technical design.
4. **[LATEST_HANDOVER.md](./.agent/HANDOVER_PHASE_16_CASHBACK_FIX_2026_03_22.md)** - CRITICAL notes from the last session (Cashback Fixes & Header Optimization).

---

## 📜 Core Rules & Standards

These rules are NOT optional and define the "Soul" of the project.

- **[Coding Rules](./.agent/rules/rules.md)**: Standards for Server Actions, Error Handling, and Service Layer.
- **[UI/UX Strict Rules](./.agent/rules/ui_rules.md)**: Mandatory visual standards (Square avatars, No Monospace, High contrast labels).
- **[Sheet Sync Rules](./.agent/rules/sheet_sync_rules.md)**: Integrity rules for Google Sheet synchronization.
- **[Cleanup Rules](./.agent/rules/cleanup_rules.md)**: Standards for organizing handovers and files.

---

## 💳 Business Logic & Workflows

Understand the core complexity of the application's financial engine.

- **[Cashback Workflow](./.agent/CASHBACK_WORKFLOW.md)**: Deep dive into the Cashback/Reward calculation engine.
- **[Cashback Config Guide](./.agent/workflows/cashback-config-guide.md)**: JSON configuration samples for complex cards (Diamond/Lady).
- **[Money Glossary](./.agent/prompts/MONEY_GLOSSARY.md)**: Definition of terms (Lend, Repay, Rollover, etc).

---

## 🏗️ Technical Architecture

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript (No `any` types allowed)
- **Database**: Supabase (Transitions to PocketBase as specified in AGENT_CONTEXT)
- **Styling**: Tailwind CSS + Shadcn UI (Radix Primitives)
- **State**: Server Actions & React Server Components

---

## 📂 Project Structure

- `src/app`: Page routes and layouts.
- `src/components`: UI components (moneyflow, people, etc).
- `src/services`: Core business logic layer.
- `src/actions`: Server actions for mutations.
- `src/types`: Centralized TypeScript definitions.
- `.agent`: Master documentation & project rules (Internal Knowledge Base).

---

## 🚨 Quality Gates

Before committing, ensure zero errors in build and linting:

```bash
pnpm install
pnpm lint
pnpm build
```

---

**Version**: 3.5.0 (Phase 75)  
**Last Updated**: 2026-03-22  
**Maintainer**: Money Flow 3 Team
