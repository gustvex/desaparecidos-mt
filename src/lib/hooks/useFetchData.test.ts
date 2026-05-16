import { describe, it, expect, vi } from "vitest";
import { renderHook, act } from "@testing-library/react";
import { useFetchData } from "./useFetchData";

describe("useFetchData", () => {
    it("starts with loading=false and data=null when no initial args are given", () => {
        const fetchFn = vi.fn();
        const { result } = renderHook(() => useFetchData(fetchFn));

        expect(result.current.loading).toBe(false);
        expect(result.current.data).toBeNull();
        expect(result.current.error).toBeNull();
    });

    it("sets data on successful fetch", async () => {
        const mockData = { id: 1, nome: "Maria" };
        const fetchFn = vi.fn().mockResolvedValue(mockData);

        const { result } = renderHook(() => useFetchData(fetchFn));

        await act(async () => {
            await result.current.fetchData();
        });

        expect(result.current.data).toEqual(mockData);
        expect(result.current.loading).toBe(false);
        expect(result.current.error).toBeNull();
    });

    it("sets error message when fetch throws", async () => {
        const fetchFn = vi.fn().mockRejectedValue(new Error("Falha na API"));

        const { result } = renderHook(() => useFetchData(fetchFn));

        await act(async () => {
            await result.current.fetchData();
        });

        expect(result.current.error).toBe("Falha na API");
        expect(result.current.data).toBeNull();
        expect(result.current.loading).toBe(false);
    });

    it("sets loading=true while fetching and false after", async () => {
        let resolvePromise!: (value: unknown) => void;
        const fetchFn = vi.fn(() => new Promise((resolve) => { resolvePromise = resolve; }));

        const { result } = renderHook(() => useFetchData(fetchFn));

        act(() => { result.current.fetchData(); });
        expect(result.current.loading).toBe(true);

        await act(async () => { resolvePromise({ id: 1 }); });
        expect(result.current.loading).toBe(false);
    });
});
