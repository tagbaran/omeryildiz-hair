
import { knowledgeBase, KnowledgeItem, fallbackAnswers } from "@/lib/knowledgeBase";

export interface ChatResponse {
    text: string;
    isFallback: boolean;
    relatedId?: string;
}

// Simple normalization: remove punctuation, lowercase
// Turkish-aware lowercase is better: .toLocaleLowerCase('tr')
export function normalizeText(text: string): string {
    return text
        .toLocaleLowerCase('tr') // Handle I/ı correctly
        .replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g, "") // Remove punctuation
        .trim();
}

// Simple Levenshtein distance for fuzzy matching (optional usage)
function levenshtein(a: string, b: string): number {
    const matrix = [];
    for (let i = 0; i <= b.length; i++) matrix[i] = [i];
    for (let j = 0; j <= a.length; j++) matrix[0][j] = j;

    for (let i = 1; i <= b.length; i++) {
        for (let j = 1; j <= a.length; j++) {
            if (b.charAt(i - 1) === a.charAt(j - 1)) {
                matrix[i][j] = matrix[i - 1][j - 1];
            } else {
                matrix[i][j] = Math.min(
                    matrix[i - 1][j - 1] + 1,
                    matrix[i][j - 1] + 1,
                    matrix[i - 1][j] + 1
                );
            }
        }
    }
    return matrix[b.length][a.length];
}

export function detectLanguage(text: string, currentLang: string): "tr" | "en" | "ar" {
    const arabicPattern = /[\u0600-\u06FF]/;
    if (arabicPattern.test(text)) return "ar";

    const turkishPattern = /[ğüşöçıİĞÜŞÖÇ]/;
    if (turkishPattern.test(text)) return "tr";

    return currentLang as "tr" | "en" | "ar";
}

export function findBestMatch(query: string, lang: "tr" | "en" | "ar"): ChatResponse {
    const normalizedQuery = normalizeText(query);

    // Safety check for very short queries
    if (normalizedQuery.length < 2) {
        return { text: fallbackAnswers[lang], isFallback: true };
    }

    let bestMatch: KnowledgeItem | null = null;
    let maxScore = 0;

    knowledgeBase.forEach((item) => {
        let score = 0;

        // 1. Tag matching with Word Boundaries (avoids 'acı' matching 'ilacı')
        item.tags.forEach(tag => {
            const normalizedTag = normalizeText(tag);
            // Create regex for whole word match
            // Escape special regex chars in tag just in case
            const escapedTag = normalizedTag.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
            const regex = new RegExp(`\\b${escapedTag}\\b`, 'i');

            if (regex.test(normalizedQuery)) {
                score += 5; // Direct keyword match is strong
            } else {
                // Fuzzy match for tags (typo tolerance) if tag is long enough
                if (normalizedTag.length > 4) {
                    const words = normalizedQuery.split(/\s+/);
                    words.forEach(word => {
                        if (levenshtein(word, normalizedTag) <= 1) {
                            score += 4;
                        }
                    });
                }
            }
        });

        // 2. Pattern matching
        item.patterns.forEach(pattern => {
            const normPattern = normalizeText(pattern);

            // Exact full match
            if (normalizedQuery === normPattern) {
                score += 20;
            }
            // Contains exact question
            else if (normalizedQuery.includes(normPattern)) {
                score += 15;
            }
            // Reverse containment (query is longer but contains pattern)
            else if (normPattern.includes(normalizedQuery) && normalizedQuery.length > 5) {
                score += 10;
            }
        });

        if (score > maxScore) {
            maxScore = score;
            bestMatch = item;
        }
    });

    // Threshold (Higher threshold to avoid random answers)
    // If we have a keyword match (5 pts), that should be enough.
    if (bestMatch && maxScore >= 5) {
        return {
            text: (bestMatch as KnowledgeItem).answers[lang],
            isFallback: false,
            relatedId: (bestMatch as KnowledgeItem).id
        };
    }

    return {
        text: fallbackAnswers[lang],
        isFallback: true
    };
}
