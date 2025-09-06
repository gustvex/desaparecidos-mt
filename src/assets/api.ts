import axios from "axios";
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


export const submitInformacao = async (
    payload: InformacaoPayload
): Promise<InformacaoResponse> => {
    const { ocorrenciaId, informacao, descricao, data, files } = payload;
    const url = "https://abitus-api.geia.vip/v1/ocorrencias/informacoes-desaparecido";

    const formData = new FormData();
    formData.append("ocoId", ocorrenciaId.toString());
    formData.append("informacao", informacao);
    formData.append("descricao", descricao);

    // garantir formato yyyy-MM-dd
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

    // for (const [key, value] of formData.entries()) {
    //     console.log(`${key}:`, value);
    // }


    try {
        const response = await axios.post<InformacaoResponse>(url, formData, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        });

        return response.data;
    } catch (error: any) {
        console.error("Falha ao enviar as informações:", error);

        if (axios.isAxiosError(error) && error.response) {
            throw new Error(
                `Erro ao enviar informação: ${error.response.status} - ${(error.response.data as any)?.message || error.response.statusText
                }`
            );
        }

        throw error;
    }
};
