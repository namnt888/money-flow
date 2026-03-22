# Handover: People Sync Success & Dev Environment Issues

## ✅ Completed & Pushed to Git
The following features and fixes are already committed and pushed to the `feat/investment-management-20260320` branch:
1.  **People Sync API**: Fully refactored `/api/sheets/manage` to support PocketBase (`person_cycle_sheets` collection).
2.  **Data Restoration**: 
    - Linked `Youtube`/`iCloud` services to Shop IDs.
    - Backfilled `shop_id` for 10+ transactions.
    - Fixed 50+ repayment transactions (mapped `to_account_id` from person settings).
3.  **Google Sheets**: Fixed `Code.js` (IMAGE mode 1, fixed `escapedUrl` bug).
4.  **Automation**: Updated `pnpm run sheet:people` with 5s auto-push countdown.

## ⚠️ Current Blocker: Dev Server & Workspace
The environment is currently in a transitional state due to the folder rename:

1.  **Folder Rename**: Folder was changed from `Personal Project` to `Personal_Project` to fix path-with-spaces issues on Windows.
2.  **Missing Dependencies**: `next` seems to be missing from `node_modules`, causing `npx` to hang on installation prompts when running `pnpm dev`.
3.  **Workspace Validation**: The AI agent is currently unable to run commands in the new folder (`Personal_Project`) due to restricted workspace permissions.

## 🔜 Next Steps for New Chat
1.  **Refresh Workspace**: Open the project directly from the new `Personal_Project` path in Cursor/IDE.
2.  **Install Dependencies**: Run `pnpm install` in the new path.
3.  **Verify Dev Server**: Update `scripts/dev-port.mjs` if needed (currently using `npx.cmd next dev`) and run `pnpm dev`.
