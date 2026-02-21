import { Navbar } from "@/components/Navbar"
import { Footer } from "@/components/Footer"
import { tr, en, ar, de } from "@/lib/dictionary"

async function getDictionary(lang: string) {
    if (lang === "en") return en;
    if (lang === "ar") return ar;
    if (lang === "de") return de;
    return tr;
}

export default async function PrivacyPage({ params }: { params: Promise<{ lang: string }> }) {
    const { lang } = await params;
    const dict = await getDictionary(lang);
    const isRtl = lang === "ar";

    return (
        <div className={`flex min-h-screen flex-col ${isRtl ? "rtl" : "ltr"}`}>
            <Navbar lang={lang} dict={dict} />
            <main className="flex-1 pt-24 pb-12">
                <div className="container px-4 max-w-3xl mx-auto prose dark:prose-invert">
                    <h1>Privacy Policy / KVKK</h1>
                    <p>Last Updated: {new Date().toLocaleDateString()}</p>

                    <p>
                        {dict.common.legalWarning}
                    </p>

                    <h3>1. Data Controller</h3>
                    <p>
                        Ömer Yıldız and team act as data controllers for your information.
                    </p>

                    <h3>2. Purpose</h3>
                    <p>
                        Your data is used for Hair Transplant operation planning only.
                    </p>

                    <h3>3. Sharing</h3>
                    <p>
                        We do not share your data with third parties without consent.
                    </p>
                </div>
            </main>
            <Footer lang={lang} dict={dict} />
        </div>
    )
}
