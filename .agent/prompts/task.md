TASK: Fix UI inconsistencies and resolve runtime/concurrency errors across People Details, Batch Details, and Account Details

  People Details → “View Cycle History” (Debt History modal)
    Current problems
      Cycle rows are visually misaligned and do not follow a consistent grid
      Initial / Total Back / Repaid / Status sections break row balance
      Settled status overflows card height and breaks layout
      Color usage is inconsistent (green/red tones vary, status looks like button in some rows)
      Vertical spacing and padding differ between cycles

    Expected UI (follow mockup strictly)
      Each cycle renders as one consistent row card
      Fixed layout order: Cycle | Initial | Total Back | Repaid | Status
      Status rendering rules
        Settled shows as subtle green badge
        Remain or outstanding shows as red or warning badge
        Status must never be full height or act like a button
      Color rules
        Initial uses neutral color
        Total Back uses orange
        Repaid uses green
      No overflow or wrapping issues on desktop or mobile

    Technical constraints
      Use CSS Grid or Flex with fixed columns
      Do not hardcode heights
      Center status badge vertically
      Reuse existing design tokens or Tailwind utilities

  Batch Details page → Runtime error and console spam
    Context
      URL: /batch/mbb?month=2026-03&period=after&phase=71ged91y4seybfu
      Stack: Next.js 16 (Turbopack), PocketBase

    Observed issues
      Runtime AbortError: Lock broken by another request with the 'steal' option
      Console continuously logs failed requests
        PocketBase request failed with status 400
        Endpoint: /api/collections/transactions/records
        Payload is an empty object

    Required investigation
      Identify why multiple concurrent API requests are being triggered
        Check useEffect dependency arrays
        Check refetch or re-render loops (react-query, server actions, component remount)
      Identify where PocketBase transaction lock with “steal” option is used
      Identify why request payload is empty
        Request fired before required state is available
        Frontend data mapping does not match PocketBase schema

    Expected fix
      Stop all duplicated and infinite API requests
      Prevent PocketBase lock stealing between concurrent requests
      Ensure API calls run only once per valid lifecycle
      Add guard conditions, debounce, or readiness checks
      Console must remain clean after fix
      UI must handle failure gracefully (toast or safe empty state)

  Account Details → Shared component issues
    Cycle date picker dropdown (global component)
      Current problems
        Dropdown is too tall and breaks page layout
        Too many cycles are displayed at once
      Expected behavior
        Set a max height for dropdown
        Show around six items
        Remaining items must be scrollable
        Fix must be applied in the shared component, not locally duplicated

    Edit Account slide → RELATIVE ownership mode
      Bug description
        Open Edit Account from batch flow or account details page
        Switch ownership to RELATIVE
        People list does not appear and shows “No person found” even though data exists
      Required checks
        Data source must not be incorrectly filtered by route or context
        State must be reset correctly when the slide opens
        Fetch logic must not depend on missing accountId or ownerId
      Expected fix
        RELATIVE mode always loads correct people list
        Behavior must be identical regardless of entry page
        Empty state only allowed when database is truly empty
        Fetch errors must not fail silently

  Output requirements
    UI must match mockup exactly
    Root cause and fix reasoning must be clearly explained
    Avoid unrelated refactors
    Fixes must be stable and reusable across global components