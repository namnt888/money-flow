'use client';

import { useState } from "react";
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
  Plus,
  PanelLeftClose,
  PanelLeftOpen
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";

const NAV_ITEMS = [
  { icon: Search, label: "Search", href: "/search", testId: undefined },
  { icon: Clock, label: "Recent", href: "/recent", testId: undefined },
  { icon: LayoutGrid, label: "Dashboard", href: "/transactions", testId: "nav-dashboard" },
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
  const [expanded, setExpanded] = useState(false);

  return (
    <aside
      data-testid="sidebar"
      className={cn(
        "h-full bg-[#0F1117] flex flex-col py-6 flex-shrink-0 border-r border-[#E5E7EB] transition-all duration-200",
        expanded ? "w-52 items-start px-3" : "w-16 items-center"
      )}
    >
      {/* Logo + Toggle Row */}
      <div className={cn(
        "flex items-center mb-8",
        expanded ? "w-full justify-between px-1" : "justify-center w-full"
      )}>
        <Link href="/transactions" className="w-8 h-8 bg-blue-600 rounded-md flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
          MF
        </Link>
        {expanded && (
          <button
            data-testid="sidebar-collapse-btn"
            onClick={() => setExpanded(false)}
            className="flex h-8 w-8 items-center justify-center rounded-lg text-gray-400 hover:bg-gray-800 hover:text-white transition-colors"
          >
            <PanelLeftClose className="h-5 w-5" />
          </button>
        )}
      </div>

      {/* Expand button (visible when collapsed) */}
      {!expanded && (
        <button
          data-testid="sidebar-expand-btn"
          onClick={() => setExpanded(true)}
          className="flex h-10 w-10 items-center justify-center rounded-lg text-gray-400 hover:bg-gray-800 hover:text-white transition-colors mb-4"
        >
          <PanelLeftOpen className="h-5 w-5" />
        </button>
      )}

      {/* Nav Items */}
      <nav className={cn(
        "flex flex-col overflow-y-auto w-full pb-4 [&::-webkit-scrollbar]:w-0 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:bg-transparent hover:[&::-webkit-scrollbar-thumb]:bg-gray-800 [&::-webkit-scrollbar-thumb]:rounded-full transition-all",
        expanded ? "space-y-1" : "space-y-4 items-center"
      )}>
        {NAV_ITEMS.map((item) => {
          const isActive = pathname.startsWith(item.href);
          
          if (expanded) {
            return (
              <Link
                key={item.label}
                href={item.href}
                data-testid={item.testId}
                className={cn(
                  "flex items-center gap-3 h-10 px-3 rounded-lg transition-colors text-sm font-medium",
                  isActive
                    ? "bg-blue-600 text-white"
                    : "text-gray-400 hover:bg-gray-800 hover:text-white"
                )}
              >
                <item.icon className="h-5 w-5 flex-shrink-0" />
                <span className="truncate">{item.label}</span>
              </Link>
            );
          }

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

      {/* Bottom Section */}
      <div className={cn(
        "mt-auto pt-4 flex flex-col gap-3",
        expanded ? "w-full px-1" : "items-center"
      )}>
        {expanded ? (
          <Link
            href="/transactions"
            data-testid="btn-new-transaction"
            className="flex items-center gap-3 h-10 px-3 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition-colors text-sm font-medium"
          >
            <Plus className="h-4 w-4 flex-shrink-0" />
            <span>New Transaction</span>
          </Link>
        ) : (
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
        )}

        {/* User Avatar */}
        <button className={cn(
          "flex items-center rounded-full bg-blue-100 text-xs font-bold text-blue-700 hover:bg-blue-200",
          expanded ? "h-10 w-10 justify-center" : "h-8 w-8 justify-center"
        )}>
          U
        </button>
      </div>
    </aside>
  );
}
