import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";
import SearchBar from "./SearchBar";
import Pagination from "./Pagination";
import type { SearchFilters } from "@/types";

interface MissingListManagerProps {
    onSearch: (filters: SearchFilters) => void;
    onPageChange: (page: number) => void;
    loading: boolean;
    error: string | null;
    totalRecords: number;
    currentPage: number;
    totalPages: number;
}

const MissingListManager = ({
    onSearch,
    onPageChange,
    loading,
    error,
    totalRecords,
    currentPage,
    totalPages
}: MissingListManagerProps) => {
    return (
        <div className="w-full bg-background">
            <div className="flex flex-col container mx-auto gap-4">
                <SearchBar onSearch={onSearch} loading={loading} />

                <Pagination
                    onPageChange={onPageChange}
                    loading={loading}
                    currentPage={currentPage}
                    totalRecords={totalRecords}
                    totalPages={totalPages}
                    error={error}
                />

                {error && (
                    <Alert>
                        <AlertCircle className="h-4 w-4" />
                        <AlertDescription>
                            Erro ao carregar dados. Tente novamente mais tarde.
                        </AlertDescription>
                    </Alert>
                )}
            </div>
        </div>
    );
};

export default MissingListManager;
