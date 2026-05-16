import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import type { SearchFilters } from "@/types";
import { fetchPessoas, PAGE_SIZE } from "@/services/api";
import MissingListManager from "@/components/missing/MissingListManager";
import PersonCard from "@/components/missing/PersonCard";
import PersonCardSkeleton from "@/components/missing/PersonCardSkeleton";
import EmptyState from "@/components/shared/EmptyState";

const PREFETCH_AHEAD = 2;

const parseFilters = (searchParams: URLSearchParams): SearchFilters => {
    const filters: SearchFilters = {};
    if (searchParams.get("nome")) filters.nome = searchParams.get("nome")!;
    if (searchParams.get("status")) filters.status = searchParams.get("status") as SearchFilters["status"];
    if (searchParams.get("sexo")) filters.sexo = searchParams.get("sexo") as SearchFilters["sexo"];
    if (searchParams.get("faixaIdadeInicial")) filters.faixaIdadeInicial = parseInt(searchParams.get("faixaIdadeInicial")!);
    if (searchParams.get("faixaIdadeFinal")) filters.faixaIdadeFinal = parseInt(searchParams.get("faixaIdadeFinal")!);
    return filters;
};

const MissingList = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const queryClient = useQueryClient();
    const filters = parseFilters(searchParams);
    const apiPage = parseInt(searchParams.get("pagina") || "0");

    const { data, isLoading, isError } = useQuery({
        queryKey: ["pessoas", filters, apiPage],
        queryFn: () => fetchPessoas(filters, apiPage),
    });

    const totalPages = data?.totalPages ?? 0;
    const filtersKey = JSON.stringify(filters);

    useEffect(() => {
        if (!data || isError) return;

        for (let offset = 1; offset <= PREFETCH_AHEAD; offset++) {
            const nextPage = apiPage + offset;
            if (nextPage >= totalPages) break;

            queryClient.prefetchQuery({
                queryKey: ["pessoas", filters, nextPage],
                queryFn: () => fetchPessoas(filters, nextPage),
            });
        }
    }, [data, isError, apiPage, totalPages, filtersKey, queryClient, filters]);

    const handleSearch = (newFilters: SearchFilters) => {
        const newParams = new URLSearchParams();
        if (newFilters.nome) newParams.set("nome", newFilters.nome);
        if (newFilters.status) newParams.set("status", newFilters.status);
        if (newFilters.sexo) newParams.set("sexo", newFilters.sexo);
        if (newFilters.faixaIdadeInicial) newParams.set("faixaIdadeInicial", newFilters.faixaIdadeInicial.toString());
        if (newFilters.faixaIdadeFinal) newParams.set("faixaIdadeFinal", newFilters.faixaIdadeFinal.toString());
        setSearchParams(newParams);
    };

    const handlePageChange = (page: number) => {
        const newParams = new URLSearchParams(searchParams);
        newParams.set("pagina", (page - 1).toString());
        setSearchParams(newParams);
    };

    const totalRecords = data?.totalElements ?? 0;
    const currentPage = apiPage + 1;
    const hasResults = (data?.content?.length ?? 0) > 0;

    return (
        <div className="flex flex-col">
            <MissingListManager
                onSearch={handleSearch}
                loading={isLoading}
                error={isError ? "error" : null}
                totalRecords={totalRecords}
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={handlePageChange}
            />

            <main className="flex justify-center mt-4">
                {isLoading && (
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 px-2 md:px-4">
                        {Array.from({ length: PAGE_SIZE }).map((_, i) => (
                            <PersonCardSkeleton key={i} />
                        ))}
                    </div>
                )}

                {!isLoading && !isError && hasResults && (
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 px-2 md:px-4">
                        {data!.content.map((person) => (
                            <PersonCard key={person.id} person={person} />
                        ))}
                    </div>
                )}

                {!isLoading && (isError || !hasResults) && (
                    <EmptyState description="Tente ajustar os filtros de busca ou consulte novamente mais tarde." />
                )}
            </main>
        </div>
    );
};

export default MissingList;
