## Error Type
Console Error

## Error Message
Maximum update depth exceeded. This can happen when a component calls setState inside useEffect, but useEffect either doesn't have a dependency array, or one of the dependencies changes on every render.


    at button (<anonymous>:null:null)
    at _c (src/components/ui/button.tsx:46:7)
    at ManageSheetButton (src/components/people/manage-sheet-button.tsx:452:19)
    at ManageSheetButton (src/components/people/manage-sheet-button.tsx:451:17)
    at TransactionControlBar (src/components/people/v2/TransactionControlBar.tsx:376:25)
    at MemberDetailView (src/components/people/v2/MemberDetailView.tsx:914:21)
    at PeopleDetailContent (src\app\people\[id]\page.tsx:169:7)
    at PeopleDetailPage (src\app\people\[id]\page.tsx:93:7)

## Code Frame
  44 |     const Comp = asChild ? Slot : "button"
  45 |     return (
> 46 |       <Comp
     |       ^
  47 |         className={cn(buttonVariants({ variant, size, className }))}
  48 |         ref={ref}
  49 |         {...props}

Next.js version: 16.0.10 (Turbopack)
## Error Type
Console Error

## Error Message
Maximum update depth exceeded. This can happen when a component repeatedly calls setState inside componentWillUpdate or componentDidUpdate. React limits the number of nested updates to prevent infinite loops.


    at RootLayout (src\app\layout.tsx:59:17)

## Code Frame
  57 |             <AppLayout>
  58 |               <div id="mf-app-root" suppressHydrationWarning className="h-full w-full">
> 59 |                 <AppErrorBoundary>{children}</AppErrorBoundary>
     |                 ^
  60 |               </div>
  61 |             </AppLayout>
  62 |           </BreadcrumbProvider>

Next.js version: 16.0.10 (Turbopack)
