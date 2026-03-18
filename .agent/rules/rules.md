PROJECT CONTEXT

Name: Money Flow 3

Stack: Next.js 15 (App Router), TypeScript, Tailwind CSS, Shadcn UI, Supabase.

CODING STANDARDS & RULES

1. General Principles

Conciseness: Write concise, technical responses. Avoid verbosity.

Type Safety: NO any. Always use defined types from src/types or database.types.ts.

Functional: Prefer functional programming patterns. Use const over let.

Server Actions: Use Server Actions for mutations. Ensure revalidatePath is called after updates.

Error Handling: Always wrap Server Actions in try-catch blocks. Return { success: boolean, error?: string, data?: T }.

2. Next.js 15 & React Guidelines

RSC: Default to React Server Components. Use 'use client' only when interactivity (hooks, event listeners) is needed.

Shadcn UI: Use existing Shadcn components in src/components/ui. Do not reinvent the wheel.

Forms: Use react-hook-form with zod schema validation.

Loading: Use Suspense boundaries and loading.tsx for async operations.

3. Database Best Practices (PocketBase Primary)
   - **Client**: Use `pb` service from `src/lib/pocketbase/` (Server/Client versions).
   - **Data Flow**: Business logic should prefer PocketBase collections (`transactions`, `accounts`, `people`, etc.).
   - **Sync**: Ensure data is synced between UI and PB via Server Actions or direct revalidation.
   - **Supabase**: Only use for legacy storage or explicitly marked features.

4. Money Flow 3 Business Logic (CRITICAL)

Refunds (V2):
- **Flow**: Original (GD1) -> Request (GD2) -> Confirm (GD3).
- **Constraints**:
  - DELETE must follow LIFO order (3 -> 2 -> 1).
  - REQUEST REFUND action restricted to `expense` type only.
  - ICONS: GD1=`Undo2`(completed), GD2=`Clock`, GD3=`Check`/`OK`.
- **Metadata**: GD1 must have `refund_status: 'completed'` when GD3 exists.

Batches: When processing batches, check for duplicates using transaction_date, amount, and details.

Installments: Installments are linked to transaction_lines. Do not double-count parent and installments in totals.

9. Cashback Logic (CRITICAL - Phase 16 Reboot)
   - **Status**: Transaction Slide Cashback Section is currently a placeholder.
   - **Logic**: 
     - MUST be dynamic: reactive to amount, category, account, and cycle.
     - Rate Handling: Internal storage is decimal (0.005), UI display is percentage (0.5%).
     - Exclusions: Income, Transfers, and "Create Initial" notes MUST NOT earn cashback.
   - **Research**: Use branch `fix/categories-ui-optimization` as documentation for display logic.

6. Mandatory Quality Gates (Vibe Coding Strict)
   
   - **Build**: `pnpm build` must pass before any handover.
   - **Documentation**: Any significant logic change must be documented in a Handover file or updated in `AGENT_CONTEXT.md`.
   - **Lockfile Sync (CRITICAL)**: Always run `pnpm install` after changing `package.json` to ensure `pnpm-lock.yaml` is up to date. Vercel builds will FAIL if the lockfile is out of sync.
   
   CI/CD: GitHub Actions/Vercel will block any PR/push that fails lint or build.
   
   Local Check (MANDATORY): BEFORE committing or handing over, you MUST run:
   > pnpm build
   > pnpm lint
   
   Testing:
   - Vitest is configured. Run `pnpm test` (if available) or minimally ensure `pnpm build` passes.
   - HANDOVER REQUIREMENT: You MUST verify the build passes (`pnpm build`) before ending the session.
   - Any Types: PROHIBITED. Fix them, do not cast as `any` unless absolutely necessary for external libraries.
   
7. Database Schema & Migrations
   - **PocketBase Schema**: `scripts/pocketbase/schema.json`.
   - **PocketBase Migrations**: Managed via PocketBase Admin UI or internal migration scripts in `scripts/`.
   - **Legacy Supabase**: Schema in `database/schema.sql`, migrations in `database/migrations/`.

8. File Cleanup (CRITICAL)
   - **NO temporary files** in project root (build_*.txt, lint_*.txt, changes.txt, etc.)
   - Use `.logs/` folder for temporary files (gitignored)
   - Clean up `.logs/` before completing tasks
   - See `.agent/rules/cleanup_rules.md` for detailed rules

10. Handover Documentation
   - **Naming Convention**: Handover filename MUST match the branch name (e.g., `feature-xyz.md`).
   - **Directory Structure**: Store handovers in `.agent/handovers/mmyyyy/` (e.g., `.agent/handovers/032026/`).
   - **Format**: Follow the `AGENT_HANDOVER_PROMPTS.md` template or use a clear markdown structure summarizing changes, tests, and next steps.
   - **Cleanup**: Clean up old handovers and archive folders regularly as per USER request.