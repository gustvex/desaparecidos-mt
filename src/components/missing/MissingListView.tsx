import { Users } from "lucide-react";
import PersonCard from "./PersonCard";
import type { PessoaDesaparecidaDTO, SearchFilters } from "@/assets/interfaces";
import MissingListManager from "./MissingListManager";
import { Spinner } from "../ui/shadcn-io/spinner";


interface Props {
    people: PessoaDesaparecidaDTO[];
    loading: boolean;
    error: string | null;
    totalPages: number;
    currentPage: number;
    totalRecords: number;
    onSearch: (filters: SearchFilters) => void;
    onPageChange: (page: number) => void;
}

const MissingListView = ({
    people,
    loading,
    error,
    totalPages,
    currentPage,
    totalRecords,
    onSearch,
    onPageChange,
}: Props) => {
    return (
        <div className="flex flex-col">
            <MissingListManager
                onSearch={onSearch}
                loading={loading}
                error={error}
                totalRecords={totalRecords}
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={onPageChange}
            />

            <main className="flex overflow-y-auto">
                {loading && <div className="fixed inset-0 flex items-center justify-center">
                    <Spinner variant="default" size={32} />
                </div>}
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

export default MissingListView;
