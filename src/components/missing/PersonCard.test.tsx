import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import PersonCard from "./PersonCard";
import type { PessoaDesaparecidaDTO } from "@/types";

const basePerson: PessoaDesaparecidaDTO = {
    id: 42,
    nome: "MARIA DA SILVA",
    idade: 30,
    sexo: "FEMININO",
    vivo: true,
    urlFoto: "",
    ultimaOcorrencia: {
        dtDesaparecimento: "2024-03-15",
        localDesaparecimentoConcat: "AVENIDA TESTE, 123, CUIABÁ, MT",
    },
};

const renderCard = (person: PessoaDesaparecidaDTO) =>
    render(
        <MemoryRouter>
            <PersonCard person={person} />
        </MemoryRouter>
    );

describe("PersonCard", () => {
    it("renders the person's name in title case", () => {
        renderCard(basePerson);
        expect(screen.getByText("Maria da Silva")).toBeInTheDocument();
    });

    it("renders all info fields including location", () => {
        renderCard(basePerson);
        expect(screen.getByText("30 anos")).toBeInTheDocument();
        expect(screen.getByText("Feminino")).toBeInTheDocument();
        expect(screen.getByText("15/03/2024")).toBeInTheDocument();
        expect(screen.getByText("Avenida Teste, 123, Cuiabá, Mt")).toBeInTheDocument();
    });

    it("shows 'Desaparecida' badge when there is no dataLocalizacao", () => {
        renderCard(basePerson);
        expect(screen.getByText("Desaparecida")).toBeInTheDocument();
    });

    it("shows 'Localizada Viva' when located alive", () => {
        renderCard({
            ...basePerson,
            ultimaOcorrencia: { ...basePerson.ultimaOcorrencia, dataLocalizacao: "2024-04-01" },
        });
        expect(screen.getByText("Localizada Viva")).toBeInTheDocument();
    });

    it("shows 'Localizada Morta' when located not alive", () => {
        renderCard({
            ...basePerson,
            vivo: false,
            ultimaOcorrencia: { ...basePerson.ultimaOcorrencia, dataLocalizacao: "2024-04-01" },
        });
        expect(screen.getByText("Localizada Morta")).toBeInTheDocument();
    });

    it("links to the details page with the person id", () => {
        renderCard(basePerson);
        const link = screen.getByRole("link", { name: /ver detalhes/i });
        expect(link).toHaveAttribute("href", "/details/42");
    });

    it("falls back to 'Não informado' for missing location", () => {
        renderCard({
            ...basePerson,
            ultimaOcorrencia: { ...basePerson.ultimaOcorrencia, localDesaparecimentoConcat: undefined },
        });
        expect(screen.getAllByText("Não informado").length).toBeGreaterThan(0);
    });
});
