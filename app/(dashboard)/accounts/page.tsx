'use client';

import { useState } from 'react';
import { 
  Building2, 
  ChevronRight, 
  RefreshCw,
  Search,
  Settings2,
  List,
  Plus,
  ShieldCheck,
  TrendingUp,
  AlertCircle,
  MoreHorizontal,
  ChevronDown,
  Building,
  CreditCard,
  Banknote,
  AlertTriangle,
  Wallet
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";

const ACCOUNTS = [
  {
    id: "1",
    name: "Vib Travel",
    holder: "NGUYEN THANH ...",
    last4: "322338",
    color: "bg-gray-800",
    balance: "65,713,255",
    balanceColor: "text-red-500",
    dueDays: "29",
    dueDate: "May 24",
    pending: 2,
    role: "CHILD",
    debt: "13,983,088",
    cardColor: "bg-blue-200",
    limit: "241,395,000",
    remainingPercent: 27,
    limitDebt: "175,681,745",
  },
  {
    id: "2",
    name: "Vib Super Card",
    badge: "RULES 10.0%",
    holder: "NGUYEN THANH ...",
    last4: "322338",
    color: "bg-gray-100",
    balance: "65,713,255",
    balanceColor: "text-red-500",
    dueDays: "26",
    dueDate: "May 21",
    pending: 2,
    role: "PARENT",
    debt: "67,582,017",
    cardColor: "bg-teal-500",
    limit: "241,395,000",
    remainingPercent: 27,
    limitDebt: "175,681,745",
    target: "Qualified",
    targetPercent: 0,
  },
];

export default function AccountsPage() {
  const [expandedId, setExpandedId] = useState<string | null>("1");

  return (
    <div data-testid="accounts-page" className="flex flex-col flex-1 bg-[#FFFFFF] overflow-y-auto w-full">
      <header className="sticky top-0 z-40 flex shrink-0 h-16 items-center border-b border-[#E5E7EB] bg-[#FFFFFF] px-6">
        <div className="flex items-center gap-4 text-[#1F2937]">
          <h1 className="text-lg font-semibold">Accounts</h1>
        </div>
      </header>

      <main className="flex-1 p-6 flex flex-col gap-4">
        
        {/* Top toolbar area */}
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 flex flex-col items-center justify-center rounded-full bg-blue-600 text-white">
              <Building2 className="h-5 w-5" />
            </div>
            <div>
              <h1 className="text-lg font-bold text-gray-900 leading-none">ACCOUNTS & CARDS</h1>
              <span className="text-xs font-semibold text-gray-500">UNIFIED FINANCIAL DIRECTORY</span>
            </div>
            <Badge variant="secondary" className="ml-2 bg-blue-50 text-blue-700 hover:bg-blue-100">69 ACTIVE</Badge>
          </div>

          <div className="flex items-center rounded-lg bg-gray-100 p-1">
            {['STANDARD', 'CREDIT', 'ASSETS', 'DEBT', 'SYSTEM', 'CLOSED'].map((tab) => {
              const testIdMap: Record<string, string | undefined> = {
                'STANDARD': 'accounts-filter-standard',
                'CREDIT': 'accounts-filter-credit',
                'ASSETS': 'accounts-filter-assets',
                'DEBT': 'accounts-filter-debt',
              };
              return (
              <button 
                key={tab}
                data-testid={testIdMap[tab]}
                className={cn(
                  "px-4 py-1.5 text-xs font-semibold rounded-md transition-all",
                  tab === 'CREDIT' ? "bg-white shadow-sm text-gray-900" : "text-gray-500 hover:text-gray-900"
                )}
              >
                {tab}
              </button>
              );
            })}
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <div className="relative">
              <Search className="absolute left-2.5 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
              <Input placeholder="Find accounts..." className="h-9 w-48 pl-9 bg-white text-xs border-gray-200" />
            </div>
            <Button variant="outline" size="sm" className="h-9 border-blue-200 bg-blue-50/50 text-blue-700">
              <RefreshCw className="mr-2 h-3.5 w-3.5" /> SYNC DB
            </Button>
            <Button variant="outline" size="sm" className="h-9 border-green-200 bg-green-50/50 text-green-700">
              <ShieldCheck className="mr-2 h-3.5 w-3.5" /> SYNC BALANCE
            </Button>
            <div className="flex flex-col items-end text-xs text-gray-500 bg-white px-3 py-1 rounded-md border border-gray-200 shadow-sm ml-2">
              <span className="font-semibold text-gray-900">308,000,000 /</span>
              <span className="text-red-500 font-semibold">83,834,979</span>
            </div>
            <Button variant="outline" size="icon" className="h-9 w-9 border-gray-200 bg-white">
              <Settings2 className="h-4 w-4 text-gray-500" />
            </Button>
            <Button variant="outline" size="icon" className="h-9 w-9 border-gray-200 bg-white">
              <List className="h-4 w-4 text-gray-500" />
            </Button>
            <Button size="sm" className="h-9 bg-gray-900 text-white hover:bg-gray-800 px-4">
              <Plus className="mr-2 h-4 w-4" /> ADD
            </Button>
          </div>
        </div>

        {/* KPIs Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="flex items-center gap-3 p-4 rounded-lg bg-white border border-gray-200 shadow-sm">
             <div className="h-10 w-10 flex items-center justify-center rounded-lg bg-green-100 text-green-600">
               <Wallet className="h-5 w-5" />
             </div>
             <div>
               <div className="text-xs font-semibold text-gray-500 uppercase">Liquid Portfolio</div>
               <div className="text-lg font-bold text-gray-900">413,422,767</div>
             </div>
          </div>
          <div className="flex items-center gap-3 p-4 rounded-lg bg-white border border-gray-200 shadow-sm">
             <div className="h-10 w-10 flex items-center justify-center rounded-lg bg-blue-100 text-blue-600">
               <TrendingUp className="h-5 w-5" />
             </div>
             <div>
               <div className="text-xs font-semibold text-gray-500 uppercase">Growth Wealth</div>
               <div className="text-lg font-bold text-gray-900">150,000,000</div>
             </div>
          </div>
          <div className="flex flex-col justify-center p-4 rounded-lg bg-white border border-gray-200 shadow-sm">
             <div className="flex justify-between items-end mb-2">
               <div className="flex items-center gap-2 text-xs font-semibold text-gray-500 uppercase">
                 <CreditCard className="h-4 w-4 text-gray-400" /> Utilization
               </div>
               <span className="text-sm font-bold text-green-600">31.5%</span>
             </div>
             <Progress value={31.5} className="h-2" indicatorClassName="bg-green-500" />
          </div>
          <div className="flex items-center gap-4 p-4 rounded-lg bg-white border border-gray-200 shadow-sm">
             <div className="flex-1 flex flex-col justify-center border-r border-gray-100 pr-4">
               <div className="flex items-center gap-1.5 text-xs font-semibold text-gray-500 uppercase mb-1">
                 <ShieldCheck className="h-4 w-4 text-orange-400" /> Waiver
               </div>
               <div className="text-sm font-bold text-gray-900">0 <span className="text-xs font-medium text-gray-500">UNITS PENDING</span></div>
             </div>
             <div className="flex-1 flex flex-col justify-center">
               <div className="flex items-center gap-1.5 text-xs font-semibold text-gray-500 uppercase mb-1">
                 <AlertCircle className="h-4 w-4 text-red-500" /> Operational
               </div>
               <div className="text-[10px] font-bold text-red-600 whitespace-nowrap">0 URGENT • 7 TASKS</div>
             </div>
          </div>
        </div>

        <div className="flex items-center gap-4 text-xs font-semibold pb-2 border-b border-gray-200">
          <div className="flex items-center gap-1.5"><div className="h-2 w-2 rounded-full bg-green-500"></div> QUALIFIED</div>
          <div className="flex items-center gap-1.5"><div className="h-2 w-2 rounded-full bg-orange-400"></div> NEEDS ACTION</div>
          <div className="flex items-center gap-1.5"><div className="h-2 w-2 rounded-full bg-red-500"></div> CRITICAL</div>
        </div>

        {/* Table Container */}
        <div className="flex-1 flex flex-col mt-4">
          
          {/* Header */}
          <div className="grid grid-cols-[300px_120px_160px_200px_220px_1fr_80px] items-center gap-4 border-b border-gray-100 pb-2 pr-6 text-[11px] font-semibold text-gray-400 uppercase tracking-wider">
            <div>Account Detail</div>
            <div className="text-center">Balance</div>
            <div className="text-center">Due & Cycle</div>
            <div className="text-center">Role & Ownership</div>
            <div className="text-center">Credit Limit</div>
            <div>Reward Logic</div>
            <div className="text-right">Actions</div>
          </div>

          {/* Group Header */}
          <div className="flex items-center justify-between border-b border-gray-200 bg-blue-50/30 p-3">
             <div className="flex items-center gap-2">
               <ChevronDown className="h-4 w-4 text-blue-600" />
               <span className="font-bold text-blue-900 uppercase text-sm tracking-wide">Credit Cards</span>
               <Badge className="bg-blue-100 text-blue-700 hover:bg-blue-200 px-1.5 py-0 h-5 font-bold">30</Badge>
             </div>
             <div className="flex flex-col items-end text-xs">
               <span className="font-semibold text-gray-500">TOTAL DEBT <span className="text-blue-700 font-bold ml-1">579,612,759</span></span>
             </div>
          </div>

          {/* Rows */}
          <div className="flex flex-col min-w-0">
            {ACCOUNTS.map((acc) => (
              <div key={acc.id} data-testid={`account-row-${acc.id}`} className="flex flex-col border-b border-gray-100">
                <div 
                  data-testid={`account-expand-btn-${acc.id}`}
                  className={cn("grid grid-cols-[300px_120px_160px_200px_220px_1fr_80px] items-center gap-4 p-4 hover:bg-gray-50 cursor-pointer min-h-[80px]", expandedId === acc.id && "bg-gray-50/50")}
                  onClick={() => setExpandedId(expandedId === acc.id ? null : acc.id)}
                >
                  {/* Account Name */}
                  <div className="flex items-center gap-3">
                    <div className={cn("h-10 w-14 rounded border border-gray-200/50 shadow-sm shrink-0", acc.color)}></div>
                    <div className="flex flex-col min-w-0">
                      <div className="flex items-center gap-1.5">
                        <span className="font-bold text-gray-900 truncate">{acc.name}</span>
                        {acc.badge && <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200 text-[9px] px-1.5 py-0 font-bold ml-1">{acc.badge}</Badge>}
                      </div>
                      <div className="text-[10px] text-gray-500 font-medium truncate mt-0.5">
                        {acc.holder} • {acc.last4}
                      </div>
                    </div>
                  </div>

                  {/* Balance */}
                  <div className="flex justify-center">
                    <div className="rounded-full border border-red-200 bg-red-50 px-3 py-1.5">
                      <span data-testid={`account-balance-${acc.id}`} className={cn("text-xs font-bold", acc.balanceColor)}>{acc.balance}</span>
                    </div>
                  </div>

                  {/* Due & Cycle */}
                  <div className="flex flex-col items-center gap-1.5">
                    <div className="flex items-center gap-1.5 rounded-full border border-green-200 bg-green-50 px-2 py-0.5 text-xs font-bold text-green-700 w-fit">
                      {acc.dueDays} Left <CreditCard className="h-3 w-3 inline" /> {acc.dueDate}
                    </div>
                    <div className="flex items-center gap-1 rounded bg-yellow-50 border border-yellow-200 px-1.5 py-0.5 text-[10px] font-bold text-yellow-700">
                      <Banknote className="h-3 w-3" /> {acc.pending} Pending
                    </div>
                  </div>

                  {/* Role & Ownership */}
                  <div className="flex flex-col items-center justify-center gap-1.5">
                    <div className="text-[9px] font-bold text-blue-600">∑ Single Debt: {acc.debt}</div>
                    <div className="flex items-center gap-1 bg-white border border-gray-200 rounded-md p-1 pl-2">
                       <span data-testid={`account-status-badge-${acc.id}`} className="text-[10px] font-bold text-gray-700 shrink-0">{acc.role}</span>
                       <ChevronRight className="h-3 w-3 text-gray-300" />
                       <div className={cn("h-4 w-6 rounded-sm border border-gray-200 shrink-0", acc.cardColor)}></div>
                       <Building2 className="h-3 w-3 text-gray-400 ml-1" />
                    </div>
                  </div>

                  {/* Limit & Waiver */}
                  <div className="flex flex-col justify-center px-4">
                    <div className="flex justify-between items-end mb-1 text-[10px] font-bold">
                      <span className="text-gray-400">LIMIT</span>
                      <span className="text-red-500">{acc.limit}</span>
                    </div>
                    <div className="w-full h-2 rounded-full bg-gray-100 flex overflow-hidden mb-1">
                      <div className="h-full bg-orange-400" style={{ width: `${100 - acc.remainingPercent}%`}}></div>
                      <div className="h-full bg-blue-500" style={{ width: `${acc.remainingPercent}%`}}></div>
                    </div>
                    <div className="flex items-center gap-1 text-[9px] font-bold text-blue-700">
                      <AlertTriangle className="h-3 w-3" /> {acc.remainingPercent}% REMAINING • DEBT {acc.limitDebt}
                    </div>
                  </div>

                  {/* Target */}
                  <div className="flex flex-col justify-center">
                    {acc.target ? (
                       <div className="flex flex-col gap-1 w-full max-w-[120px]">
                         <span className="text-[10px] font-bold text-green-700">{acc.target}</span>
                         <Progress value={acc.targetPercent || 100} className="h-1.5" indicatorClassName="bg-green-500" />
                         <span className="text-[10px] font-bold text-gray-500 text-right">{acc.targetPercent}%</span>
                       </div>
                    ) : (
                      <span className="text-xs font-semibold text-gray-400 italic">No Target</span>
                    )}
                  </div>

                  {/* Actions */}
                  <div className="flex items-center justify-end gap-1 pr-2" onClick={e => e.stopPropagation()}>
                    <Button variant="ghost" size="icon" className="h-8 w-8 text-green-600 hover:text-green-700 hover:bg-green-50">
                      <Banknote className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon" className="h-8 w-8 text-red-600 hover:text-red-700 hover:bg-red-50">
                      <CreditCard className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon" className="h-8 w-8 text-gray-400">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                {expandedId === acc.id && (
                  <div className="px-6 py-4 bg-gray-50/50 border-t border-gray-100 grid grid-cols-1 md:grid-cols-3 gap-6" onClick={e => e.stopPropagation()}>
                     {/* Placeholder for complex expanded contents */}
                     <div className="p-4 bg-white border border-gray-200 rounded-lg shadow-sm">
                       <h4 className="text-sm font-semibold text-gray-900 mb-2">Statement Details</h4>
                       <div className="text-sm text-gray-500 py-6 text-center border-2 border-dashed border-gray-200 rounded-lg">Chart Placeholder</div>
                     </div>
                     <div className="p-4 bg-white border border-gray-200 rounded-lg shadow-sm">
                       <h4 className="text-sm font-semibold text-gray-900 mb-2">Rewards Earned</h4>
                       <div className="flex flex-col gap-2">
                         <div className="flex justify-between items-center text-sm">
                           <span className="font-medium text-gray-500">Cashback</span>
                           <span className="font-bold text-green-600">+1,200,000</span>
                         </div>
                       </div>
                     </div>
                     <div className="p-4 bg-white border border-gray-200 rounded-lg shadow-sm">
                       <h4 className="text-sm font-semibold text-gray-900 mb-2">Linked Accounts</h4>
                       <div className="text-sm text-gray-500 py-6 text-center">List Placeholder</div>
                     </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

      </main>
    </div>
  );
}

