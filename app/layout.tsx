import type {Metadata} from 'next';
import './globals.css';
import { Inter } from "next/font/google";
import { cn } from "@/lib/utils";

const inter = Inter({subsets:['latin'], variable:'--font-sans'});

export const metadata: Metadata = {
  title: 'MoneyFlow - Dashboard',
  description: 'Personal Finance Dashboard',
};

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang="en" className={cn("font-sans", inter.variable)}>
      <body suppressHydrationWarning className="bg-[#FFFFFF] text-[#1F2937] overflow-hidden">
        {children}
      </body>
    </html>
  );
}
