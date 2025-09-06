import axios from "axios";
import type { ApiResponse, InformacaoPayload, InformacaoResponse, PessoaDesaparecidaDTO, SearchFilters } from "./interfaces";

export const fetchPessoas = async (filters: SearchFilters = {}, pagina = 0): Promise<ApiResponse> => {
    try {
        const params = new URLSearchParams();

        params.append('pagina', pagina.toString());
        params.append('porPagina', '10');

        if (filters.nome) params.append('nome', filters.nome);
        if (filters.status) params.append('status', filters.status);
        if (filters.sexo) params.append('sexo', filters.sexo);
        if (filters.faixaIdadeInicial) params.append('faixaIdadeInicial', filters.faixaIdadeInicial.toString());
        if (filters.faixaIdadeFinal) params.append('faixaIdadeFinal', filters.faixaIdadeFinal.toString());

        const response = await axios.get<ApiResponse>(`https://abitus-api.geia.vip/v1/pessoas/aberto/filtro`, { params });
        return response.data;
    } catch (error) {
        console.error("Falha ao buscar pessoas:", error);
        throw error;
    }
};

export const fetchPessoaById = async (id: number): Promise<PessoaDesaparecidaDTO> => {
    if (typeof id !== 'number' || id <= 0) {
        const errorMsg = "O ID deve ser um número inteiro positivo.";
        throw new Error(errorMsg);
    }

    const url = `https://abitus-api.geia.vip/v1/pessoas/${id}`;

    try {
        const response = await axios.get<PessoaDesaparecidaDTO>(url);
        return response.data;
    } catch (error: unknown) {
        let errorMsg = 'Ocorreu um erro ao buscar os detalhes da pessoa.';
        if (axios.isAxiosError(error) && error.response) {
            if (error.response.status === 404) {
                errorMsg = `Não foi encontrada pessoa com o ID: ${id}.`;
            } else {
                errorMsg = `Erro na API: ${error.response.status} - ${error.response.statusText}`;
            }
        }
        console.error("Falha ao buscar detalhes da pessoa:", error);
        throw new Error(errorMsg);
    }
};

export const submitInformacao = async (
    payload: InformacaoPayload
): Promise<InformacaoResponse> => {
    const { ocorrenciaId, informacao, descricao, data, files } = payload;
    const url = "https://abitus-api.geia.vip/v1/ocorrencias/informacoes-desaparecido";

    const formData = new FormData();
    formData.append("ocoId", ocorrenciaId.toString());
    formData.append("informacao", informacao);
    formData.append("descricao", descricao);
    
    const formattedDate =
        typeof data === "string"
            ? data
            : data.toISOString().split("T")[0];

    formData.append("data", formattedDate);

    if (files && files.length > 0) {
        files.forEach((file) => {
            formData.append("files", file);
        });
    }

    try {
        const response = await axios.post<InformacaoResponse>(url, formData, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        });
        return response.data;
    } catch (error: unknown) {
        let errorMsg = "Falha ao enviar as informações. Tente novamente.";
        if (axios.isAxiosError(error) && error.response) {
            errorMsg = `Erro ao enviar informação: ${error.response.status} - ${error.response.statusText}`;
        }
        console.error("Falha ao enviar as informações:", error);
        throw new Error(errorMsg);
    }
};