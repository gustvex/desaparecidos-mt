import { Alert, AlertDescription } from "@/components/ui/alert";
import { Users, AlertCircle } from "lucide-react";
import SearchBar from "./SeachBar";

interface PersonListHeaderProps {
    onSearch: (filters: { nome?: string }) => void;
    loading: boolean;
    error: string | null;
    totalRecords: number;
    currentPage: number;
    totalPages: number;
}

const PersonListHeader = ({
    onSearch,
    loading,
    error,
    totalRecords,
    currentPage,
    totalPages
}: PersonListHeaderProps) => {
    return (
        <div className="sticky w-full top-0 z-50 bg-background pb-4 pt-10">
            <div className="flex flex-col max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Page header */}
                <div className="mb-8">
                    <div className="flex items-center space-x-3 mb-4">
                        <Users className="w-8 h-8 text-primary" />
                        <h1 className="text-3xl font-bold text-foreground">Pessoas Desaparecidas</h1>
                    </div>
                    <p className="text-muted-foreground">
                        Consulte informações sobre pessoas desaparecidas ou já localizadas.
                        Use os filtros para refinar sua busca.
                    </p>
                </div>

                {/* Search bar */}
                <div className="mb-4">
                    <SearchBar onSearch={onSearch} loading={loading} />
                </div>

                {/* Results header */}
                {!loading && !error && (
                    <div className="mb-6">
                        <p className="text-sm text-muted-foreground">
                            {totalRecords > 0
                                ? `Exibindo ${totalRecords} registros (Página ${currentPage} de ${totalPages})`
                                : 'Nenhum registro encontrado'
                            }
                        </p>
                    </div>
                )}

                {/* Error state */}
                {error && (
                    <Alert className="mb-8">
                        <AlertCircle className="h-4 w-4" />
                        <AlertDescription>
                            Erro ao carregar dados: {error}. Tente novamente mais tarde.
                        </AlertDescription>
                    </Alert>
                )}
            </div>
        </div>
    );
};

export default PersonListHeader;
