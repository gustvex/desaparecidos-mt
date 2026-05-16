import { useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import { useQuery, keepPreviousData } from "@tanstack/react-query";
import type { ApiResponse, SearchFilters } from "@/types";
import { fetchPessoas } from "@/services/api";
import MissingListManager from "@/components/missing/MissingListManager";
import PersonCard from "@/components/missing/PersonCard";
import LoadingOverlay from "@/components/shared/LoadingOverlay";
import EmptyState from "@/components/shared/EmptyState";

const MissingListContainer = () => {
    const [searchParams, setSearchParams] = useSearchParams();

    const pagina = parseInt(searchParams.get("pagina") || "0");

    const filters = useMemo<SearchFilters>(() => {
        const f: SearchFilters = {};
        if (searchParams.get("nome")) f.nome = searchParams.get("nome")!;
        if (searchParams.get("status")) f.status = searchParams.get("status") as SearchFilters['status'];
        if (searchParams.get("sexo")) f.sexo = searchParams.get("sexo") as SearchFilters['sexo'];
        if (searchParams.get("faixaIdadeInicial")) f.faixaIdadeInicial = parseInt(searchParams.get("faixaIdadeInicial")!);
        if (searchParams.get("faixaIdadeFinal")) f.faixaIdadeFinal = parseInt(searchParams.get("faixaIdadeFinal")!);
        return f;
    }, [searchParams]);

    const { data: apiResponse, isLoading, isError } = useQuery<ApiResponse>({
        queryKey: ['pessoas', filters, pagina],
        queryFn: () => fetchPessoas(filters, pagina + 1),
        placeholderData: keepPreviousData,
    });

    const handleSearch = (newFilters: SearchFilters) => {
        const newParams = new URLSearchParams();
        if (newFilters.nome) newParams.set("nome", newFilters.nome);
        if (newFilters.status) newParams.set("status", newFilters.status);
        if (newFilters.faixaIdadeInicial) newParams.set("faixaIdadeInicial", newFilters.faixaIdadeInicial.toString());
        if (newFilters.faixaIdadeFinal) newParams.set("faixaIdadeFinal", newFilters.faixaIdadeFinal.toString());
        if (newFilters.sexo) newParams.set("sexo", newFilters.sexo);
        setSearchParams(newParams);
    };

    const handlePageChange = (page: number) => {
        const newParams = new URLSearchParams(searchParams);
        newParams.set("pagina", (page - 1).toString());
        setSearchParams(newParams);
    };

    return (
        <div className="flex flex-col">
            <MissingListManager
                onSearch={handleSearch}
                loading={isLoading}
                error={isError ? "Erro ao carregar dados" : null}
                totalRecords={apiResponse?.totalElements || 0}
                currentPage={(apiResponse?.number ?? 1)}
                totalPages={(apiResponse?.totalPages ?? 0) - 1}
                onPageChange={handlePageChange}
            />

            <main className="flex justify-center">
                {isLoading && <LoadingOverlay />}

                {!isLoading && !isError && (apiResponse?.content?.length || 0) > 0 && (
                    <div className="flex flex-wrap justify-center">
                        {apiResponse?.content.map((person) => (
                            <PersonCard key={person.id} person={person} />
                        ))}
                    </div>
                )}

                {!isLoading && isError && (
                    <EmptyState description="Tente ajustar os filtros de busca ou consulte novamente mais tarde." />
                )}
            </main>
        </div>
    );
};

export default MissingListContainer;
