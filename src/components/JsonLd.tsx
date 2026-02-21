import { siteConfig } from "@/lib/siteConfig";

export const JsonLd = ({ lang }: { lang: string }) => {
    const schema = {
        "@context": "https://schema.org",
        "@type": "MedicalOrganization",
        "name": siteConfig.brandName,
        "url": `${siteConfig.url}/${lang}`,
        "contactPoint": {
            "@type": "ContactPoint",
            "telephone": siteConfig.whatsappDisplay,
            "contactType": "customer service",
            "availableLanguage": ["Turkish", "English", "Arabic"]
        },
        "address": {
            "@type": "PostalAddress",
            "addressLocality": "Istanbul",
            "addressCountry": "TR"
        },
        "sameAs": [
            siteConfig.instagramUrl
        ],
        "priceRange": "$$$",
        "medicalSpecialty": [
            "https://schema.org/PlasticSurgery",
            "https://schema.org/Dermatology"
        ]
    };

    return (
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
    );
};
