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
  Settings
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

  return (
    <aside className="w-16 h-full bg-[#0F1117] flex flex-col items-center py-6 flex-shrink-0 border-r border-[#E5E7EB]">
      {/* Logo Area */}
      <div className="w-8 h-8 bg-blue-600 rounded-md mb-8 flex items-center justify-center text-white font-bold">
        ACB
      </div>

      {/* Nav Items */}
      <nav className="flex flex-col space-y-4 overflow-y-auto items-center w-full pb-4 [&::-webkit-scrollbar]:w-0 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:bg-transparent hover:[&::-webkit-scrollbar-thumb]:bg-gray-800 [&::-webkit-scrollbar-thumb]:rounded-full transition-all">
        {NAVE_ITEMS.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Tooltip key={item.label}>
              <TooltipTrigger>
                <Link
                  href={item.href}
                  className={cn(
                    "flex h-10 w-10 items-center justify-center rounded-lg transition-colors",
                    isActive 
                      ? "bg-blue-600 text-white" 
                      : "text-gray-400 hover:bg-gray-800 hover:text-white"
                  )}
                >
                  <item.icon className="h-5 w-5" />
                  <span className="sr-only">{item.label}</span>
                </Link>
              </TooltipTrigger>
              <TooltipContent side="right" className="font-medium">
                {item.label}
              </TooltipContent>
            </Tooltip>
          );
        })}
      </nav>

      {/* User Avatar */}
      <div className="mt-auto pt-4">
        <button className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-100 text-xs font-bold text-blue-700 hover:bg-blue-200">
          U
        </button>
      </div>
    </aside>
  );
}
