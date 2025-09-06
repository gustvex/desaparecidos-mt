import type { ApiResponse, SearchFilters } from "./interfaces";

export const fetchPessoas = async (filters: SearchFilters = {}, pagina = 0): Promise<ApiResponse> => {
    const params = new URLSearchParams();

    params.append('pagina', pagina.toString());
    params.append('porPagina', '10');

    if (filters.nome) params.append('nome', filters.nome);
    if (filters.status) params.append('status', filters.status);
    if (filters.sexo) params.append('sexo', filters.sexo);
    if (filters.faixaIdadeInicial) params.append('faixaIdadeInicial', filters.faixaIdadeInicial.toString());
    if (filters.faixaIdadeFinal) params.append('faixaIdadeFinal', filters.faixaIdadeFinal.toString());

    const response = await fetch(`https://abitus-api.geia.vip/v1/pessoas/aberto/filtro?${params.toString()}`);

    if (!response.ok) {
        throw new Error(`Erro ${response.status}: ${response.statusText}`);
    }

    const data: ApiResponse = await response.json();
    return data;
};