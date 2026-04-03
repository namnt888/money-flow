'use client';

import React, { useState } from 'react';
import { 
    Settings as SettingsIcon, 
    Activity, 
    Zap, 
    Key, 
    ShieldCheck, 
    MessageSquare, 
    Info, 
    ExternalLink, 
    ChevronRight,
    Bot,
    Plus,
    X,
    Save,
    RotateCcw,
    Brain,
    HelpCircle
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
    Card, 
    CardContent, 
    CardDescription, 
    CardHeader, 
    CardTitle, 
    CardFooter 
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
    Select, 
    SelectContent, 
    SelectItem, 
    SelectTrigger, 
    SelectValue 
} from "@/components/ui/select-shadcn";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { UsageStats } from "./usage-stats";
import { BotConfig, updateBotConfig } from "@/services/bot-config.service";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

interface AIConfigFormProps {
    initialConfigs: BotConfig[];
}

export function AIConfigForm({ initialConfigs }: AIConfigFormProps) {
    const aiConfig = initialConfigs.find(c => c.key === 'AI_MANAGEMENT_BOT');
    const configData = aiConfig?.config as any || {};

    const [activeTab, setActiveTab] = useState("general");
    const [isSaving, setIsSaving] = useState(false);
    
    // Form states
    const [model, setModel] = useState(configData.model || "gemini-2.0-flash");
    const [persona, setPersona] = useState(configData.persona || "rolly");
    const [language, setLanguage] = useState(configData.language || "vi");
    const [isAlertEnabled, setIsAlertEnabled] = useState(configData.usage_alert || true);

    const handleSave = async () => {
        setIsSaving(true);
        try {
            const nextConfig = {
                ...configData,
                model,
                persona,
                language,
                usage_alert: isAlertEnabled,
                last_updated: new Date().toISOString()
            };
            
            await updateBotConfig('AI_MANAGEMENT_BOT', nextConfig);
            toast.success("Configuration saved successfully");
        } catch (error) {
            toast.error("Failed to save configuration");
        } finally {
            setIsSaving(false);
        }
    };

    return (
        <Tabs defaultValue="general" className="w-full space-y-8" onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-3 md:w-[450px] bg-slate-100 p-1.5 rounded-2xl shadow-inner mb-4">
                <TabsTrigger value="general" className="rounded-xl data-[state=active]:bg-white data-[state=active]:shadow-md transition-all duration-300 font-black uppercase text-[10px] tracking-widest gap-2">
                    <SettingsIcon className="h-4 w-4" /> General
                </TabsTrigger>
                <TabsTrigger value="platforms" className="rounded-xl data-[state=active]:bg-white data-[state=active]:shadow-md transition-all duration-300 font-black uppercase text-[10px] tracking-widest gap-2">
                    <Activity className="h-4 w-4" /> Platforms
                </TabsTrigger>
                <TabsTrigger value="health" className="rounded-xl data-[state=active]:bg-white data-[state=active]:shadow-md transition-all duration-300 font-black uppercase text-[10px] tracking-widest gap-2">
                    <Zap className="h-4 w-4" /> Health
                </TabsTrigger>
            </TabsList>

            <TabsContent value="general" className="space-y-6 focus-visible:outline-none">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <Card className="md:col-span-2 border-slate-200 shadow-sm overflow-hidden bg-white/50 backdrop-blur-sm rounded-3xl">
                        <CardHeader className="pb-8 border-b bg-slate-50/50">
                            <div className="flex items-center gap-4">
                                <div className="p-3 bg-blue-600 rounded-2xl shadow-lg shadow-blue-200">
                                    <Key className="h-6 w-6 text-white" />
                                </div>
                                <div>
                                    <CardTitle className="text-xl font-black uppercase tracking-tight text-slate-900">Provider Configuration</CardTitle>
                                    <CardDescription className="text-slate-500 font-bold">Securely manage your API keys and select your preferred LLM provider.</CardDescription>
                                </div>
                            </div>
                        </CardHeader>
                        <CardContent className="space-y-8 pt-8">
                            <div className="space-y-3">
                                <Label className="text-[11px] font-black uppercase tracking-widest text-slate-500 flex items-center gap-2">
                                    <ExternalLink className="h-3 w-3" /> Preferred Provider
                                </Label>
                                <Select defaultValue="gemini">
                                    <SelectTrigger className="h-14 rounded-2xl border-2 border-slate-100 hover:border-slate-200 focus:border-blue-500 transition-all font-bold text-slate-700 bg-white">
                                        <SelectValue placeholder="Select Provider" />
                                    </SelectTrigger>
                                    <SelectContent className="rounded-2xl shadow-2xl border-slate-100">
                                        <SelectItem value="gemini" className="font-bold py-3 hover:bg-blue-50">Google Gemini (Recommended)</SelectItem>
                                        <SelectItem value="groq" className="font-bold py-3 hover:bg-orange-50">Groq (Blazing Fast)</SelectItem>
                                        <SelectItem value="openai" className="font-bold py-3 hover:bg-emerald-50">OpenAI (GPT-4o)</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>

                            <div className="space-y-3">
                                <div className="flex items-center justify-between">
                                    <Label className="text-[11px] font-black uppercase tracking-widest text-slate-500 flex items-center gap-2">
                                        <Brain className="h-3 w-3" /> Model Name
                                    </Label>
                                    <Badge variant="secondary" className="text-[10px] font-black uppercase bg-emerald-50 text-emerald-600 px-2.5 py-0.5 border-emerald-100">Free Tier Ready</Badge>
                                </div>
                                <Select value={model} onValueChange={setModel}>
                                    <SelectTrigger className="h-14 rounded-2xl border-2 border-slate-100 hover:border-slate-200 focus:border-blue-500 transition-all font-bold text-slate-700 bg-white">
                                        <SelectValue placeholder="Select Model" />
                                    </SelectTrigger>
                                    <SelectContent className="rounded-2xl shadow-2xl border-slate-100">
                                        <SelectItem value="gemini-2.0-flash" className="font-bold py-3">Gemini 2.0 Flash (Fastest)</SelectItem>
                                        <SelectItem value="gemini-1.5-pro" className="font-bold py-3">Gemini 1.5 Pro (Smarts)</SelectItem>
                                        <SelectItem value="llama-3.3-70b" className="font-bold py-3">Llama 3.3 70B (Groq)</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>

                            <div className="space-y-3">
                                <Label className="text-[11px] font-black uppercase tracking-widest text-slate-500 flex items-center gap-2">
                                    <ShieldCheck className="h-3 w-3" /> API Key (System Variable)
                                </Label>
                                <div className="relative">
                                    <Input 
                                        type="password" 
                                        value="••••••••••••••••••••••••••••" 
                                        readOnly
                                        className="h-14 rounded-2xl border-2 border-slate-100 bg-slate-50/50 pr-12 font-mono text-slate-400 select-none cursor-not-allowed"
                                    />
                                    <div className="absolute inset-y-0 right-4 flex items-center">
                                        <ShieldCheck className="h-5 w-5 text-emerald-500 opacity-50" />
                                    </div>
                                </div>
                                <p className="text-[10px] text-slate-400 font-bold italic pl-4 border-l-2 border-blue-200 ml-2 py-1">
                                    * Key is retrieved from environment variables for maximum security.
                                </p>
                            </div>
                        </CardContent>
                        <CardFooter className="bg-slate-50/80 border-t py-6 px-8 flex justify-between items-center">
                             <div className="flex items-center gap-2 text-[10px] text-slate-400 font-bold uppercase tracking-widest">
                                <RotateCcw className="h-3 w-3" /> Last saved: {configData.last_updated ? new Date(configData.last_updated).toLocaleString() : 'Never'}
                             </div>
                             <Button 
                                onClick={handleSave} 
                                disabled={isSaving}
                                className="bg-blue-600 hover:bg-blue-700 text-white font-black uppercase tracking-[0.2em] px-8 h-12 rounded-2xl shadow-lg shadow-blue-200 transition-all hover:scale-105 active:scale-95 disabled:opacity-50"
                             >
                                {isSaving ? "Saving..." : "Save Config"}
                             </Button>
                        </CardFooter>
                    </Card>

                    <Card className="border-slate-200 shadow-sm overflow-hidden bg-white rounded-3xl">
                        <CardHeader className="pb-6 border-b bg-purple-50/30">
                            <div className="flex items-center gap-4">
                                <div className="p-3 bg-purple-600 rounded-2xl shadow-lg shadow-purple-200">
                                    <MessageSquare className="h-6 w-6 text-white" />
                                </div>
                                <CardTitle className="text-xl font-black uppercase tracking-tight">Bot Persona</CardTitle>
                            </div>
                        </CardHeader>
                        <CardContent className="space-y-8 pt-8">
                            <div className="grid grid-cols-1 gap-3">
                                {[
                                    { id: 'rolly', name: 'Rolly (Sassy)', desc: '"Why are you wasting money again??"', color: 'emerald' },
                                    { id: 'pro', name: 'Professional', desc: '"Transaction recorded successfully."', color: 'blue' },
                                    { id: 'funny', name: 'Funny Guy', desc: '"Spending like Bruce Wayne!"', color: 'orange' }
                                ].map((p) => (
                                    <div 
                                        key={p.id}
                                        onClick={() => setPersona(p.id)}
                                        className={cn(
                                            "flex items-center justify-between rounded-2xl border-2 p-4 transition-all cursor-pointer hover:shadow-md",
                                            persona === p.id 
                                                ? "bg-slate-50 border-slate-900 ring-2 ring-slate-900 ring-offset-2" 
                                                : "bg-white border-slate-100 grayscale-[0.8] opacity-60 hover:grayscale-0 hover:opacity-100"
                                        )}
                                    >
                                        <div className="space-y-0.5">
                                            <Label className="text-sm font-black uppercase tracking-tight">{p.name}</Label>
                                            <p className="text-[10px] text-slate-500 font-bold italic">{p.desc}</p>
                                        </div>
                                        <Switch checked={persona === p.id} onCheckedChange={() => setPersona(p.id)} />
                                    </div>
                                ))}
                            </div>

                            <div className="pt-6 border-t space-y-3">
                                <Label className="text-[11px] font-black uppercase tracking-widest text-slate-500 flex items-center gap-2">
                                    <HelpCircle className="h-3 w-3" /> Language Support
                                </Label>
                                <Select value={language} onValueChange={setLanguage}>
                                    <SelectTrigger className="h-12 rounded-xl border-2 border-slate-100 font-bold bg-slate-50/30">
                                        <SelectValue placeholder="Select Language" />
                                    </SelectTrigger>
                                    <SelectContent className="rounded-xl border-slate-100">
                                        <SelectItem value="vi" className="font-bold">Vietnamese (Tiếng Việt)</SelectItem>
                                        <SelectItem value="en" className="font-bold">English</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </TabsContent>

            <TabsContent value="platforms" className="space-y-6 focus-visible:outline-none animate-in fade-in slide-in-from-bottom-4 duration-500">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <Card className="rounded-3xl border-slate-200 shadow-sm overflow-hidden group">
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-8 rounded-t-3xl transition-colors group-hover:bg-sky-50/50">
                            <div className="space-y-1">
                                <CardTitle className="text-xl font-extrabold uppercase tracking-tight">Telegram Bot</CardTitle>
                                <CardDescription className="font-bold text-[10px] uppercase tracking-wider">Fast Transaction Input</CardDescription>
                            </div>
                            <div className="h-14 w-14 bg-sky-100 rounded-2xl flex items-center justify-center shadow-inner shadow-sky-200 transition-transform group-hover:scale-110">
                                <MessageSquare className="h-7 w-7 text-sky-600" />
                            </div>
                        </CardHeader>
                        <CardContent className="space-y-6 pt-0">
                            <div className="p-4 bg-slate-50 rounded-2xl border border-dashed border-sky-200 font-mono text-[11px] text-sky-700 break-all select-all">
                                https://{typeof window !== 'undefined' ? window.location.host : '...'}/api/ai/telegram
                            </div>
                            <Button variant="outline" className="w-full h-14 rounded-2xl border-2 border-slate-100 hover:border-sky-300 hover:bg-sky-50 hover:text-sky-700 font-black uppercase tracking-widest text-[11px] gap-3 shadow-sm transition-all active:scale-95">
                                <ExternalLink className="h-4 w-4 text-sky-500" /> Setup via @BotFather
                            </Button>
                        </CardContent>
                    </Card>

                    <Card className="rounded-3xl border-slate-200 shadow-sm overflow-hidden opacity-70 group grayscale hover:grayscale-0 hover:opacity-100 transition-all duration-500">
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-8">
                            <div className="space-y-1">
                                <CardTitle className="text-xl font-extrabold uppercase tracking-tight">Slack Connect</CardTitle>
                                <CardDescription className="font-bold text-[10px] uppercase tracking-wider text-rose-500">Integration Pending</CardDescription>
                            </div>
                            <div className="h-14 w-14 bg-rose-50 rounded-2xl flex items-center justify-center shadow-inner">
                                <MessageSquare className="h-7 w-7 text-rose-400" />
                            </div>
                        </CardHeader>
                        <CardContent className="space-y-6 pt-0">
                            <div className="p-4 bg-slate-50/50 rounded-2xl border border-dashed border-rose-100 font-mono text-[11px] text-slate-400 italic">
                                Incoming Webhook URL: [NOT_SET]
                            </div>
                            <Button disabled className="w-full h-14 rounded-2xl bg-slate-100 text-slate-400 font-black uppercase tracking-widest text-[11px] cursor-not-allowed">
                                Coming in v3.1
                            </Button>
                        </CardContent>
                    </Card>
                </div>
            </TabsContent>

            <TabsContent value="health" className="space-y-8 focus-visible:outline-none animate-in zoom-in-95 duration-500">
                <UsageStats config={aiConfig} />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <Card className="border-slate-200 shadow-sm rounded-3xl overflow-hidden bg-white group">
                        <CardHeader className="pb-4 border-b bg-slate-50/50">
                            <div className="flex items-center justify-between">
                                <div className="space-y-1">
                                    <CardTitle className="text-xl font-black uppercase tracking-tight">Recent AI Activity</CardTitle>
                                    <CardDescription className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Real-time Parsing Logs</CardDescription>
                                </div>
                                <div className="p-2 bg-emerald-50 rounded-xl">
                                    <Activity className="h-4 w-4 text-emerald-600" />
                                </div>
                            </div>
                        </CardHeader>
                        <CardContent className="p-0">
                            <div className="divide-y divide-slate-100">
                                {[1, 2, 3].map((i) => (
                                    <div key={i} className="flex items-center justify-between p-5 hover:bg-slate-50 transition-colors cursor-pointer group/item">
                                        <div className="flex items-center gap-4">
                                            <div className="h-10 w-10 rounded-xl bg-slate-100 flex items-center justify-center border-2 border-white shadow-sm ring-1 ring-slate-200 transition-transform group-hover/item:scale-110">
                                                <Bot className={cn("h-5 w-5", i === 1 ? "text-emerald-500" : "text-slate-400")} />
                                            </div>
                                            <div className="flex flex-col">
                                                <span className="text-sm font-bold text-slate-800 tracking-tight">Parsed: "Ăn tối cùng vợ 150k"</span>
                                                <div className="flex items-center gap-2 mt-0.5">
                                                    <span className="text-[10px] text-slate-400 font-bold uppercase">Gemini 2.0 Flash</span>
                                                    <div className="h-1 w-1 rounded-full bg-slate-300" />
                                                    <span className="text-[10px] text-slate-400 font-bold uppercase">{i * 2} minutes ago</span>
                                                </div>
                                            </div>
                                        </div>
                                        <Badge className="bg-slate-100 text-slate-600 border-none font-bold text-[9px] uppercase tracking-tighter">642 tokens</Badge>
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                        <CardFooter className="bg-slate-50/50 border-t py-4 px-6">
                            <Button variant="ghost" className="w-full text-blue-600 font-black uppercase text-[10px] tracking-[0.2em] h-auto hover:bg-white hover:shadow-sm">View Transaction History</Button>
                        </CardFooter>
                    </Card>

                    <Card className="border-slate-200 shadow-sm rounded-3xl overflow-hidden bg-white">
                        <CardHeader className="pb-4 border-b bg-amber-50/20">
                            <div className="flex items-center justify-between">
                                <div className="space-y-1">
                                    <CardTitle className="text-xl font-black uppercase tracking-tight">Usage Protection</CardTitle>
                                    <CardDescription className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Rate-limiting & Safeguards</CardDescription>
                                </div>
                                <div className="p-2 bg-amber-50 rounded-xl">
                                    <ShieldCheck className="h-4 w-4 text-amber-600" />
                                </div>
                            </div>
                        </CardHeader>
                        <CardContent className="space-y-8 pt-8">
                            <div className="flex items-center justify-between p-2 rounded-2xl transition-colors hover:bg-slate-50">
                                <div className="space-y-1">
                                    <Label className="text-sm font-black uppercase tracking-tight">Usage Alert (80%)</Label>
                                    <p className="text-[10px] text-slate-500 font-bold italic">Notify me when daily quota reaches limit.</p>
                                </div>
                                <Switch checked={isAlertEnabled} onCheckedChange={setIsAlertEnabled} />
                            </div>
                            
                            <div className="flex items-center justify-between p-2 rounded-2xl transition-colors hover:bg-slate-50 opacity-60">
                                <div className="space-y-1">
                                    <Label className="text-sm font-black uppercase tracking-tight">Auto Key-Switch</Label>
                                    <p className="text-[10px] text-slate-500 font-bold italic">Switch to backup key on primary failure.</p>
                                </div>
                                <Switch disabled />
                            </div>

                            <div className="p-5 bg-gradient-to-br from-emerald-50 to-green-50 border-2 border-emerald-100 rounded-3xl flex gap-4 shadow-sm shadow-emerald-100/50">
                                <Zap className="h-8 w-8 text-emerald-500 shrink-0 mt-0.5 animate-pulse" />
                                <div className="space-y-2">
                                    <p className="text-xs font-black uppercase tracking-[0.1em] text-emerald-700">Money Flow Pro Tip</p>
                                    <p className="text-[11px] text-emerald-800 leading-relaxed font-bold">
                                        Gần đây tôi đã thêm cột <span className="text-emerald-950 underline decoration-2 underline-offset-2">Keywords</span> vào Danh Mục (Categories). 
                                        Hãy bổ sung từ khóa (vd: "grab", "be", "xe ôm") để bot "thông minh" hơn khi bóc tách tiếng Việt!
                                    </p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </TabsContent>
        </Tabs>
    );
}
