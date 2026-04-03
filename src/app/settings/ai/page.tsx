import { Bot, CheckCircle2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { AIConfigForm } from "@/components/ai/ai-config-form";
import { getBots } from "@/services/bot-config.service";
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'AI Management | Money Flow 3',
    description: 'Configure and monitor your AI financial assistant.',
};

export default async function AIManagementPage() {
    const bots = await getBots();

    return (
        <div className="min-h-screen bg-slate-50/30">
            <div className="container mx-auto py-12 px-6 max-w-6xl space-y-10 animate-in fade-in slide-in-from-top-4 duration-700">
                {/* Header */}
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b-2 border-slate-100">
                    <div className="space-y-4">
                        <div className="flex items-center gap-4">
                            <div className="p-4 bg-gradient-to-br from-blue-600 to-indigo-700 rounded-[2rem] shadow-xl shadow-blue-200 ring-4 ring-white">
                                <Bot className="h-8 w-8 text-white animate-bounce-slow" />
                            </div>
                            <div>
                                <h1 className="text-4xl font-black text-slate-900 tracking-tighter uppercase">AI Management</h1>
                                <p className="text-slate-500 font-bold text-sm mt-1 uppercase tracking-widest flex items-center gap-2">
                                    <span className="h-1.5 w-1.5 rounded-full bg-blue-400" /> Control Center
                                </p>
                            </div>
                        </div>
                    </div>
                    
                    <div className="flex items-center gap-3 bg-white p-3 rounded-2xl shadow-sm border border-slate-100 ring-2 ring-slate-50">
                        <Badge variant="outline" className="bg-emerald-50 text-emerald-700 border-none px-4 py-1.5 font-black uppercase text-[10px] tracking-widest flex items-center gap-2">
                            <div className="h-2 w-2 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.6)]" />
                            Core Systems Online
                        </Badge>
                        <div className="w-px h-6 bg-slate-100" />
                        <CheckCircle2 className="h-5 w-5 text-blue-500" />
                    </div>
                </div>

                <div className="bg-white/40 backdrop-blur-md rounded-[2.5rem] p-2 ring-1 ring-slate-100">
                   <AIConfigForm initialConfigs={bots} />
                </div>

                <footer className="pt-10 text-center">
                    <p className="text-[10px] font-black text-slate-300 uppercase tracking-[0.4em]">
                        Money Flow 3 Neural Engine • v2.8.4-stable
                    </p>
                </footer>
            </div>
        </div>
    );
}

// Add CSS animation for bouncy effect
const styles = `
@keyframes bounce-slow {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-10px); }
}
.animate-bounce-slow {
  animation: bounce-slow 4s ease-in-out infinite;
}
`;
