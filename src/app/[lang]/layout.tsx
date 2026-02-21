import { siteConfig } from "@/lib/siteConfig";
import { JsonLd } from "@/components/JsonLd";
import { ChatWidget } from "@/components/chat/ChatWidget";
import { FloatingWhatsApp } from "@/components/FloatingWhatsApp";
import { MobileActionButtons } from "@/components/MobileActionButtons";
import { tr, en, ar, de } from "@/lib/dictionary";

export const metadata = {
    title: {
        default: siteConfig.brandName,
        template: `%s | ${siteConfig.brandName}`,
    },
    description: siteConfig.tagline,
};

export async function generateStaticParams() {
    return [{ lang: "tr" }, { lang: "en" }, { lang: "ar" }, { lang: "de" }];
}

export default async function LangLayout({
    children,
    params,
}: {
    children: React.ReactNode;
    params: Promise<{ lang: string }>;
}) {
    const { lang } = await params;
    const dir = lang === "ar" ? "rtl" : "ltr";

    // Choose dictionary for mobile buttons (simple fallback logic)
    const dict = lang === 'en' ? en : (lang === 'ar' ? ar : (lang === 'de' ? de : tr));

    return (
        <div dir={dir} className="min-h-screen flex flex-col">
            <JsonLd lang={lang} />
            {children}
            <ChatWidget lang={lang} />
            <FloatingWhatsApp lang={lang} text={dict.common.whatsappMessage} />
            <MobileActionButtons lang={lang} dict={dict} />
        </div>
    );
}
