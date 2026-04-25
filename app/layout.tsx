import type {Metadata} from 'next';
import './globals.css';
import { Inter } from "next/font/google";
import { cn } from "@/lib/utils";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Sidebar } from "@/components/sidebar";

const inter = Inter({subsets:['latin'], variable:'--font-sans'});

export const metadata: Metadata = {
  title: 'MoneyFlow - Dashboard',
  description: 'Personal Finance Dashboard',
};

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang="en" className={cn("font-sans", inter.variable)}>
      <body suppressHydrationWarning className="bg-[#FFFFFF] text-[#1F2937] overflow-hidden">
        <TooltipProvider>
          <div className="flex h-screen w-full">
            <Sidebar />
            <main className="flex-1 flex flex-col h-full overflow-hidden">
              {children}
            </main>
          </div>
        </TooltipProvider>
      </body>
    </html>
  );
}
