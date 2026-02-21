"use client";

import { MessageCircle } from "lucide-react";
import { siteConfig } from "@/lib/siteConfig";

interface FloatingWhatsAppProps {
    lang: string;
    text: string; // From dict.common.whatsappMessage
}

export function FloatingWhatsApp({ lang, text }: FloatingWhatsAppProps) {
    const isRtl = lang === "ar";

    // Position: Left for LTR (TR/EN), Right for RTL (AR)
    // ChatBot is usually Right for LTR, Left for RTL.
    // So we put WhatsApp on the opposite side to avoid overlap.
    // LTR -> Chatbot Right, WA Left.
    // RTL -> Chatbot Left, WA Right.
    const positionClass = isRtl ? "right-6 md:right-8" : "left-6 md:left-8";

    return (
        <a
            href={`https://wa.me/${siteConfig.whatsappNumber}?text=${encodeURIComponent(text)}`}
            target="_blank"
            rel="noopener noreferrer"
            className={`fixed bottom-24 md:bottom-8 ${positionClass} z-40 flex items-center gap-2 group`}
            aria-label="WhatsApp"
        >
            <div className="h-14 w-14 rounded-full bg-[#25D366] text-white shadow-xl hover:scale-110 hover:shadow-2xl transition-all duration-300 flex items-center justify-center animate-in fade-in zoom-in slide-in-from-bottom-5">
                <MessageCircle className="h-7 w-7 fill-white" />
            </div>

            {/* Tooltip / Label - visible on hover or mobile always if desired? kept minimal as requested */}
            <span className="hidden md:block absolute bottom-full mb-2 bg-white dark:bg-black px-3 py-1 rounded-lg shadow-lg text-xs font-bold opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
                WhatsApp
            </span>
        </a>
    );
}
