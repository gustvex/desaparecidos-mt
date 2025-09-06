import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const formatDate = (dateInput?: string | Date) => {
  if (!dateInput) return "Não informada";
  try {
    const date = typeof dateInput === 'string' ? new Date(dateInput) : dateInput;
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
