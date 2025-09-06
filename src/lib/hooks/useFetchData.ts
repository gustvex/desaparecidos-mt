import { useState, useEffect, useCallback } from "react";

type FetchFunction<T, K extends unknown[]> = (...args: K) => Promise<T>;

interface FetchResult<T, K extends unknown[]> {
    data: T | null;
    loading: boolean;
    error: string | null;
    fetchData: (...args: K) => Promise<void>;
}

export function useFetchData<T, K extends unknown[]>(
    fetchFn: FetchFunction<T, K>,
    ...initialArgs: K
): FetchResult<T, K> {
    const [data, setData] = useState<T | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const fetchData = useCallback(
        async (...args: K) => {
            setLoading(true);
            setError(null);
            try {
                const result = await fetchFn(...args);
                setData(result);
            } catch (err) {
                setError(err instanceof Error ? err.message : "Erro desconhecido");
            } finally {
                setLoading(false);
            }
        },
        [fetchFn]
    );

    useEffect(() => {
        if (initialArgs.length > 0) {
            fetchData(...initialArgs);
        }
    }, [fetchData, ...initialArgs]);

    return { data, loading, error, fetchData };
}
