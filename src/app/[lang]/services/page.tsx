import { Navbar } from "@/components/Navbar"
import { Footer } from "@/components/Footer"
import { Button } from "@/components/ui/button"
import { CheckCircle2, MessageCircle } from "lucide-react"
import Link from "next/link"
import { siteConfig } from "@/lib/siteConfig"
import { tr, en, ar, de } from "@/lib/dictionary"

import { Metadata } from "next";

async function getDictionary(lang: string) {
    if (lang === "en") return en;
    if (lang === "ar") return ar;
    if (lang === "de") return de;
    return tr;
}

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
    const { lang } = await params;
    const dict = await getDictionary(lang);

    return {
        title: dict.meta.services.title,
        description: dict.meta.services.description,
        alternates: {
            canonical: `/${lang}/services`,
            languages: {
                'en': '/en/services',
                'tr': '/tr/services',
                'ar': '/ar/services',
                'de': '/de/services',
            },
        },
    };
}

export default async function ServicesPage({ params }: { params: Promise<{ lang: string }> }) {
    const { lang } = await params;
    const dict = await getDictionary(lang);
    const isRtl = lang === "ar";

    return (
        <div className={`flex min-h-screen flex-col ${isRtl ? "rtl" : "ltr"}`}>
            <Navbar lang={lang} dict={dict} />
            <main className="flex-1 pt-24 pb-12">
                <div className="container px-4">
                    <div className="max-w-3xl mx-auto text-center mb-16">
                        <h1 className="text-4xl font-bold mb-4">{dict.services.title}</h1>
                        <p className="text-muted-foreground text-lg">
                            {dict.services.subtitle}
                        </p>
                    </div>

                    <div className="space-y-12">
                        {dict.services.items.map((service, index) => (
                            <section key={index} className="grid md:grid-cols-2 gap-8 items-center bg-card p-6 rounded-[2rem] border hover:border-primary/20 transition-all">
                                <div className={`${index % 2 === 1 ? "md:order-2" : "md:order-1"} space-y-4`}>
                                    <div className="inline-block rounded-lg bg-primary/10 px-3 py-1 text-sm text-primary font-medium">
                                        0{index + 1}. Step
                                    </div>
                                    <h2 className="text-3xl font-bold">{service.title}</h2>
                                    <p className="text-muted-foreground leading-relaxed">
                                        {service.desc}
                                    </p>
                                    <ul className="space-y-2">
                                        {[1, 2, 3].map(item => (
                                            <li key={item} className="flex items-center gap-2 text-sm font-medium">
                                                <CheckCircle2 className="h-4 w-4 text-primary" /> Premium Feature {item}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                                <div className={`${index % 2 === 1 ? "md:order-1" : "md:order-2"} bg-secondary/50 rounded-3xl aspect-video md:aspect-square flex items-center justify-center`}>
                                    <span className="text-muted-foreground font-medium">Image Placeholder</span>
                                </div>
                            </section>
                        ))}
                    </div>

                    <div className="mt-24 text-center">
                        <h3 className="text-2xl font-bold mb-6">{dict.common.getOfferBtn}</h3>
                        <Button size="lg" className="rounded-full px-8 gap-2" asChild>
                            <Link href={`https://wa.me/${siteConfig.whatsappNumber}`} target="_blank">
                                <MessageCircle className="h-5 w-5" />
                                {dict.common.whatsappBtn}
                            </Link>
                        </Button>
                    </div>
                </div>
            </main>
            <Footer lang={lang} dict={dict} />
        </div>
    )
}
