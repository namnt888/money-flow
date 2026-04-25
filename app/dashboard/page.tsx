'use client';

import { 
  Building2, 
  ChevronRight, 
  Wallet,
  TrendingDown,
  TrendingUp,
  Users,
  ChevronDown
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export default function DashboardPage() {
  return (
    <div className="flex flex-col flex-1 bg-[#FFFFFF] overflow-y-auto w-full">
      <header className="sticky top-0 z-40 flex shrink-0 h-16 items-center gap-4 border-b border-[#E5E7EB] bg-[#FFFFFF] px-6 text-[#1F2937]">
        <h1 className="text-lg font-semibold">Dashboard</h1>
      </header>

      <main className="flex-1 p-6 flex flex-col gap-6">
        
        {/* KPI Row */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="flex flex-col gap-1 p-6 rounded-lg bg-white border border-gray-200 shadow-sm">
            <div className="flex items-center gap-2 text-sm font-semibold text-gray-500 mb-2 uppercase">
              <div className="flex h-8 w-8 items-center justify-center rounded bg-blue-50 text-blue-600">
                <Wallet className="h-4 w-4" />
              </div>
              Net Worth
            </div>
            <div className="text-2xl font-bold text-gray-900">563,422,767</div>
            <div className="text-xs text-gray-500">Total assets</div>
          </div>

          <div className="flex flex-col gap-1 p-6 rounded-lg bg-white border border-gray-200 shadow-sm">
            <div className="flex items-center gap-2 text-sm font-semibold text-gray-500 mb-2 uppercase">
              <div className="flex h-8 w-8 items-center justify-center rounded bg-red-50 text-red-500">
                <TrendingDown className="h-4 w-4" />
              </div>
              Monthly Spend
            </div>
            <div className="text-2xl font-bold text-gray-900">66,945,884</div>
            <div className="text-xs text-gray-500">This month</div>
          </div>

          <div className="flex flex-col gap-1 p-6 rounded-lg bg-white border border-gray-200 shadow-sm">
            <div className="flex items-center gap-2 text-sm font-semibold text-gray-500 mb-2 uppercase">
              <div className="flex h-8 w-8 items-center justify-center rounded bg-green-50 text-green-600">
                <TrendingUp className="h-4 w-4" />
              </div>
              Monthly Income
            </div>
            <div className="text-2xl font-bold text-gray-900">0</div>
            <div className="text-xs text-gray-500">This month</div>
          </div>

          <div className="flex flex-col gap-1 p-6 rounded-lg bg-white border border-gray-200 shadow-sm">
            <div className="flex items-center gap-2 text-sm font-semibold text-gray-500 mb-2 uppercase">
              <div className="flex h-8 w-8 items-center justify-center rounded bg-gray-100 text-gray-600">
                <Users className="h-4 w-4" />
              </div>
              Debt Overview
            </div>
            <div className="text-2xl font-bold text-gray-900">0</div>
            <div className="text-xs text-gray-500">Top debt totals</div>
          </div>
        </div>

        {/* Charts & Activity */}
        <div className="grid grid-cols-1 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          
          <div className="lg:col-span-2 p-6 rounded-lg bg-white border border-gray-200 shadow-sm flex flex-col">
            <div className="flex items-center justify-between mb-4">
              <div>
                <div className="text-[10px] font-bold text-gray-500 uppercase tracking-wider mb-1">MY SPEND</div>
                <h3 className="text-lg font-bold text-gray-900">Personal Expenses</h3>
              </div>
              <Button variant="ghost" className="text-blue-600 hover:text-blue-700 h-8 px-2 text-sm font-semibold">
                View debts
              </Button>
            </div>
            
            <div className="flex items-center gap-2 mb-8">
              <Button variant="outline" size="sm" className="h-8 border-gray-200">
                April <ChevronDown className="ml-2 h-3 w-3" />
              </Button>
              <Button variant="outline" size="sm" className="h-8 border-gray-200">
                2026 <ChevronDown className="ml-2 h-3 w-3" />
              </Button>
            </div>

            <div className="flex flex-col items-center justify-center flex-1 min-h-[200px]">
               {/* Extremely simple pie chart visual representation for visual matching */}
               <div className="relative h-48 w-48 rounded-full border-[24px] border-blue-500 border-r-orange-400 border-b-green-500 flex items-center justify-center">
               </div>
            </div>

            <div className="flex items-center justify-center gap-3 mt-8">
              <div className="flex items-center gap-1.5 text-xs font-semibold text-gray-500">
                <div className="h-2 w-2 bg-blue-500 rounded-sm"></div> Create Initial
              </div>
              <div className="flex items-center gap-1.5 text-xs font-semibold text-gray-500">
                <div className="h-2 w-2 bg-orange-400 rounded-sm"></div> Food & Drink
              </div>
              <div className="flex items-center gap-1.5 text-xs font-semibold text-gray-500">
                <div className="h-2 w-2 bg-green-500 rounded-sm"></div> Health
              </div>
              <div className="flex items-center gap-1.5 text-xs font-semibold text-gray-500">
                <div className="h-2 w-2 bg-red-500 rounded-sm"></div> Online Shopping
              </div>
            </div>
          </div>

          <div className="p-6 rounded-lg bg-white border border-gray-200 shadow-sm flex flex-col">
            <div className="flex items-center justify-between mb-4">
              <div>
                <div className="text-[10px] font-bold text-gray-500 uppercase tracking-wider mb-1">TOP DEBTORS</div>
                <h3 className="text-lg font-bold text-gray-900">Outstanding by cycle</h3>
              </div>
              <Button variant="ghost" className="text-blue-600 hover:text-blue-700 h-8 px-2 text-sm font-semibold">
                View all
              </Button>
            </div>
            <div className="text-sm text-gray-500">
              No outstanding debts.
            </div>
          </div>

          <div className="p-6 rounded-lg bg-white border border-gray-200 shadow-sm flex flex-col xl:col-span-1">
            <div className="flex items-center justify-between mb-4 text-[10px] font-bold text-gray-500 uppercase tracking-wider">
               RECENT ACTIVITY
               <Button variant="ghost" className="text-blue-600 hover:text-blue-700 h-6 px-2 text-xs">View all</Button>
            </div>
            <h3 className="text-lg font-bold text-gray-900 mb-4">Latest transactions</h3>
            
            <div className="flex flex-col gap-3">
              {[1, 2, 3, 4, 5].map((i) => (
                <div key={i} className="flex items-center justify-between border-b border-gray-100 pb-3 last:border-b-0 last:pb-0">
                  <div className="flex items-center gap-3">
                    <div className="h-8 w-8 rounded-full bg-gray-100 flex items-center justify-center">
                      <div className="h-4 w-4 bg-gray-400 rounded-sm mix-blend-multiply opacity-50"></div>
                    </div>
                    <div className="flex flex-col min-w-0">
                      <span className="text-xs font-semibold text-gray-900 truncate max-w-[120px]">
                        Ref: Transaction #{i}
                      </span>
                      <span className="text-[10px] text-gray-500">Apr 18, 16:14</span>
                    </div>
                  </div>
                  <span className="text-xs font-bold text-gray-900">-40,899,000</span>
                </div>
              ))}
            </div>
          </div>

        </div>

      </main>
    </div>
  );
}
