import Link from "next/link"
import { siteConfig } from "@/lib/siteConfig"
import type { Dictionary } from "@/lib/dictionary"
import { ShieldCheck, ArrowRight, Instagram, Mail, MessageCircle } from "lucide-react"

interface FooterProps {
    lang: string
    dict: Dictionary
}

export function Footer({ lang, dict }: FooterProps) {
    return (
        <footer className="bg-neutral-950 text-white border-t border-white/10 pt-20 pb-10">
            <div className="container mx-auto px-4 grid md:grid-cols-4 gap-12 mb-16">
                {/* Brand & Stats */}
                <div className="space-y-6">
                    <Link href={`/${lang}`} className="block text-2xl font-bold tracking-tighter">
                        {siteConfig.brandName}
                    </Link>
                    <p className="text-white/60 text-sm leading-relaxed max-w-sm">
                        {dict.hero.description}
                    </p>
                    <div className="flex gap-4 pt-2">
                        <a href={siteConfig.instagramUrl} target="_blank" className="bg-white/5 hover:bg-white/10 p-3 rounded-full transition-colors">
                            <Instagram className="h-5 w-5" />
                        </a>
                        <a href={`mailto:${siteConfig.email}`} className="bg-white/5 hover:bg-white/10 p-3 rounded-full transition-colors">
                            <Mail className="h-5 w-5" />
                        </a>
                    </div>
                </div>

                {/* Trust / Why Us */}
                <div className="space-y-6">
                    <h4 className="font-bold text-lg flex items-center gap-2">
                        <ShieldCheck className="h-5 w-5 text-blue-400" />
                        {dict.footer.whyUs}
                    </h4>
                    <p className="text-white/60 text-sm leading-relaxed">
                        {dict.footer.whyUsDesc}
                    </p>
                    <div className="flex gap-2">
                        <div className="bg-blue-500/10 text-blue-400 px-3 py-1 rounded-full text-xs font-bold border border-blue-500/20">
                            Professional
                        </div>
                        <div className="bg-green-500/10 text-green-400 px-3 py-1 rounded-full text-xs font-bold border border-green-500/20">
                            Guaranteed
                        </div>
                    </div>
                </div>

                {/* Quick Links */}
                <div className="space-y-6">
                    <h4 className="font-bold text-lg">{dict.nav.process}</h4>
                    <ul className="space-y-3 text-sm text-white/60">
                        <li><Link href={`/${lang}/services`} className="hover:text-white transition-colors flex items-center gap-2"><ArrowRight className="h-3 w-3" /> {dict.services.title}</Link></li>
                        <li><Link href={`/${lang}/results`} className="hover:text-white transition-colors flex items-center gap-2"><ArrowRight className="h-3 w-3" /> {dict.nav.results}</Link></li>
                        <li><Link href={`/${lang}/contact`} className="hover:text-white transition-colors flex items-center gap-2"><ArrowRight className="h-3 w-3" /> {dict.contact.title}</Link></li>
                    </ul>
                </div>

                {/* Contact */}
                <div className="space-y-6">
                    <h4 className="font-bold text-lg">{dict.nav.contact}</h4>
                    <Link
                        href={`https://wa.me/${siteConfig.whatsappNumber}?text=${encodeURIComponent(dict.common.whatsappMessage)}`}
                        className="flex items-center gap-3 p-4 bg-green-600 hover:bg-green-700 transition-colors rounded-xl text-white group"
                        target="_blank"
                    >
                        <MessageCircle className="h-8 w-8" />
                        <div className="flex flex-col">
                            <span className="text-xs font-medium opacity-90">{dict.common.whatsappAction}</span>
                            <span className="font-bold text-lg tracking-wide">{siteConfig.whatsappDisplay}</span>
                        </div>
                    </Link>
                    <p className="text-sm text-white/50 text-center">
                        {siteConfig.location}
                    </p>
                </div>
            </div>

            {/* Legal & Copyright */}
            <div className="container mx-auto px-4 border-t border-white/5 pt-10 mt-10 space-y-8">
                {/* Legal Warning Box */}
                <div className="bg-white/5 border border-white/5 rounded-2xl p-6 md:p-8 text-center md:text-left flex flex-col md:flex-row gap-6 items-center">
                    <div className="h-12 w-12 shrink-0 rounded-full bg-amber-500/10 flex items-center justify-center text-amber-500">
                        <span className="text-2xl font-bold">!</span>
                    </div>
                    <div className="space-y-2">
                        <h5 className="font-bold text-amber-500 text-sm uppercase tracking-wider">{dict.footer.legalTitle}</h5>
                        <p className="text-xs md:text-sm text-white/60 leading-relaxed max-w-4xl">
                            {dict.footer.legalText}
                        </p>
                    </div>
                </div>

                <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-white/40">
                    <p>{dict.common.copyright}</p>
                    <div className="flex gap-6">
                        <Link href={`/${lang}/privacy`} className="hover:text-white transition-colors">{dict.footer.kvkk}</Link>
                    </div>
                </div>
            </div>
        </footer>
    )
}
