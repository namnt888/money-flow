# Agent Safety Rules & Code Integrity Guidelines

**Last Updated:** April 5, 2026  
**Purpose:** Prevent code loss, test failures, and CI breaks during multi-branch development

---

## 🚨 Critical Rules for All Agents

### Rule 1: Never Create Code Without Reading Existing Context First
**Before writing ANY new code:**
1. Read the full file where changes will be made
2. Search for related components/hooks using `semantic_search` or `grep_search`
3. Check git status with `get_changed_files` to understand current state
4. If uncertain about architecture, use `Explore` agent to investigate

**Consequence of ignoring:** Code overwrites, lost git history, duplicate implementations

---

### Rule 2: Always Run Tests BEFORE Commit
**After completing code changes:**
```bash
pnpm build      # Validate TypeScript & build
pnpm test       # Run unit tests (if available)
pnpm lint       # Auto-fix style issues
```

**Flow:**
```
Code → Build ✓ → Lint ✓ → Commit → Push
                 ↓ (fail)
              FIX & RETRY
```

**CI Failure Cost:** Blocks team deployments on Vercel

---

### Rule 3: Understand Branch Strategy Before Branching
**Don't create random branches.** Always:
1. Confirm current branch with `git status` (run in terminal)
2. Check existing branches: `git branch -a`
3. If unsure → ask user which branch to use/create
4. **For PR work:** Always branch from latest `main`, not stale feature branches

---

### Rule 4: Use Multi-Replace for Efficiency, Not Sequential Edits
**Instead of:**
```
→ Edit File A
→ Edit File B  
→ Edit File C
→ Test
```

**Do this:**
```
→ Batch-read Files A, B, C
→ multi_replace_string_in_file (all 3 at once)
→ Test once
```

**Benefit:** Faster, fewer state resets, fewer test cycles

---

### Rule 5: Document Changed Files Before Committing
**Create/update a CHANGELOG or session doc:**
- What files were modified?
- Why were they changed?
- What new features/fixes were added?
- Any breaking changes?

**Example format:**
```markdown
## April 5, 2026 - Balance Column Reorder
- Modified: `src/hooks/useAccountColumnPreferences.ts`
- Reason: Move Balance column after Account Name for better UX
- Impact: Column persistence logic updated (all 3 localStorage keys affected)
- Testing: Build ✓, no errors
```

---

### Rule 6: Verify No TypeScript Errors After Changes
**Always run:**
```bash
get_errors()  # Check for compile/lint issues
pnpm build    # Full type check
```

**Red flag if:**
- TypeScript errors in modified files
- Unused imports remain
- Type mismatches on props

---

### Rule 7: Never Force-Push Without Asking User
**When pushing to shared branch (e.g., PR branch):**
- Use normal `git push` (not `force-push`)
- If push is rejected → ask user before force-pushing
- Reason: Prevents overwriting team members' commits

---

### Rule 8: Test All Affected Features After UI Changes
**For component modifications:**
1. Build passes ✓
2. Component loads without errors
3. Related functionality works (e.g., column reorder, localStorage persistence)
4. Edge cases tested (empty state, many items, responsive)

**For data layer changes:**
1. No database errors
2. Correct data returned
3. RLS policies still pass
4. No N+1 queries introduced

---

### Rule 9: Preserve git History - Never Rewrite Commits
**Don't:**
- `git reset --hard` to undo work
- Overwrite previous commits arbitrarily
- Squash commits before asking user

**Do:**
- Create new commits for each logical change
- Use `git revert` if undoing is necessary
- Ask user before rewriting history

---

### Rule 10: Diff Before Final Push
**Run before pushing:**
```bash
git diff origin/[branch-name]
git status
```

**Review:**
- Only intended files changed?
- No unrelated modifications?
- File deletions accidental?

---

## 🔄 Recommended Agent Workflow

### Phase 1: Discovery (Read-Only)
```
1. Read: git status, branch name, file structure
2. Search: semantic search for related components
3. Read: Full context of files to be modified
4. Ask: Clarify requirements if unclear
```

### Phase 2: Implementation (Batch Changes)
```
1. Plan: List all files to modify + rationale
2. Batch-read all affected files
3. multi_replace_string_in_file: Apply all changes at once
4. Verify: No persisted type errors
```

### Phase 3: Validation (Pre-Commit)
```
1. Build: pnpm build (full TypeScript check)
2. Lint: pnpm lint (auto-fix style)
3. Test: pnpm test (if available)
4. Review: git diff (ensure only intended changes)
```

### Phase 4: Documentation & Push
```
1. Docs: Create/update CHANGELOG or docs file
2. Commit: git add -A && git commit -m "..."
3. Verify: Check git log shows intended commits
4. Push: git push (ask user if conflict/reject)
```

---

## ⚠️ Common Failure Patterns to Avoid

| Pattern | Problem | Solution |
|---------|---------|----------|
| Edit file → test → edit → test | Slow, lose context | Batch-read, batch-edit, test once |
| Create code without reading existing | Duplicates, overwrites | Always grep/semantic-search first |
| Skip build/test before commit | CI breaks, blocks team | Always `pnpm build && pnpm test` |
| Sequential file edits (1→2→3) | State thrashing, hard to debug | Use multi_replace_string_in_file |
| Commit without docs | Hard to understand changes later | Create CHANGELOG.md before commit |
| Ignore TypeScript errors | Silent bugs, hard to find | `get_errors()` after every edit batch |
| Force-push to shared branch | Lose team members' work | Only force-push if user explicitly agrees |
| No git status check before edits | Unknown branch state | Always confirm branch + status first |

---

## 📋 Pre-Commit Checklist

Before running `git commit -A`:

- [ ] All code changes intentional (run `git diff`)
- [ ] No TypeScript errors (`get_errors()` clean)
- [ ] Build passes (`pnpm build` success)
- [ ] Tests pass (`pnpm test` if applicable)
- [ ] Linter passes (`pnpm lint` clean)
- [ ] Docs updated (CHANGELOG or new doc file)
- [ ] No unrelated file modifications
- [ ] Branch name correct (confirmed via `git status`)
- [ ] Commit message clear and descriptive
- [ ] Ready to push (no conflicts expected)

---

## 💡 When to Ask User for Help

**Ask immediately if:**
- There are conflicting changes from other branches
- TypeScript errors can't be resolved without refactoring
- Need clarification on intended behavior
- About to delete/rename major files
- Ready to force-push to shared branch
- Test failures after changes

**Don't guess or proceed unilaterally.**

---

## 📚 Referenced Documentation
- `.github/copilot-instructions.md` – Project architecture and patterns
- `docs/ACCOUNTS_TABLE_LAYOUT_V2.md` – Column management docs (example)
- `.cursorrules` – Detailed coding standards

---

**Last Review:** April 5, 2026  
**Next Update:** After next major refactoring or incident
