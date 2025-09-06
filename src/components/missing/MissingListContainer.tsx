import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import MissingListView from "./MissingListView";
import type {  ApiResponse, PessoaDesaparecidaDTO, SearchFilters } from "@/assets/interfaces";
import { fetchPessoas } from "@/assets/api";

const MissingListContainer = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const [people, setPeople] = useState<PessoaDesaparecidaDTO[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [totalPages, setTotalPages] = useState(1);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalRecords, setTotalRecords] = useState(0);

    const loadPeople = async (filters: SearchFilters = {}, page = 1) => {
        setLoading(true);
        setError(null);

        try {
  
            const data: ApiResponse = await fetchPessoas(filters, page - 1);

            setPeople(data.content || []);
            setTotalPages(data.totalPages || 1);
            setCurrentPage(data.number + 1); 
            setTotalRecords(data.totalElements || 0);

            const newParams = new URLSearchParams();
            if (filters.nome) newParams.set("nome", filters.nome);
            if (filters.status) newParams.set("status", filters.status);
            if (filters.faixaIdadeInicial) newParams.set("faixaIdadeInicial", filters.faixaIdadeInicial.toString());
            if (filters.faixaIdadeFinal) newParams.set("faixaIdadeFinal", filters.faixaIdadeFinal.toString());
            if (filters.sexo) newParams.set("sexo", filters.sexo);
            if (page > 1) newParams.set("pagina", (page - 1).toString());

            setSearchParams(newParams);

        } catch (err) {
            setError(err instanceof Error ? err.message : "Erro desconhecido");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        const filters: SearchFilters = {};
        const pagina = parseInt(searchParams.get("pagina") || "0");

        if (searchParams.get("nome")) filters.nome = searchParams.get("nome")!;
        if (searchParams.get("status")) filters.status = searchParams.get("status") as "DESAPARECIDO" | "LOCALIZADO";
        if (searchParams.get("sexo")) filters.sexo = searchParams.get("sexo") as "MASCULINO" | "FEMININO";
        if (searchParams.get("faixaIdadeInicial")) filters.faixaIdadeInicial = parseInt(searchParams.get("faixaIdadeInicial")!);
        if (searchParams.get("faixaIdadeFinal")) filters.faixaIdadeFinal = parseInt(searchParams.get("faixaIdadeFinal")!);

        loadPeople(filters, pagina + 1);
    }, [searchParams]);

    const handleSearch = (filters: SearchFilters) => {
        loadPeople(filters, 1);
    };

    const handlePageChange = (page: number) => {
        const currentFilters: SearchFilters = {
            nome: searchParams.get("nome") || undefined,
            status: searchParams.get("status") as SearchFilters['status'],
            sexo: searchParams.get("sexo") as SearchFilters['sexo'],
            faixaIdadeInicial: searchParams.get("faixaIdadeInicial") ? parseInt(searchParams.get("faixaIdadeInicial")!) : undefined,
            faixaIdadeFinal: searchParams.get("faixaIdadeFinal") ? parseInt(searchParams.get("faixaIdadeFinal")!) : undefined,
        };
        loadPeople(currentFilters, page);
    };

    return (
        <MissingListView
            people={people}
            loading={loading}
            error={error}
            totalPages={totalPages}
            currentPage={currentPage}
            totalRecords={totalRecords}
            onSearch={handleSearch}
            onPageChange={handlePageChange}
        />
    );
};

export default MissingListContainer;