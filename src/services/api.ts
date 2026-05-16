import axios from "axios";
import type { ApiResponse, InformacaoPayload, InformacaoResponse, PessoaDesaparecidaDTO, SearchFilters } from "@/types";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const PAGE_SIZE = 20;

export const fetchPessoas = async (filters: SearchFilters = {}, pagina = 0): Promise<ApiResponse> => {
    const params = new URLSearchParams();
    params.append("pagina", pagina.toString());
    params.append("porPagina", PAGE_SIZE.toString());

    if (filters.nome) params.append("nome", filters.nome);
    if (filters.status) params.append("status", filters.status);
    if (filters.sexo) params.append("sexo", filters.sexo);
    if (filters.faixaIdadeInicial) params.append("faixaIdadeInicial", filters.faixaIdadeInicial.toString());
    if (filters.faixaIdadeFinal) params.append("faixaIdadeFinal", filters.faixaIdadeFinal.toString());

    const response = await axios.get<ApiResponse>(`${API_BASE_URL}/pessoas/aberto/filtro`, { params });
    return response.data;
};

export const fetchPessoaById = async (id: number): Promise<PessoaDesaparecidaDTO> => {
    if (!Number.isInteger(id) || id <= 0) {
        throw new Error("O ID deve ser um número inteiro positivo.");
    }

    try {
        const response = await axios.get<PessoaDesaparecidaDTO>(`${API_BASE_URL}/pessoas/${id}`);
        return response.data;
    } catch (error) {
        if (axios.isAxiosError(error) && error.response?.status === 404) {
            throw new Error(`Não foi encontrada pessoa com o ID: ${id}.`);
        }
        if (axios.isAxiosError(error) && error.response) {
            throw new Error(`Erro na API: ${error.response.status} - ${error.response.statusText}`);
        }
        throw new Error("Ocorreu um erro ao buscar os detalhes da pessoa.");
    }
};

export const submitInformacao = async (payload: InformacaoPayload): Promise<InformacaoResponse> => {
    const { ocorrenciaId, informacao, descricao, data, files } = payload;

    const formData = new FormData();
    formData.append("ocoId", ocorrenciaId.toString());
    formData.append("informacao", informacao);
    formData.append("descricao", descricao);
    formData.append("data", data);

    files?.forEach((file) => formData.append("files", file));

    try {
        const response = await axios.post<InformacaoResponse>(
            `${API_BASE_URL}/ocorrencias/informacoes-desaparecido`,
            formData,
            { headers: { "Content-Type": "multipart/form-data" } }
        );
        return response.data;
    } catch (error) {
        if (axios.isAxiosError(error) && error.response) {
            throw new Error(`Erro ao enviar informação: ${error.response.status} - ${error.response.statusText}`);
        }
        throw new Error("Falha ao enviar as informações. Tente novamente.");
    }
};
