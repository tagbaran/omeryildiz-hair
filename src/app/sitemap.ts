import { MetadataRoute } from 'next'
import { siteConfig } from '@/lib/siteConfig'

export default function sitemap(): MetadataRoute.Sitemap {
    const languages = ['tr', 'en', 'ar']
    const routes = ['', '/services', '/results', '/contact']
    const baseUrl = siteConfig.url

    const sitemapEntry: MetadataRoute.Sitemap = []

    languages.forEach((lang) => {
        routes.forEach((route) => {
            sitemapEntry.push({
                url: `${baseUrl}/${lang}${route}`,
                lastModified: new Date(),
                changeFrequency: 'weekly',
                priority: route === '' ? 1 : 0.8,
            })
        })
    })

    return sitemapEntry
}
