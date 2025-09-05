import axios from 'axios';
import type { RespostaPaginada, Pessoa } from './interfaces';

const API_URL = 'https://abitus-api.geia.vip/v1';

export const fetchMissingPersons = async (
    page: number = 0,
    pageSize: number = 10,
    searchTerm: string = ''
): Promise<RespostaPaginada<Pessoa>> => {
    try {
        const response = await axios.get<RespostaPaginada<Pessoa>>(`${API_URL}/pessoas/aberto/filtro`, {
            params: {
                page: page,
                size: pageSize,
                nome: searchTerm,
            },
        });

        return response.data;
    } catch (error) {
        if (axios.isAxiosError(error) && error.response) {
            console.error('Erro de requisição:', error.response.status, error.response.data);
            throw new Error(`Falha na requisição: ${error.response.status}`);
        } else {
            console.error('Erro ao buscar pessoas desaparecidas:', error);
            throw new Error('Ocorreu um erro ao carregar os dados. Por favor, tente novamente mais tarde.');
        }
    }
};
