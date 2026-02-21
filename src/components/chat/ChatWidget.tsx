"use client";

import { useState, useEffect, useRef } from "react";
import { MessageCircle, X, Send, User, Bot, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { findBestMatch, detectLanguage, ChatResponse } from "./chatUtils";
import { welcomeMessages } from "@/lib/knowledgeBase";
import { siteConfig } from "@/lib/siteConfig";

interface ChatWidgetProps {
    lang: string;
}

interface Message {
    id: number;
    text: string;
    sender: "user" | "bot";
}

export function ChatWidget({ lang }: ChatWidgetProps) {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState<Message[]>([]);
    const [inputValue, setInputValue] = useState("");
    const [isTyping, setIsTyping] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    // Current interaction language can change if user types in another language
    const [currentLang, setCurrentLang] = useState<"tr" | "en" | "ar">(lang as "tr" | "en" | "ar");
    const isRtl = currentLang === "ar";

    // Quick chips depending on language
    const getChips = (l: string) => {
        if (l === "ar") return ["ما هو السعر؟", "كم يوماً؟", "هل هو مؤلم؟"];
        if (l === "en") return ["What is the price?", "How many days?", "Is it painful?"];
        return ["Fiyat nedir?", "Kaç gün kalmalıyım?", "Ağrı olur mu?"];
    };

    const [chips, setChips] = useState(getChips(currentLang));

    useEffect(() => {
        if (isOpen && messages.length === 0) {
            // Initial greeting
            setMessages([
                { id: 1, text: welcomeMessages[currentLang], sender: "bot" }
            ]);
        }
    }, [isOpen, currentLang, messages.length]);

    // Listen for custom event to open chat from anywhere
    useEffect(() => {
        const handleOpenChat = () => setIsOpen(true);
        window.addEventListener('open-chat-widget', handleOpenChat);
        return () => window.removeEventListener('open-chat-widget', handleOpenChat);
    }, []);

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages, isTyping]);

    const handleSendMessage = async (text: string) => {
        if (!text.trim()) return;

        // User message
        const userMsg: Message = { id: Date.now(), text, sender: "user" };
        setMessages((prev) => [...prev, userMsg]);
        setInputValue("");
        setIsTyping(true);

        // Detect language from input to adapt
        const detected = detectLanguage(text, currentLang);
        if (detected !== currentLang) {
            setCurrentLang(detected);
            setChips(getChips(detected));
        }

        // Simulate network delay for "thinking"
        setTimeout(() => {
            const response: ChatResponse = findBestMatch(text, detected);
            const botMsg: Message = { id: Date.now() + 1, text: response.text, sender: "bot" };

            setMessages((prev) => [...prev, botMsg]);
            setIsTyping(false);
        }, 600 + Math.random() * 500); // 600-1100ms delay
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === "Enter") handleSendMessage(inputValue);
    };

    return (
        <>
            {/* Trigger Button */}
            {!isOpen && (
                <button
                    onClick={() => setIsOpen(true)}
                    className={`fixed bottom-24 md:bottom-8 ${lang === "ar" ? "left-4 md:left-8" : "right-4 md:right-8"} z-40 h-14 w-14 rounded-full bg-black text-white shadow-xl hover:scale-105 transition-transform flex items-center justify-center animate-in fade-in zoom-in duration-300 border border-white/10`}
                    aria-label="Chat with us"
                >
                    <MessageCircle className="h-7 w-7" />
                    <span className="absolute -top-1 -right-1 flex h-4 w-4">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-4 w-4 bg-blue-500"></span>
                    </span>
                </button>
            )}

            {/* Chat Window */}
            {isOpen && (
                <div
                    className={`fixed bottom-6 ${lang === "ar" ? "left-6" : "right-6"} z-50 w-[90vw] md:w-[380px] h-[600px] max-h-[85vh] bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 shadow-2xl rounded-[2rem] flex flex-col overflow-hidden animate-in slide-in-from-bottom-10 fade-in duration-300 ring-1 ring-black/5 mx-auto md:mx-0`}
                    style={{ direction: isRtl ? "rtl" : "ltr" }}
                >
                    {/* Header */}
                    <div className="p-4 bg-black/5 dark:bg-white/5 border-b border-white/10 flex justify-between items-center backdrop-blur-md">
                        <div className="flex items-center gap-3">
                            <div className="h-10 w-10 rounded-full bg-gradient-to-tr from-blue-600 to-indigo-600 flex items-center justify-center text-white shadow-lg">
                                <Bot className="h-6 w-6" />
                            </div>
                            <div>
                                <h3 className="font-bold text-sm leading-tight">{siteConfig.brandName}</h3>
                                <p className="text-xs text-muted-foreground flex items-center gap-1">
                                    <span className="h-2 w-2 rounded-full bg-green-500 animate-pulse" />
                                    Online Assistant
                                </p>
                            </div>
                        </div>
                        <button
                            onClick={() => setIsOpen(false)}
                            className="p-2 hover:bg-black/10 rounded-full transition-colors"
                        >
                            <X className="h-5 w-5 opacity-70" />
                        </button>
                    </div>

                    {/* Messages Area */}
                    <div className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-thin scrollbar-thumb-gray-300 dark:scrollbar-thumb-gray-700">
                        {messages.map((msg) => (
                            <div
                                key={msg.id}
                                className={`flex flex-col ${msg.sender === "user" ? "items-end" : "items-start"} animate-in slide-in-from-bottom-2 duration-300`}
                            >
                                <div
                                    className={`max-w-[85%] p-3.5 rounded-2xl text-sm leading-relaxed shadow-sm whitespace-pre-wrap ${msg.sender === "user"
                                        ? "bg-blue-600 text-white rounded-br-none"
                                        : "bg-white dark:bg-neutral-800 border border-gray-100 dark:border-neutral-700 rounded-bl-none"
                                        }`}
                                >
                                    {msg.text}
                                </div>
                                {/* CTA Button if text implies it or strictly for Bot messages if desired. 
                                    User asked "Sohbet sonunda her zaman WhatsApp CTA göster", possibly meaning always available input or after every bot answer.
                                    The texts I added have "👇". Let's use that as trigger. 
                                */}
                                {msg.sender === "bot" && (msg.text.includes("👇") || msg.text.includes("WhatsApp")) && (
                                    <a
                                        href={`https://wa.me/${siteConfig.whatsappNumber}?text=${encodeURIComponent(siteConfig.contactMessage)}`}
                                        target="_blank"
                                        className="mt-2 text-xs bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-full inline-flex items-center gap-2 transition-colors shadow-sm"
                                    >
                                        <MessageCircle className="h-3 w-3" />
                                        {currentLang === 'tr' ? 'WhatsApp\'tan Ulaş' : 'Contact via WhatsApp'}
                                    </a>
                                )}
                            </div>
                        ))}

                        {isTyping && (
                            <div className="flex justify-start">
                                <div className="bg-white dark:bg-neutral-800 border border-gray-100 dark:border-neutral-700 p-4 rounded-2xl rounded-bl-none flex items-center gap-1 shadow-sm">
                                    <span className="h-2 w-2 bg-gray-400 rounded-full animate-bounce [animation-delay:-0.3s]"></span>
                                    <span className="h-2 w-2 bg-gray-400 rounded-full animate-bounce [animation-delay:-0.15s]"></span>
                                    <span className="h-2 w-2 bg-gray-400 rounded-full animate-bounce"></span>
                                </div>
                            </div>
                        )}
                        <div ref={messagesEndRef} />
                    </div>

                    {/* Chips & Input Area */}
                    <div className="p-4 bg-background/50 backdrop-blur-md border-t border-white/10 space-y-3">
                        {/* Chips */}
                        <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-none">
                            {chips.map((chip, i) => (
                                <button
                                    key={i}
                                    onClick={() => handleSendMessage(chip)}
                                    className="whitespace-nowrap px-3 py-1.5 bg-secondary/50 hover:bg-secondary text-xs font-medium rounded-full transition-colors border border-black/5"
                                >
                                    {chip}
                                </button>
                            ))}
                            <a
                                href={`https://wa.me/${siteConfig.whatsappNumber}`}
                                target="_blank"
                                className="whitespace-nowrap px-3 py-1.5 bg-green-100 text-green-700 hover:bg-green-200 text-xs font-bold rounded-full transition-colors flex items-center gap-1"
                            >
                                <MessageCircle className="h-3 w-3" /> WhatsApp
                            </a>
                        </div>

                        {/* Input */}
                        <div className="relative">
                            <input
                                type="text"
                                value={inputValue}
                                onChange={(e) => setInputValue(e.target.value)}
                                onKeyDown={handleKeyDown}
                                placeholder={currentLang === "ar" ? "اكتب رسالة..." : currentLang === "en" ? "Type a message..." : "Bir mesaj yazın..."}
                                className="w-full h-12 pl-4 pr-12 rounded-xl bg-secondary/30 border border-black/5 focus:ring-2 focus:ring-primary/20 focus:border-primary/50 outline-none transition-all placeholder:text-muted-foreground/50 text-sm"
                            />
                            <Button
                                onClick={() => handleSendMessage(inputValue)}
                                size="icon"
                                className={`absolute top-1 bottom-1 ${isRtl ? "left-1" : "right-1"} h-10 w-10 rounded-lg bg-black text-white hover:bg-black/90 shadow-sm`}
                            >
                                <Send className={`h-4 w-4 ${isRtl ? "rotate-180" : ""}`} />
                            </Button>
                        </div>

                        <div className="text-center">
                            <p className="text-[10px] text-muted-foreground opacity-60">
                                AI Assistant | Ömer Yıldız ®
                            </p>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
