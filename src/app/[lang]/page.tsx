import Link from "next/link";
import Image from "next/image";
import { ArrowRight, CheckCircle2, Instagram, MessageCircle, Play, ShieldCheck, Star, Clock, MapPin, FileText } from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { siteConfig } from "@/lib/siteConfig";
import { tr, en, ar, de } from "@/lib/dictionary";
import { ContactForm } from "@/components/ContactForm";
import { OpenChatButton } from "@/components/chat/OpenChatButton";

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
    title: dict.meta.home.title,
    description: dict.meta.home.description,
    keywords: dict.meta.home.keywords,
    alternates: {
      canonical: `/${lang}`,
      languages: {
        'en': '/en',
        'tr': '/tr',
        'ar': '/ar',
        'de': '/de',
      },
    },
    openGraph: {
      title: dict.meta.home.title,
      description: dict.meta.home.description,
      url: `https://omeryildiz.com/${lang}`,
      siteName: siteConfig.brandName,
      locale: lang,
      type: 'website',
    },
  };
}

export default async function Home({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  const dict = await getDictionary(lang);
  const isRtl = lang === "ar";

  return (
    <div className={`flex min-h-screen flex-col ${isRtl ? "rtl" : "ltr"}`}>
      <Navbar lang={lang} dict={dict} />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative w-full bg-[#0B1220] overflow-hidden">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center py-20 lg:py-28">

              {/* LEFT — Text */}
              <div className="max-w-[640px] space-y-8 text-left z-10">
                <div className="inline-flex items-center rounded-full border border-blue-400/20 bg-blue-400/5 px-4 py-1.5 text-xs font-semibold tracking-wider uppercase text-blue-400 backdrop-blur-sm w-fit transition-all hover:bg-blue-400/10">
                  <Star className="mr-2 h-3.5 w-3.5 fill-blue-400" />
                  {dict.hero.badge}
                </div>

                <div className="space-y-6">
                  <h1 className="flex flex-col text-4xl md:text-6xl lg:text-[72px] font-black leading-[1.05] tracking-tighter text-white">
                    <span className="opacity-90">{dict.hero.title}</span>
                    <span className="text-[#4EA1FF] whitespace-nowrap">{dict.hero.titleHighlight}</span>
                    <span className="text-3xl md:text-5xl lg:text-[56px] opacity-80 mt-1">{dict.hero.titleLine3}</span>
                  </h1>

                  <p className="text-base md:text-lg text-slate-300/70 leading-relaxed font-light max-w-xl">
                    {dict.hero.description}
                  </p>
                </div>

                <div className="flex flex-col sm:flex-row gap-4 pt-2">
                  <Button size="lg" className="h-12 md:h-14 rounded-xl px-8 text-sm md:text-base gap-2 bg-blue-500 hover:bg-blue-600 text-white border-0 font-bold shadow-2xl shadow-blue-500/20 transition-all hover:scale-105 active:scale-95" asChild>
                    <Link href={`https://wa.me/${siteConfig.whatsappNumber}?text=${encodeURIComponent(dict.common.whatsappMessage)}`} target="_blank">
                      <MessageCircle className="h-5 w-5 fill-current" />
                      {dict.common.whatsappBtn}
                    </Link>
                  </Button>
                  <Button variant="outline" size="lg" className="h-12 md:h-14 rounded-xl px-8 text-sm md:text-base border-white/20 bg-white/5 text-white hover:bg-white/10 backdrop-blur-md font-semibold transition-all hover:border-white/40" asChild>
                    <Link href={`/${lang}/services`}>
                      {dict.common.getOfferBtn}
                    </Link>
                  </Button>
                </div>

                <div className="flex flex-wrap gap-x-8 gap-y-4 pt-4 border-t border-white/5">
                  <div className="flex items-center text-slate-400 text-xs font-medium uppercase tracking-widest opacity-60">
                    <ShieldCheck className="h-4 w-4 text-blue-400/50 mr-2" />
                    {dict.hero.microTrust.kvkk}
                  </div>
                  <div className="flex items-center text-slate-400 text-xs font-medium uppercase tracking-widest opacity-60">
                    <Clock className="h-4 w-4 text-blue-400/50 mr-2" />
                    {dict.hero.microTrust.fastReturn}
                  </div>
                  <div className="flex items-center text-slate-400 text-xs font-medium uppercase tracking-widest opacity-60">
                    <MapPin className="h-4 w-4 text-blue-400/50 mr-2" />
                    {dict.hero.microTrust.location}
                  </div>
                </div>
              </div>

              {/* RIGHT — Visual */}
              <div className="relative w-full min-h-[520px] lg:min-h-[640px] overflow-hidden -mx-6 lg:mx-0">
                <Image
                  src="/omer.png"
                  alt="Ömer Yıldız"
                  fill
                  priority
                  className="object-cover object-center brightness-[1.02] contrast-[1.02]"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-[#0B1220] via-[#0B1220]/60 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-[#0B1220] to-transparent" />
              </div>

            </div>
          </div>
        </section>

        {/* 3-Step Process */}
        <section className="py-32 bg-secondary/10">
          <div className="container px-4">
            <h2 className="text-4xl md:text-5xl font-bold text-center mb-20 tracking-tight">{dict.process.title}</h2>
            <div className="grid md:grid-cols-3 gap-10">
              {dict.process.steps.map((step: any, i: number) => (
                <div key={i} className="relative group p-10 rounded-[2.5rem] bg-background border border-border/50 hover:border-primary/20 hover:shadow-2xl transition-all duration-500">
                  <div className="absolute -top-8 left-10 h-16 w-16 rounded-2xl bg-gradient-to-tr from-primary to-blue-600 text-white flex items-center justify-center text-2xl font-bold shadow-xl group-hover:-translate-y-2 transition-transform">
                    {i + 1}
                  </div>
                  <h3 className="text-2xl font-bold mt-8 mb-4">{step.title}</h3>
                  <p className="text-muted-foreground leading-relaxed text-lg">{step.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Services Preview */}
        <section className="py-32">
          <div className="container px-4">
            <div className="flex justify-between items-end mb-16">
              <div className="space-y-4">
                <h2 className="text-4xl md:text-5xl font-bold tracking-tight">{dict.services.title}</h2>
                <p className="text-xl text-muted-foreground max-w-2xl">{dict.services.subtitle}</p>
              </div>
              <Link href={`/${lang}/services`} className="hidden md:flex items-center text-primary font-bold hover:underline text-lg">
                {dict.services.viewAll} <ArrowRight className={`h-5 w-5 ${isRtl ? "rotate-180 mr-2" : "ml-2"}`} />
              </Link>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {dict.services.items.map((service: any, i: number) => (
                <Card key={i} className="group overflow-hidden border-0 bg-secondary/30 hover:bg-secondary/60 transition-all duration-300">
                  <CardContent className="p-10 space-y-6">
                    <div className="h-14 w-14 rounded-2xl bg-white dark:bg-black/20 flex items-center justify-center shadow-sm group-hover:scale-110 transition-transform duration-500">
                      <CheckCircle2 className="h-7 w-7 text-primary" />
                    </div>
                    <h3 className="text-2xl font-bold">{service.title}</h3>
                    <p className="text-muted-foreground text-base leading-relaxed">{service.desc}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Decision Helper CTA */}
        <section className="py-24 bg-gradient-to-r from-blue-50/80 to-indigo-50/80 dark:from-blue-950/30 dark:to-indigo-950/30 border-y border-primary/5 relative overflow-hidden">
          <div className="container px-4 relative z-10 text-center space-y-8">
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-foreground">
              {dict.decisionCTA.title}
            </h2>
            <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto font-medium leading-relaxed">
              {dict.decisionCTA.subtitle}
            </p>
            <Button size="lg" className="h-16 rounded-full px-10 text-lg gap-3 shadow-xl shadow-primary/20 hover:scale-105 transition-transform duration-300 animate-in zoom-in-50" asChild>
              <Link href={`https://wa.me/${siteConfig.whatsappNumber}?text=${encodeURIComponent(dict.common.whatsappMessage)}`} target="_blank">
                <MessageCircle className="h-6 w-6" />
                {dict.decisionCTA.btn}
              </Link>
            </Button>
          </div>
          {/* Subtle background decoration */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/5 rounded-full blur-3xl -z-0 pointer-events-none" />
        </section>

        {/* Video / Instagram Teaser */}
        <section className="py-32 bg-black text-white overflow-hidden relative">
          <div className="absolute inset-0 bg-gradient-to-tr from-blue-900/30 to-purple-900/30 opacity-40" />
          <div className="container px-4 relative z-10 text-center">
            <Instagram className="h-16 w-16 mx-auto mb-8 text-white/90" />
            <h2 className="text-4xl md:text-6xl font-black mb-8 tracking-tight">{dict.videoSection.title}</h2>
            <p className="text-white/70 max-w-2xl mx-auto mb-12 text-xl font-light">
              {dict.videoSection.desc}
            </p>
            <Button variant="secondary" size="lg" className="h-14 rounded-full px-10 text-lg hover:scale-105 transition-transform" asChild>
              <Link href={siteConfig.instagramUrl} target="_blank">
                <Play className="mr-3 h-5 w-5 fill-current" />
                {dict.common.viewOnInstagram}
              </Link>
            </Button>

            {/* Instagram Embed/Cards */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-20">
              {[
                { thumb: "bg-gradient-to-br from-purple-500 to-indigo-500" },
                { thumb: "bg-gradient-to-br from-pink-500 to-rose-500" },
                { thumb: "bg-gradient-to-br from-amber-500 to-orange-500" },
                { thumb: "bg-gradient-to-br from-teal-500 to-emerald-500" }
              ].map((item, n) => (
                <a
                  key={n}
                  href={siteConfig.instagramUrl}
                  target="_blank"
                  className="aspect-[9/16] rounded-3xl bg-neutral-900 border border-white/10 relative overflow-hidden group hover:border-white/30 transition-all duration-300 transform hover:-translate-y-2"
                >
                  <div className={`absolute inset-0 opacity-40 group-hover:opacity-60 transition-opacity ${item.thumb}`} />
                  <div className="absolute inset-0 flex flex-col items-center justify-center p-4">
                    <div className="h-12 w-12 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                      <Play className="h-6 w-6 text-white fill-white" />
                    </div>
                    <span className="text-xs font-bold uppercase tracking-wider opacity-0 group-hover:opacity-100 transition-opacity">Watch Reel</span>
                  </div>
                </a>
              ))}
            </div>
          </div>
        </section>

        {/* Contact Form Section */}
        <section id="contact" className="py-32 bg-secondary/20">
          <div className="container px-4 max-w-xl mx-auto">
            <h2 className="text-4xl font-bold text-center mb-10">{dict.contact.title}</h2>
            <Card className="border-0 shadow-2xl overflow-hidden rounded-[2rem]">
              <CardContent className="p-10 space-y-6">
                <ContactForm dict={dict.contact.form} />
              </CardContent>
            </Card>
          </div>
        </section>

        {/* FAQ */}
        <section className="py-32">
          <div className="container px-4 max-w-4xl mx-auto">
            <h2 className="text-4xl font-bold text-center mb-16">{dict.faq.title}</h2>
            <div className="space-y-4">
              {dict.faq.items.map((faq: any, i: number) => (
                <details key={i} className="group border rounded-2xl p-6 [&_summary::-webkit-details-marker]:hidden bg-card hover:bg-secondary/20 transition-colors">
                  <summary className="flex cursor-pointer items-center justify-between text-lg font-semibold outline-none select-none">
                    {faq.q}
                    <span className="ml-4 shrink-0 transition-transform duration-300 group-open:rotate-180">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-muted-foreground" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" /></svg>
                    </span>
                  </summary>
                  <div className="mt-4 text-muted-foreground leading-relaxed text-base border-t pt-4">
                    {faq.a}
                  </div>
                </details>
              ))}
            </div>

            {/* FAQ Chatbot Redirect */}
            <div className="mt-12 text-center bg-secondary/30 rounded-3xl p-8 border border-primary/5">
              <h3 className="font-bold text-xl mb-2">{dict.faq.redirect.title}</h3>
              <p className="text-muted-foreground mb-6">{dict.faq.redirect.subtitle}</p>
              <OpenChatButton text={dict.faq.redirect.btn} />
            </div>
          </div>
        </section>
      </main>

      <Footer dict={dict} lang={lang} />

      {/* Floating WhatsApp */}

    </div>
  )
}
