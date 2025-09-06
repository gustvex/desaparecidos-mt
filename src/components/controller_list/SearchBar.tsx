import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, Filter, X } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

interface SearchFilters {
    nome?: string;
    status?: "DESAPARECIDO" | "LOCALIZADO" | "";
    localDesaparecimento?: string;
    idadeMin?: number;
    idadeMax?: number;
}

interface SearchBarProps {
    onSearch: (filters: SearchFilters) => void;
    loading?: boolean;
}

const SearchBar = ({ onSearch, loading = false }: SearchBarProps) => {
    const [filters, setFilters] = useState<SearchFilters>({});
    const [showAdvanced, setShowAdvanced] = useState(false);

    const handleSearch = () => {
        onSearch(filters);
    };

    const handleClear = () => {
        setFilters({});
        onSearch({});
    };

    const updateFilter = (key: keyof SearchFilters, value: any) => {
        setFilters(prev => ({ ...prev, [key]: value }));
    };

    return (
        <div className="space-y-4">
            {/* Basic search */}
            <div className="flex flex-col sm:flex-row gap-4">
                <div className="flex-1">
                    <Input
                        placeholder="Buscar por nome..."
                        value={filters.nome || ""}
                        onChange={(e) => updateFilter("nome", e.target.value)}
                        className="input-police"
                    />
                </div>

                <div className="flex gap-2">
                    <Button
                        onClick={() => setShowAdvanced(!showAdvanced)}
                        variant="outline"
                        size="default"
                    >
                        <Filter className="w-4 h-4 mr-2" />
                        Filtros
                    </Button>

                    <Button
                        onClick={handleSearch}
                        disabled={loading}
                        className="px-6"
                    >
                        <Search className="w-4 h-4 mr-2" />
                        Buscar
                    </Button>
                </div>
            </div>

            {/* Advanced filters */}
            {showAdvanced && (
                <Card>
                    <CardContent className="p-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                            <div>
                                <label className="text-sm font-medium text-foreground mb-2 block">
                                    Status
                                </label>
                                <Select
                                    value={filters.status || "TODOS"}
                                    onValueChange={(value) => updateFilter("status", value === "TODOS" ? undefined : value)}
                                >
                                    <SelectTrigger>
                                        <SelectValue placeholder="Todos os status" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="TODOS">Todos os status</SelectItem>
                                        <SelectItem value="DESAPARECIDO">Desaparecido</SelectItem>
                                        <SelectItem value="LOCALIZADO">Localizado</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>

                            <div>
                                <label className="text-sm font-medium text-foreground mb-2 block">
                                    Local
                                </label>
                                <Input
                                    placeholder="Local do desaparecimento"
                                    value={filters.localDesaparecimento || ""}
                                    onChange={(e) => updateFilter("localDesaparecimento", e.target.value)}
                                    className="input-police"
                                />
                            </div>

                            <div>
                                <label className="text-sm font-medium text-foreground mb-2 block">
                                    Idade Mínima
                                </label>
                                <Input
                                    type="number"
                                    placeholder="Ex: 18"
                                    value={filters.idadeMin || ""}
                                    onChange={(e) => updateFilter("idadeMin", e.target.value ? parseInt(e.target.value) : undefined)}
                                    className="input-police"
                                />
                            </div>

                            <div>
                                <label className="text-sm font-medium text-foreground mb-2 block">
                                    Idade Máxima
                                </label>
                                <Input
                                    type="number"
                                    placeholder="Ex: 65"
                                    value={filters.idadeMax || ""}
                                    onChange={(e) => updateFilter("idadeMax", e.target.value ? parseInt(e.target.value) : undefined)}
                                    className="input-police"
                                />
                            </div>
                        </div>

                        <div className="flex justify-end space-x-2 mt-4">
                            <Button
                                onClick={handleClear}
                                variant="outline"
                                size="sm"
                            >
                                <X className="w-4 h-4 mr-2" />
                                Limpar
                            </Button>
                        </div>
                    </CardContent>
                </Card>
            )}
        </div>
    );
};

export default SearchBar;