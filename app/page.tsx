'use client';

import { useState } from 'react';
import { 
  ChevronDown, 
  Search, 
  RotateCcw, 
  CheckCircle2, 
  Plus, 
  Settings2,
  ShoppingCart,
  Building,
  RefreshCw,
  Users,
  Briefcase,
  Copy,
  Pencil,
  MoreHorizontal,
  Link as LinkIcon,
  Ban,
  Trash2,
  ExternalLink,
  ChevronRight,
  History as HistoryIcon,
  Banknote,
  Undo2,
  PanelRightClose
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";

// Use some fake data
const TRANSACTIONS = [
  {
    id: "276",
    date: "18.04",
    time: "23:14",
    categoryIcon: ShoppingCart,
    iconColor: "text-orange-500",
    notes: "[GD2|4s55u2] Refund for: 17 PM 512 bạc",
    state: "DONE",
    bank: { name: "Vietcombank", icon: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQFdFi6V55JegMdrZRwkmJTbhpurmuIiLZacg&s" },
    person: { name: "Techcombank", icon: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQFdFi6V55JegMdrZRwkmJTbhpurmuIiLZacg&s" },
    netValue: "40,899,000",
    netValueColor: "text-green-600",
    cashback: "-8%",
    categoryName: "Online Shoppi...",
    categoryType: "INTER",
    isRefund: true,
  },
  {
    id: "275",
    date: "17.04",
    time: "20:33",
    categoryIcon: Briefcase,
    iconColor: "text-red-500",
    notes: "Bank Final T4",
    state: "OK",
    bank: { name: "VPBank", icon: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQFdFi6V55JegMdrZRwkmJTbhpurmuIiLZacg&s" },
    person: { name: "Alex Johnson", icon: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTG8h1p0jg06kidwghHvJNI-B2MvfBtOp-p9Q&s", cycle: "2026-04" },
    netValue: "2,101,372",
    netValueColor: "text-red-600",
    categoryName: "Debt Repayme...",
    categoryType: "EXTER",
  },
  {
    id: "272",
    date: "15.04",
    time: "22:23",
    categoryIcon: Building,
    iconColor: "text-yellow-500",
    notes: "Vé Bay | Vietjet | Vietjet | Vietjet: Me",
    state: "SPLIT",
    bank: { name: "Chase Sapphire...", icon: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQFdFi6V55JegMdrZRwkmJTbhpurmuIiLZacg&s" },
    person: { name: "Me", icon: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTG8h1p0jg06kidwghHvJNI-B2MvfBtOp-p9Q&s" },
    netValue: "4,006,640",
    netValueColor: "text-red-600",
    categoryName: "Online Shoppi...",
    categoryType: "INTER",
  }
];

export default function TransactionsPage() {
  const [expandedRowId, setExpandedRowId] = useState<string | null>("276");
  const [isQueueCollapsed, setIsQueueCollapsed] = useState(false);

  return (
    <div className="flex flex-col flex-1 bg-[#FFFFFF] overflow-y-auto w-full">
      {/* Top Navigation Bar */}
      <header className="sticky top-0 z-40 flex shrink-0 h-16 items-center justify-between border-b border-[#E5E7EB] bg-[#FFFFFF] px-6">
        <div className="flex items-center gap-4 text-[#1F2937]">
          <h1 className="text-lg font-semibold">Transactions</h1>
        </div>
      </header>

      <main className="flex-1 px-6 py-4 flex flex-col gap-4">
        {/* Toolbar */}
          <div className="flex flex-wrap lg:flex-nowrap items-center justify-between gap-3 w-full">
          <div className="flex flex-wrap items-center gap-3">
            <div className="flex bg-gray-100 p-1 rounded-md border border-gray-200">
              <button className="px-4 py-1 text-[11px] font-bold bg-white shadow-sm rounded text-gray-800">All</button>
              <button className="px-4 py-1 text-[11px] font-bold text-gray-500 hover:text-gray-900 transition-colors">Active</button>
              <button className="px-4 py-1 text-[11px] font-bold text-gray-500 hover:text-gray-900 transition-colors">Void</button>
            </div>
            
            <div className="flex items-center gap-1 border-l border-gray-200 pl-3 pr-2 hidden sm:flex">
              <Button variant="ghost" size="icon" className="h-8 w-8 text-gray-400 hover:text-gray-600">
                <RefreshCw className="h-4 w-4" />
              </Button>
            </div>
            
            <div className="flex items-center gap-2 border-r border-gray-200 pr-3 pb-1 sm:pb-0 overflow-x-auto">
              <Button variant="outline" size="sm" className="h-8 border-gray-200 bg-white text-gray-600 hover:bg-gray-50 font-medium text-xs">
                People <ChevronDown className="ml-1 h-3.5 w-3.5" />
              </Button>
              <Button variant="outline" size="sm" className="h-8 border-gray-200 bg-white text-gray-600 hover:bg-gray-50 font-medium text-xs hidden sm:flex">
                Category <ChevronDown className="ml-1 h-3.5 w-3.5" />
              </Button>
              <Button variant="outline" size="sm" className="h-8 border-gray-200 bg-white text-gray-600 hover:bg-gray-50 font-medium text-xs hidden md:flex">
                Account <ChevronDown className="ml-1 h-3.5 w-3.5" />
              </Button>
              <Button variant="outline" size="sm" className="h-8 border-gray-200 bg-white text-gray-600 hover:bg-gray-50 font-medium text-xs hidden xl:flex">
                <HistoryIcon className="mr-1 h-3.5 w-3.5" /> 2026 <ChevronDown className="ml-1 h-3.5 w-3.5" />
              </Button>
            </div>

            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" className="h-8 border-gray-200 bg-white text-gray-600 hover:bg-gray-50 font-medium text-xs hidden xl:flex">
                <Settings2 className="mr-1 h-3.5 w-3.5" /> Filter
              </Button>
              <Button variant="outline" size="sm" className="h-8 border-gray-200 bg-white text-gray-600 hover:bg-gray-50 font-medium text-xs hidden xl:flex">
                <Undo2 className="mr-1.5 h-3 w-3" /> Reset
              </Button>
              
              <Tooltip>
                <TooltipTrigger 
                  className={cn(
                    "h-8 w-8 text-gray-500 hover:text-gray-900 hidden lg:flex hover:bg-gray-100 hover:border-gray-200 rounded-md ml-1 transition-all items-center justify-center",
                    isQueueCollapsed && "bg-gray-100 text-gray-900"
                  )}
                  onClick={() => setIsQueueCollapsed(!isQueueCollapsed)}
                >
                  <PanelRightClose className={cn("h-4 w-4 transition-transform", isQueueCollapsed && "rotate-180")} />
                </TooltipTrigger>
                <TooltipContent className="bg-gray-900 text-white rounded shadow-lg text-xs font-medium px-2.5 py-1.5">
                  {isQueueCollapsed ? "Expand Queue" : "Collapse Queue"}
                </TooltipContent>
              </Tooltip>
            </div>
          </div>
          
          <div className="flex flex-wrap sm:flex-nowrap items-center gap-2 flex-1 justify-end w-full lg:w-auto xl:pl-4">
            <div className="relative flex-1 w-full lg:max-w-xl">
              <Search className="absolute left-3 top-2.5 h-3.5 w-3.5 text-gray-400" />
              <Input 
                placeholder="Search transactions..." 
                className="h-8 pl-8 pr-3 text-xs bg-white border border-gray-200 rounded-md shadow-sm w-full focus-visible:ring-1 focus-visible:ring-blue-500 transition-all" 
              />
            </div>
            <Button className="h-8 px-4 bg-blue-600 text-white text-xs font-semibold rounded-md hover:bg-blue-700 shadow-sm transition-all whitespace-nowrap">
              <Plus className="mr-1.5 h-3.5 w-3.5" /> Add
            </Button>
          </div>
        </div>

        {/* Pending Alerts */}
        {!isQueueCollapsed && (
          <div className="flex space-x-4">
            <div className="flex-1 bg-orange-50 border border-orange-200 rounded-lg px-4 py-2 flex items-center justify-between">
              <div className="flex items-center space-x-2 text-orange-800">
                <RotateCcw className="w-4 h-4" />
                <span className="text-xs font-semibold uppercase tracking-wider">Pending Refund</span>
                <span className="text-sm">Wait for 12 items to be returned</span>
              </div>
              <span className="text-sm font-bold text-orange-900">$1,240.50</span>
            </div>
            
            <div className="flex-1 bg-yellow-50 border border-yellow-200 rounded-lg px-4 py-2 flex items-center justify-between">
              <div className="flex items-center space-x-2 text-yellow-800">
                <CheckCircle2 className="w-4 h-4" />
                <span className="text-xs font-semibold uppercase tracking-wider">Confirm Batch</span>
                <span className="text-sm">3 batches ready for verification</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-sm font-bold text-yellow-900">$4,890.00</span>
                <Button variant="ghost" size="icon" className="h-6 w-6 ml-2 text-yellow-800">
                  <ChevronDown className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        )}

        {/* Transactions Table container */}
        <div className="flex-1 flex flex-col">
          {/* Table Header */}
          <div className="grid grid-cols-[40px_1fr_80px] md:grid-cols-[40px_80px_100px_1fr_140px_80px_40px] lg:grid-cols-[40px_80px_100px_minmax(200px,1fr)_minmax(250px,400px)_140px_80px_40px] border-b border-gray-100 pb-2 text-[11px] font-semibold text-gray-400 uppercase tracking-wider">
            <div className="flex justify-center"><Checkbox className="rounded border-gray-300" /></div>
            <div className="hidden md:block">ID</div>
            <div className="hidden md:flex items-center gap-1 cursor-pointer">Date <ChevronDown className="h-3 w-3" /></div>
            <div>Notes Flow</div>
            <div className="hidden lg:block">Money Flow</div>
            <div className="hidden md:flex text-right items-center justify-end gap-1 cursor-pointer">Amount <ChevronDown className="h-3 w-3" /></div>
            <div className="hidden md:flex justify-center">Status</div>
            <div className="hidden md:block"></div>
          </div>

          <div className="flex flex-col">
            {TRANSACTIONS.map((txn) => (
              <TransactionRow 
                key={txn.id} 
                txn={txn} 
                isExpanded={expandedRowId === txn.id}
                onToggle={() => setExpandedRowId(expandedRowId === txn.id ? null : txn.id)}
              />
            ))}
          </div>

          <div className="flex items-center justify-between border-t border-gray-200 p-3 text-xs text-gray-500">
            <div className="flex items-center gap-2">
              Rows <SelectMock value="20" />
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-1">
                <Button variant="ghost" size="icon" className="h-7 w-7"><ChevronRight className="h-4 w-4 rotate-180" /></Button>
                <span>Page 1 / 14</span>
                <Button variant="ghost" size="icon" className="h-7 w-7"><ChevronRight className="h-4 w-4" /></Button>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Status Bar */}
      <footer className="shrink-0 h-8 px-6 bg-gray-50 border-t border-gray-200 flex items-center justify-between text-[10px] text-gray-400 font-medium mt-auto">
        <div className="flex items-center space-x-4">
          <span>27,192 Transactions Loaded</span>
          <span>•</span>
          <span className="text-green-600">System Ready</span>
        </div>
        <div className="flex items-center space-x-4 uppercase tracking-widest">
          <span>Syncing Data... 0.4s</span>
          <span className="text-gray-900 font-bold">UTC-5:00</span>
        </div>
      </footer>
    </div>
  );
}

function ListIcon({ className }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <line x1="8" y1="6" x2="21" y2="6"></line>
      <line x1="8" y1="12" x2="21" y2="12"></line>
      <line x1="8" y1="18" x2="21" y2="18"></line>
      <line x1="3" y1="6" x2="3.01" y2="6"></line>
      <line x1="3" y1="12" x2="3.01" y2="12"></line>
      <line x1="3" y1="18" x2="3.01" y2="18"></line>
    </svg>
  );
}

function PendingPill({ imageColor, text }: { imageColor: string, text: string }) {
  return (
    <div className="flex items-center gap-1.5 rounded bg-white px-2 py-1 shadow-sm border border-gray-200">
      <div className={cn("h-4 w-6 rounded-sm", imageColor)}></div>
      <span className="text-[11px] font-semibold text-gray-700">{text}</span>
    </div>
  );
}

function SelectMock({ value }: { value: string }) {
  return (
    <div className="flex items-center justify-between gap-2 rounded border border-gray-200 bg-white px-2 py-1 font-medium cursor-pointer hover:bg-gray-50">
      {value} <ChevronDown className="h-3 w-3" />
    </div>
  );
}

// Ensure the expanded row component matches the grid-cols-3 requirement
function TransactionRow({ txn, isExpanded, onToggle }: { txn: any, isExpanded: boolean, onToggle: () => void }) {
  const [hoverState, setHoverState] = useState<{x: number, position: 'top' | 'bottom'} | null>(null);

  const handleMouseEnter = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isExpanded && hoverState === null) {
      const rect = e.currentTarget.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const clampedX = Math.max(80, Math.min(x, rect.width - 80));
      const position = rect.top < 150 ? 'bottom' : 'top';
      setHoverState({ x: clampedX, position });
    }
  };

  const handleMouseLeave = () => {
    setHoverState(null);
  };

  return (
    <div 
      className={cn(
        "flex flex-col border-b border-gray-100 group relative transition-colors", 
        isExpanded ? "border-l-4 border-blue-500 bg-gray-50/50" : "hover:bg-blue-50/40"
      )}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Quick Actions - Floating vertically above or below the row entrance point */}
      {!isExpanded && hoverState !== null && (
        <div 
          className={cn("absolute opacity-0 group-hover:opacity-100 transition-opacity z-20 duration-150 ease-in-out pointer-events-none group-hover:pointer-events-auto",
            hoverState.position === 'top' ? "bottom-full pb-2" : "top-full pt-2"
          )}
          style={{ left: hoverState.x, transform: 'translateX(-50%)' }}
        >
          <div className="bg-white border border-gray-200 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.1)] rounded-lg py-1 px-1 flex flex-col min-w-[140px] relative">
            <div className={cn("absolute left-1/2 -translate-x-1/2 w-2.5 h-2.5 bg-white border-gray-200 transform",
               hoverState.position === 'top' ? "-bottom-[5px] border-b border-r rotate-45" : "-top-[5px] border-t border-l rotate-45"
            )}></div>
            
            <div className="px-3 py-1.5 mb-1 bg-gray-50 flex items-center justify-between rounded-t-lg border-b border-gray-100">
               <span className="text-[10px] uppercase font-bold text-gray-400 tracking-wider">EDIT ROW</span>
               <span className="text-[10px] font-mono text-blue-600 font-bold">#{txn.id}</span>
            </div>
            
            <button className="flex items-center gap-2.5 px-3 py-1.5 hover:bg-blue-50 text-xs font-medium text-gray-700 hover:text-blue-700 w-full text-left rounded-sm transition-colors" onClick={e => e.stopPropagation()}>
              <Pencil className="h-3.5 w-3.5 text-blue-500/70" /> Edit
            </button>
            <button className="flex items-center gap-2.5 px-3 py-1.5 hover:bg-gray-50 text-xs font-medium text-gray-700 w-full text-left rounded-sm transition-colors" onClick={e => e.stopPropagation()}>
              <Copy className="h-3.5 w-3.5 text-gray-400" /> Clone
            </button>
            <div className="h-[1px] bg-gray-100 w-full my-0.5"></div>
            <button className="flex items-center gap-2.5 px-3 py-1.5 hover:bg-red-50 text-xs font-medium text-red-600 hover:text-red-700 w-full text-left rounded-sm transition-colors" onClick={e => e.stopPropagation()}>
              <Trash2 className="h-3.5 w-3.5" /> Delete
            </button>
          </div>
        </div>
      )}

      <div 
        className="grid grid-cols-[40px_1fr_80px] md:grid-cols-[40px_80px_100px_1fr_140px_80px_40px] lg:grid-cols-[40px_80px_100px_minmax(200px,1fr)_minmax(250px,400px)_140px_80px_40px] items-center py-2 min-h-[56px] transition cursor-pointer"
        onClick={onToggle}
      >
        <div className="flex justify-center" onClick={e => e.stopPropagation()}>
          <Checkbox className="rounded border-gray-300 focus:ring-2 focus:ring-blue-500" aria-label="Select transaction" />
        </div>
        <div className="hidden md:block">
          <span className="text-blue-600 font-medium text-xs">#{txn.id}</span>
        </div>
        <div className="hidden md:flex flex-col">
          <span className="text-xs font-medium text-gray-900">{txn.date}</span>
          <span className="text-[10px] text-gray-400">{txn.time}</span>
        </div>
        <div className="flex items-center space-x-3 min-w-0 pr-4">
          <txn.categoryIcon className={cn("h-4 w-4 shrink-0", txn.iconColor)} />
          <div className="flex flex-col min-w-0">
             <div className="flex items-center gap-2 md:hidden mb-1">
               <span className="text-blue-600 font-medium text-[10px]">#{txn.id}</span>
               <span className="text-[10px] text-gray-400">{txn.date}</span>
             </div>
             <span className="truncate text-sm text-gray-900">{txn.notes}</span>
          </div>
        </div>

        <div className="hidden lg:flex items-center space-x-2 w-full pr-4" onClick={e => e.stopPropagation()}>
           <Tooltip>
             <TooltipTrigger className="w-[140px] h-8 bg-gray-100 hover:bg-gray-200 border border-gray-200 rounded-full px-3 py-1 flex items-center justify-start gap-2 overflow-hidden flex-shrink-0 cursor-default transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500">
               <img src={txn.bank.icon} className="w-5 h-5 rounded-md object-cover flex-shrink-0 bg-white" alt="Account" />
               <span className="text-[11px] font-medium text-gray-700 truncate text-left">{txn.bank.name}</span>
             </TooltipTrigger>
             <TooltipContent className="bg-gray-900 text-white px-3 py-2 rounded-md z-50 shadow-lg text-xs" sideOffset={8}>{txn.bank.name}</TooltipContent>
           </Tooltip>
           
           <ChevronRight className="h-4 w-4 text-gray-400 flex-shrink-0" />
           
           <Tooltip>
             <TooltipTrigger className="w-[140px] h-8 bg-gray-100 hover:bg-gray-200 border border-gray-200 rounded-full px-3 py-1 flex items-center justify-start gap-2 overflow-hidden flex-shrink-0 cursor-default transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500">
               <img src={txn.person.icon} className="w-5 h-5 rounded-md object-cover flex-shrink-0 bg-white" alt="Person" />
               <span className="text-[11px] font-medium text-gray-700 truncate text-left">{txn.person.name}</span>
             </TooltipTrigger>
             <TooltipContent className="bg-gray-900 text-white px-3 py-2 rounded-md z-50 shadow-lg text-xs" sideOffset={8}>{txn.person.name}</TooltipContent>
           </Tooltip>
        </div>

        <div className="hidden md:flex flex-col items-end text-right justify-center h-full pr-4 md:pr-4">
           <span className={cn("text-sm font-bold", txn.netValueColor || "text-red-600")}>
             {txn.netValueColor === "text-red-600" && "-"}{txn.netValue}
           </span>
           {txn.cashback && <span className="text-[10px] font-semibold text-green-600 mt-0.5">BACK {txn.cashback}</span>}
        </div>

        <div className="hidden md:flex justify-center" onClick={e => e.stopPropagation()}>
           {txn.state === 'DONE' && <span className="px-2 py-0.5 bg-green-100 text-green-700 text-[10px] font-bold rounded border border-green-200">DONE</span>}
           {txn.state === 'OK' && <span className="px-2 py-0.5 bg-blue-50 text-blue-600 border border-blue-200 text-[10px] font-bold rounded">OK</span>}
           {txn.state === 'SPLIT' && <span className="px-2 py-0.5 bg-amber-50 text-amber-700 border border-amber-200 text-[10px] font-bold rounded">SPLIT</span>}
        </div>
        
        <div className="hidden md:block"></div>
      </div>

      {isExpanded && (
        <div className="p-4 grid grid-cols-1 lg:grid-cols-[1fr_minmax(250px,320px)] gap-4" onClick={e => e.stopPropagation()}>
          {/* Combined Details and Flow */}
          <div className="flex flex-col md:flex-row gap-6 border border-gray-200 rounded-lg p-5 bg-white shadow-sm">
            
            {/* Details Section */}
            <div className="flex-1 flex flex-col justify-between">
              <div className="mb-4">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Details</span>
                  <span className="text-[10px] text-gray-500 font-medium">2024-05-25 09:15:33</span>
                </div>
                {/* Line 1 details in đậm */}
                <h3 className="text-[15px] leading-relaxed text-gray-900 mb-2 font-bold">
                  {txn.notes}
                </h3>
                {/* Line 2 flow details */}
                <p className="text-[13px] text-gray-600 font-medium">
                  Flow: {txn.bank.name} ➔ {txn.person.name}
                </p>
              </div>
              <div className="mt-auto pt-4 border-t border-gray-100/60">
                {/* Line 3 ID & Copy */}
                <div className="flex items-center gap-3 mb-3">
                  <span className="text-xs text-slate-500 font-mono font-medium">TXN_8842_99_{txn.id}</span>
                  <Button variant="outline" size="icon" className="h-6 w-6 border-gray-200 text-gray-400 hover:text-blue-600 hover:bg-blue-50 hover:border-blue-200 rounded" aria-label="Copy ID">
                    <Copy className="h-3 w-3" />
                  </Button>
                </div>
                <div className="flex space-x-2">
                  {txn.state === 'DONE' && <span className="px-2 py-0.5 bg-green-100 text-green-700 text-[10px] font-bold border border-green-200 rounded">DONE</span>}
                  {txn.state === 'OK' && <span className="px-2 py-0.5 bg-blue-50 text-blue-600 text-[10px] font-bold border border-blue-100 rounded">OK</span>}
                  <span className="px-2 py-0.5 bg-gray-100 text-gray-600 text-[10px] font-bold border border-gray-200 rounded border-dashed">CORP</span>
                </div>
              </div>
            </div>

            <div className="w-[1px] bg-gray-100 hidden md:block"></div>

            {/* Flow Section */}
            <div className="flex-1 flex flex-col items-center justify-center">
               <div className="flex items-center justify-between w-full mb-6">
                 <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Flow & Entities</span>
                 <button className="text-[10px] text-blue-600 font-bold hover:text-blue-700 transition-colors">OPEN SHEET ↗</button>
               </div>
               <div className="flex items-start justify-center gap-4 w-full max-w-[320px]">
                <div className="flex flex-col items-center gap-2 flex-1">
                  <div className="w-12 h-12 rounded-full overflow-hidden border border-gray-200 shadow-sm flex items-center justify-center bg-gray-50">
                    <img src={txn.bank.icon} className="w-full h-full object-cover" alt="Account" />
                  </div>
                  <span className="text-[11px] font-bold text-gray-800 text-center break-words px-1">{txn.bank.name}</span>
                  <span className="px-2 py-0.5 bg-blue-100 text-blue-700 border border-blue-200 text-[10px] rounded-md font-bold">21.01-20.02</span>
                </div>
                
                <div className="flex flex-col items-center mt-3 flex-shrink-0">
                  <ChevronRight className="w-6 h-6 text-gray-300" />
                </div>
                
                <div className="flex flex-col items-center gap-2 flex-1">
                  <div className="w-12 h-12 rounded-full overflow-hidden border border-gray-200 shadow-sm flex items-center justify-center bg-gray-50">
                    <img src={txn.person.icon} className="w-full h-full object-cover" alt="Person" />
                  </div>
                  <span className="text-[11px] font-bold text-gray-800 text-center break-words px-1">{txn.person.name}</span>
                  {txn.person.cycle ? (
                     <span className="px-2 py-0.5 bg-purple-100 text-purple-700 border border-purple-200 text-[10px] rounded-md font-bold">{txn.person.cycle}</span>
                  ) : (
                     <div className="h-[22px]"></div> // Add placeholder for alignment
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Column 3: Settlement & Formula */}
          <div className="h-full flex flex-col border border-gray-200 rounded-lg p-5 bg-white shadow-sm justify-between">
            <div>
              <div className="flex items-center mb-4">
                <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Settlement</span>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-xs font-medium">
                  <span className="text-gray-500">Gross</span>
                  <span className="text-gray-900">${txn.baseAmount || txn.netValue}</span>
                </div>
                <div className="flex justify-between text-xs font-medium">
                  <span className="text-gray-500">Discount</span>
                  <span className="text-green-600">-$0.00</span>
                </div>
              </div>
              <div className="mt-4 bg-blue-50 border border-blue-200 rounded-lg p-3">
                <div className="flex justify-between items-start">
                  <div className="flex flex-col gap-1.5">
                    <span className="text-[10px] font-bold text-blue-800 uppercase leading-none">Cashback 8%</span>
                    <span className="text-[9px] text-blue-600/80 leading-none">Formula: Net * 0.08</span>
                  </div>
                  <span className="text-xs font-bold text-blue-700">+$183.93</span>
                </div>
              </div>
            </div>
            <div className="border-t border-gray-100 pt-4 mt-4 flex justify-between items-end">
              <span className="text-[10px] font-bold uppercase text-gray-500 mb-0.5">Net Value</span>
              <span className="text-lg font-bold text-blue-600 leading-none">${txn.netValue}</span>
            </div>
          </div>
        </div>
      )}
      {isExpanded && (
        <div className="flex bg-white justify-end items-center gap-1 border-t border-gray-100 px-6 lg:px-6 py-3" onClick={e => e.stopPropagation()}>
            <Button variant="ghost" size="sm" className="h-8 hover:bg-gray-100 text-gray-600 rounded-md text-xs font-medium px-3" aria-label="Edit">
              <Pencil className="h-3.5 w-3.5 mr-1.5" /> Edit
            </Button>
            <Button variant="ghost" size="sm" className="h-8 hover:bg-gray-100 text-gray-600 rounded-md text-xs font-medium px-3" aria-label="Copy">
              <Copy className="h-3.5 w-3.5 mr-1.5" /> Copy
            </Button>
            <Button variant="ghost" size="sm" className="h-8 hover:bg-gray-100 text-gray-600 rounded-md text-xs font-medium px-3" aria-label="Link">
              <LinkIcon className="h-3.5 w-3.5 mr-1.5" /> Link
            </Button>
            <div className="w-[1px] h-4 bg-gray-200 mx-2"></div>
            <Button variant="ghost" size="sm" className="h-8 hover:bg-gray-100 text-blue-600 rounded-md text-xs font-medium px-3 flex items-center" aria-label="History">
              <HistoryIcon className="h-3.5 w-3.5 mr-1.5" /> History
            </Button>
            <Button variant="ghost" size="sm" className="h-8 text-orange-600 hover:bg-orange-50 rounded-md text-xs font-medium px-3" aria-label="Void">
              <Ban className="h-3.5 w-3.5 mr-1.5" /> Void
            </Button>
            <Button variant="ghost" size="sm" className="h-8 text-red-600 hover:bg-red-50 rounded-md text-xs font-medium px-3" aria-label="Delete">
              <Trash2 className="h-3.5 w-3.5 mr-1.5" /> Delete
            </Button>
        </div>
      )}
    </div>
  );
}
