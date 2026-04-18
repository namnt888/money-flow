# Findings Report: GD2 Void Reverse Flow

## Scope
- Reviewed src/actions/transaction-actions.ts (voidTransactionAction, restoreTransaction)
- Reviewed src/services/transaction.service.ts (voidTransaction)
- Traced the runtime path for voiding a GD2 pending refund transaction

## 1) Which Function Handles GD2 Void
- Entry point from UI: voidTransactionAction(id) in src/actions/transaction-actions.ts
- Server action path: voidTransactionAction -> voidPBTransaction(pbId)
- Actual business logic for GD2 void rollback is in voidTransaction(...) in src/services/transaction.service.ts (around line 1031)

## 2) Is restoreTransaction Called After GD2 Is Voided?
- No. restoreTransaction(...) is not called by voidTransactionAction when voiding GD2.
- The rollback logic is expected to happen inside voidTransaction(...) service logic, not via restoreTransaction(...).

## 3) Missing/Broken Condition Identified
The rollback of GD1 after voiding GD2 is guarded by this check in src/services/transaction.service.ts (around lines 1112-1128):
- linkedRefundRequestId === pbId
- OR originalMeta.refund_request_id === pbId
- OR originalMeta.last_refund_request_id === pbId

If none of those comparisons match exactly, the GD1 rollback block is skipped. When skipped, all three expected reverse operations are skipped together:
- note prefix stripping
- person_id restoration from metadata.original_person_id
- Google Sheet restore sync

This is the critical weak point in the current flow because rollback eligibility depends on exact ID matching of refund_request_id linkage at rollback time.

## 4) Note Prefix + person_id Restoration Checks
Inside voidTransaction(...), when rollback condition passes, the code does:
- strips GD prefix from GD1 note and stores stripped prefix in metadata._voided_refund_prefix
- restores person_id only when:
  - person_id is currently empty/null, and
  - metadata.original_person_id exists (wasFullRefund condition)

If wasFullRefund is false, person_id is not restored.

## 5) Google Sheet Sync Triggered or Not?
- Sheet restore sync is attempted only inside the same rollback branch and only when wasFullRefund && originalPersonId is true.
- Therefore:
  - If rollback guard fails, sheet sync does not run.
  - If rollback guard passes but wasFullRefund is false, sheet sync does not run.
  - If both pass, syncTransactionToSheet(..., 'create') is called.

## 6) Correct Fix Direction (Description Only, No Code)
- Keep GD2-void rollback centralized in voidTransaction(...), but make rollback eligibility independent from fragile single-field equality checks.
- Determine rollback target from canonical linkage fields that are always set by requestRefund (e.g. metadata.original_transaction_id on GD2) and enforce deterministic reverse flow for GD1.
- Apply reverse steps as one atomic sequence for GD1:
  - restore note (remove latest refund prefix),
  - restore person_id from metadata.original_person_id when present,
  - run sheet restore sync when person_id is restored.
- Ensure this sequence runs consistently for every valid GD2 void, not only when refund_request_id equality happens to match current pbId.
