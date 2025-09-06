import type { ApiResponse, InformacaoPayload, InformacaoResponse, PessoaDesaparecidaDTO, SearchFilters } from "./interfaces";

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


export const fetchPessoaById = async (id: number): Promise<PessoaDesaparecidaDTO> => {
    if (typeof id !== 'number' || id <= 0) {
        throw new Error("O ID deve ser um número inteiro positivo.");
    }

    const url = `https://abitus-api.geia.vip/v1/pessoas/${id}`;

    try {
        const response = await fetch(url);

        if (!response.ok) {
            if (response.status === 404) {
                throw new Error(`Não foi encontrada pessoa com o ID: ${id}`);
            }
            throw new Error(`Erro na API: ${response.status} - ${response.statusText}`);
        }

        const data: PessoaDesaparecidaDTO = await response.json();
        return data;

    } catch (error) {
        console.error("Falha ao buscar detalhes da pessoa:", error);
        throw error;
    }
};

export const submitInformacao = async (payload: InformacaoPayload): Promise<InformacaoResponse> => {
    const { ocorrenciaId, informacao, descricao, files } = payload;
    const url = 'https://abitus-api.geia.vip/v1/ocorrencias/informacoes-desaparecido';

    const formData = new FormData();

    formData.append('ocoId', ocorrenciaId.toString());
    formData.append('informacao', informacao);
    formData.append('descricao', descricao);
    // formData.append('data', format(data, 'yyyy-MM-dd'));

    if (files && files.length > 0) {
        files.forEach(file => {
            formData.append('files', file);
        });
    }

    try {
        const response = await fetch(url, {
            method: 'POST',
            body: formData,
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(`Erro ao enviar informação: ${response.status} - ${errorData.message || response.statusText}`);
        }

        const result = await response.json();
        return result;

    } catch (error) {
        console.error("Falha ao enviar as informações:", error);
        throw error;
    }
};