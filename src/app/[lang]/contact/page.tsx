import { Navbar } from "@/components/Navbar"
import { Footer } from "@/components/Footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { siteConfig } from "@/lib/siteConfig"
import { Mail, MapPin, MessageCircle, Phone } from "lucide-react"
import { tr, en, ar, de } from "@/lib/dictionary"
import { ContactForm } from "@/components/ContactForm";

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
        title: dict.meta.contact.title,
        description: dict.meta.contact.description,
        alternates: {
            canonical: `/${lang}/contact`,
            languages: {
                'en': '/en/contact',
                'tr': '/tr/contact',
                'ar': '/ar/contact',
                'de': '/de/contact',
            },
        },
    };
}

export default async function ContactPage({ params }: { params: Promise<{ lang: string }> }) {
    const { lang } = await params;
    const dict = await getDictionary(lang);
    const isRtl = lang === "ar";

    return (
        <div className={`flex min-h-screen flex-col ${isRtl ? "rtl" : "ltr"}`}>
            <Navbar lang={lang} dict={dict} />
            <main className="flex-1 pt-24 pb-12">
                <div className="container px-4">
                    <div className="max-w-xl mx-auto text-center mb-12">
                        <h1 className="text-4xl font-bold mb-4">{dict.contact.title}</h1>
                        <p className="text-muted-foreground text-lg">
                            {dict.services.subtitle}
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 gap-12 max-w-5xl mx-auto">
                        {/* Contact Info */}
                        <div className="space-y-8">
                            <Card>
                                <CardContent className="p-6 flex items-start space-x-4">
                                    <div className="p-3 bg-primary/10 rounded-full text-primary">
                                        <Phone className="h-6 w-6" />
                                    </div>
                                    <div>
                                        <h3 className="font-bold">WhatsApp & Phone</h3>
                                        <p className="text-muted-foreground">{siteConfig.whatsappDisplay}</p>
                                        <a href={`https://wa.me/${siteConfig.whatsappNumber}`} className="text-primary text-sm hover:underline mt-1 block">
                                            Chat Now
                                        </a>
                                    </div>
                                </CardContent>
                            </Card>

                            <Card>
                                <CardContent className="p-6 flex items-start space-x-4">
                                    <div className="p-3 bg-primary/10 rounded-full text-primary">
                                        <Mail className="h-6 w-6" />
                                    </div>
                                    <div>
                                        <h3 className="font-bold">E-mail</h3>
                                        <p className="text-muted-foreground">{siteConfig.email}</p>
                                    </div>
                                </CardContent>
                            </Card>

                            <Card>
                                <CardContent className="p-6 flex items-start space-x-4">
                                    <div className="p-3 bg-primary/10 rounded-full text-primary">
                                        <MapPin className="h-6 w-6" />
                                    </div>
                                    <div>
                                        <h3 className="font-bold">Location</h3>
                                        <p className="text-muted-foreground">{siteConfig.location}</p>
                                    </div>
                                </CardContent>
                            </Card>
                        </div>

                        {/* Contact Form */}
                        <Card className="p-6">
                            <h3 className="font-bold text-xl mb-6">{dict.contact.title}</h3>
                            <ContactForm dict={dict.contact.form} className="space-y-4" />
                        </Card>
                    </div>
                </div>
            </main>
            <Footer lang={lang} dict={dict} />
        </div>
    )
}
