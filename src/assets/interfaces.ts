
export interface PessoaDesaparecidaDTO {
    id: number;
    nome: string;
    idade: number;
    sexo: "MASCULINO" | "FEMININO";
    vivo: boolean;
    urlFoto: string;
    ultimaOcorrencia: UltimaOcorrenciaDTO;
}

export interface UltimaOcorrenciaDTO {
    dtDesaparecimento?: string;
    dataLocalizacao?: string;
    encontradoVivo?: boolean;
    localDesaparecimentoConcat?: string;
    ocorrenciaEntrevDesapDTO?: OcorrenciaEntrevDesapDTO;
    listaCartaz?: CartazDTO[];
    ocoId?: number;
}

export interface OcorrenciaEntrevDesapDTO {
    informacao: string;
    vestimentasDesaparecido: string;
}

export interface CartazDTO {
    urlCartaz: string;
    tipoCartaz: "PDF_DESAPARECIDO" | "JPG_DESAPARECIDO" | "PDF_ENCONTRADO" | "JPG_ENCONTRADO";
}

export interface SearchFilters {
    nome?: string;
    status?: "DESAPARECIDO" | "LOCALIZADO" | "";
    sexo?: "MASCULINO" | "FEMININO" | "";
    faixaIdadeInicial?: number;
    faixaIdadeFinal?: number;
}

export interface ApiResponse {
    content: PessoaDesaparecidaDTO[];
    totalPages: number;
    totalElements: number;
    number: number;
    size: number;
    sort: {
        empty: boolean;
        sorted: boolean;
        unsorted: boolean;
    };
    numberOfElements: number;
    first: boolean;
    last: boolean;
    empty: boolean;
}
