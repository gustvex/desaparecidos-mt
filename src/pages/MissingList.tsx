import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { Skeleton } from "@/components/ui/skeleton";
import type { Pessoa } from "@/assets/interfaces";
import PersonCard from "@/components/Card";
import { fetchPessoas, type ApiResponse, type SearchFilters } from "@/assets/api";
import { Users } from "lucide-react";
import ListPersonManager from "@/components/controller_list/ListPersonManager";


const PersonList = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const [people, setPeople] = useState<Pessoa[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [totalPages, setTotalPages] = useState(1);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalRecords, setTotalRecords] = useState(0);

    const loadPeople = async (filters: SearchFilters = {}, page = 1) => {
        setLoading(true);
        setError(null);

        try {
            const data: ApiResponse = await fetchPessoas(filters, page);

            setPeople(data.content || []);
            setTotalPages(data.totalPages || 1);
            setCurrentPage(page);
            setTotalRecords(data.totalElements || 0);

            // Atualizar parâmetros da URL
            const newSearchParams = new URLSearchParams();
            if (filters.nome) newSearchParams.set('nome', filters.nome);
            if (filters.status) newSearchParams.set('status', filters.status);
            if (filters.localDesaparecimento) newSearchParams.set('localDesaparecimento', filters.localDesaparecimento);
            if (filters.idadeMin) newSearchParams.set('idadeMin', filters.idadeMin.toString());
            if (filters.idadeMax) newSearchParams.set('idadeMax', filters.idadeMax.toString());
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

    // Carregar dados iniciais e lidar com parâmetros da URL
    useEffect(() => {
        const filters: SearchFilters = {};
        const page = parseInt(searchParams.get('page') || '1');

        if (searchParams.get('nome')) filters.nome = searchParams.get('nome')!;
        if (searchParams.get('status')) filters.status = searchParams.get('status') as "DESAPARECIDO" | "LOCALIZADO";
        if (searchParams.get('localDesaparecimento')) filters.localDesaparecimento = searchParams.get('localDesaparecimento')!;
        if (searchParams.get('idadeMin')) filters.idadeMin = parseInt(searchParams.get('idadeMin')!);
        if (searchParams.get('idadeMax')) filters.idadeMax = parseInt(searchParams.get('idadeMax')!);

        loadPeople(filters, page);
    }, []);

    const handleSearch = (filters: SearchFilters) => {
        loadPeople(filters, 1);
    };

    const handlePageChange = (page: number) => {
        const filters: SearchFilters = {};

        if (searchParams.get('nome')) filters.nome = searchParams.get('nome')!;
        if (searchParams.get('status')) filters.status = searchParams.get('status') as "DESAPARECIDO" | "LOCALIZADO";
        if (searchParams.get('localDesaparecimento')) filters.localDesaparecimento = searchParams.get('localDesaparecimento')!;
        if (searchParams.get('idadeMin')) filters.idadeMin = parseInt(searchParams.get('idadeMin')!);
        if (searchParams.get('idadeMax')) filters.idadeMax = parseInt(searchParams.get('idadeMax')!);

        loadPeople(filters, page);
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
        <div className="flex flex-col">

            <ListPersonManager
                onSearch={handleSearch}
                loading={loading}
                error={error}
                totalRecords={totalRecords}
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={handlePageChange}
            />

            <main className="flex overflow-y-auto">
                {loading && <LoadingSkeleton />}

                {!loading && !error && people.length > 0 && (
                    <div className="flex flex-wrap justify-center">
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
        </div>
    );
};

export default PersonList;