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
  ChevronRight,
  ChevronLeft
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";

const NAVE_ITEMS = [
  { icon: Search, label: "Search", href: "/search" },
  { icon: Clock, label: "Recent", href: "/recent" },
  { icon: LayoutGrid, label: "Dashboard", href: "/dashboard" },
  { icon: Building2, label: "Institutions", href: "/institutions" },
  { icon: CreditCard, label: "Accounts", href: "/accounts" },
  { icon: History, label: "Transactions", href: "/" },
  { icon: PieChart, label: "Reports", href: "/reports" },
  { icon: Users, label: "People", href: "/people" },
  { icon: Banknote, label: "Cash", href: "/cash" },
  { icon: Database, label: "Data", href: "/data" },
  { icon: Undo2, label: "Refunds", href: "/refunds" },
  { icon: Workflow, label: "Rules", href: "/rules" },
  { icon: Sparkles, label: "AI Insights", href: "/insights" },
  { icon: Settings, label: "Settings", href: "/settings" },
];

export function Sidebar() {
  const pathname = usePathname();
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <aside className={cn(
      "h-full bg-[#0F1117] flex flex-col flex-shrink-0 border-r border-[#E5E7EB] transition-all duration-300 relative group",
      isExpanded ? "w-56 items-stretch" : "w-16 items-center"
    )}>
      {/* Expand/Collapse Toggle */}
      <button 
        onClick={() => setIsExpanded(!isExpanded)}
        className="absolute -right-3 top-6 bg-white border border-gray-200 shadow-sm rounded-full w-6 h-6 flex items-center justify-center text-gray-500 hover:text-black hover:bg-gray-50 z-50 opacity-0 group-hover:opacity-100 transition-opacity"
      >
        {isExpanded ? <ChevronLeft className="w-3.5 h-3.5" /> : <ChevronRight className="w-3.5 h-3.5" />}
      </button>

      {/* Logo Area */}
      <div className={cn("mt-6 mb-8 flex items-center", isExpanded ? "px-4" : " justify-center")}>
        <div className="w-8 h-8 rounded-md bg-blue-600 flex items-center justify-center text-white font-bold shrink-0">
          ACB
        </div>
        {isExpanded && (
          <span className="ml-3 font-semibold text-white tracking-wide">MoneyFlow</span>
        )}
      </div>

      {/* Nav Items */}
      <nav className={cn(
        "flex flex-col space-y-2 overflow-y-auto w-full pb-4 px-2",
        "[&::-webkit-scrollbar]:w-1 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:bg-transparent hover:[&::-webkit-scrollbar-thumb]:bg-gray-800 [&::-webkit-scrollbar-thumb]:rounded-full transition-all"
      )}>
        {NAVE_ITEMS.map((item) => {
          const isActive = pathname === item.href;
          const content = (
            <Link
              href={item.href}
              className={cn(
                "flex items-center rounded-lg transition-colors overflow-hidden",
                isExpanded ? "h-10 px-3 w-full" : "h-10 w-10 justify-center shrink-0",
                isActive 
                  ? "bg-blue-600 text-white shadow-sm" 
                  : "text-gray-400 hover:bg-gray-800 hover:text-white"
              )}
            >
              <item.icon className="h-5 w-5 shrink-0" />
              {isExpanded && (
                <span className="ml-3 font-medium text-sm whitespace-nowrap">{item.label}</span>
              )}
              {!isExpanded && <span className="sr-only">{item.label}</span>}
            </Link>
          );

          if (isExpanded) {
            return <div key={item.label}>{content}</div>;
          }

          return (
            <Tooltip key={item.label}>
              <TooltipTrigger render={content} />
              <TooltipContent side="right" className="font-medium bg-gray-900 border-gray-800 text-white">
                {item.label}
              </TooltipContent>
            </Tooltip>
          );
        })}
      </nav>

      {/* User Avatar */}
      <div className={cn("mt-auto pt-4 pb-6 w-full border-t border-[#1F2937]/50 flex items-center", isExpanded ? "px-4" : "justify-center")}>
        <button className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-blue-100 text-xs font-bold text-blue-700 hover:bg-blue-200">
          U
        </button>
        {isExpanded && (
          <div className="ml-3 flex flex-col">
            <span className="text-sm font-medium text-white truncate w-32 text-left">User Name</span>
            <span className="text-[10px] text-gray-500 truncate w-32 text-left">user@example.com</span>
          </div>
        )}
      </div>
    </aside>
  );
}
