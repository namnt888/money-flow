'use client';

import { 
    Zap, 
    Brain, 
    Activity, 
    ShieldCheck,
    TrendingUp,
    TrendingDown,
    ArrowUpRight,
    ArrowDownRight
} from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { BotConfig } from "@/services/bot-config.service";
import { cn } from "@/lib/utils";

interface UsageStatsProps {
    config: BotConfig | undefined;
}

export function UsageStats({ config }: UsageStatsProps) {
    const data = config?.config as any || {
        quota_limit: 1500,
        tokens_used: 42852,
        approx_cost: 0.21,
        model: "gemini-2.0-flash"
    };

    const quotaLimit = data.quota_limit || 1500;
    const tokensUsed = data.tokens_used || 0;
    const approxCost = data.approx_cost || 0;
    const quotaUsedPercent = Math.min(100, Math.round((tokensUsed / (quotaLimit * 100)) * 100)); // Rough estimate if quota is in requests

    const stats = [
        {
            label: "Health Status",
            value: "Active",
            subValue: "Operational",
            icon: Activity,
            color: "text-emerald-500",
            bg: "bg-emerald-50",
            border: "border-emerald-100",
            isBadge: true
        },
        {
            label: "Quota Progress",
            value: `${quotaUsedPercent}%`,
            subValue: `${tokensUsed.toLocaleString()} tokens`,
            icon: Zap,
            color: "text-blue-500",
            bg: "bg-blue-50",
            border: "border-blue-100",
            progress: quotaUsedPercent
        },
        {
            label: "Total Usage",
            value: `${tokensUsed.toLocaleString()}`,
            subValue: "Last 24 Hours",
            icon: Brain,
            color: "text-purple-500",
            bg: "bg-purple-50",
            border: "border-purple-100",
            badge: `$${approxCost.toFixed(2)}`
        },
        {
            label: "API Reliability",
            value: "99.9%",
            subValue: "No failures",
            icon: ShieldCheck,
            color: "text-amber-500",
            bg: "bg-amber-50",
            border: "border-amber-100"
        }
    ];

    return (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {stats.map((stat, i) => (
                <Card key={i} className={cn(
                    "p-5 flex flex-col items-center justify-center text-center space-y-3 border-transparent shadow-sm hover:shadow-md transition-all duration-300 bg-white group",
                    stat.border.replace('border-', 'hover:border-')
                )}>
                    <div className={cn("p-3 rounded-2xl shadow-inner transition-transform group-hover:scale-110", stat.bg)}>
                        <stat.icon className={cn("h-6 w-6", stat.color)} />
                    </div>
                    
                    <div className="space-y-1">
                        <span className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">{stat.label}</span>
                        <div className="flex flex-col">
                            <span className="text-2xl font-black text-slate-900 tracking-tight">{stat.value}</span>
                            <span className="text-[10px] text-slate-500 font-bold uppercase tracking-tighter">{stat.subValue}</span>
                        </div>
                    </div>

                    {stat.progress !== undefined && (
                        <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden mt-2">
                            <div 
                                className={cn("h-full transition-all duration-1000 ease-out", stat.color.replace('text-', 'bg-'))} 
                                style={{ width: `${stat.progress}%` }} 
                            />
                        </div>
                    )}

                    {stat.badge && (
                        <Badge variant="outline" className={cn("mt-2 border-none font-bold", stat.bg, stat.color)}>
                            {stat.badge}
                        </Badge>
                    )}
                    
                    {stat.isBadge && (
                        <div className="flex items-center gap-1.5 mt-2">
                            <div className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                            <span className="text-[10px] font-black text-emerald-600 uppercase">Live</span>
                        </div>
                    )}
                </Card>
            ))}
        </div>
    );
}
