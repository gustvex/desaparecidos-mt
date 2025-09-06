import type { Pessoa } from "@/assets/interfaces";

export interface SearchFilters {
    nome?: string;
    status?: "DESAPARECIDO" | "LOCALIZADO" | "";
    localDesaparecimento?: string;
    idadeMin?: number;
    idadeMax?: number;
}

export interface ApiResponse {
    content: Pessoa[];
    totalPages: number;
    totalElements: number;
    number: number;
    size: number;
}

export const fetchPessoas = async (filters: SearchFilters = {}, page = 1): Promise<ApiResponse> => {
    const params = new URLSearchParams();
    params.append('page', (page - 1).toString());
    params.append('size', '10');

    if (filters.nome) params.append('nome', filters.nome);
    if (filters.status) params.append('status', filters.status);
    if (filters.localDesaparecimento) params.append('localDesaparecimento', filters.localDesaparecimento);
    if (filters.idadeMin) params.append('idadeMin', filters.idadeMin.toString());
    if (filters.idadeMax) params.append('idadeMax', filters.idadeMax.toString());

    const response = await fetch(`https://abitus-api.geia.vip/v1/pessoas/aberto/filtro?${params.toString()}`);

    if (!response.ok) {
        throw new Error(`Erro ${response.status}: ${response.statusText}`);
    }

    return await response.json();
};