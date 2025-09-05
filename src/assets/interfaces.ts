// --- Interfaces de Paginação ---

export interface Ordenacao {
    naoOrdenado: boolean;
    ordenado: boolean;
    vazio: boolean;
}

export interface Pageable {
    semPagina: boolean;
    numeroPagina: number;
    paginado: boolean;
    tamanhoPagina: number;
    deslocamento: number;
    ordenacao: Ordenacao;
}

export interface RespostaPaginada<T> {
    totalPages: number;
    totalElements: number;
    pageable: Pageable;
    numeroDeElementos: number;
    primeiro: boolean;
    ultimo: boolean;
    tamanho: number;
    content: T[];
    numero: number;
    ordenacao: Ordenacao;
    vazio: boolean;
}

// --- Tipos relacionados a Pessoa ---

export const Sexo = {
    MASCULINO: "MASCULINO",
    FEMININO: "FEMININO",
    OUTRO: "OUTRO",
} as const;

export interface Pessoa {
    id: number;
    nome: string;
    idade: number;
    sexo: typeof Sexo[keyof typeof Sexo];
    vivo: boolean;
    urlFoto: string;
    ultimaOcorrencia: UltimaOcorrencia;
}

// --- Interfaces de Ocorrência e Cartaz ---

export interface UltimaOcorrencia {
    dataDesaparecimento: Date;
    dataLocalizacao: Date | null;
    encontradoVivo: boolean;
    localDesaparecimentoConcat: string;
    ocorrenciaEntrevistaDTO: OcorrenciaEntrevistaDTO;
    listaCartazes: Cartaz[];
    idOcorrencia: number;
}

export interface OcorrenciaEntrevistaDTO {
    informacoes: string;
    roupasPessoaDesaparecida: string;
}

export const TipoCartaz = {
    PDF_DESAPARECIDO: "PDF_DESAPARECIDO",
    IMAGEM_DESAPARECIDO: "IMAGEM_DESAPARECIDO",
    OUTRO: "OUTRO",
} as const;

export interface Cartaz {
    urlCartaz: string;
    tipoCartaz: typeof TipoCartaz[keyof typeof TipoCartaz];
}
