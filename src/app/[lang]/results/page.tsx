import { Navbar } from "@/components/Navbar"
import { Footer } from "@/components/Footer"
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
        title: dict.meta.results.title,
        description: dict.meta.results.description,
        alternates: {
            canonical: `/${lang}/results`,
            languages: {
                'en': '/en/results',
                'tr': '/tr/results',
                'ar': '/ar/results',
                'de': '/de/results',
            },
        },
    };
}

export default async function ResultsPage({ params }: { params: Promise<{ lang: string }> }) {
    const { lang } = await params;
    const dict = await getDictionary(lang);
    const isRtl = lang === "ar";

    return (
        <div className={`flex min-h-screen flex-col ${isRtl ? "rtl" : "ltr"}`}>
            <Navbar lang={lang} dict={dict} />
            <main className="flex-1 pt-24 pb-12">
                <div className="container px-4">
                    <div className="max-w-3xl mx-auto text-center mb-16">
                        <h1 className="text-4xl font-bold mb-4">{dict.nav.results}</h1>
                        <p className="text-muted-foreground text-lg">
                            {dict.videoSection.desc}
                        </p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-6">
                        {/* Generating placeholders */}
                        {Array.from({ length: 9 }).map((_, i) => (
                            <div key={i} className="group relative aspect-[4/5] overflow-hidden rounded-2xl bg-neutral-100 dark:bg-neutral-900 border">
                                <div className="absolute top-4 left-4 z-10 bg-black/50 backdrop-blur-sm text-white text-xs px-2 py-1 rounded">
                                    5000 Grafts / FUE
                                </div>
                                <div className="absolute inset-0 flex items-center justify-center text-muted-foreground">
                                    {/* Placeholder for Before/After Image */}
                                    <span className="font-medium">Result {i + 1}</span>
                                </div>
                                {/* Overlay details */}
                                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-6">
                                    <p className="text-white text-sm">
                                        6 Months Result <br />
                                        Patient Satisfaction: <span className="text-green-400">High</span>
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="mt-12 text-center text-sm text-muted-foreground">
                        <p>* {dict.common.legalWarning}</p>
                    </div>
                </div>
            </main>
            <Footer lang={lang} dict={dict} />
        </div>
    )
}
