import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";
import SearchBar from "./utils/SearchBar";
import Pagination from "./utils/Pagination.";
import PageHeader from "./utils/PageHeader";


interface MissingListManagerProps {
    onSearch: (filters: { nome?: string }) => void;
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
        <div className="top-0 w-full bg-background">
            <div className="flex flex-col container mx-auto gap-4">
                <PageHeader />

                <SearchBar onSearch={onSearch} loading={loading} />

                <Pagination
                    onPageChange={onPageChange}
                    loading={loading}
                    currentPage={currentPage}
                    totalRecords={totalRecords}
                    totalPages={totalPages}
                    showFirstLast={totalPages > 7}
                    error={error}
                />


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

export default MissingListManager;
