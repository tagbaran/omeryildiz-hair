import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const locales = ["tr", "en", "ar", "de"];
const defaultLocale = "tr";

function getLocale(request: NextRequest): string {
    // Simple fallback without external heavy libraries
    const acceptLanguage = request.headers.get("accept-language") || "";

    // Very basic check to avoid negotiator complexity causing hangs
    if (acceptLanguage.includes("tr")) return "tr";
    if (acceptLanguage.includes("de")) return "de";
    if (acceptLanguage.includes("ar")) return "ar";
    if (acceptLanguage.includes("en")) return "en";

    return defaultLocale;
}

export function middleware(request: NextRequest) {
    const pathname = request.nextUrl.pathname;

    // Safety net: skip any request that looks like a static file (has a file extension)
    if (/\.\w{2,5}$/.test(pathname)) {
        return NextResponse.next();
    }

    // Check if there is any supported locale in the pathname
    const pathnameIsMissingLocale = locales.every(
        (locale) => !pathname.startsWith(`/${locale}/`) && pathname !== `/${locale}`
    );

    if (pathnameIsMissingLocale) {
        const locale = getLocale(request);

        // Redirect to the locale path
        return NextResponse.redirect(
            new URL(`/${locale}${pathname === "/" ? "" : pathname}`, request.url)
        );
    }
}

export const config = {
    matcher: [
        // Skip: _next internals, api routes, known root files, and any path with a file extension
        "/((?!api|_next/static|_next/image|favicon\\.ico|robots\\.txt|sitemap\\.xml|.*\\..+$).*)",
    ],
};
