'use client';

import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  Search, 
  Clock, 
  LayoutGrid, 
  Building2, 
  CreditCard,
  History,
  PieChart,
  Users,
  Banknote,
  Database,
  Undo2,
  Workflow,
  Sparkles,
  Settings,
  Plus
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";

const NAV_ITEMS = [
  { icon: Search, label: "Search", href: "/search", testId: undefined },
  { icon: Clock, label: "Recent", href: "/recent", testId: undefined },
  { icon: LayoutGrid, label: "Dashboard", href: "/", testId: "nav-dashboard" },
  { icon: Building2, label: "Institutions", href: "/institutions", testId: undefined },
  { icon: CreditCard, label: "Accounts", href: "/accounts", testId: "nav-accounts" },
  { icon: History, label: "Transactions", href: "/transactions", testId: "nav-transactions" },
  { icon: PieChart, label: "Reports", href: "/reports", testId: undefined },
  { icon: Users, label: "People", href: "/people", testId: "nav-people" },
  { icon: Banknote, label: "Cash", href: "/cash", testId: undefined },
  { icon: Database, label: "Data", href: "/data", testId: undefined },
  { icon: Undo2, label: "Refunds", href: "/refunds", testId: undefined },
  { icon: Workflow, label: "Rules", href: "/rules", testId: undefined },
  { icon: Sparkles, label: "AI Insights", href: "/insights", testId: undefined },
  { icon: Settings, label: "Settings", href: "/settings", testId: undefined },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside data-testid="sidebar" className="w-16 h-full bg-[#0F1117] flex flex-col items-center py-6 flex-shrink-0 border-r border-[#E5E7EB]">
      {/* Logo Area */}
      <Link href="/" className="w-8 h-8 bg-blue-600 rounded-md mb-8 flex items-center justify-center text-white font-bold">
        MF
      </Link>

      {/* Nav Items */}
      <nav className="flex flex-col space-y-4 overflow-y-auto items-center w-full pb-4 [&::-webkit-scrollbar]:w-0 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:bg-transparent hover:[&::-webkit-scrollbar-thumb]:bg-gray-800 [&::-webkit-scrollbar-thumb]:rounded-full transition-all">
        {NAV_ITEMS.map((item) => {
          const isActive = item.href === '/'
            ? pathname === '/'
            : pathname.startsWith(item.href);
          return (
            <Tooltip key={item.label}>
              <TooltipTrigger
                data-testid={item.testId}
                className={cn(
                  "flex h-10 w-10 items-center justify-center rounded-lg transition-colors",
                  isActive 
                    ? "bg-blue-600 text-white" 
                    : "text-gray-400 hover:bg-gray-800 hover:text-white"
                )}
                render={<Link href={item.href} />}
              >
                <item.icon className="h-5 w-5" />
                <span className="sr-only">{item.label}</span>
              </TooltipTrigger>
              <TooltipContent side="right" className="font-medium">
                {item.label}
              </TooltipContent>
            </Tooltip>
          );
        })}
      </nav>

      {/* New Transaction Button */}
      <div className="mt-auto pt-4 flex flex-col items-center gap-3">
        <Tooltip>
          <TooltipTrigger
            data-testid="btn-new-transaction"
            className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-600 text-white hover:bg-blue-700 transition-colors"
            render={<Link href="/transactions" />}
          >
            <Plus className="h-4 w-4" />
            <span className="sr-only">New Transaction</span>
          </TooltipTrigger>
          <TooltipContent side="right" className="font-medium">
            New Transaction
          </TooltipContent>
        </Tooltip>

        {/* User Avatar */}
        <button className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-100 text-xs font-bold text-blue-700 hover:bg-blue-200">
          U
        </button>
      </div>
    </aside>
  );
}
