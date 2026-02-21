"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { siteConfig } from "@/lib/siteConfig";
import { Send, Loader2 } from "lucide-react";
import { Dictionary } from "@/lib/dictionary";

// We'll define a simpler shape for the part of the dictionary we need
type ContactDict = Dictionary["contact"]["form"];

interface ContactFormProps {
    dict: ContactDict;
    className?: string;
}

export function ContactForm({ dict, className }: ContactFormProps) {
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        name: "",
        phone: "",
        message: "",
    });

    /* 
       WHATSAPP DIRECT INTEGRATION (Serverless)
       This opens the user's WhatsApp with a pre-filled message.
       It's free, no API key needed, and works immediately.
    */
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        // Simulate a brief delay for UX
        setTimeout(() => {
            const text = `Merhaba, web sitenizden ulaşıyorum.\n\n*İsim:* ${formData.name}\n*Telefon:* ${formData.phone}\n*Mesaj:* ${formData.message || "Belirtilmedi"}`;

            const whatsappUrl = `https://wa.me/${siteConfig.whatsappNumber}?text=${encodeURIComponent(text)}`;

            window.open(whatsappUrl, "_blank");
            setLoading(false);
            setFormData({ name: "", phone: "", message: "" });
        }, 800);
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    };

    return (
        <form onSubmit={handleSubmit} className={`space-y-4 ${className}`}>
            <div className="grid gap-2">
                <label className="text-sm font-semibold">{dict.name}</label>
                <input
                    required
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Ad Soyad"
                    className="flex h-12 w-full rounded-xl border border-input bg-muted/50 px-4 py-2 text-base outline-none focus:ring-2 focus:ring-primary/20 transition-all dark:bg-black/20"
                />
            </div>
            <div className="grid gap-2">
                <label className="text-sm font-semibold">{dict.phone}</label>
                <input
                    required
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="+90 5XX XXX XX XX"
                    className="flex h-12 w-full rounded-xl border border-input bg-muted/50 px-4 py-2 text-base outline-none focus:ring-2 focus:ring-primary/20 transition-all dark:bg-black/20"
                />
            </div>
            <div className="grid gap-2">
                <label className="text-sm font-semibold">{dict.message}</label>
                <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="..."
                    className="flex min-h-[100px] w-full rounded-xl border border-input bg-muted/50 px-4 py-3 text-base outline-none focus:ring-2 focus:ring-primary/20 transition-all resize-none dark:bg-black/20"
                />
            </div>
            <Button
                type="submit"
                className="w-full h-12 text-lg rounded-xl gap-2 font-bold shadow-lg shadow-primary/20 hover:scale-[1.02] transition-transform"
                size="lg"
                disabled={loading}
            >
                {loading ? (
                    <Loader2 className="h-5 w-5 animate-spin" />
                ) : (
                    <Send className="h-4 w-4" />
                )}
                {dict.send}
            </Button>
            <p className="text-xs text-center text-muted-foreground pt-2 opacity-80">
                {dict.privacyNote}
            </p>
        </form>
    );
}
