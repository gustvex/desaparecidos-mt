import { describe, it, expect, vi, beforeEach } from "vitest";
import axios from "axios";
import { fetchPessoaById, fetchPessoas, PAGE_SIZE, submitInformacao } from "./api";

vi.mock("axios");
const mockedAxios = vi.mocked(axios, true);

beforeEach(() => {
    vi.clearAllMocks();
});

describe("fetchPessoas", () => {
    it("builds query params with pagination defaults and filters", async () => {
        mockedAxios.get.mockResolvedValueOnce({ data: { content: [], totalPages: 0, totalElements: 0 } });

        await fetchPessoas({ nome: "Ana", sexo: "FEMININO", faixaIdadeInicial: 20 }, 2);

        const [, config] = mockedAxios.get.mock.calls[0];
        const params = config?.params as URLSearchParams;
        expect(params.get("pagina")).toBe("2");
        expect(params.get("porPagina")).toBe(PAGE_SIZE.toString());
        expect(params.get("nome")).toBe("Ana");
        expect(params.get("sexo")).toBe("FEMININO");
        expect(params.get("faixaIdadeInicial")).toBe("20");
    });

    it("omits empty filter values", async () => {
        mockedAxios.get.mockResolvedValueOnce({ data: { content: [] } });
        await fetchPessoas({}, 0);
        const [, config] = mockedAxios.get.mock.calls[0];
        const params = config?.params as URLSearchParams;
        expect(params.has("nome")).toBe(false);
        expect(params.has("status")).toBe(false);
    });
});

describe("fetchPessoaById", () => {
    it("rejects invalid ids without calling the API", async () => {
        await expect(fetchPessoaById(0)).rejects.toThrow("O ID deve ser um número inteiro positivo.");
        await expect(fetchPessoaById(-5)).rejects.toThrow();
        expect(mockedAxios.get).not.toHaveBeenCalled();
    });

    it("returns the person data on success", async () => {
        const person = { id: 1, nome: "Test" };
        mockedAxios.get.mockResolvedValueOnce({ data: person });
        const result = await fetchPessoaById(1);
        expect(result).toEqual(person);
    });

    it("throws a friendly message on 404", async () => {
        mockedAxios.isAxiosError = vi.fn().mockReturnValue(true) as never;
        mockedAxios.get.mockRejectedValueOnce({ response: { status: 404 } });
        await expect(fetchPessoaById(99)).rejects.toThrow(/Não foi encontrada pessoa com o ID: 99/);
    });
});

describe("submitInformacao", () => {
    it("posts FormData with all fields and files", async () => {
        mockedAxios.post.mockResolvedValueOnce({ data: { ocoId: 1 } });
        const file = new File(["x"], "x.jpg", { type: "image/jpeg" });

        await submitInformacao({
            ocorrenciaId: 7,
            informacao: "vi a pessoa",
            descricao: "perto do mercado",
            data: "2024-06-01",
            files: [file],
        });

        const [, body] = mockedAxios.post.mock.calls[0];
        expect(body).toBeInstanceOf(FormData);
        const formData = body as FormData;
        expect(formData.get("ocoId")).toBe("7");
        expect(formData.get("informacao")).toBe("vi a pessoa");
        expect(formData.get("descricao")).toBe("perto do mercado");
        expect(formData.get("data")).toBe("2024-06-01");
        expect(formData.getAll("files")).toHaveLength(1);
    });
});
