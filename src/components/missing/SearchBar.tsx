import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, Filter, X } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import type { SearchFilters } from "@/assets/interfaces";

type FilterValue = string | number | undefined;
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

    const updateFilter = (key: keyof SearchFilters, value: FilterValue) => {
        setFilters(prev => ({ ...prev, [key]: value }));
    };

    return (
        <div className="flex flex-col gap-4">
            <p className="text-foreground">
                Consulte informações sobre pessoas desaparecidas ou já localizadas.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
                <Input
                    placeholder="Buscar por nome..."
                    value={filters.nome || ""}
                    onChange={(e) => updateFilter("nome", e.target.value)}
                    className="input-police"
                />

                <div className="flex gap-2">
                    <Button
                        onClick={() => setShowAdvanced(!showAdvanced)}
                        variant="outline"
                    >
                        <Filter className="w-4 h-4 mr-2" />
                        Filtros
                    </Button>

                    <Button
                        onClick={handleSearch}
                        disabled={loading}
                        className="  px-6"

                    >
                        <Search className="w-4 h-4 mr-2" />
                        Buscar
                    </Button>
                </div>
            </div>

            <div className="flex justify-center">
                {showAdvanced && (
                    <Card>
                        <CardContent className="flex flex-col gap-4">
                            <div className="flex flex-wrap gap-4">
                                <div className="flex flex-col">
                                    <label className="text-sm font-medium text-foreground mb-2 block">
                                        Status
                                    </label>
                                    <Select
                                        value={filters.status || "TODOS"}
                                        onValueChange={(value) => updateFilter("status", value === "TODOS" ? undefined : value)}
                                    >
                                        <SelectTrigger className="w-[185px]">
                                            <SelectValue placeholder="Todos" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="TODOS">Todos</SelectItem>
                                            <SelectItem value="DESAPARECIDO">Desaparecido</SelectItem>
                                            <SelectItem value="LOCALIZADO">Localizado</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>

                                <div>
                                    <label className="text-sm font-medium text-foreground mb-2 block">
                                        Sexo
                                    </label>
                                    <Select
                                        value={filters.sexo || "TODOS"}
                                        onValueChange={(value) => updateFilter("sexo", value === "TODOS" ? undefined : value)}>
                                        <SelectTrigger className="w-[185px]">
                                            <SelectValue placeholder="Todos" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="TODOS">Todos</SelectItem>
                                            <SelectItem value="MASCULINO">MASCULINO</SelectItem>
                                            <SelectItem value="FEMININO">FEMININO</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>

                                <div>
                                    <label className="text-sm font-medium text-foreground mb-2 block">
                                        Idade Mínima
                                    </label>
                                    <Input
                                        type="number"
                                        placeholder="Ex: 18"
                                        value={filters.faixaIdadeInicial || ""}
                                        onChange={(e) => updateFilter("faixaIdadeInicial", e.target.value ? parseInt(e.target.value) : undefined)}
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
                                        value={filters.faixaIdadeFinal || ""}
                                        onChange={(e) => updateFilter("faixaIdadeFinal", e.target.value ? parseInt(e.target.value) : undefined)}
                                        className="input-police"
                                    />
                                </div>
                            </div>

                            <div className="flex justify-end">
                                <Button
                                    onClick={handleClear}
                                    variant="outline"
                                >
                                    <X className="w-4 h-4 mr-2" />
                                    Limpar
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                )}
            </div>

        </div>
    );
};

export default SearchBar;