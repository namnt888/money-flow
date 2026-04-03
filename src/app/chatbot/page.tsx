'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Send, Bot, User, Sparkles, Receipt, Wallet, History, ArrowRight, Settings2, Trash2, Key, Check, Info } from 'lucide-react';
import { cn } from '@/lib/utils';
import { sendChatMessageAction, type ChatMessage } from '@/actions/chatbot-actions';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import { toast } from 'sonner';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

const SUGGESTED_QUESTIONS = [
    { text: "Dùng thẻ nào cho bảo hiểm?", icon: Receipt },
    { text: "VPBank Lady budget", icon: Wallet },
    { text: "Lịch sử giao dịch gần đây", icon: History },
];

export default function ChatbotPage() {
    const [messages, setMessages] = useState<ChatMessage[]>([]);
    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [apiKey, setApiKey] = useState<string>('');
    const [isSettingsOpen, setIsSettingsOpen] = useState(false);
    const scrollRef = useRef<HTMLDivElement>(null);

    // Initial greeting and load API key
    useEffect(() => {
        const storedKey = localStorage.getItem('MF_GEMINI_API_KEY') || '';
        setApiKey(storedKey);

        setMessages([
            {
                role: 'assistant',
                content: "Chào bạn! Tôi là trợ lý tài chính Money Flow. Tôi có thể giúp bạn kiểm tra hạn mức Cashback, gợi ý thẻ phù hợp cho từng giao dịch hoặc xem lại lịch sử chi tiêu. Bạn muốn hỏi gì?",
                timestamp: new Date().toISOString()
            }
        ]);
    }, []);

    // Auto-scroll to bottom
    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [messages, isLoading]);

    const handleSaveApiKey = () => {
        localStorage.setItem('MF_GEMINI_API_KEY', apiKey);
        toast.success("Đã lưu API Key rực rỡ!");
        setIsSettingsOpen(false);
    };

    const handleClearChat = () => {
        setMessages([
            {
                role: 'assistant',
                content: "Đã dọn dẹp hội thoại. Tôi sẵn sàng hỗ trợ bạn từ đầu!",
                timestamp: new Date().toISOString()
            }
        ]);
        toast.success("Đã dọn dẹp hội thoại");
    };

    const handleSend = async (text: string = input) => {
        if (!text.trim() || isLoading) return;

        const userMsg: ChatMessage = {
            role: 'user',
            content: text,
            timestamp: new Date().toISOString()
        };

        setMessages(prev => [...prev, userMsg]);
        setInput('');
        setIsLoading(true);

        try {
            // Pass the API key to the server action
            const response = await sendChatMessageAction(text, apiKey || undefined);
            setMessages(prev => [...prev, response]);
        } catch (error) {
            setMessages(prev => [...prev, {
                role: 'assistant',
                content: "Xin lỗi, tôi gặp sự cố khi xử lý yêu cầu này. Hãy thử kiểm tra lại kết nối hoặc API Key nhé!",
                timestamp: new Date().toISOString()
            }]);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="flex flex-col h-[calc(100vh-2rem)] max-w-4xl mx-auto bg-slate-50/50 rounded-2xl border border-slate-200 overflow-hidden shadow-sm transition-all duration-500">
            {/* Header */}
            <div className="px-6 py-4 bg-white border-b border-slate-200 flex items-center justify-between sticky top-0 z-10">
                <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-xl bg-indigo-600 flex items-center justify-center text-white shadow-lg shadow-indigo-200 animate-in zoom-in duration-500">
                        <Bot className="h-6 w-6" />
                    </div>
                    <div>
                        <h1 className="text-lg font-bold text-slate-800 tracking-tight">AI Assistant</h1>
                        <p className="text-[10px] font-black text-slate-500 flex items-center gap-1.5 uppercase tracking-widest">
                            <span className="h-2 w-2 rounded-full bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.5)] animate-pulse"></span>
                            Online & Ready
                        </p>
                    </div>
                </div>
                <div className="flex items-center gap-2">
                    <TooltipProvider>
                        <Tooltip>
                            <TooltipTrigger asChild>
                                <Button 
                                    variant="ghost" 
                                    size="icon" 
                                    className="text-slate-400 hover:text-rose-500 transition-colors"
                                    onClick={handleClearChat}
                                >
                                    <Trash2 className="h-4 w-4" />
                                </Button>
                            </TooltipTrigger>
                            <TooltipContent>Dọn dẹp hội thoại</TooltipContent>
                        </Tooltip>
                    </TooltipProvider>

                    <Popover open={isSettingsOpen} onOpenChange={setIsSettingsOpen}>
                        <PopoverTrigger asChild>
                            <Button 
                                variant="ghost" 
                                size="icon" 
                                className={cn(
                                    "transition-all duration-300",
                                    apiKey ? "text-emerald-500 bg-emerald-50 hover:bg-emerald-100" : "text-amber-400 hover:text-indigo-600 hover:bg-slate-50"
                                )}
                            >
                                <Sparkles className={cn("h-5 w-5", apiKey && "animate-pulse")} />
                            </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-[340px] p-0 border-none shadow-[0_25px_60px_rgba(0,0,0,0.15)] rounded-2xl overflow-hidden z-[100]" align="end">
                            <div className="bg-indigo-600 px-5 py-4 flex justify-between items-center text-white">
                                <div className="flex flex-col">
                                    <span className="text-[9px] font-black text-indigo-200 uppercase tracking-widest mb-1">AI CONFIGURATION</span>
                                    <div className="flex items-center gap-2">
                                        <Settings2 className="h-4 w-4" />
                                        <span className="text-[14px] font-black uppercase tracking-widest leading-none">Settings</span>
                                    </div>
                                </div>
                                <Sparkles className="h-6 w-6 text-indigo-400 fill-white/20" />
                            </div>
                            <div className="p-5 space-y-4 bg-white">
                                <div className="space-y-2">
                                    <div className="flex items-center justify-between">
                                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
                                            <Key className="h-3 w-3" /> Gemini API Key
                                        </label>
                                        <a href="https://aistudio.google.com/app/apikey" target="_blank" className="text-[9px] font-bold text-indigo-600 hover:underline flex items-center gap-1">
                                            Get Key <ArrowRight className="h-2 w-2" />
                                        </a>
                                    </div>
                                    <div className="relative">
                                        <Input 
                                            type="password"
                                            value={apiKey} 
                                            onChange={(e) => setApiKey(e.target.value)}
                                            placeholder="Paste your API key here..."
                                            className="h-10 text-xs font-medium bg-slate-50 border-slate-100 focus:bg-white transition-all pr-10 rounded-xl"
                                        />
                                        {apiKey && <Check className="absolute right-3 top-3 h-4 w-4 text-emerald-500" />}
                                    </div>
                                    <p className="text-[10px] text-slate-400 leading-relaxed italic">
                                        Chuỗi khóa này được lưu cục bộ trên trình duyệt của bạn và dùng để kích hoạt bộ não Gemini AI.
                                    </p>
                                </div>
                                
                                <div className="bg-amber-50 border border-amber-100 rounded-xl p-3 flex gap-3">
                                    <Info className="h-4 w-4 text-amber-500 shrink-0 mt-0.5" />
                                    <p className="text-[10px] font-bold text-amber-700 leading-normal uppercase tracking-tight">
                                        Khi có API Key, tôi sẽ dùng trí tuệ LLM để tư vấn rực rỡ hơn thay vì chỉ tìm kiếm từ khóa!
                                    </p>
                                </div>

                                <Button 
                                    onClick={handleSaveApiKey}
                                    className="w-full h-10 bg-indigo-600 hover:bg-indigo-700 text-white text-[11px] font-black uppercase tracking-widest rounded-xl shadow-lg shadow-indigo-200 transition-all active:scale-[0.98]"
                                >
                                    Cập nhật cấu hình
                                </Button>
                            </div>
                        </PopoverContent>
                    </Popover>
                </div>
            </div>

            {/* Messages Area */}
            <div 
                ref={scrollRef}
                className="flex-1 overflow-y-auto p-6 space-y-6 custom-scrollbar"
            >
                {messages.map((msg, i) => (
                    <div 
                        key={i} 
                        className={cn(
                            "flex gap-4 max-w-[85%] animate-in fade-in slide-in-from-bottom-2 duration-300",
                            msg.role === 'user' ? "ml-auto flex-row-reverse" : ""
                        )}
                    >
                        <div className={cn(
                            "h-9 w-9 rounded-xl shrink-0 flex items-center justify-center shadow-sm",
                            msg.role === 'user' ? "bg-slate-100 text-slate-500 border border-slate-200" : "bg-indigo-100 text-indigo-600 border border-indigo-200"
                        )}>
                            {msg.role === 'user' ? <User className="h-5 w-5" /> : <Bot className="h-5 w-5" />}
                        </div>
                        <div className={cn(
                            "p-4 rounded-2xl shadow-sm text-sm leading-relaxed whitespace-pre-wrap transition-all",
                            msg.role === 'user' 
                                ? "bg-indigo-600 text-white rounded-tr-none shadow-indigo-100" 
                                : "bg-white text-slate-700 border border-slate-100 rounded-tl-none"
                        )}>
                            {msg.content}
                        </div>
                    </div>
                ))}
                
                {isLoading && (
                    <div className="flex gap-4 max-w-[85%] animate-in fade-in duration-500">
                        <div className="h-9 w-9 rounded-xl bg-indigo-100 text-indigo-600 flex items-center justify-center border border-indigo-200 shadow-sm">
                            <Bot className="h-5 w-5 animate-bounce" />
                        </div>
                        <div className="p-4 rounded-2xl bg-white border border-slate-100 rounded-tl-none shadow-sm min-w-[60px]">
                            <div className="flex gap-1.5">
                                <span className="h-2 w-2 bg-indigo-400 rounded-full animate-bounce [animation-delay:-0.3s]"></span>
                                <span className="h-2 w-2 bg-indigo-400 rounded-full animate-bounce [animation-delay:-0.15s]"></span>
                                <span className="h-2 w-2 bg-indigo-400 rounded-full animate-bounce"></span>
                            </div>
                        </div>
                    </div>
                )}
            </div>

            {/* Suggested Area */}
            {messages.length === 1 && (
                <div className="px-6 pb-4 animate-in fade-in duration-1000 delay-500">
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-3 ml-1">Gợi ý cho bạn</p>
                    <div className="flex flex-wrap gap-2">
                        {SUGGESTED_QUESTIONS.map((q, i) => (
                            <button
                                key={i}
                                onClick={() => handleSend(q.text)}
                                className="group flex items-center gap-2.5 px-4 py-2.5 bg-white border border-slate-200 rounded-xl text-[11px] font-bold text-slate-600 hover:border-indigo-400 hover:text-indigo-600 transition-all shadow-sm hover:shadow-md active:scale-95"
                            >
                                <q.icon className="h-4 w-4 text-slate-400 group-hover:text-indigo-500 transition-colors" />
                                <span>{q.text}</span>
                                <ArrowRight className="h-3 w-3 opacity-0 group-hover:opacity-100 transition-all -ml-2 group-hover:ml-0" />
                            </button>
                        ))}
                    </div>
                </div>
            )}

            {/* Input Area */}
            <div className="p-4 bg-white border-t border-slate-200 shadow-[0_-5px_15px_rgba(0,0,0,0.02)]">
                <form 
                    onSubmit={(e) => { e.preventDefault(); handleSend(); }}
                    className="flex gap-3 max-w-3xl mx-auto"
                >
                    <div className="relative flex-1 group">
                        <Input
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            placeholder="Hỏi tôi về thẻ, ngân sách hoặc lịch sử chi tiêu..."
                            className="h-12 bg-slate-50 border-slate-200 focus:bg-white focus:ring-2 focus:ring-indigo-100 focus:border-indigo-400 rounded-xl transition-all pl-4 text-sm font-medium"
                            disabled={isLoading}
                        />
                    </div>
                    <Button 
                        type="submit" 
                        disabled={isLoading || !input.trim()}
                        className="h-12 bg-indigo-600 hover:bg-indigo-700 text-white shadow-lg shadow-indigo-100 rounded-xl px-6 transition-all active:scale-95 flex items-center gap-2"
                    >
                        <Send className="h-4 w-4" />
                        <span className="font-black text-xs uppercase tracking-widest hidden sm:inline">Gửi</span>
                    </Button>
                </form>
                <p className="text-[9px] font-medium text-center text-slate-400 mt-2 uppercase tracking-tighter opacity-70 italic">
                    AI Assistant có thể nhầm lẫn. Vui lòng kiểm tra lại thông tin quan trọng.
                </p>
            </div>
        </div>
    );
}
