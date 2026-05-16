import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const formatDate = (dateInput?: string | Date) => {
  if (!dateInput) return "Não informada";
  try {
    let date: Date;
    if (typeof dateInput === 'string') {
      // "yyyy-MM-dd" strings are parsed as UTC by new Date(), shifting the day in negative-offset timezones.
      // Splitting and constructing manually ensures local timezone is used.
      const parts = dateInput.split("T")[0].split("-").map(Number);
      date = parts.length === 3 ? new Date(parts[0], parts[1] - 1, parts[2]) : new Date(dateInput);
    } else {
      date = dateInput;
    }
    return date.toLocaleDateString("pt-BR");
  } catch {
    return "Data inválida";
  }
};

export const getFieldValue = (value: string | undefined | null, defaultValue: string) => {
  if (value === undefined || value === null || value === '') {
    return defaultValue;
  }
  return value;
};

const LOWERCASE_WORDS = new Set(["de", "da", "do", "das", "dos", "e", "a", "o", "em", "no", "na"]);

export const toTitleCase = (text?: string | null): string => {
  if (!text?.trim()) return "";
  return text
    .toLowerCase()
    .split(" ")
    .map((word, i) => (i === 0 || !LOWERCASE_WORDS.has(word)) ? word.replace(/^\w/, c => c.toUpperCase()) : word)
    .join(" ");
};

export const toSecureUrl = (url?: string): string | undefined => {
  if (!url) return undefined;
  return url.replace(/^http:\/\//i, "https://");
};

export const calculateDaysMissing = (dtDesaparecimento?: string): number | null => {
  if (!dtDesaparecimento) return null;
  const disappearanceDate = new Date(dtDesaparecimento);
  const today = new Date();
  const diffMs = Math.abs(today.getTime() - disappearanceDate.getTime());
  return Math.ceil(diffMs / (1000 * 60 * 60 * 24));
};
