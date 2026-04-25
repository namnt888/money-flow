import { TooltipProvider } from "@/components/ui/tooltip";
import { Sidebar } from "@/components/sidebar";

export default function DashboardLayout({children}: {children: React.ReactNode}) {
  return (
    <TooltipProvider>
      <div className="flex h-screen w-full">
        <Sidebar />
        <main className="flex-1 flex flex-col h-full overflow-hidden">
          {children}
        </main>
      </div>
    </TooltipProvider>
  );
}
