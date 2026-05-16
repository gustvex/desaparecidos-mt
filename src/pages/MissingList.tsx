import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import type { ApiResponse, SearchFilters } from "@/types";
import { fetchPessoas } from "@/services/api";
import MissingListManager from "@/components/missing/MissingListManager";
import PersonCard from "@/components/missing/PersonCard";
import PersonCardSkeleton from "@/components/missing/PersonCardSkeleton";
import { useFetchData } from "@/lib/hooks/useFetchData";
import EmptyState from "@/components/shared/EmptyState";

const SKELETON_COUNT = 10;

const MissingListContainer = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const [currentPage, setCurrentPage] = useState(1);
    const [filters, setFilters] = useState<SearchFilters>({});

    const {
        data: apiResponse,
        loading,
        error,
        fetchData
    } = useFetchData<ApiResponse, [SearchFilters, number]>(fetchPessoas, filters, currentPage);

    useEffect(() => {
        const urlFilters: SearchFilters = {};
        const pagina = parseInt(searchParams.get("pagina") || "0");

        if (searchParams.get("nome")) urlFilters.nome = searchParams.get("nome")!;
        if (searchParams.get("status")) urlFilters.status = searchParams.get("status") as SearchFilters['status'];
        if (searchParams.get("sexo")) urlFilters.sexo = searchParams.get("sexo") as SearchFilters['sexo'];
        if (searchParams.get("faixaIdadeInicial")) urlFilters.faixaIdadeInicial = parseInt(searchParams.get("faixaIdadeInicial")!);
        if (searchParams.get("faixaIdadeFinal")) urlFilters.faixaIdadeFinal = parseInt(searchParams.get("faixaIdadeFinal")!);

        setCurrentPage(pagina + 1);
        setFilters(urlFilters);
        fetchData(urlFilters, pagina + 1);
    }, [searchParams, fetchData]);

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
                loading={loading}
                error={error}
                totalRecords={apiResponse?.totalElements || 0}
                currentPage={(apiResponse?.number ?? 1)}
                totalPages={(apiResponse?.totalPages ?? 0) - 1}
                onPageChange={handlePageChange}
            />

            <main className="flex justify-center mt-4">
                {loading && (
                    <div className="flex flex-wrap justify-center">
                        {Array.from({ length: SKELETON_COUNT }).map((_, i) => (
                            <PersonCardSkeleton key={i} />
                        ))}
                    </div>
                )}

                {!loading && !error && (apiResponse?.content?.length || 0) > 0 && (
                    <div className="flex flex-wrap justify-center">
                        {apiResponse?.content.map((person) => (
                            <PersonCard key={person.id} person={person} />
                        ))}
                    </div>
                )}

                {!loading && error && (
                    <EmptyState description="Tente ajustar os filtros de busca ou consulte novamente mais tarde." />
                )}
            </main>
        </div>
    );
};

export default MissingListContainer;
