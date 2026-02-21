"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Globe, Menu, X } from "lucide-react"
import { siteConfig } from "@/lib/siteConfig"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import type { Dictionary } from "@/lib/dictionary"

interface NavbarProps {
    lang: string
    dict: Dictionary
}

export function Navbar({ lang, dict }: NavbarProps) {
    const [isOpen, setIsOpen] = React.useState(false)
    const pathname = usePathname()

    const links = [
        { href: `/${lang}`, label: dict.common.whatsappBtn.includes("Analiz") ? "Ana Sayfa" : dict.common.whatsappBtn }, // Just a fallback logic
        { href: `/${lang}/services`, label: dict.nav.process },
        { href: `/${lang}/results`, label: dict.nav.results },
        { href: `/${lang}/contact`, label: dict.nav.contact },
    ]

    // Refined links manually since first one was messy above
    const navLinks = [
        { href: `/${lang}`, label: lang === "tr" ? "Ana Sayfa" : (lang === "ar" ? "الرئيسية" : (lang === "de" ? "Startseite" : "Home")) },
        { href: `/${lang}/services`, label: dict.nav.process },
        { href: `/${lang}/results`, label: dict.nav.results },
        { href: `/${lang}/contact`, label: dict.nav.contact },
    ]

    const toggleLanguage = () => {
        // Cycle TR -> EN -> DE -> AR -> TR
        const nextLang = lang === "tr" ? "en" : (lang === "en" ? "de" : (lang === "de" ? "ar" : "tr"));
        const segments = pathname.split("/");
        segments[1] = nextLang;
        return segments.join("/");
    }

    return (
        <nav className="fixed top-0 left-0 right-0 z-50 border-b border-white/10 bg-[#0B1220]/80 backdrop-blur-xl transition-all duration-300">
            <div className="container mx-auto px-4 h-20 flex items-center justify-between">
                {/* Brand */}
                <Link href={`/${lang}`} className="text-2xl font-black tracking-tighter z-50 relative flex items-center gap-2">
                    <div className="h-8 w-8 bg-blue-500 rounded-lg flex items-center justify-center text-white font-bold text-xl">Ö</div>
                    <span className="text-white">Ömer Yıldız</span>
                </Link>

                {/* Desktop Links */}
                <div className="hidden md:flex items-center gap-8">
                    {navLinks.map((link) => (
                        <Link
                            key={link.href}
                            href={link.href}
                            className={cn(
                                "text-sm font-medium transition-colors hover:text-blue-400",
                                pathname === link.href ? "text-blue-400" : "text-white/90"
                            )}
                        >
                            {link.label}
                        </Link>
                    ))}

                    <div className="h-6 w-px bg-white/20 mx-2" />

                    {/* Language Switcher */}
                    <Link href={toggleLanguage()} className="flex items-center gap-2 text-sm font-medium text-slate-200 hover:text-blue-400 transition-colors">
                        <Globe className="h-4 w-4" />
                        <span className="uppercase">{lang}</span>
                    </Link>

                    <Button size="sm" className="rounded-full px-6 bg-blue-500 hover:bg-blue-600 text-white border-0 font-semibold" asChild>
                        <Link href={`https://wa.me/${siteConfig.whatsappNumber}`} target="_blank">
                            {dict.common.whatsappAction}
                        </Link>
                    </Button>
                </div>

                {/* Mobile Toggle */}
                <div className="flex md:hidden items-center gap-4">
                    <Link href={toggleLanguage()} className="flex items-center gap-1 text-sm font-medium text-slate-200 hover:text-blue-400 transition-colors">
                        <span className="uppercase">{lang}</span>
                    </Link>
                    <button
                        className="z-50 p-2 text-white"
                        onClick={() => setIsOpen(!isOpen)}
                    >
                        {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                    </button>
                </div>

                {/* Mobile Menu Overlay */}
                <div
                    className={cn(
                        "fixed inset-0 bg-[#0B1220]/95 backdrop-blur-xl z-40 flex flex-col items-center justify-center space-y-8 md:hidden transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)]",
                        isOpen ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-full pointer-events-none"
                    )}
                >
                    {navLinks.map((link) => (
                        <Link
                            key={link.href}
                            href={link.href}
                            className="text-3xl font-bold tracking-tight text-white hover:text-blue-400 transition-colors"
                            onClick={() => setIsOpen(false)}
                        >
                            {link.label}
                        </Link>
                    ))}
                    <Button size="lg" className="w-64 rounded-full mt-8 bg-blue-500 hover:bg-blue-600 text-white border-0 font-semibold" asChild>
                        <Link href={`https://wa.me/${siteConfig.whatsappNumber}`} target="_blank">
                            {dict.common.whatsappAction}
                        </Link>
                    </Button>
                </div>
            </div>
        </nav>
    )
}
