import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, Users } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

import type { Pessoa } from "@/assets/interfaces";
import PersonListHeader from "@/components/PersonListHeader";
import PersonCard from "@/components/Card";


interface SearchFilters {
    nome?: string;
    status?: "DESAPARECIDO" | "LOCALIZADO" | "";
    localDesaparecimento?: string;
    idadeMin?: number;
    idadeMax?: number;
}

const PersonList = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const [people, setPeople] = useState<Pessoa[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [totalPages, setTotalPages] = useState(1);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalRecords, setTotalRecords] = useState(0);

    const fetchPeople = async (filters: SearchFilters = {}, page = 1) => {
        setLoading(true);
        setError(null);

        try {
            const params = new URLSearchParams();
            params.append('page', (page - 1).toString());
            params.append('size', '10');

            if (filters.nome) {
                params.append('nome', filters.nome);
            }

            const response = await fetch(`https://abitus-api.geia.vip/v1/pessoas/aberto/filtro?${params.toString()}`);

            if (!response.ok) {
                throw new Error(`Erro ${response.status}: ${response.statusText}`);
            }

            const data = await response.json();

            setPeople(data.content || []);
            setTotalPages(data.totalPages || 1);
            setCurrentPage(page);
            setTotalRecords(data.totalElements || 0);

            const newSearchParams = new URLSearchParams();
            if (filters.nome) newSearchParams.set('nome', filters.nome);
            if (page > 1) newSearchParams.set('page', page.toString());

            setSearchParams(newSearchParams);

        } catch (err) {
            const errorMessage = err instanceof Error ? err.message : 'Erro desconhecido ao carregar dados';
            setError(errorMessage);
            console.error('Error fetching people:', err);
        } finally {
            setLoading(false);
        }
    };

    // Load initial data and handle URL params
    useEffect(() => {
        const filters: SearchFilters = {};
        const page = parseInt(searchParams.get('page') || '1');
        if (searchParams.get('nome')) filters.nome = searchParams.get('nome')!;
        fetchPeople(filters, page);
    }, []);

    const handleSearch = (filters: SearchFilters) => {
        const nomeFilter = { nome: filters.nome };
        fetchPeople(nomeFilter, 1);
    };

    const handlePageChange = (page: number) => {
        const filters: SearchFilters = {};
        if (searchParams.get('nome')) filters.nome = searchParams.get('nome')!;
        fetchPeople(filters, page);
    };

    const LoadingSkeleton = () => (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="space-y-4 p-6 border rounded-lg">
                    <div className="flex items-start space-x-4">
                        <Skeleton className="w-20 h-20 rounded-lg" />
                        <div className="flex-1 space-y-2">
                            <Skeleton className="h-5 w-3/4" />
                            <Skeleton className="h-4 w-1/2" />
                            <Skeleton className="h-4 w-1/3" />
                        </div>
                    </div>
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-2/3" />
                    <Skeleton className="h-10 w-full" />
                </div>
            ))}
        </div>
    );

    return (
        <div className="flex flex-col h-screen bg-background">
            <header>
                <PersonListHeader
                    onSearch={handleSearch}
                    loading={loading}
                    error={error}
                    totalRecords={totalRecords}
                    currentPage={currentPage}
                    totalPages={totalPages}
                />
            </header>

            <main className="flex flex-wrap justify-center overflow-y-auto sm:p-6 lg:p-8">
                {loading && <LoadingSkeleton />}

                {!loading && !error && people.length > 0 && (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {people.map((person) => (
                            <PersonCard key={person.id} person={person} />
                        ))}
                    </div>
                )}

                {!loading && !error && people.length === 0 && (
                    <div className="text-center py-12">
                        <Users className="w-16 h-16 mx-auto text-muted-foreground mb-4" />
                        <h3 className="text-lg font-semibold text-foreground mb-2">
                            Nenhuma pessoa encontrada
                        </h3>
                        <p className="text-muted-foreground">
                            Tente ajustar os filtros de busca ou consulte novamente mais tarde.
                        </p>
                    </div>
                )}
            </main>

            {!loading && !error && totalPages > 1 && (
                <footer className="p-4 flex items-center justify-center space-x-2">
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handlePageChange(currentPage - 1)}
                        disabled={currentPage <= 1}
                    >
                        <ChevronLeft className="w-4 h-4 mr-1" />
                        Anterior
                    </Button>

                    <div className="flex space-x-1">
                        {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                            const page = Math.max(1, Math.min(totalPages - 4, currentPage - 2)) + i;
                            return (
                                <Button
                                    key={page}
                                    variant={page === currentPage ? "default" : "outline"}
                                    size="sm"
                                    onClick={() => handlePageChange(page)}
                                >
                                    {page}
                                </Button>
                            );
                        })}
                    </div>

                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handlePageChange(currentPage + 1)}
                        disabled={currentPage >= totalPages}
                    >
                        Próxima
                        <ChevronRight className="w-4 h-4 ml-1" />
                    </Button>
                </footer>
            )}
        </div>
    );
};

export default PersonList;
