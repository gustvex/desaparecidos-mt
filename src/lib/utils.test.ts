import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { formatDate, getFieldValue, calculateDaysMissing } from "./utils";

describe("formatDate", () => {
    it("returns 'Não informada' when value is undefined", () => {
        expect(formatDate(undefined)).toBe("Não informada");
    });

    it("returns 'Não informada' when value is empty string", () => {
        expect(formatDate("")).toBe("Não informada");
    });

    it("formats a valid ISO date string to pt-BR", () => {
        const result = formatDate("2024-03-20");
        expect(result).toBe("20/03/2024");
    });

    it("formats a Date object to pt-BR", () => {
        const date = new Date(2024, 2, 20); // month is 0-indexed
        const result = formatDate(date);
        expect(result).toBe("20/03/2024");
    });
});

describe("getFieldValue", () => {
    it("returns the value when it is a non-empty string", () => {
        expect(getFieldValue("João Silva", "Não informado")).toBe("João Silva");
    });

    it("returns the default when value is undefined", () => {
        expect(getFieldValue(undefined, "Não informado")).toBe("Não informado");
    });

    it("returns the default when value is null", () => {
        expect(getFieldValue(null, "Não informado")).toBe("Não informado");
    });

    it("returns the default when value is an empty string", () => {
        expect(getFieldValue("", "Não informado")).toBe("Não informado");
    });
});

describe("calculateDaysMissing", () => {
    beforeEach(() => {
        vi.useFakeTimers();
        vi.setSystemTime(new Date("2024-04-01"));
    });

    afterEach(() => {
        vi.useRealTimers();
    });

    it("returns null when date is undefined", () => {
        expect(calculateDaysMissing(undefined)).toBeNull();
    });

    it("returns 1 when disappeared yesterday", () => {
        expect(calculateDaysMissing("2024-03-31")).toBe(1);
    });

    it("returns 31 when disappeared 31 days ago", () => {
        expect(calculateDaysMissing("2024-03-01")).toBe(31);
    });

    it("returns a positive number even if date is in the future", () => {
        const result = calculateDaysMissing("2024-04-10");
        expect(result).toBeGreaterThan(0);
    });
});
