import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertCircle, Users } from "lucide-react";
import SearchBar from "./SearchBar";
import Pagination from "./Pagination.";
import { ModeToggle } from "../theme/mode-toggle";

interface ListPersonManagerProps {
    onSearch: (filters: { nome?: string }) => void;
    onPageChange: (page: number) => void;
    loading: boolean;
    error: string | null;
    totalRecords: number;
    currentPage: number;
    totalPages: number;
}

const ListPersonManager = ({
    onSearch,
    onPageChange,
    loading,
    error,
    totalRecords,
    currentPage,
    totalPages
}: ListPersonManagerProps) => {
    return (
        <div className="top-0 w-full bg-background">
            <div className="flex flex-col container mx-auto gap-4">
                <div className="flex justify-between space-x-3 mb-4">
                    <div className="flex items-center space-x-2">
                        <Users className="w-8 h-8 text-primary" />
                        <h1 className="text-3xl font-bold text-foreground">Pessoas Desaparecidas</h1>
                    </div>
                    <div className="flex items-center space-x-2 cursor-pointer">
                        <ModeToggle />
                    </div>
                </div>
                <p className="text-foreground">
                    Consulte informações sobre pessoas desaparecidas ou já localizadas.
                </p>


                <div className="mb-4">
                    <SearchBar onSearch={onSearch} loading={loading} />
                </div>
                <div className="flex flex-col justify-center items-center gap-4">

                    <Pagination
                        currentPage={currentPage}
                        totalPages={totalPages}
                        onPageChange={onPageChange}
                        showFirstLast={totalPages > 7}
                    />

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

                </div>

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

export default ListPersonManager;
