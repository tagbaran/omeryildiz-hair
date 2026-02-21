"use client";

import { Phone, MessageCircle } from "lucide-react";
import { siteConfig } from "@/lib/siteConfig";
import { Dictionary } from "@/lib/dictionary";

// Define a simpler dictionary part or just pass strings if preferred, 
// but type safety is better.
interface MobileActionButtonsProps {
    dict: Dictionary; // Receiving full dictionary or specific parts
    lang: string;
}

export function MobileActionButtons({ dict, lang }: MobileActionButtonsProps) {
    // Pre-formatted WhatsApp message
    const waMessage = encodeURIComponent(siteConfig.contactMessage);

    return (
        <div className="fixed bottom-0 left-0 right-0 z-50 md:hidden bg-background/80 backdrop-blur-lg border-t border-border/50 pb-safe">
            <div className="flex h-16">
                {/* Call Button */}
                <a
                    href={`tel:${siteConfig.whatsappNumber}`}
                    className="flex-1 flex flex-col items-center justify-center gap-1 bg-background text-foreground hover:bg-muted/50 transition-colors border-r border-border/10"
                >
                    <Phone className="h-5 w-5" />
                    <span className="text-xs font-bold uppercase tracking-wider opacity-90 overflow-hidden text-ellipsis whitespace-nowrap px-1">
                        {dict.common.mobileCall}
                    </span>
                </a>

                {/* WhatsApp Button - Premium Highlight */}
                <a
                    href={`https://wa.me/${siteConfig.whatsappNumber}?text=${waMessage}`}
                    target="_blank"
                    rel="noreferrer"
                    className="flex-1 flex flex-col items-center justify-center gap-1 bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
                >
                    <MessageCircle className="h-6 w-6 fill-current" />
                    <span className="text-xs font-bold uppercase tracking-wider overflow-hidden text-ellipsis whitespace-nowrap px-1">
                        {dict.common.whatsappAction}
                    </span>
                </a>
            </div>
            {/* Safe area spacer for iPhone Home indicator is handled by pb-safe if configured or simple padding */}
            <div className="h-[env(safe-area-inset-bottom)] bg-background" />
        </div>
    );
}
